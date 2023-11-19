from dotenv import load_dotenv
import os
load_dotenv()
import mysql.connector

print(os.getenv("DB_USERNAME"))
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'sensors',
}
connection = mysql.connector.connect(**db_config)

cursor = connection.cursor()

try:

    query = "SELECT * FROM sensors;"
    cursor.execute(query)

    # Fetch all the rows
    rows = cursor.fetchall()

    # Process the results
    # for row in rows:
        # print(row)

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    # Close the cursor and connection
    cursor.close()
    connection.close()