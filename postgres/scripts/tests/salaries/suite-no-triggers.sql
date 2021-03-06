\! echo "--- TESTING SALARY-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
ALTER TABLE salaries DISABLE TRIGGER all;
-- gotta have this one, though
ALTER TABLE salaries ENABLE TRIGGER enforce_location_format;
\i ./server/sql/tests/salaries/acceptance.sql;
\i ./server/sql/tests/salaries/invalid-args.sql;
ALTER TABLE salaries ENABLE TRIGGER all;
