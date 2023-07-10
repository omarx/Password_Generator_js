// Assignment Code
var generateBtn = document.querySelector("#generate");

//These are helper functions use regular expression with the exception of getSpecialCharacters, to select a random Character based on a length;

const getCapitalLetter=(num)=>{
   let result=''
    while(result.length<num){
      let randomString=Math.random().toString(36).replace(/[^a-z]+/g,'');
      result +=randomString.toLocaleUpperCase();
    }
    return result.substring(0,num);
}

const getLowerCaseLetter=(num)=>{
  let result=''
  while(result.length<num){
    let randomString=Math.random().toString(36).replace(/[^a-z]+/g,'');
    result +=randomString.toLocaleLowerCase();
  }
  return result.substring(0,num);
}

const getRandomNumber=(num)=>{
  let result=''
  while(result.length<num){
    result += Math.floor(Math.random() * 10);
  }
  return result
}

const getSpecialCharacter=(num)=>{
  let result = '';
  let specialCharacters = "!@#$%^&*()_+-=[]{};:,.<>?";
  while (result.length < num) {
      let randomIndex = Math.floor(Math.random() * specialCharacters.length);
      result += specialCharacters[randomIndex];
  }
  return result;
}

const generatePassword = () => {
  let length = 0;
  while (true) {
    length = prompt('Enter a length for your password between 8 - 128 characters');
    if (length === null) {
      console.log("Password generation cancelled by user.");
      return; // Exit the function
    } else if (!isNaN(length) && length >= 8 && length <= 128) {
      //This function runs if all the conditions are met, then it prompts the user
      let setCapitalLetter = confirm("Do you want upper case letters?");
      let setLowerCaseLetter = confirm("Do you want lower case letters?");
      let setRandomNumber = confirm("Do you want numbers?");
      let setSpecialCharacter = confirm("Do you want special characters?");
      //This condition starts the function over if no type is selected
      if (!(setCapitalLetter || setLowerCaseLetter || setRandomNumber || setSpecialCharacter)) {
        alert("You must select at least one character type.");
        continue;
      }
      //This seems a bit overwhelming however it basically distributes the length of a number randomly among each character type
      let numTypes = setCapitalLetter + setLowerCaseLetter + setRandomNumber + setSpecialCharacter;
      let numPerType = Math.floor(length / numTypes);
      let remainder = length % numTypes;
      
      let password = "";
      if(setCapitalLetter) {
        password += getCapitalLetter(numPerType + (remainder-- > 0 ? 1 : 0));
      }
      if(setLowerCaseLetter) {
        password += getLowerCaseLetter(numPerType + (remainder-- > 0 ? 1 : 0));
      }
      if(setRandomNumber) {
        password += getRandomNumber(numPerType + (remainder-- > 0 ? 1 : 0));
      }
      if(setSpecialCharacter) {
        password += getSpecialCharacter(numPerType + (remainder-- > 0 ? 1 : 0));
      }
      //It generates the password in the order of the prompt
      return password;
    }
  }
}

// Write password to the #password input
const writePassword=()=> {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
