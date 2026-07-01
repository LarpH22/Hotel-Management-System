import bcrypt
from flask import Blueprint, request, jsonify

try:
    from .auth_routes import token_required
    from ..db import get_connection
except ImportError:
    from routes.auth_routes import token_required
    from db import get_connection

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/', methods=['GET'])
@token_required
def list_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        '''
        SELECT user_id, first_name, last_name, email, role, account_status
        FROM users
        ORDER BY created_at DESC
        '''
    )
    users = [
        {
            'id': user['user_id'],
            'name': f"{user['first_name']} {user['last_name']}",
            'email': user['email'],
            'role': user['role'],
            'account_status': user['account_status'],
        }
        for user in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return jsonify(users)


@user_bp.route('/', methods=['POST'])
@token_required
def create_user():
    payload = request.json or {}
    name = payload.get('name')
    email = payload.get('email')
    role = payload.get('role', 'admin')
    password = payload.get('password', 'password')

    if not name or not email:
        return jsonify({'message': 'Name and email are required'}), 400

    conn = get_connection()
    cursor = conn.cursor()
    first_name, last_name = split_name(name)
    cursor.execute(
        '''
        INSERT INTO users (first_name, last_name, email, password_hash, role, account_status)
        VALUES (%s, %s, %s, %s, %s, %s)
        ''',
        (first_name, last_name, email, hash_password(password), role, 'active')
    )
    conn.close()
    return jsonify({'message': 'User created successfully'}), 201


def split_name(name):
    parts = name.strip().split(None, 1)
    if len(parts) == 1:
        return parts[0], parts[0]
    return parts[0], parts[1]


def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
