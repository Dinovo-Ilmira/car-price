const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const nameError = document.getElementById('nameError');

function validateName() {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]{2,20}$/;

    if (!nameRegex.test(nameValue)) {
        nameError.textContent = 'Name must be between 2 and 20 characters and contain only letters and spaces';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const isNameValid = validateName();

    if (isNameValid) {

        console.log('Name:', nameInput.value.trim());

        form.reset();
    }
});


nameInput.addEventListener('focus', function() {
    nameError.textContent = ''; 
});

nameInput.addEventListener('blur', validateName); 
