export PATH="/Library/PostgreSQL/15/bin:${PATH}"
initdb -D Database
pg_ctl -D Database -l logfile start 
createuser --superuser postgres
psql -d postgres -a -f CreateDatabase.sql
npm init -y
npm i express pg cors
open http://localhost:3000/home.html
node index.js