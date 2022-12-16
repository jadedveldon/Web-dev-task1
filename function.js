var allEntries = []; //full data
var displayBox = document.getElementById("card-display-box");
var currentEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
var displayInfo;
let imgCheck;
var newCard;
var countIT = 0;
countHR = 0;
countMD = 0;
countSales = 0;
countSeattle = 0;
countIndia = 0;
countSSPH = 0;
countDot = 0;
countRE = 0;
countBID = 0;
countBD = 0;
for (let i = 0; i < currentEntries.length; i++) {
  displayInfo = currentEntries[i];
  let p_name = displayInfo["preferred_name"];
  let designation = displayInfo["title"];
  let dept = displayInfo["department"];
  let baseImg = displayInfo["ImgString"];
  let id = i;
  let office = displayInfo["office"];

  if (dept == "IT") {
    countIT += 1;
  }
  if (dept == "Human Resource") {
    countHR += 1;
  }
  if (dept == "MD") {
    countMD += 1;
  }
  if (dept == "Sales") {
    countSales += 1;
  }
  if (office == "India") {
    countIndia += 1;
  }
  if (office == "Seattle") {
    countSeattle += 1;
  }
  if (designation == "SharePoint PracticeHead") {
    countSSPH += 1;
  }
  if (designation == ".Net Development Lead") {
    countDot += 1;
  }
  if (designation == "Recruiting Expert") {
    countRE += 1;
  }
  if (designation == "BI Development") {
    countBID += 1;
  }
  if (designation == "Business Development") {
    countBD += 1;
  }

  newCard = cardGenerator(p_name, designation, dept, baseImg, id);

  displayBox.innerHTML += newCard;
}

//getting base64 string
const addEmpImg = document.querySelector(".formFile");
var base64String;
addEmpImg.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    console.log(base64String);
  };
  reader.readAsDataURL(file);
});
const editEmpImg = document.querySelector("#formFileEdit");
var base64StringEdit;
editEmpImg.addEventListener("change", function (f) {
  const file = f.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    base64StringEdit = reader.result.replace("data:", "").replace(/^.+,/, "");

    console.log(base64StringEdit,"edit");
  };
  reader.readAsDataURL(file);
});

//card html generated here
function cardGenerator(p_name, designation, dept, baseImg, id) {
  var cardTemplate = `<div class="card" onclick="viewEmployee(id)" data-toggle="modal" name="cardview" data-target="#employeeViewForm" style="width: 27rem;" id = ${id}>
    <div class="card-body">
    <div class="card-img">
        <img class="card-dp" src="data:image/png;base64,${baseImg}" height="70px" width="70px">
    </div>
    <div class="card-content">
    <h5 class="card-title"><b> ${p_name}
    </b></h5>
    <h6 class="card-subtitle mb-2 text-muted">${designation}</h6>
    <h6 class="card-subtitle mb-2 text-muted">${dept}</h6>
    <i class="fa fa-phone-square" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-star" aria-hidden="true"></i>&nbsp;
    <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
    </div>
    </div>`;

  return cardTemplate;
}

//all cards being displayed

document.getElementById("IT").innerHTML += "(" + countIT + ")";
document.getElementById("HR").innerHTML += "(" + countHR + ")";
document.getElementById("MD").innerHTML += "(" + countMD + ")";
document.getElementById("Sales").innerHTML += "(" + countSales + ")";
document.getElementById("Seattle").innerHTML += "(" + countSeattle + ")";
document.getElementById("India").innerHTML += "(" + countIndia + ")";
document.getElementById("SPPH").innerHTML += "(" + countSSPH + ")";
document.getElementById("DOT").innerHTML += "(" + countDot + ")";
document.getElementById("RE").innerHTML += "(" + countRE + ")";
document.getElementById("BID").innerHTML += "(" + countBID + ")";
document.getElementById("BD").innerHTML += "(" + countBD + ")";


//submit button on the modal form works this
function addEmployee() {
  var existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  var first_name = getValueById("first_name").trim();
  var surname = getValueById("surname").trim();
  var preferred_name = getValueById("preferred_name").trim();
  var email = getValueById("email").trim();
  var title = getValueById("title").trim();
  var office = getValueById("office").trim();
  var department = getValueById("department").trim();
  var number = getValueById("number").trim();
  var skypeID = getValueById("skypeID").trim();

  var user = {};
  user["first_name"] = first_name;
  user["surname"] = surname;
  if (preferred_name == "") {
    preferred_name = first_name + " " + surname;
  }
  user["preferred_name"] = preferred_name;
  user["email"] = email;
  user["title"] = title;
  user["office"] = office;
  user["department"] = department;
  user["number"] = number;
  user["skypeID"] = skypeID;
  user["ImgString"] = base64String;

  localStorage.setItem("entry", JSON.stringify(user));
  existingEntries.push(user);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}

