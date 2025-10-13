type Input = number | string;

function getLastElement(value: Input): string {
    if (typeof value === 'number') {
        const lastDigit: number = Math.abs(value) % 10;
        return `🔢 Остання цифра числа ${value}: ${lastDigit}`;
    } else {
        if (value.length === 0) {
            throw new Error("❌ Рядок не може бути порожнім!");
        }
        const lastChar: string = value[value.length - 1];
        return `📝 Останній символ рядка "${value}": "${lastChar}"`;
    }
}

const checkButton22 = document.getElementById('checkValue') as HTMLButtonElement;
const resultBlock22 = document.getElementById('resultBlock') as HTMLDivElement;
const errorBlock22 = document.getElementById('errorBlock') as HTMLDivElement;
const resultContent22 = document.getElementById('result-content') as HTMLElement;
const errorContent22 = document.getElementById('error-content') as HTMLElement;

checkButton22?.addEventListener('click', (): void => {
    const inputElement = document.getElementById('valueInput') as HTMLInputElement;
    const inputValue: string = inputElement.value;

    resultBlock22.style.display = 'none';
    errorBlock22.style.display = 'none';

    if (!inputValue) {
        errorContent22.textContent = '❌ Будь ласка, введіть значення!';
        errorBlock22.style.display = 'block';
        return;
    }

    try {
        let processedValue: Input;

        const numValue: number = Number(inputValue);
        if (!isNaN(numValue) && inputValue.trim() !== '') {
            processedValue = numValue;
        } else {
            processedValue = inputValue;
        }

        resultContent22.textContent = getLastElement(processedValue);
        resultBlock22.style.display = 'block';
    } catch (error) {
        errorContent22.textContent = String(error);
        errorBlock22.style.display = 'block';
    }
});