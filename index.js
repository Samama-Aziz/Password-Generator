let reload_btn = document.getElementById("reload_btn")
let copy_btn = document.getElementById("copy_btn");
let input_number = document.getElementById("numberfeild");
let input_range = document.getElementById("rangefeild");
let Lowercase = document.getElementById("Lowercase");
let Uppercase = document.getElementById("Uppercase");
let Numbers = document.getElementById("Numbers");
let Symbols = document.getElementById("Symbols");
let Password_display = document.getElementById("password")
let strenghtbar = document.getElementById("strenght_bar");

input_number.defaultValue = 8;
input_range.defaultValue = 8;

reload_btn.addEventListener("click", Reload);
copy_btn.addEventListener("click", copypassword);
input_number.addEventListener("input", SyncInput);
input_range.addEventListener("input", SyncInput);
Lowercase.addEventListener("input", password_caller);
Uppercase.addEventListener("input", password_caller);
Numbers.addEventListener("input", password_caller);
Symbols.addEventListener("input", password_caller);

const Uppercase_array = arrayFromLowToHigh(65, 90);
const Lowerercase_array = arrayFromLowToHigh(97, 122);
const Numbers_array = arrayFromLowToHigh(48, 57);
const Symbols_array = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));

window.onload = password_caller();


let rotatedeg = 0;
function Reload() {
  rotatedeg = rotatedeg + 360;
  reload_btn.style.transform = `rotate(${rotatedeg}deg)`;
  reload_btn.style.transition = "all 0.75s"
  password_caller();
}

function SyncInput(e) {
  const value = e.target.value;
  input_number.value = value;
  input_range.value = value;
  password_caller();

}

function password_caller() {
  const length = input_number.value;
  const isupercase = Uppercase.checked;
  const islowercase = Lowercase.checked;
  const isnumbers = Numbers.checked;
  const issymbols = Symbols.checked;

  const password = generate_password(length, isupercase, islowercase, isnumbers, issymbols);
  Password_display.value = password;

  const score = findscore(password);
  barlenght(score);
}

function generate_password(length, isupercase, islowercase, isnumbers, issymbols) {

  let charcode = Lowerercase_array;
  if (isupercase) {
    charcode = charcode.concat(Uppercase_array);
  }
  if (isnumbers) {
    charcode = charcode.concat(Numbers_array);
  }
  if (issymbols) {
    charcode = charcode.concat(Symbols_array);
  }

  let passwordchar = [];
  for (let i = 0; i < length; i++) {
    let charater = charcode[Math.floor(Math.random() * charcode.length)]
    passwordchar.push(String.fromCharCode(charater))
  }
  return passwordchar.join('');
}

function arrayFromLowToHigh(low, high) {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
}

function copypassword() {

  Password_display.select();
  Password_display.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(Password_display.value);
  alert("Copied the Password: " + Password_display.value);

  document.getSelection().collapseToEnd()

}

function generate() {
  setTimeout(() => { copypassword(); }, 500);
  password_caller();

}

function findscore(password) {

  var strength = 0;
  if (password.length > 7) {
    strength += 1;
  }
  

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  }

  if (password.match(/\d/)) {
    strength += 1;
  }

  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  }
  return strength;
}

function colorPicker(score) {
  switch (score) {
    case 1:
      strenghtbar.style.backgroundColor = "#E22800";
      break;
    case 2:
      strenghtbar.style.backgroundColor = "#E28C00";
      break;
    case 3:
      strenghtbar.style.backgroundColor = "#F7C703 ";
      break;
    case 4:
      strenghtbar.style.backgroundColor = "#1AE505";
      break;

  }
}
function barlenght(score) {
  const Score = (score * 25);

  strenghtbar.style.width = Score + "%";
  colorPicker(score);
  strenghtbar.style.transition = "all 0.75s"
}
