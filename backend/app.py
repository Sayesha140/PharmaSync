from flask import Flask, jsonify
import oracledb
import config
from routes.medicine_routes import medicine_bp
from routes.supplier_routes import supplier_bp

app = Flask(__name__)

app.register_blueprint(medicine_bp)
app.register_blueprint(supplier_bp)


@app.route("/")
def home():
    return "Backend is running!"



if __name__ == "__main__":
    app.run(debug=True)
