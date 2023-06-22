import sqlite3

def register_user(username, password):
    conn = sqlite3.connect('login_database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        cursor.close()
        conn.close()

def login(username, password):
    conn = sqlite3.connect('login_database.db')
    cursor = conn.cursor()

    try:
        cursor.execute('SELECT id FROM users WHERE username=? AND password=?', (username, password))
        user = cursor.fetchone()
        if user:
            user_id = user[0]
            cursor.execute('INSERT INTO login_credentials (user_id) VALUES (?)', (user_id,))
            conn.commit()
            return True
        else:
            return False
    finally:
        cursor.close()
        conn.close()

def get_login_history(username):
    conn = sqlite3.connect('login_database.db')
    cursor = conn.cursor()

    try:
        cursor.execute('''
            SELECT login_time
            FROM login_credentials
            INNER JOIN users ON login_credentials.user_id = users.id
            WHERE users.username=?
            ORDER BY login_time DESC
        ''', (username,))
        history = cursor.fetchall()
        return history
    finally:
        cursor.close()
        conn.close()

# Register a new user
register_user('john_doe', 'password123')

# Attempt to login with the credentials
login('john_doe', 'password123')

# Get the login history for the user
history = get_login_history('john_doe')
for login_time in history:
    print(login_time[0])