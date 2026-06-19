"""Unit tests for :mod:`evaluator` (stdlib ``unittest`` only)."""

import math
import unittest

from evaluator import EvalError, MathErr, NameErr, SyntaxErr, evaluate


class ConformanceTests(unittest.TestCase):
    """Every case from the task's conformance table."""

    def test_precedence(self):
        self.assertEqual(evaluate("1 + 2 * 3"), 7.0)

    def test_parentheses(self):
        self.assertEqual(evaluate("(1 + 2) * 3"), 9.0)

    def test_power_right_associative(self):
        self.assertEqual(evaluate("2 ^ 3 ^ 2"), 512.0)

    def test_unary_minus_vs_power(self):
        self.assertEqual(evaluate("-2 ^ 2"), -4.0)

    def test_division_returns_float(self):
        self.assertEqual(evaluate("10 / 4"), 2.5)

    def test_float_modulo(self):
        self.assertEqual(evaluate("5.5 % 2"), 1.5)

    def test_constant_pi(self):
        self.assertAlmostEqual(evaluate("2 * pi"), 2 * math.pi, places=9)

    def test_variables(self):
        self.assertEqual(evaluate("x * y + 1", {"x": 3, "y": 4}), 13.0)

    def test_min_max(self):
        self.assertEqual(evaluate("max(1, 2, 3) + min(4, 5)"), 7.0)

    def test_nested_functions(self):
        self.assertEqual(evaluate("sqrt(abs(-9))"), 3.0)

    def test_scientific_and_leading_dot(self):
        self.assertEqual(evaluate("1e3 + .5"), 1000.5)

    def test_division_by_zero(self):
        with self.assertRaises(MathErr):
            evaluate("1 / 0")

    def test_sqrt_negative(self):
        with self.assertRaises(MathErr):
            evaluate("sqrt(-1)")

    def test_unknown_variable(self):
        with self.assertRaises(NameErr):
            evaluate("foo + 1")

    def test_unknown_function(self):
        with self.assertRaises(NameErr):
            evaluate("bar(2)")

    def test_unbalanced_parens(self):
        with self.assertRaises(SyntaxErr):
            evaluate("(1 + 2")

    def test_trailing_operator(self):
        with self.assertRaises(SyntaxErr):
            evaluate("3 +")

    def test_empty_input(self):
        with self.assertRaises(SyntaxErr):
            evaluate("")

    def test_min_too_few_args(self):
        with self.assertRaises(SyntaxErr):
            evaluate("min(1)")


class EdgeCaseTests(unittest.TestCase):
    """Additional cases that exercise corners of the spec."""

    def test_trailing_decimal_point_number(self):
        # "10." is a valid number per the grammar.
        self.assertEqual(evaluate("10."), 10.0)

    def test_modulo_by_zero_is_matherr(self):
        with self.assertRaises(MathErr):
            evaluate("5 % 0")

    def test_whitespace_is_insignificant(self):
        self.assertEqual(evaluate("  \t 1+\n2 *3 "), 7.0)

    def test_variables_override_constants(self):
        # pi can be overridden by the supplied variables dict.
        self.assertEqual(evaluate("pi", {"pi": 10}), 10.0)

    def test_unary_chain(self):
        self.assertEqual(evaluate("--3"), 3.0)
        self.assertEqual(evaluate("-+-3"), 3.0)

    def test_negative_exponent_in_power(self):
        # Right side of '^' may carry its own unary sign.
        self.assertEqual(evaluate("2 ^ -1"), 0.5)

    def test_deeply_nested_parens(self):
        self.assertEqual(evaluate("((((5))))"), 5.0)

    def test_scientific_notation_uppercase(self):
        self.assertAlmostEqual(evaluate("2.5E-2"), 0.025, places=12)

    def test_unexpected_character(self):
        with self.assertRaises(SyntaxErr):
            evaluate("1 $ 2")

    def test_double_operator_is_syntax_error(self):
        with self.assertRaises(SyntaxErr):
            evaluate("1 * * 2")

    def test_malformed_number_two_dots(self):
        with self.assertRaises(SyntaxErr):
            evaluate("1.2.3")

    def test_all_errors_share_base_class(self):
        for expr in ("1 / 0", "foo", "(1"):
            with self.assertRaises(EvalError):
                evaluate(expr)


if __name__ == "__main__":
    unittest.main()
