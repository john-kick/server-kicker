#!/bin/bash
echo "Running custom initialization script..."

# Set the MySQL root password to avoid interactive prompt
export MYSQL_PWD="${MYSQL_ROOT_PASSWORD}"

# Execute the SQL script
mariadb -u root "${MYSQL_DATABASE}" < /docker-entrypoint-initdb.d/init-db.sql

# Unset the MySQL password for security
unset MYSQL_PWD

echo "Custom initialization script completed."
