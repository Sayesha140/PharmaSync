from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from functools import wraps
import config

auth_bp = Blueprint("auth", __name__)


# ------------------------- LOGIN ROUTE -------------------------


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    remember = data.get("remember", False)  

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if username == config.ADMIN_USERNAME and check_password_hash(config.ADMIN_PASSWORD_HASH, password):
        session["admin"] = True
        session.permanent = bool(remember)  
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid username or password"}), 401




# ------------------------- LOGOUT ROUTE -------------------------


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("admin", None)
    return jsonify({"message": "Logged out"}), 200



# ------------------------- ADMIN REQUIRED  -------------------------

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get("admin"):
            return jsonify({"error": "Unauthorized"}), 403
        return f(*args, **kwargs)
    return decorated_function
