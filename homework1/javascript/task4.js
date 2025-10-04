"use strict";
function isWorkingDay(day) {
    let dayNumber;
    if (typeof day === 'number') {
        dayNumber = day;
    }
    else {
        const dayNames = {
            'понеділок': 1,
            'вівторок': 2,
            'середа': 3,
            'четвер': 4,
            'п\'ятниця': 5,
            'пятниця': 5,
            'субота': 6,
            'неділя': 7
        };
        const normalizedDay = day.toLowerCase().trim();
        dayNumber = dayNames[normalizedDay] || parseInt(day);
    }
    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
        return {
            isValid: false,
            isWorking: false,
            message: '❌ Помилка! День має бути числом від 1 до 7 або назвою дня тижня'
        };
    }
    const isWorking = dayNumber >= 1 && dayNumber <= 5;
    return {
        isValid: true,
        isWorking: isWorking,
        message: isWorking
            ? `✅ ${day} - це РОБОЧИЙ ДЕНЬ`
            : `🏖️ ${day} - це ВИХІДНИЙ ДЕНЬ`
    };
}
const checkButton = document.getElementById('checkDay');
const resultBlock4 = document.getElementById('resultBlock');
const resultContent = document.getElementById('result-content');
checkButton === null || checkButton === void 0 ? void 0 : checkButton.addEventListener('click', () => {
    const dayInput = document.getElementById('dayInput').value;
    if (!dayInput) {
        alert('Будь ласка, введіть день!');
        return;
    }
    const dayValue = isNaN(parseInt(dayInput)) ? dayInput : parseInt(dayInput);
    const result = isWorkingDay(dayValue);
    resultContent.textContent = result.message;
    resultBlock4.style.display = 'block';
});
