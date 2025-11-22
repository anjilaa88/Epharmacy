// === DEMO MEDICINES ===
const medicines = [
  { name: "Paracetamol 500mg", price: 25, available: true, image: "paracetamol.webp" },
  { name: "Cough Syrup 100ml", price: 90, available: true, image: "coughSyrup.jpeg" },
  { name: "Antacid Tablets", price: 40, available: false, image: "antacids.jpeg" },
  { name: "Vitamin C Capsules", price: 120, available: true, image: "vitaminc.webp" },
  { name: "Ibuprofen 200mg", price: 55, available: true, image: "ibuprofen.jpg" },
  { name: "Amoxicillin 250mg", price: 65, available: false, image: "Amoxicillin.webp" },
  { name: "Pain Relief Balm", price: 80, available: true, image: "painReliefBalm.jpeg" }
];

// === CART SYSTEM ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(medicineName) {

  // If logged in, proceed with adding to cart
  const med = medicines.find(m => m.name === medicineName);
  if (!med || !med.available) return;

  cart.push(med);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${med.name} added to cart!`);

  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cartContainer");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item.name} - Rs. ${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartContainer.innerHTML += `<p><strong>Total: Rs. ${total}</strong></p>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`✅ Order placed successfully!\nTotal Amount: Rs. ${total}\nThank you for shopping with MeroPharma.`);

  // Clear cart after order
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
}



// --- MEDICINE DISPLAY LOGIC ---
function displayMedicines(list) {
  const medicineList = document.getElementById("medicineList");
  if (!medicineList) return; // Exit if the element isn't found
  
  medicineList.innerHTML = list.map(med => `
    <div class="medicine-card">
      <img src="${med.image}" alt="${med.name}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:10px;">
      <h3>${med.name}</h3>
      <p>Price: <span class="price">Rs. ${med.price}</span></p>
      <p>Status: ${med.available ? '<span style="color:#00ff99">Available</span>' : '<span style="color:#ff6666">Out of Stock</span>'}</p>
<button onclick="addToCart('${med.name}')" ${!med.available ? "disabled" : ""}>Add to Cart</button>
    </div>
  `).join("");
}

function searchMedicine() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  displayMedicines(medicines.filter(med => med.name.toLowerCase().includes(input)));
}


// --- LOGIN SYSTEM (DEMO) ---

// Get necessary element references for login/register forms
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const registerStatus = document.getElementById('registerStatus');
const registerForm = document.getElementById('registerForm');

const username = document.getElementById('username');
const password = document.getElementById('password');
const loginStatus = document.getElementById('loginStatus');

const loginLink = document.getElementById('loginLink');
const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const showLoginBtn = document.getElementById('showLoginBtn');


function registerUser(e) {
  e.preventDefault();
  const u = regUsername.value.trim(), p = regPassword.value, s = registerStatus;
  if (!u || !p) return s.textContent = 'Please enter a username and password.';
  if (localStorage.getItem('user_' + u)) return s.textContent = 'Username already exists. Choose another.';
  localStorage.setItem('user_' + u, p);
  s.textContent = 'Registration successful! You can now login.';
  registerForm.reset();
}

function loginUser(e) {
  e.preventDefault();
 const u = username.value.trim();
  const p = password.value;
  const stored = localStorage.getItem('user_' + u);

  if (stored && stored === p) {
    loginStatus.textContent = '✅ Login Successful! Welcome, ' + u;
    loginStatus.style.color = "#00c2a8";

    // Save login state
    localStorage.setItem("loggedInUser", u);

    // Hide login box
    document.querySelector('.hero-login-container').style.display = "none";

    // Optionally show shop/cart
    document.getElementById("shop").style.display = "block";
    document.getElementById("cart").style.display = "block";
  } else {
    loginStatus.textContent = '❌ Invalid credentials or user not registered.';
    loginStatus.style.color = "#ff6666";
  }
}

// --- PRESCRIPTION UPLOAD ---
const prescriptionInput = document.getElementById('prescriptionInput');
const previewContainer = document.getElementById('previewContainer');

function previewPrescription() {
  const file = prescriptionInput.files[0], preview = previewContainer;
  preview.innerHTML = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = e.target.result;
      // Add styling to make the preview image look decent
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = '10px';
      img.style.marginTop = '15px';
      preview.appendChild(img);
    } else {
      preview.innerHTML = `<p>Uploaded: ${file.name}</p>`;
    }
  };
  reader.readAsDataURL(file);
}

// --- CONSULTATION ---
function bookConsultation(doctor) {
  alert('Consultation booked with ' +doctor);
}


// === INITIALIZATION & EVENT LISTENERS ===

// Wait for the entire page to load before running the main logic
document.addEventListener('DOMContentLoaded', () => {
  displayMedicines(medicines);
  displayCart();
});
    
    if (loginLink && loginBox && registerBox) {
        loginLink.addEventListener('click', e => {
            e.preventDefault();
            const c = document.querySelector('.hero-login-container');
            // Toggle visibility
            c.style.display = c.style.display === 'block' ? 'none' : 'block';
            if (c.style.display === 'block') {
              loginBox.style.display = 'block';
              registerBox.style.display = 'none';
            }
        });
    }

    if (showRegisterBtn && loginBox && registerBox) {
        showRegisterBtn.addEventListener('click', () => {
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });
    }

    if (showLoginBtn && loginBox && registerBox) {
        showLoginBtn.addEventListener('click', () => {
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        });
    }
