const strengthMeter = document.querySelector('#strength-meter');
const passwordInput = document.querySelector('.password-input');
const reasonsContainer = document.getElementById('reasons');

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter();

function updateStrengthMeter() {
    const weaknesses = calculatePasswordStrength(passwordInput.value);
    reasonsContainer.innerHTML = '';
    let strength = 100;
    let message;
    weaknesses.forEach(weakness => {
        if (weakness == null) return;
        strength -= weakness.deduction;
        message = weakness.message;
        const reasonElement = document.createElement('div');
        reasonElement.innerText = message;
        reasonsContainer.appendChild(reasonElement)
    })
    strengthMeter.style.setProperty('--strength', strength);

}
function calculatePasswordStrength(password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCaseWeakness(password));
    weaknesses.push(upperCaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(specialCharctersWeakness(password));
    weaknesses.push(firstCharToUpper(password));
    return weaknesses;
}

function lengthWeakness(password) {
    const length = password.length;
    if (length <= 5) {
        return {
            message: 'Your password is too short',
            deduction: 40
        }
    }
    if (length <= 7) {
        return {
            message: 'Your password could be longer',
            deduction: 20
        }
    }
}

function lowerCaseWeakness(password) {
    const matches = password.match(/[a-z]/g) || [];
    return chracterTypeWeakness(password, /[a-z]/g, "lowercase");
    // if (matches.length == 0) {
    //     return {

    //         message: "Your password has no lowercase letters",
    //         deduction: 30
    //     }
    // }
    // if (matches.length <= 2) {
    //     return {
    //         message: "Your password could use more lowercase letters",
    //         deduction: 20
    //     }
    // }
}

function upperCaseWeakness(password) {
    const matches = password.match(/[A-Z]/g) || [];
    return chracterTypeWeakness(password, /[a-z]/g, "Uppercase");
}

function chracterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || [];
    if (matches.length == 0) {
        return {

            message: `Your password has no ${type} letter`,
            deduction: 30
        }
    }
    if (matches.length <= 2) {
        return {
            message: `Your password could use more  ${type} letters`,
            deduction: 20
        }
    }

}

function numberWeakness(password) {
    const matches = password.match(/[A-Z]/g) || [];
    return chracterTypeWeakness(password, /[0-9]/g, "number");
}

function specialCharctersWeakness(password) {
    const matches = password.match(/[^0-9A-Za-z\s]/g) || [];
    return chracterTypeWeakness(password, /[^0-9A-Za-z\s]/g, "special character");
}
function firstCharToUpper(password) {
    let regexp = /^[A-Z]/;
    return chracterTypeWeakness(password, regexp, "first UpperCase");
}