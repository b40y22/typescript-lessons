"use strict";
let field2Value;
const codeBlock = document.getElementById('localStorage-content');
const resultBlock = document.getElementById('result-content');
const randomType = Math.random() < 0.5 ? 'string' : 'number';
if (randomType === 'string') {
    field2Value = 'Тут могла бути ваша реклама';
}
else {
    field2Value = Math.floor(Math.random() * 100);
}
localStorage.setItem('data', JSON.stringify({ field2: field2Value }));
if (codeBlock && resultBlock) {
    try {
        const storedData = localStorage.getItem('data');
        const parsedData = JSON.parse(storedData);
        codeBlock.textContent = JSON.stringify(parsedData, null, 2);
        if (typeof parsedData.field2 === 'string') {
            resultBlock.textContent = `Рядок, довжина: ${parsedData.field2.length}`;
        }
        else {
            resultBlock.textContent = `Число ${parsedData.field2} є ${parsedData.field2 % 2 === 0 ? 'парним' : 'непарним'}`;
        }
    }
    catch (error) {
        codeBlock.textContent = 'Помилка при читанні даних: ' + error;
        resultBlock.textContent = 'Помилка аналізу';
    }
}
