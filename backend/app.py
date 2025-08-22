from flask import Flask, jsonify
import oracledb
import config

app = Flask(__name__)

# Configure Oracle DB connection
def get_connection():
    return oracledb.connect(
        user=config.DB_USER,
        password=config.DB_PASSWORD,
        dsn=config.DB_DSN
    )

@app.route("/")
def home():
    return "Backend is running!"


if __name__ == "__main__":
    app.run(debug=True)
