/* FEAST FORMULA JS */

const API_BASE = 'http://localhost:5001/api';

// --- ROUTER SYSTEM ---
function navigate(pageId) {
    // 1. Hide all pages
    document.querySelectorAll('.app-page').forEach(page => page.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // 2. Show active page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.remove('hidden');
        activePage.classList.add('animate-slide-up');
    }

    // 3. Highlight Nav
    const activeBtn = document.querySelector(`[onclick="navigate('${pageId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// --- AI HEALTH PREDICTION ---
async function predictHealth() {
    const btn = document.getElementById('predict-btn');
    const resultBox = document.getElementById('health-result');
    const resultText = document.getElementById('health-text');

    // Validate inputs
    const age = document.getElementById('age').value;
    const bmi = document.getElementById('bmi').value;

    if (!age || !bmi) {
        alert("Please fill in Age and BMI");
        return;
    }

    btn.innerText = "Analyzing Biometrics...";
    btn.disabled = true;
    resultBox.classList.add('hidden');

    try {
        const payload = {
            age: parseFloat(age),
            bmi: parseFloat(bmi),
            sugar: document.getElementById('sugar').value,
            exercise: document.getElementById('exercise').value
        };

        const res = await fetch(`${API_BASE}/predict-health`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        // Show Result
        resultBox.classList.remove('hidden');
        resultText.innerText = data.prediction;

        // Coloring
        if (data.prediction === 'Healthy') {
            resultText.style.color = '#10b981'; // Green
        } else {
            resultText.style.color = '#ef4444'; // Red
        }

    } catch (err) {
        console.error(err);
        resultBox.classList.remove('hidden');
        resultText.innerText = "Connection Error (Check Server)";
        resultText.style.color = '#f59e0b';
    } finally {
        btn.innerText = "Analyze Health Now";
        btn.disabled = false;
    }
}

// --- FRAUD DETECTION ---
function detectFraud() {
    const amount = document.getElementById('trans-amount').value;
    if (!amount) return;

    const loader = document.getElementById('fraud-loader');
    const result = document.getElementById('fraud-result');

    loader.classList.remove('hidden');
    result.className = 'hidden';

    // Simulated API delay
    setTimeout(() => {
        loader.classList.add('hidden');
        result.classList.remove('hidden');

        const val = parseFloat(amount);
        if (val > 25000) {
            result.className = 'fraud-warning';
            result.innerHTML = `<span>🚨 TRANSACTION BLOCKED</span> Possible Fraud Detected (High Value: ₹${val})`;
        } else {
            result.className = 'fraud-safe';
            result.innerHTML = `<span>✅ SAFE TRANSACTION</span> Payment of ₹${val} Approved`;
        }
    }, 1500);
}

// --- CART LOGIC ---
let cart = [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    updateCartIcon();
    showToast(`Added ${name} to cart`);
}

function updateCartIcon() {
    document.getElementById('cart-count').innerText = cart.length;
}

function showToast(msg) {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; 
        background: #333; color: white; padding: 12px 24px; 
        border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 10000; animation: slideUp 0.3s;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// --- CHECKOUT LOGIC ---
async function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    try {
        const res = await fetch(`${API_BASE}/place-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart, total: total })
        });

        if (res.status === 401) {
            alert("Please Login to Order!");
            window.location.href = '/auth/login';
            return;
        }

        const data = await res.json();
        if (data.status === 'Order Placed') {
            alert(`✅ Order Placed Successfully! Order ID: ${data.order_id}`);
            cart = [];
            updateCartIcon();
            toggleCart();
        } else {
            alert("Order Failed: " + data.error);
        }

    } catch (err) {
        console.error(err);
        alert("Server Error");
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navigate('home'); // Load Home by defaults
});
