import { Pool } from 'pg';

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "galaguru",
});

export default pool;