let CurrentID;
function viewEmployee(id) {
  let entry = currentEntries[id];
  console.log(id);
  document.getElementById(
    "DisplayName"
  ).innerHTML = `<label for="first_name">Name:&nbsp;</label><p>${entry["first_name"]}</p>`;
  document.getElementById(
    "DisplaySurname"
  ).innerHTML = `<label for="surname">Surname:&nbsp;</label><p>${entry["surname"]}</p>`;
  document.getElementById(
    "DisplayPreferredName"
  ).innerHTML = `<label for="preferred_name">Preferred Name:&nbsp;</label><p>${entry["preferred_name"]}</p>`;
  document.getElementById(
    "DisplayEmail"
  ).innerHTML = `<label for="email">Email:&nbsp;</label><p>${entry["email"]}</p>`;
  document.getElementById(
    "DisplayTitle"
  ).innerHTML = `<label for="title">Job Title:&nbsp;</label><p>${entry["title"]}</p>`;
  document.getElementById(
    "DisplayOffice"
  ).innerHTML = `<label for="office">Office:&nbsp;</label><p>${entry["office"]}</p>`;
  document.getElementById(
    "DisplayDepartment"
  ).innerHTML = `<label for="department">Department:&nbsp;</label><p>${[
    "department",
  ]}</p>`;
  document.getElementById(
    "DisplayNumber"
  ).innerHTML = `<label for="number">Number:&nbsp;</label><p>${entry["number"]}</p>`;
  document.getElementById(
    "DisplaySkype"
  ).innerHTML = `<label for="skypeID">Skype ID:&nbsp;</label><p>${entry["skypeID"]}</p>`;
  document.getElementById(
    "DisplayPicture"
  ).innerHTML = `<img src="data:image/png;base64,${entry["ImgString"]}" height="100px" width="100px">`;
  CurrentID = id;
  imgCheck = "check";
}

function editEmployee() {
  let currentEntries = JSON.parse(localStorage.getItem("allEntries"));
  let id = CurrentID;
  let entry = currentEntries[id];
  document.getElementById("EditName").value = entry["first_name"];
  document.getElementById("EditSurname").value = entry["surname"];
  document.getElementById("EditPreferredName").value = entry["preferred_name"];
  document.getElementById("EditEmail").value = entry["email"];
  document.getElementById("EditTitle").value = entry["title"];
  document.getElementById("EditOffice").value = entry["office"];
  document.getElementById("EditDepartment").value = entry["department"];
  document.getElementById("EditNumber").value = entry["number"];
  document.getElementById("EditSkype").value = entry["skypeID"];
}

function deleteEmployee() {
  let id = CurrentID;
  let firstHalf = currentEntries.slice(0, id);
  console.log(firstHalf);
  let secondHalf = currentEntries.slice(id);
  secondHalf.shift();
  let finalArray = firstHalf.concat(secondHalf);
  localStorage.setItem("allEntries", JSON.stringify(finalArray));
  window.location.reload();
}
function getValueById(id) {
  return document.getElementById(id).value;
}
function commitChanges() {
  let currentEntries = JSON.parse(localStorage.getItem("allEntries"));
  let id = CurrentID;
  let entry = currentEntries[id];
  localStorage.setItem("allEntries", JSON.stringify(currentEntries));
  var first_name = getValueById("EditName");
  var surname = getValueById("EditSurname");
  var preferred_name = getValueById("EditPreferredName");
  var email = getValueById("EditEmail");
  var title = getValueById("EditTitle");
  var office = getValueById("EditOffice");
  var department = getValueById("EditDepartment");
  var number = getValueById("EditNumber");
  var skypeID = getValueById("EditSkype");
  var currentImgString = entry["ImgString"];
  entry["first_name"] = first_name;
  entry["surname"] = surname;
  if (preferred_name == "") {
    preferred_name = first_name + " " + surname;
  }
  entry["preferred_name"] = preferred_name;
  entry["email"] = email;
  entry["title"] = title;
  entry["office"] = office;
  entry["department"] = department;
  entry["number"] = number;
  entry["skypeID"] = skypeID;
  if (imgCheck == "check") {
    entry["ImgString"] = base64StringEdit;
  } else {
    entry["ImgString"] = currentImgString;
  }

  currentEntries[id] = entry;
  localStorage.setItem("allEntries", JSON.stringify(currentEntries));
}

