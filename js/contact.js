document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    const regexPatterns = {
        name: /^[a-zA-Z]{3,30}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
        phone: /^01[0125][0-9]{8}$/, 
        message: /^[\s\S]{10,500}$/  
    };

    function validateInput(input, regex) {
        const isValid = regex.test(input.value.trim());
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
        return isValid;
    }

    function validateForm() {
        const isNameValid = validateInput(nameInput, regexPatterns.name);
        const isEmailValid = validateInput(emailInput, regexPatterns.email);
        const isPhoneValid = validateInput(phoneInput, regexPatterns.phone);
        const isMessageValid = validateInput(messageInput, regexPatterns.message);

        submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isMessageValid);
    }

    nameInput.addEventListener('input', () => validateInput(nameInput, regexPatterns.name));
    emailInput.addEventListener('input', () => validateInput(emailInput, regexPatterns.email));
    phoneInput.addEventListener('input', () => validateInput(phoneInput, regexPatterns.phone));
    messageInput.addEventListener('input', () => validateInput(messageInput, regexPatterns.message));

    contactForm.addEventListener('input', validateForm);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!submitBtn.disabled) {
            alert('Form submitted successfully!');
            contactForm.reset();
            submitBtn.disabled = true;
            
            document.querySelectorAll('.is-valid').forEach(el => {
                el.classList.remove('is-valid');
            });
        }
    });
});