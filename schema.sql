-- D1 schema for fuxed.org submissions + newsletter signups.
-- Apply: wrangler d1 execute fuxed-submissions --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  wasnt      TEXT,
  fix        TEXT,
  result     TEXT,
  sources    TEXT,
  email      TEXT,
  newsletter TEXT,
  ip         TEXT,
  ua         TEXT,
  status     TEXT DEFAULT 'new'   -- new | queued | published | rejected
);
CREATE TABLE IF NOT EXISTS subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  email      TEXT,
  ip         TEXT
);