function displayResults(FilterEntries) {
  for (let i = 0; i < FilterEntries.length; i++) {
    displayInfo = FilterEntries[i];
    let p_name = displayInfo["preferred_name"];
    let designation = displayInfo["title"];
    let dept = displayInfo["department"];
    let baseImg = displayInfo["ImgString"];
    let id = i;

    newCard = cardGenerator(p_name, designation, dept, baseImg, id);

    displayBox.innerHTML += newCard;
  }
}

function sideFilter(value, category) {
  displayBox.innerHTML = " ";
  let FilterEntries = [];
  for (let i = 0; i < currentEntries.length; i++) {
    displayInfo = currentEntries[i];
    if (displayInfo[category] == value) {
      FilterEntries.push(displayInfo);
    }
  }
  displayResults(FilterEntries);
}

function alphabetFilter(alphabet) {
  displayBox.innerHTML = " ";
  let category = getValueById("categories");
  let len = currentEntries.length;
  alphabet = alphabet.toLowerCase();
  let FilterEntries = [];
  for (let i = 0; i < len; i++) {
    let entry = currentEntries[i];
    let temp = entry[category];
    temp = temp.toLowerCase();
    if (temp[0] == alphabet) {
      FilterEntries.push(entry);
    }
  }
  displayResults(FilterEntries);
}

function searchHandler() {
  let KeyWord = getValueById("SearchField");
  let category = getValueById("categories");
  displayBox.innerHTML = " ";
  let FilterEntries = [];
  for (let i = 0; i < currentEntries.length; i++) {
    let displayInfo = currentEntries[i];
    let checker = displayInfo[category];
    let l = KeyWord.length;
    console.log(checker,displayInfo)
    if (checker.slice(0, l).toLowerCase() == KeyWord.toLowerCase()) {
      FilterEntries.push(displayInfo);
    }
  }
  displayResults(FilterEntries);
}
function validateName(type){
  var regex = /^[a-zA-Z]{3,10}$/;
  var formErrorDiv;
  var tester;
  if(type == "add"){
    tester = getValueById("first_name");
    formErrorDiv = document.getElementById("addName");
  }
  else{
    tester = getValueById("EditName");
    formErrorDiv = document.getElementById("editName");
  }
  if(regex.test(tester)){
    formErrorDiv.style.display = "none";
  }
  else{
    formErrorDiv.style.display = "block";
  }
console.log(tester,formErrorDiv,formErrorDiv.style.display);
}
function validateSurname(type){
  var regex = /^[a-zA-Z]{3,10}$/;
  var tester;
  var formErrorDiv;
  if(type == "add"){
    tester = getValueById("surname");
    formErrorDiv = document.getElementById("addSurname");
  }
  else{
    tester = getValueById("EditSurname");
    formErrorDiv = document.getElementById("editSurname");
  }
  if(regex.test(tester)){
    formErrorDiv.style.display = "none";
  }
  else{
    formErrorDiv.style.display = "block";
  }
  console.log(typeof tester);
}
function validateEmail(type){
  var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var tester;
  var formErrorDiv;
  if(type == "add"){
    tester = getValueById("email");
    formErrorDiv = document.getElementById("addEmail");
  }
  else{
    tester = getValueById("EditEmail");
    formErrorDiv = document.getElementById("editEmail");
  }
  if(regex.test(tester)){
    formErrorDiv.style.display = "none";
  }
  else{
    formErrorDiv.style.display = "block";
  }
  console.log(typeof tester);
}
function validateNumber(type){
  var regex =  /^\d{6,10}$/;
  var tester;
  var formErrorDiv;
  if(type == "add"){
    tester = getValueById("number");
    formErrorDiv = document.getElementById("addNumber");
  }
  else{
    tester = getValueById("EditNumber");
    formErrorDiv = document.getElementById("editNumber");
  }
  if(regex.test(tester)){
    formErrorDiv.style.display = "none";
  }
  else{
    formErrorDiv.style.display = "block";
  }
  console.log(typeof tester);
}
function validateSkype(type){
  var regex =  /^[^\s\W]+$/;
  var tester;
  var formErrorDiv;
  if(type == "add"){
    tester = getValueById("skypeID");
    formErrorDiv = document.getElementById("addSkype");
  }
  else{
    tester = getValueById("EditSkype");
    formErrorDiv = document.getElementById("editSkype");
  }
  if(regex.test(tester)){
    formErrorDiv.style.display = "none";
  }
  else{
    formErrorDiv.style.display = "block";
  }
  console.log(typeof tester);
}