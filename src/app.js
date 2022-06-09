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
    return chracterTypeWeakness(password, /[a-z]/g, lowercase);
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
    return chracterTypeWeakness(password, /[a-z]/g, lowercase);
    // if (matches.length == 0) {
    //     return {

    //         message: "Your password has no Uppercase letters",
    //         deduction: 30
    //     }
    // }

}

function chracterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || [];
    if (matches.length == 0) {
        return {

            message: `Your password has no ${type} letters`,
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