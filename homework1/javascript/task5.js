"use strict";
function generateRandomValue() {
    if (Math.random() < 0.5) {
        return Math.floor(Math.random() * 100);
    }
    else {
        return "Ок";
    }
}
const generateBtn = document.getElementById('generateBtn');
const resultBlockRandom = document.getElementById('resultBlock');
const valuesContent = document.getElementById('values-content');
const statsContent = document.getElementById('stats-content');
const resultContentRandom = document.getElementById('result-content');
generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.addEventListener('click', () => {
    const values = [];
    let numberCount = 0;
    let stringCount = 0;
    for (let i = 0; i < 10; i++) {
        const value = generateRandomValue();
        values.push(value);
        if (typeof value === 'number') {
            numberCount++;
        }
        else {
            stringCount++;
        }
    }
    const lastValue = values[values.length - 1];
    valuesContent.textContent = values.map((v, i) => `${i + 1}. ${v}`).join('\n');
    statsContent.textContent = `Чисел: ${numberCount}\nРядків "Ок": ${stringCount}`;
    let result;
    if (numberCount > stringCount) {
        result = `📊 Чисел було БІЛЬШЕ (${numberCount} > ${stringCount})`;
    }
    else if (stringCount > numberCount) {
        result = `📝 Рядків "Ок" було БІЛЬШЕ (${stringCount} > ${numberCount})`;
    }
    else {
        result = `⚖️ Порівну! (${numberCount} = ${stringCount})`;
    }
    result += `\n\nОстаннє значення: ${lastValue}`;
    resultContentRandom.textContent = result;
    resultBlockRandom.style.display = 'block';
});
