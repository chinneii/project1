let welcomeText = document.getElementById("welcomeUser");

function logIn() {
    let usernameRef = document.getElementById("login_username");
    let inputUsername = usernameRef.value;
    let passwordRef = document.getElementById("login_password");
    let inputPassword = passwordRef.value;
  
    // All validations
    // Checking if inputs are empty
    if (inputUsername === "") {
      alert("Please fill in your username.");
    }
    else if (inputPassword === "") {
      alert("Please fill in your password.");
    }
    // Checking if inputs include spaces
    else if (inputUsername.includes(" ")) {
      alert("Username entered should not include spaces.");
    }
    else if (inputPassword.includes(" ")) {
      alert("Password entered should not include spaces.");
    }
    else {
      let usernameIndex = userList.users.findIndex(x => x.username == inputUsername);
      if (userList.users[usernameIndex] === undefined)
      {
        alert("User does not exist.");
      }
      else if (userList.users[usernameIndex].password == inputPassword) {
        updateLocalStorage(USER_INDEX_KEY, usernameIndex);
        alert("Log in successful.");
        window.location = "home.html";
      }
      else {
        alert("Sorry, your password was incorrect. Please double-check again.");
      }
    }
  }


  function signUp() {
    // Retrieving input from user
    let usernameRef = document.getElementById("signUp_username");
    let inputUsername = usernameRef.value;
    let passwordRef = document.getElementById("signUp_password");
    let inputPassword = passwordRef.value;
    let confirmPasswordRef = document.getElementById("signUp_password2");
    let inputConfirmPassword = confirmPasswordRef.value;
  
    // All validations
    // Checking if inputs are empty
    if (inputUsername === "") {
      alert("Please fill in your username.");
    }
    else if (inputPassword === "" || inputConfirmPassword === "") {
      alert("Please fill in your password.");
    }
    // Checking if inputs include spaces
    else if (inputUsername.includes(" ")) {
      alert("Username should not include spaces.");
    }
    else if (inputPassword.includes(" ") || inputConfirmPassword.includes(" ")) {
      alert("Password should not include spaces.");
    }
    // Checking if password meets requirements
    else if (inputPassword.length < 8 || inputConfirmPassword < 8) {
      alert("Password must have at least 8 characters.");
    }
    else if (inputPassword !== inputConfirmPassword) {
      alert("Passwords entered do not match.");
    }
    else {
      // Checking if username already exist
      for (let i = 0; i < userList.count; i++) {
        let user = userList.users[i];
        if (inputUsername === user.username) {
          alert("Sorry, the username already exists.");
          return true; // break out of function
        }
      }
      // Assigning an id to each account
      let newID = 0;
      if (userList.count === 0) {
        newID = 1;
      }
      else {
        // Getting last id and incrementing it
        let lastId = userList.getUser(userList.count - 1).id;
        newID = (Number(lastId) + 1).toString();
      }
      userList.addUser(newID, inputUsername, inputPassword);
      updateLocalStorage(USERLIST_DATA_KEY, userList);
      alert("Sign up successful. Please log in to your account again.");
      window.location = "login.html";
    }
  }

  function welcomeUser(){
      let userIndex = localStorage.getItem(USER_INDEX_KEY);
      let username = userList.getUser(userIndex)._username
      welcomeText.innerHTML = `<strong>Welcome, ${username}</strong>`
  }
