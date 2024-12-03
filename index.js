// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const userId = event.target.dataset.userId; // Get user ID if editing
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  if (userId) {
    // If editing an existing user
    axios.put(`http://localhost:3000/user/add-user/${userId}`, userDetails)
      .then(response => {
        updateUserOnScreen(response.data);
      })
      .catch(error => console.log(error));
  } else {
    // If adding a new user
    axios.post("http://localhost:3000/user/add-user", userDetails)
      .then(response => {
        displayUserOnScreen(response.data);
      })
      .catch(error => console.log(error));
  }

  event.target.reset(); // Reset form after submission
  delete event.target.dataset.userId; // Clear userId
}

// Fetch all users on page load
window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/user/add-user")
    .then(response => {
      response.data.forEach(user => displayUserOnScreen(user));
    })
    .catch(error => console.log(error));
});

// Display a user on the screen
function displayUserOnScreen(user) {
  const userList = document.getElementById('userList');
  const userItem = document.createElement("li");
  userItem.setAttribute("data-id", user.id);
  userItem.innerHTML = `
    ${user.username} - ${user.email} - ${user.phone}
    <button onclick="deleteUser(${user.id})">Delete</button>
    <button onclick="editUser(${user.id}, '${user.username}', '${user.email}', '${user.phone}')">Edit</button>
  `;
  userList.appendChild(userItem);
}

// Delete a user from the screen and database
function deleteUser(userId) {
  axios.delete(`http://localhost:3000/user/add-user/${userId}`)
    .then(() => {
      removeUserFromScreen(userId);
    })
    .catch(error => console.log(error));
}

// Remove user from the screen
function removeUserFromScreen(userId) {
  const userItem = document.querySelector(`li[data-id='${userId}']`);
  userItem.remove();
}

// Update user on the screen
function updateUserOnScreen(user) {
  const userItem = document.querySelector(`li[data-id='${user.id}']`);
  userItem.innerHTML = `
    ${user.username} - ${user.email} - ${user.phone}
    <button onclick="deleteUser(${user.id})">Delete</button>
    <button onclick="editUser(${user.id}, '${user.username}', '${user.email}', '${user.phone}')">Edit</button>
  `;
}

// Pre-fill the form for editing a user
function editUser(userId, username, email, phone) {
  document.getElementById('username').value = username;
  document.getElementById('email').value = email;
  document.getElementById('phone').value = phone;
  document.getElementById('form').dataset.userId = userId;
}
