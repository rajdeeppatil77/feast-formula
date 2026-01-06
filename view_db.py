import sqlite3
import os

# Path to the database
DB_PATH = 'instance/feast_formula.db'

def view_db():
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("=== 🗃️ FEAST FORMULA DATABASE VIEW ===\n")

    # 1. Users
    print("--- 👤 USERS ---")
    try:
        cursor.execute("SELECT id, username, email, role FROM user")
        users = cursor.fetchall()
        for u in users:
            print(f"ID: {u[0]} | User: {u[1]} | Email: {u[2]} | Role: {u[3]}")
    except Exception as e:
        print(f"Error reading users: {e}")
    print("\n")

    # 2. Restaurants
    print("--- 🏠 RESTAURANTS ---")
    try:
        cursor.execute("SELECT id, name, cuisine, is_verified FROM restaurant")
        rests = cursor.fetchall()
        for r in rests:
            print(f"ID: {r[0]} | Name: {r[1]} | Cuisine: {r[2]} | Verified: {r[3]}")
    except Exception as e:
        print(f"Error reading restaurants: {e}")
    print("\n")

    # 3. Menu Items (Sample)
    print("--- 🍲 MENU ITEMS (Top 5) ---")
    try:
        cursor.execute("SELECT id, name, price, calories, protein FROM menu_item LIMIT 5")
        items = cursor.fetchall()
        for i in items:
            print(f"ID: {i[0]} | {i[1]} | ₹{i[2]} | {i[3]} cal | {i[4]}g Protein")
    except Exception as e:
        print(f"Error reading menu: {e}")
    print("\n")

    # 4. Orders
    print("--- 🧾 ORDERS ---")
    try:
        # SQLAlchemy creates table 'order' (or similar). Quoting it handles reserved keywords.
        cursor.execute('SELECT id, user_id, total_amount, status FROM "order"')
        orders = cursor.fetchall()
        if not orders:
            print("No orders yet.")
        for o in orders:
            print(f"Order #{o[0]} | User ID: {o[1]} | Total: ₹{o[2]} | Status: {o[3]}")
    except Exception as e:
        print(f"Error reading orders: {e}")

    conn.close()

if __name__ == "__main__":
    view_db()
