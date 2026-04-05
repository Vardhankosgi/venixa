require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrate() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error) {
      console.error(`Migration ${file} failed:`, error.message);
      console.log('Tip: Run the SQL files directly in Supabase SQL Editor for best results.');
      process.exit(1);
    }
    console.log(`✅ ${file} completed`);
  }
  console.log('All migrations completed!');
}

migrate();
