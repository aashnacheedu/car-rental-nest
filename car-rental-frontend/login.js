document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // If login is successful, redirect to the dashboard
          alert('Login successful!');
          window.location.href = '/dashboard.html';  // Make sure the path is correct
        } else {
          document.getElementById('login-error').textContent = data.message || 'Login failed';
        }
      } catch (error) {
        document.getElementById('login-error').textContent = 'Something went wrong.';
      }
    });
  }
});
