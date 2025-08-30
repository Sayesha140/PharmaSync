from flask import Flask
import oracledb
import config
from flask_cors import CORS
from datetime import timedelta
from routes.medicine_routes import medicine_bp
from routes.supplier_routes import supplier_bp
from routes.purchase_routes import purchase_bp
from routes.inventory_routes import inventory_bp
from routes.alerts_routes import alerts_bp
from routes.stats_routes import stats_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.secret_key = config.SECRET_KEY

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

CORS(app, supports_credentials=True)


app.register_blueprint(medicine_bp)
app.register_blueprint(supplier_bp)
app.register_blueprint(alerts_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(purchase_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(auth_bp)



@app.route("/")
def home():
    return "Backend is running!"



if __name__ == "__main__":
    app.run(debug=True)
