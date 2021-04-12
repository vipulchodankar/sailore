import os
import mariadb
from dotenv import load_dotenv

load_dotenv()

conn = mariadb.connect(
    host=os.environ.get("DB_HOST"),
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASSWORD"),
    database=os.environ.get("DB_DATABASE"),
    max_size=int(os.environ.get("DB_CONNECTION_LIMIT"))
)

cur = conn.cursor()
