const operation = document.querySelector('#operation')

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        operation.textContent === '0' ? operation.textContent = digit.value : operation.textContent =  operation.textContent.toString() + digit.value.toString();
    })
})

