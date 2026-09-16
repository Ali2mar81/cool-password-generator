
const genBtn = document.getElementById("btngen")
const passwordLength = document.getElementById("pass_len");
const hasLowerCaseChars = document.getElementById("lower")
const hasUpperCaseChars = document.getElementById("upper")
const hasNumbersChars = document.getElementById("numbers")
const hasSymbolsChar = document.getElementById("symbols")
const showResult = document.getElementById("result")
const copyArea = document.getElementById("copy")
const copyBtn = document.getElementById("copybtn")



const LOWER_CASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
const UPPER_CASE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "~`!@{#$:%^&*()_+-=<}[]//'?.,>;"

function isNumber(value) {
  return value !== "" && value !== null && Number.isFinite(Number(value)) && typeof value !== "number";
}



const shuffled = (str)=>{
    res = str.split('').sort(()=> Math.random()-0.5).join('');
    return res;
}


const setPassword = (password, action)=>{
    const resPass = showResult.querySelector('.gnpassword')
    switch (action) {
        case "show":
            showResult.classList.remove("hidden")
            showResult.classList.add("flex")
            if (resPass) {
                resPass.remove();
            }
            const pTag = showResult.appendChild(document.createElement('p'))
            pTag.className = 'gnpassword text-center w-full font-mono '
            pTag.textContent = password
            copyArea.classList.remove("hidden")            
            break;
        case "hide":
            showResult.classList.remove("flex");
            showResult.classList.add("hidden");
            if (resPass) {
                resPass.remove();
            }
            copyArea.classList.add("hidden")
            break;
        default:
            break;
    }
}

genBtn.addEventListener("click", (e)=>{
    let allowChars = "";
    let password = "";

    const passLen = passwordLength.value;
    
    allowChars += hasLowerCaseChars.checked ? shuffled(LOWER_CASE_CHAR) : "";
    
    allowChars += hasNumbersChars.checked ? shuffled(NUMBERS) : "";

    allowChars += hasSymbolsChar.checked ? shuffled(SYMBOLS) : "";

    allowChars += hasUpperCaseChars.checked ? shuffled(UPPER_CASE_CHAR) : ""

    allowChars = shuffled(allowChars)

    if (!isNumber(passLen)) {
        alert("Please Enter a number as length of your password")
    } else if (passLen < 1 || passLen > 30) {
        alert("You HAHE TO enter a password between 1-30")
    } else{
        if (allowChars.length === 0) {
            alert("You HAVE TO select atleast one of the options!")
        } else {
            for (let i= 0; i < passLen; i++) {
                const randomIndex = Math.floor(Math.random() * allowChars.length) 
                password += allowChars[randomIndex]
            }
            setPassword(password, "show")
        }
    }
})


passwordLength.addEventListener("keydown", (e)=>{
    if(e.code === "Backspace"){
        setPassword("", "hide")
    }
})

copyBtn.addEventListener("click", async ()=>{
    const status = document.getElementById("status");
    copyBtn.setAttribute("disabled","");
    try {
      await navigator.clipboard.writeText(showResult.innerText);
      status.textContent = "Copied!";
      status.classList.remove("hidden")
      setTimeout(() => (status.textContent = "", status.classList.add("hidden"), copyBtn.removeAttribute("disabled")), 1500);
    } catch (err) {
      status.textContent = "Failed to copy";
      console.error(err);
    }
})