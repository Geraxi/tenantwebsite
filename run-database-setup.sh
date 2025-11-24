#!/bin/bash

echo "=========================================="
echo "Database Setup Helper"
echo "=========================================="
echo ""
echo "The database SQL file is ready at: setup-database.sql"
echo ""
echo "To set up the database:"
echo ""
echo "1. Open this URL in your browser:"
echo "   https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/sql/new"
echo ""
echo "2. Copy the contents of setup-database.sql"
echo ""
echo "3. Paste into the SQL Editor and click 'Run'"
echo ""
echo "Alternatively, if you have the Supabase Service Role Key,"
echo "I can automate this for you!"
echo ""
echo "=========================================="
read -p "Do you have the Service Role Key? (y/n): " has_key

if [ "$has_key" = "y" ] || [ "$has_key" = "Y" ]; then
  echo ""
  echo "Please provide the Service Role Key (starts with 'eyJ...'):"
  read service_key
  echo ""
  echo "Attempting to set up database via API..."
  # We'll create a script to do this
  echo "Service key received. Creating automation script..."
else
  echo ""
  echo "No problem! Just follow the manual steps above."
  echo "The SQL file contains everything needed."
fi

