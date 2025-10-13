"use strict";
var _a;
const MONTH_NAMES = {
    'січень': 1, 'лютий': 2, 'березень': 3, 'квітень': 4,
    'травень': 5, 'червень': 6, 'липень': 7, 'серпень': 8,
    'вересень': 9, 'жовтень': 10, 'листопад': 11, 'грудень': 12
};
const SEASONS = {
    1: "Весна", 2: "Літо", 3: "Осінь", 4: "Зима"
};
function getSeasonInfo(month) {
    if (typeof month === 'number') {
        if (month < 1 || month > 12)
            throw new Error("Місяць повинен бути від 1 до 12");
        if (month >= 3 && month <= 5)
            return 1;
        if (month >= 6 && month <= 8)
            return 2;
        if (month >= 9 && month <= 11)
            return 3;
        return 4;
    }
    else {
        const monthNum = MONTH_NAMES[month.toLowerCase().trim()];
        if (!monthNum)
            throw new Error("Некоректна назва місяця");
        return SEASONS[getSeasonInfo(monthNum)];
    }
}
const inputType = document.getElementById('inputType');
const numberBlock = document.getElementById('numberInputBlock');
const nameBlock = document.getElementById('nameInputBlock');
const resultBlock = document.getElementById('resultBlock');
const errorBlock = document.getElementById('errorBlock');
inputType === null || inputType === void 0 ? void 0 : inputType.addEventListener('change', () => {
    const isNumber = inputType.value === 'number';
    numberBlock.style.display = isNumber ? 'block' : 'none';
    nameBlock.style.display = isNumber ? 'none' : 'block';
    resultBlock.style.display = 'none';
    errorBlock.style.display = 'none';
});
(_a = document.getElementById('checkSeason')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    resultBlock.style.display = 'none';
    errorBlock.style.display = 'none';
    try {
        let result;
        if (inputType.value === 'number') {
            const value = parseInt(document.getElementById('monthNumber').value);
            if (isNaN(value))
                throw new Error("Введіть номер місяця");
            const season = getSeasonInfo(value);
            result = `Місяць ${value} → Пора року №${season} (${SEASONS[season]})`;
        }
        else {
            const value = document.getElementById('monthName').value;
            if (!value.trim())
                throw new Error("Введіть назву місяця");
            const season = getSeasonInfo(value);
            result = `"${value}" → ${season}`;
        }
        document.getElementById('result-content').textContent = result;
        resultBlock.style.display = 'block';
    }
    catch (error) {
        document.getElementById('error-content').textContent =
            error instanceof Error ? error.message : 'Помилка';
        errorBlock.style.display = 'block';
    }
});
