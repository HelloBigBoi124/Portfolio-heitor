// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcMg-F0VZ0pR7tygTbadQ2pfMYcKvqE54",
    authDomain: "contactform-c546f.firebaseapp.com",
    databaseURL: "https://contactform-c546f-default-rtdb.firebaseio.com",
    projectId: "contactform-c546f",
    storageBucket: "contactform-c546f.firebasestorage.app",
    messagingSenderId: "187022137870",
    appId: "1:187022137870:web:c0178e1cbc6a6632e4fa5f"
  };

  //initialize firebase 
  firebase.initializeApp(firebaseConfig);

  //reference your database
  var contactFormDB = firebase.database().ref('contactForm');

  document.getElementById('contactForm').addEventListener('submit', submitForm);
  const formButton = document.getElementById('form-button');
  const bellSFX =  new Audio('audio/bell_sfx.mp3');
  const hit1SFX = new Audio('audio/hit1_sfx.mp3');
  const hit2SFX = new Audio('audio/hit2_sfx.mp3');
  bellSFX.volume = 0.2;
  hit1SFX.volume = 0.2;
  hit2SFX.volume = 0.2;
  var playSFX = 1;
  const numberSFX = () => {
    playSFX = Math.floor(Math.random() * 2) + 1
  }


  //Formulário
  function submitForm(e) {
    e.preventDefault();
    
    var nameContent = getElementVal('nameId');
    var emailContent = getElementVal('emailId');
    var subjectContent = getElementVal('subjectId');
    var messageContent = getElementVal('messageId');

    if (nameContent === "" || emailContent === "" || subjectContent === "" || messageContent === "") {        
            numberSFX();
            buttonFormError();
        } else {
            saveMessages(nameContent, emailContent, subjectContent, messageContent);
            buttonFormSent();
            this.reset();
        }
  };

const saveMessages = (nameContent, emailContent, subjectContent, messageContent) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        name : nameContent,
        emailid : emailContent,
        subjectid : subjectContent,
        messageid : messageContent,
    })
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

const buttonFormSent = () => {
    formButton.innerText = "Message sent successfully! I will get in touch with you soon.";
    formButton.classList.remove('form-button');
    formButton.classList.add('form-sent');
    console.log("The form was sent successfully.");
    bellSFX.play();
    setTimeout(() => {
        formButton.innerText = "Send Message";
        formButton.classList.remove('form-sent');
        formButton.classList.add('form-button');
    }, 5000)  
}

const buttonFormError = () => {
    formButton.innerText = "Please fill out all fields of the form before submitting!";
    formButton.classList.remove('form-button');
    formButton.classList.add('form-error');
    formButton.classList.add('error-clicked')
    console.log("Error! Form not sent.")
    if (playSFX === 1) {
        hit1SFX.play();
    }  else {
        hit2SFX.play();
    }
    
    setTimeout(() => {
        formButton.innerText = "Send Message";
        formButton.classList.remove('form-error');
        formButton.classList.add('form-button');
    }, 300)
    setTimeout(() => {
        formButton.classList.remove('error-clicked')
    }, 150)
}

    
    
    





