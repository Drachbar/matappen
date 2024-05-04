const knapp = document.querySelector("button");
const knappAuthTest = document.getElementById("test-auth");
const inputFalt = document.getElementById("get-user-by-email");

knappAuthTest.addEventListener('click', function () {
    const URL = "http://localhost:8080/api/v1/testAuthentication";
    fetch(URL)
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
})

knapp.addEventListener('click', function(){
    const email = inputFalt.value;
    const URL = `http://localhost:8080/api/v1/getUserByEmail?email=${encodeURIComponent(email)}`;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Förhindra standardformulärsinlämning

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        name: name,
        email: email,
        password: password,
    };

    fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: "include"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('login-email').value);
    formData.append('password', document.getElementById('login-password').value);

    fetch('/api/v1/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.text().then(text => console.log('Success:', text));
            } else {
                return response.text().then(text => console.error('Failure:', text));
            }
        })
        .catch(error => console.error('Error:', error));
});


