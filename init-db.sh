#!/bin/bash
# Wait for the database to be ready
echo "Waiting for database to be ready..."
until mysqladmin ping -h "localhost" --silent; do
  sleep 2
done

echo "Database is ready. Running initialization script..."

# Execute the SQL script
mysql -u root -p${MYSQL_ROOT_PASSWORD} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/init-db.sql

echo "Database initialization completed."
