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