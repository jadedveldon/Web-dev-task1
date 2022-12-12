var allEntries = [];

function AddEmployee(){

var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];
var first_name = document.getElementById("first_name").value;
var surname = document.getElementById("surname").value;
var preferred_name = document.getElementById("preferred_name").value;
var email = document.getElementById("email").value;
var title = document.getElementById("title").value;
var office = document.getElementById("office").value;
var department = document.getElementById("department").value;
var number = document.getElementById("number").value;
var skypeID = document.getElementById("skypeID").value;

const fileInput = document.querySelector('input');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            console.log(base64String);
            // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(file);
    });

var obj = {};

obj["first_name"] = first_name;
obj["surname"] = surname;
obj["preferred_name"] = preferred_name;
obj["email"] = email;
obj["title"] = title;
obj["office"] = office;
obj["department"] = department;
obj["number"] = number;
obj["skypeID"] = skypeID;
obj["ImgString"] = base64String;

localStorage.setItem("entry", JSON.stringify(obj));
existingEntries.push(obj);
localStorage.setItem("allEntries", JSON.stringify(existingEntries));



}
