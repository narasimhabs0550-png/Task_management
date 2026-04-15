# 🚀 REAL PASSWORD RESET FLOW (DEMO)
import secrets
import datetime
reset_tokens = {}  # In-memory token store for demo only


print("🔥 THIS FILE IS RUNNING 🔥")
import mysql.connector
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'super-secret-key'
jwt = JWTManager(app)

# ✅ DB CONNECTION
def get_db_connection():
    conn = mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='root123'
    )
    conn.database = 'taskdb'
    return conn


@app.route('/force')
def force():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES ('force@gmail.com', '123')")
    conn.commit()
    cursor.close()
    conn.close()
    return "Inserted"


# 🚀 REGISTER
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'msg': 'Username and password required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if user exists
    cursor.execute('SELECT id FROM users WHERE username=%s', (username,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'msg': 'User already exists'}), 409

    # 🔐 Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert user
    cursor.execute(
        'INSERT INTO users (username, password) VALUES (%s, %s)',
        (username, hashed_password.decode('utf-8'))
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'msg': 'User registered successfully'}), 201


# 🚀 LOGIN
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'msg': 'Username and password required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT password FROM users WHERE username=%s', (username,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({'msg': 'Invalid credentials'}), 401

    stored_password = user[0]

    # 🔐 Check password
    if not bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        return jsonify({'msg': 'Invalid credentials'}), 401

    # Generate token
    access_token = create_access_token(identity=username)

    return jsonify({'access_token': access_token}), 200


# 🚀 FORGOT PASSWORD (DUMMY)
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'msg': 'Email required'}), 400

    # In a real app, generate a token and send email here
    return jsonify({'msg': 'If this email exists, a reset link has been sent.'}), 200


# 🔐 PROTECTED ROUTE
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'msg': f'Hello, {current_user}! This is a protected route.'})



 # 🚀 DASHBOARD SUMMARY ENDPOINT
@app.route('/dashboard-summary', methods=['GET'])
@jwt_required()
def dashboard_summary():
    user = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()
    # Total tasks
    cursor.execute("SELECT COUNT(*) FROM tasks WHERE user=%s", (user,))
    total = cursor.fetchone()[0]
    # Completed tasks
    cursor.execute("SELECT COUNT(*) FROM tasks WHERE user=%s AND status='Completed'", (user,))
    completed = cursor.fetchone()[0]
    # Pending tasks (Pending or In Progress)
    cursor.execute("SELECT COUNT(*) FROM tasks WHERE user=%s AND (status='Pending' OR status='In Progress')", (user,))
    pending = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return jsonify({
        'totalTasks': total,
        'completedTasks': completed,
        'pendingTasks': pending
    }), 200

# 🚀 TASKS CRUD (MySQL + JWT)
@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, description, status FROM tasks WHERE user=%s", (user,))
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    result = [
        {"id": t[0], "title": t[1], "description": t[2], "status": t[3]} for t in tasks
    ]
    return jsonify(result), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user = get_jwt_identity()
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    status = data.get('status', 'Pending')
    if not title or not description:
        return jsonify({'msg': 'Title and description required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (title, description, status, user) VALUES (%s, %s, %s, %s)",
        (title, description, status, user)
    )
    conn.commit()
    task_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'id': task_id, 'title': title, 'description': description, 'status': status}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    user = get_jwt_identity()
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    status = data.get('status')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM tasks WHERE id=%s AND user=%s", (id, user))
    if not cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'msg': 'Task not found'}), 404
    cursor.execute(
        "UPDATE tasks SET title=%s, description=%s, status=%s WHERE id=%s AND user=%s",
        (title, description, status, id, user)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Task updated'}), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    user = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM tasks WHERE id=%s AND user=%s", (id, user))
    if not cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'msg': 'Task not found'}), 404
    cursor.execute("DELETE FROM tasks WHERE id=%s AND user=%s", (id, user))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Task deleted'}), 200



# 🚀 PROFILE ENDPOINTS
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT username, name, joined FROM users WHERE username=%s", (user,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if not row:
        return jsonify({'msg': 'User not found'}), 404
    return jsonify({
        'email': row[0],
        'name': row[1] or '',
        'joined': row[2].strftime('%Y-%m-%d') if row[2] else ''
    }), 200

@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user = get_jwt_identity()
    data = request.get_json()
    name = data.get('name')
    if not name or len(name) < 2:
        return jsonify({'msg': 'Name must be at least 2 characters.'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET name=%s WHERE username=%s", (name, user))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Profile updated successfully.'}), 200

@app.route('/profile/password', methods=['PUT'])
@jwt_required()
def change_password():
    user = get_jwt_identity()
    data = request.get_json()
    current_pwd = data.get('currentPwd')
    new_pwd = data.get('newPwd')
    if not current_pwd or not new_pwd or len(new_pwd) < 6:
        return jsonify({'msg': 'Invalid password data.'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username=%s", (user,))
    row = cursor.fetchone()
    if not row or not bcrypt.checkpw(current_pwd.encode('utf-8'), row[0].encode('utf-8')):
        cursor.close()
        conn.close()
        return jsonify({'msg': 'Current password is incorrect.'}), 400
    hashed = bcrypt.hashpw(new_pwd.encode('utf-8'), bcrypt.gensalt())
    cursor.execute("UPDATE users SET password=%s WHERE username=%s", (hashed.decode('utf-8'), user))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Password updated successfully.'}), 200


# Request password reset (send email with token)
@app.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'msg': 'Email required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE username=%s', (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        return jsonify({'msg': 'If this email exists, a reset link has been sent.'}), 200
    # Generate token
    token = secrets.token_urlsafe(32)
    # Store token with expiry (15 min)
    reset_tokens[token] = {'email': email, 'expires': datetime.datetime.utcnow() + datetime.timedelta(minutes=15)}
    # In real app, send email with link: http://localhost:5000/reset-password?token=...
    print(f"[DEBUG] Password reset link: http://localhost:5173/reset-password?token={token}")
    return jsonify({'msg': 'If this email exists, a reset link has been sent.'}), 200

# Reset password with token
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_pwd = data.get('newPwd')
    if not token or not new_pwd or len(new_pwd) < 6:
        return jsonify({'msg': 'Invalid request.'}), 400
    info = reset_tokens.get(token)
    if not info or info['expires'] < datetime.datetime.utcnow():
        return jsonify({'msg': 'Reset link expired or invalid.'}), 400
    email = info['email']
    conn = get_db_connection()
    cursor = conn.cursor()
    hashed = bcrypt.hashpw(new_pwd.encode('utf-8'), bcrypt.gensalt())
    cursor.execute('UPDATE users SET password=%s WHERE username=%s', (hashed.decode('utf-8'), email))
    conn.commit()
    cursor.close()
    conn.close()
    del reset_tokens[token]
    return jsonify({'msg': 'Password reset successful.'}), 200




# 🚀 RUN SERVER
if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    