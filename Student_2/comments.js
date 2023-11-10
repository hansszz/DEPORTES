//acessing elements by id
const form = document.getElementById("form");
const Name = document.getElementById("NAME");
const email = document.getElementById("EMAIL");
const mobile = document.getElementById("MOBILE");
const device = document.getElementById("DEVICE");
const college = document.getElementById("COLLEGE");
const error = document.getElementById("error");


//using addEventLister method to validate form on sumission
form.addEventListener("submit", (e) => {
  //creating a list named errorMessage
  let errorMessage = [];
  //checking if the value of Name is an empty string or null
  if (Name.value === "" || Name.value == null) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("Please Enter your Name");
  }
  //checking if the value of college is an empty string or null
  if (college.value === "" || college.value == null) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("\nPlease select your University");
  }
  //checking if the value of email is an empty string or null
  if (email.value === "" || email.value == null) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("\nPlease enter your email");
  }
  //checking if the value of mobile is an empty string or null
  if (mobile.value === "" || mobile.value == null) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("\nPlease enter your mobile number");
  }
  //checking if the length of the value of mobile number entered by the user is not equal to 10
  else if (mobile.value.length !== 10) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("\nMobile number should be exactly 10 digits");
  }
  //checking if the slected index of device is 0
  if (device.selectedIndex === 0) {
    // if so displaying the below message to the user by pushing it to errorMessage
    errorMessage.push("\nPlease select a device");
  }
   
  //checking if the length of the errorMessage list is greater than 0
  if (errorMessage.length > 0) {
    //to prevent form from default submission after user hits the submit button
    e.preventDefault();
    //creates a comma seperated string that creates all the error messages that have been pushed to the array list
    error.innerText = errorMessage.join(", ");
  }
});