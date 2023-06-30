from flask import Flask, render_template, request, g
import sqlite3

app = Flask(__name__)

DATABASE = 'logins.db'

# Function to get the database connection
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

# Create the logins table
def create_table():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS logins (
                        username TEXT PRIMARY KEY,
                        password TEXT NOT NULL
                    )''')

# Initialize the database
@app.before_first_request
def before_first_request():
    create_table()
    
@app.route("/")
def index():
    return render_template("signup.html")

# Route for the sign-up page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        insert_login(username, password)
        return 'Sign-up successful!'
    return render_template('signup.html')

# Function to insert a new login
def insert_login(username, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO logins (username, password) VALUES (?, ?)", (username, password))
    conn.commit()

# Close the database connection
@app.teardown_appcontext
def teardown_appcontext(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.run()
