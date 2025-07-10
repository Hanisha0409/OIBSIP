let users = [];
let currentUser = null;

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleForm = document.getElementById('toggleForm');
const formTitle = document.getElementById('formTitle');
const message = document.getElementById('message');
const welcomeScreen = document.getElementById('welcomeScreen');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

function showMessage(msg, type = 'success') {
  message.textContent = msg;
  message.className = `message ${type}`;
  setTimeout(() => {
    message.textContent = '';
    message.className = 'message';
  }, 3000);
}

function clearForms() {
  loginForm.reset();
  registerForm.reset();
  document.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
}

toggleForm.onclick = () => {
  const isLogin = loginForm.classList.contains('active');
  loginForm.classList.toggle('active');
  registerForm.classList.toggle('active');
  formTitle.textContent = isLogin ? 'Create Account' : 'Welcome Back';
  toggleForm.innerHTML = isLogin
    ? 'Already have an account? <span>Sign in here</span>'
    : 'Don\'t have an account? <span>Sign up here</span>';
  clearForms();
};

registerForm.onsubmit = e => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;

  if (!username || !password || !confirm) return showMessage('Fill all fields', 'error');
  if (password !== confirm) return showMessage('Passwords do not match', 'error');
  if (users.find(u => u.username === username.toLowerCase())) return showMessage('Username already exists', 'error');

  users.push({
    username: username.toLowerCase(),
    password,
    registeredAt: new Date().toLocaleString()
  });
  showMessage('Registered successfully. Now log in!');
  clearForms();
  toggleForm.click();
};

loginForm.onsubmit = e => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const user = users.find(u => u.username === username.toLowerCase() && u.password === password);
  if (!user) return showMessage('Invalid username or password', 'error');
  currentUser = user;
  showDashboard();
};

function showDashboard() {
  document.querySelector('.form-container').style.display = 'none';
  welcomeScreen.classList.add('active');
  userInfo.innerHTML = `
    <p>👤 Logged in as: <strong>${currentUser.username}</strong></p>
    <p style="font-size:14px;">Created at: ${currentUser.registeredAt}</p>
  `;
}

logoutBtn.onclick = () => {
  currentUser = null;
  welcomeScreen.classList.remove('active');
  document.querySelector('.form-container').style.display = 'block';
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  formTitle.textContent = 'Welcome Back';
  toggleForm.innerHTML = 'Don\'t have an account? <span>Sign up here</span>';
  clearForms();
};

function togglePassword(inputId, checkboxId) {
  const input = document.getElementById(inputId);
  const checkbox = document.getElementById(checkboxId);
  input.type = checkbox.checked ? 'text' : 'password';
}
