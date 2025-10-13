"use strict";
function getLastElement(value) {
    if (typeof value === 'number') {
        const lastDigit = Math.abs(value) % 10;
        return `🔢 Остання цифра числа ${value}: ${lastDigit}`;
    }
    else {
        if (value.length === 0) {
            throw new Error("❌ Рядок не може бути порожнім!");
        }
        const lastChar = value[value.length - 1];
        return `📝 Останній символ рядка "${value}": "${lastChar}"`;
    }
}
const checkButton22 = document.getElementById('checkValue');
const resultBlock22 = document.getElementById('resultBlock');
const errorBlock22 = document.getElementById('errorBlock');
const resultContent22 = document.getElementById('result-content');
const errorContent22 = document.getElementById('error-content');
checkButton22 === null || checkButton22 === void 0 ? void 0 : checkButton22.addEventListener('click', () => {
    const inputElement = document.getElementById('valueInput');
    const inputValue = inputElement.value;
    resultBlock22.style.display = 'none';
    errorBlock22.style.display = 'none';
    if (!inputValue) {
        errorContent22.textContent = '❌ Будь ласка, введіть значення!';
        errorBlock22.style.display = 'block';
        return;
    }
    try {
        let processedValue;
        const numValue = Number(inputValue);
        if (!isNaN(numValue) && inputValue.trim() !== '') {
            processedValue = numValue;
        }
        else {
            processedValue = inputValue;
        }
        resultContent22.textContent = getLastElement(processedValue);
        resultBlock22.style.display = 'block';
    }
    catch (error) {
        errorContent22.textContent = String(error);
        errorBlock22.style.display = 'block';
    }
});
