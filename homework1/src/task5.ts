type GeneratedValue = number | string;

function generateRandomValue(): GeneratedValue {
    if (Math.random() < 0.5) {
        return Math.floor(Math.random() * 100);
    } else {
        return "Ок";
    }
}

const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const resultBlockRandom = document.getElementById('resultBlock') as HTMLDivElement;
const valuesContent = document.getElementById('values-content') as HTMLElement;
const statsContent = document.getElementById('stats-content') as HTMLElement;
const resultContentRandom = document.getElementById('result-content') as HTMLElement;

generateBtn?.addEventListener('click', () => {
    const values: GeneratedValue[] = [];
    let numberCount: number = 0;
    let stringCount: number = 0;

    for (let i = 0; i < 10; i++) {
        const value: GeneratedValue = generateRandomValue();
        values.push(value);

        if (typeof value === 'number') {
            numberCount++;
        } else {
            stringCount++;
        }
    }

    const lastValue: GeneratedValue = values[values.length - 1];

    valuesContent.textContent = values.map((v, i) => `${i + 1}. ${v}`).join('\n');

    statsContent.textContent = `Чисел: ${numberCount}\nРядків "Ок": ${stringCount}`;

    let result: string;
    if (numberCount > stringCount) {
        result = `📊 Чисел було БІЛЬШЕ (${numberCount} > ${stringCount})`;
    } else if (stringCount > numberCount) {
        result = `📝 Рядків "Ок" було БІЛЬШЕ (${stringCount} > ${numberCount})`;
    } else {
        result = `⚖️ Порівну! (${numberCount} = ${stringCount})`;
    }

    result += `\n\nОстаннє значення: ${lastValue}`;

    resultContentRandom.textContent = result;
    resultBlockRandom.style.display = 'block';
});