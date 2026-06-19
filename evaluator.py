"""A safe arithmetic expression evaluator.

Standard library only. No ``eval``/``exec``/``ast`` parsing — the input is
tokenised by hand and parsed with a small recursive-descent parser.
"""

from __future__ import annotations

import math


# --------------------------------------------------------------------------- #
# Errors
# --------------------------------------------------------------------------- #
class EvalError(Exception):
    """Base class for every error raised by :func:`evaluate`."""


class SyntaxErr(EvalError):
    """Malformed input (bad token, unbalanced parens, wrong arg count, ...)."""


class NameErr(EvalError):
    """Unknown variable or function name."""


class MathErr(EvalError):
    """Math domain error (division by zero, sqrt of a negative, ...)."""


# --------------------------------------------------------------------------- #
# Constants and built-in functions
# --------------------------------------------------------------------------- #
_CONSTANTS: dict[str, float] = {
    "pi": math.pi,
    "e": math.e,
}


def _fn_abs(args: list[float]) -> float:
    if len(args) != 1:
        raise SyntaxErr("abs() takes exactly one argument")
    return abs(args[0])


def _fn_sqrt(args: list[float]) -> float:
    if len(args) != 1:
        raise SyntaxErr("sqrt() takes exactly one argument")
    if args[0] < 0:
        raise MathErr("sqrt of a negative number")
    return math.sqrt(args[0])


def _fn_min(args: list[float]) -> float:
    if len(args) < 2:
        raise SyntaxErr("min() takes at least two arguments")
    return min(args)


def _fn_max(args: list[float]) -> float:
    if len(args) < 2:
        raise SyntaxErr("max() takes at least two arguments")
    return max(args)


_FUNCTIONS = {
    "abs": _fn_abs,
    "sqrt": _fn_sqrt,
    "min": _fn_min,
    "max": _fn_max,
}


# --------------------------------------------------------------------------- #
# Tokeniser
# --------------------------------------------------------------------------- #
class _Token:
    __slots__ = ("kind", "value")

    def __init__(self, kind: str, value: object) -> None:
        self.kind = kind      # NUMBER, NAME, OP, LPAREN, RPAREN, COMMA
        self.value = value

    def __repr__(self) -> str:  # pragma: no cover - debugging aid
        return f"Token({self.kind!r}, {self.value!r})"


_OPERATORS = set("+-*/%^")


def _tokenize(expr: str) -> list[_Token]:
    tokens: list[_Token] = []
    i = 0
    n = len(expr)
    while i < n:
        ch = expr[i]

        if ch.isspace():
            i += 1
            continue

        if ch in _OPERATORS:
            tokens.append(_Token("OP", ch))
            i += 1
            continue

        if ch == "(":
            tokens.append(_Token("LPAREN", ch))
            i += 1
            continue

        if ch == ")":
            tokens.append(_Token("RPAREN", ch))
            i += 1
            continue

        if ch == ",":
            tokens.append(_Token("COMMA", ch))
            i += 1
            continue

        # Number: digits with an optional decimal point and optional exponent.
        if ch.isdigit() or ch == ".":
            j = i
            seen_dot = False
            while j < n and (expr[j].isdigit() or expr[j] == "."):
                if expr[j] == ".":
                    if seen_dot:
                        raise SyntaxErr(f"malformed number near {expr[i:j + 1]!r}")
                    seen_dot = True
                j += 1
            # Optional scientific-notation exponent.
            if j < n and expr[j] in "eE":
                k = j + 1
                if k < n and expr[k] in "+-":
                    k += 1
                if k >= n or not expr[k].isdigit():
                    raise SyntaxErr(f"malformed exponent near {expr[i:k + 1]!r}")
                while k < n and expr[k].isdigit():
                    k += 1
                j = k
            text = expr[i:j]
            if text == ".":
                raise SyntaxErr("a lone '.' is not a number")
            try:
                value = float(text)
            except ValueError:  # pragma: no cover - guarded above
                raise SyntaxErr(f"malformed number {text!r}")
            tokens.append(_Token("NUMBER", value))
            i = j
            continue

        # Identifier: variable, constant, or function name.
        if ch.isalpha() or ch == "_":
            j = i
            while j < n and (expr[j].isalnum() or expr[j] == "_"):
                j += 1
            tokens.append(_Token("NAME", expr[i:j]))
            i = j
            continue

        raise SyntaxErr(f"unexpected character {ch!r}")

    return tokens


