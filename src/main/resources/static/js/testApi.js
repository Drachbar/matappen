const knapp = document.querySelector("button");
const inputFalt = document.getElementById("get-user-by-email");

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
    // const role = document.getElementById('role').value;

    const userData = {
        name: name,
        email: email,
        password: password,
        // role: role
    };

    fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
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