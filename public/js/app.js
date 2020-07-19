//alert("hello");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg = document.querySelector("#msg")
const msgOne = document.querySelector("#msg1")
const msgErr = document.querySelector("#msgErr")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    msg.textContent = "Fetching data...!";
    msg.style.color = "#007BFF";
    msg.style.display = "block";
    msgOne.textContent = "";
    msgOne.style.display = "none";
    msgErr.textContent ="";
    msgErr.style.display = "none";
    
    const location = search.value;
    const locationURL = "http://localhost:3000/weather?address=" + location;
    
    fetch(locationURL).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgErr.textContent = data.error;
            msgErr.style.color = "red";
            msgErr.style.display = "block";
            msgOne.style.display = "none";
            msg.style.display = "none";
            //return console.log(data.error);
        } else {
            msgOne.textContent = "Weather forecast of " + data.location + ". " + data.forecast;
            msgOne.style.color = "green";
            msgOne.style.display = "block";
            msg.style.display = "none"
            // console.log(data.location);
            // console.log(data.forecast);
            }
        });
    });
});