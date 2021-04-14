import os
import mariadb
from dotenv import load_dotenv

load_dotenv()
pool = None
try:
    conn = mariadb.connect(
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
        host=os.environ.get("DB_HOST"),
        port=int(os.environ.get("DB_PORT")),
        database=os.environ.get("DB_DATABASE"),
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
