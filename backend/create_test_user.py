import os
import mysql.connector

host = os.environ.get('EUTELIA_DB_HOST', '127.0.0.1')
port = int(os.environ.get('EUTELIA_DB_PORT', '3307'))
user = os.environ.get('EUTELIA_DB_USER', 'root')
password = os.environ.get('EUTELIA_DB_PASSWORD', '')
database = os.environ.get('EUTELIA_DB_NAME', 'hotel_billing')

conn = mysql.connector.connect(host=host, port=port, user=user, password=password, database=database, autocommit=True)
cursor = conn.cursor(dictionary=True)

try:
    cursor.execute("SELECT COUNT(*) AS cnt FROM users WHERE email = %s", ('test@hotel.com',))
    exists = cursor.fetchone()['cnt']
    if exists:
        print('ACCOUNT_EXISTS')
    else:
        cursor.execute(
            "INSERT INTO users (first_name, last_name, email, password_hash, role, account_status) VALUES (%s, %s, %s, %s, %s, %s)",
            ('Test', 'User', 'test@hotel.com', 'password', 'admin', 'active')
        )
        print('ACCOUNT_CREATED')
finally:
    cursor.close()
    conn.close()
