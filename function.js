var allEntries = []; //full data


//getting base64 string 
const fileInput = document.querySelector('.formFile');    
var base64String;
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        console.log(base64String);
    };
    reader.readAsDataURL(file);
});
const fileInput1 = document.querySelector('#formFileEdit');    
var base64String;
fileInput1.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        console.log(base64String);
    };
    reader.readAsDataURL(file);
});



//card html generated here
function returnCardHtml(p_name,designation,dept,baseImg,id){
    let HtmlElement = `<div class="card" onclick="ViewEmployee(id)" data-toggle="modal" name="cardview" data-target="#employeeViewForm" style="width: 27rem;" id = `+ id +`>
    <div class="card-body">
    <div class="card-img">
        <img class="card-dp" src="data:image/png;base64,` + baseImg +`" height="70px" width="70px">
    </div>
    <div class="card-content">
    <h5 class="card-title"><b>`+ p_name +`</b></h5>
    <h6 class="card-subtitle mb-2 text-muted">`+ designation +`</h6>
    <h6 class="card-subtitle mb-2 text-muted">`+ dept +`</h6>
    <i class="fa fa-phone-square" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-star" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
    </div>
    </div>`;

    return HtmlElement;
}




//all cards being displayed
let currentEntries = JSON.parse(localStorage.getItem("allEntries"));
let displayBox = document.getElementById("card-display-box");
let displayInfo;
let temp;
let len = currentEntries.length;
for (let i = 0; i < len; i++) {
    displayInfo = currentEntries[i];
    let p_name = displayInfo["preferred_name"];
    let designation = displayInfo["title"];
    let dept = displayInfo["department"];
    let baseImg =  displayInfo["ImgString"];
    let id = i;

    temp = returnCardHtml(p_name,designation,dept,baseImg,id); 
    
    displayBox.innerHTML += temp;

}



function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}



//submit button on the modal form works this
function AddEmployee() {

    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    var first_name = document.getElementById("first_name").value;
    var surname = document.getElementById("surname").value;
    var preferred_name = document.getElementById("preferred_name").value;
    var email = document.getElementById("email").value;
    var title = document.getElementById("title").value;
    var office = document.getElementById("office").value;
    var department = document.getElementById("department").value;
    var number = document.getElementById("number").value;
    var skypeID = document.getElementById("skypeID").value;

    var obj = {};
    first_name = capitalize(first_name);
    surname = capitalize(surname);
    obj["first_name"] = first_name;
    obj["surname"] = surname;
    if(preferred_name == ""){
        preferred_name = first_name+" "+surname;
    }
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



let CurrentID;
function ViewEmployee(id){
    let obj = currentEntries[id];
    document.getElementById("DisplayName").innerHTML = `<label for="first_name">Name:</label><p>` + obj["first_name"] + `</p>`;
    document.getElementById("DisplaySurname").innerHTML = `<label for="surname">Surname</label><p>` + obj["surname"] + `</p>`;
    document.getElementById("DisplayPreferredName").innerHTML = `<label for="preferred_name">Preferred Name</label><p>` + obj["preferred_name"] + `</p>`;
    document.getElementById("DisplayEmail").innerHTML = `<label for="email">Email</label><p>` + obj["email"] + `</p>`;
    document.getElementById("DisplayTitle").innerHTML = `<label for="title">Job Title</label><p>` + obj["title"] + `</p>`;
    document.getElementById("DisplayOffice").innerHTML = `<label for="office">Office</label><p>` + obj["office"] + `</p>`;
    document.getElementById("DisplayDepartment").innerHTML = `<label for="department">Department</label><p>` + obj["department"] + `</p>`;
    document.getElementById("DisplayNumber").innerHTML = `<label for="number">Number</label><p>` + obj["number"] + `</p>`;
    document.getElementById("DisplaySkype").innerHTML = `<label for="skypeID">Skype ID</label><p>` + obj["skypeID"] + `</p>`;
    document.getElementById("DisplayPicture").innerHTML = `<img src="data:image/png;base64,`+ obj["ImgString"] +`" height="100px" width="100px">`;
    CurrentID = id;
    base64String = "check";

    }



function EditEmployee(){
    let currentEntries = JSON.parse(localStorage.getItem("allEntries"));
    let id = CurrentID;
    let obj = currentEntries[id];
    document.getElementById("EditName").value = obj["first_name"];
    document.getElementById("EditSurname").value = obj["surname"];
    document.getElementById("EditPreferredName").value = obj["preferred_name"];
    document.getElementById("EditEmail").value = obj["email"];
    document.getElementById("EditTitle").value = obj["title"];
    document.getElementById("EditOffice").value = obj["office"];
    document.getElementById("EditDepartment").value = obj["department"];
    document.getElementById("EditNumber").value = obj["number"];
    document.getElementById("EditSkype").value =obj["skypeID"];                 
    //document.getElementById("EditPicture").value = obj[""];
    console.log("test");

}




function deleteEmployee(){
    let id = CurrentID;
    console.log("working?");
    let firstHalf = currentEntries.slice(0,id);
    let secondHalf = currentEntries.slice(id+1);
    let finalArray = firstHalf.concat(secondHalf);
    localStorage.setItem("allEntries", JSON.stringify(finalArray));
    window.location.reload();

}




function CommitChanges(){
    let currentEntries = JSON.parse(localStorage.getItem("allEntries"));
    let id = CurrentID;
    let obj = currentEntries[id];
    localStorage.setItem("allEntries", JSON.stringify(currentEntries));
    var first_name = document.getElementById("EditName").value;
    var surname = document.getElementById("EditSurname").value;
    var preferred_name = document.getElementById("EditPreferredName").value;
    var email = document.getElementById("EditEmail").value;
    var title = document.getElementById("EditTitle").value;
    var office = document.getElementById("EditOffice").value;
    var department = document.getElementById("EditDepartment").value;
    var number = document.getElementById("EditNumber").value;
    var skypeID = document.getElementById("EditSkype").value;
    var temp = obj["ImgString"];
    first_name = capitalize(first_name);
    surname = capitalize(surname);
    obj["first_name"] = first_name;
    obj["surname"] = surname;
    if(preferred_name == ""){
        preferred_name = first_name+" "+surname;
    }
    obj["preferred_name"] = preferred_name;
    obj["email"] = email;
    obj["title"] = title;
    obj["office"] = office;
    obj["department"] = department;
    obj["number"] = number;
    obj["skypeID"] = skypeID;
    if(base64String == "check"){
        obj["ImgString"] = temp;
    }
    else{
        obj["ImgString"] = base64String;
    }
    

    currentEntries[id] = obj;
    localStorage.setItem("allEntries", JSON.stringify(currentEntries));

    }