# --------------------------------------------------------------------------- #
# Parser / evaluator (recursive descent)
# --------------------------------------------------------------------------- #
#
# Grammar (low to high precedence):
#
#   expr    := term  (('+' | '-') term)*
#   term    := unary (('*' | '/' | '%') unary)*
#   unary   := ('+' | '-') unary | power
#   power   := atom ('^' unary)?            # right-associative, RHS is unary
#   atom    := NUMBER
#            | NAME ('(' args ')')?         # constant / variable / call
#            | '(' expr ')'
#   args    := expr (',' expr)*
#
class _Parser:
    def __init__(self, tokens: list[_Token], variables: dict[str, float]) -> None:
        self._tokens = tokens
        self._pos = 0
        self._vars = variables

    # -- token helpers ----------------------------------------------------- #
    def _peek(self) -> _Token | None:
        if self._pos < len(self._tokens):
            return self._tokens[self._pos]
        return None

    def _advance(self) -> _Token:
        tok = self._tokens[self._pos]
        self._pos += 1
        return tok

    # -- entry point ------------------------------------------------------- #
    def parse(self) -> float:
        if not self._tokens:
            raise SyntaxErr("empty input")
        value = self._expr()
        if self._pos != len(self._tokens):
            tok = self._tokens[self._pos]
            raise SyntaxErr(f"unexpected token {tok.value!r}")
        return value

    # -- grammar rules ----------------------------------------------------- #
    def _expr(self) -> float:
        value = self._term()
        while True:
            tok = self._peek()
            if tok is not None and tok.kind == "OP" and tok.value in ("+", "-"):
                self._advance()
                rhs = self._term()
                value = value + rhs if tok.value == "+" else value - rhs
            else:
                return value

    def _term(self) -> float:
        value = self._unary()
        while True:
            tok = self._peek()
            if tok is not None and tok.kind == "OP" and tok.value in ("*", "/", "%"):
                self._advance()
                rhs = self._unary()
                if tok.value == "*":
                    value = value * rhs
                elif tok.value == "/":
                    if rhs == 0:
                        raise MathErr("division by zero")
                    value = value / rhs
                else:  # '%'
                    if rhs == 0:
                        raise MathErr("modulo by zero")
                    value = math.fmod(value, rhs)
            else:
                return value

    def _unary(self) -> float:
        tok = self._peek()
        if tok is not None and tok.kind == "OP" and tok.value in ("+", "-"):
            self._advance()
            operand = self._unary()
            return -operand if tok.value == "-" else operand
        return self._power()

    def _power(self) -> float:
        base = self._atom()
        tok = self._peek()
        if tok is not None and tok.kind == "OP" and tok.value == "^":
            self._advance()
            # Right-associative, and the exponent may carry its own unary sign,
            # so recurse into _unary (which reaches _power again).
            exponent = self._unary()
            try:
                return float(math.pow(base, exponent))
            except (ValueError, OverflowError) as exc:
                raise MathErr(f"invalid exponentiation: {exc}")
        return base

    def _atom(self) -> float:
        tok = self._peek()
        if tok is None:
            raise SyntaxErr("unexpected end of input")

        if tok.kind == "NUMBER":
            self._advance()
            return float(tok.value)

        if tok.kind == "LPAREN":
            self._advance()
            value = self._expr()
            closing = self._peek()
            if closing is None or closing.kind != "RPAREN":
                raise SyntaxErr("missing closing parenthesis")
            self._advance()
            return value

        if tok.kind == "NAME":
            self._advance()
            name = tok.value
            following = self._peek()
            if following is not None and following.kind == "LPAREN":
                return self._call(name)
            # Plain identifier: variable then constant.
            if name in self._vars:
                return float(self._vars[name])
            if name in _CONSTANTS:
                return _CONSTANTS[name]
            raise NameErr(f"unknown variable {name!r}")

        raise SyntaxErr(f"unexpected token {tok.value!r}")

    def _call(self, name: str) -> float:
        # Current token is the opening '('.
        self._advance()  # consume '('
        args: list[float] = []

        tok = self._peek()
        if tok is not None and tok.kind == "RPAREN":
            self._advance()  # empty argument list
        else:
            args.append(self._expr())
            while True:
                tok = self._peek()
                if tok is not None and tok.kind == "COMMA":
                    self._advance()
                    args.append(self._expr())
                elif tok is not None and tok.kind == "RPAREN":
                    self._advance()
                    break
                else:
                    raise SyntaxErr("malformed argument list")

        fn = _FUNCTIONS.get(name)
        if fn is None:
            raise NameErr(f"unknown function {name!r}")
        return float(fn(args))


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #
def evaluate(expr: str, variables: dict[str, float] | None = None) -> float:
    """Evaluate ``expr`` and return the result as a ``float``.

    ``variables`` maps identifier names to numeric values; it overrides the
    built-in constants ``pi`` and ``e``.
    """
    if not isinstance(expr, str):
        raise SyntaxErr("expression must be a string")

    merged: dict[str, float] = {}
    if variables:
        merged.update(variables)

    tokens = _tokenize(expr)
    parser = _Parser(tokens, merged)
    return float(parser.parse())
