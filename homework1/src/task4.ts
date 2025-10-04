type DayInput = number | string
type Result = {
    isValid: boolean;
    isWorking: boolean;
    message: string
}

function isWorkingDay(day: DayInput): Result {
    let dayNumber: number;

    if (typeof day === 'number') {
        dayNumber = day;
    } else {
        const dayNames: { [key: string]: number } = {
            'понеділок': 1,
            'вівторок': 2,
            'середа': 3,
            'четвер': 4,
            'п\'ятниця': 5,
            'пятниця': 5,
            'субота': 6,
            'неділя': 7
        };

        const normalizedDay: string = day.toLowerCase().trim();
        dayNumber = dayNames[normalizedDay] || parseInt(day);
    }

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
        return {
            isValid: false,
            isWorking: false,
            message: '❌ Помилка! День має бути числом від 1 до 7 або назвою дня тижня'
        };
    }

    const isWorking: boolean = dayNumber >= 1 && dayNumber <= 5;

    return {
        isValid: true,
        isWorking: isWorking,
        message: isWorking
            ? `✅ ${day} - це РОБОЧИЙ ДЕНЬ`
            : `🏖️ ${day} - це ВИХІДНИЙ ДЕНЬ`
    };
}

const checkButton = document.getElementById('checkDay') as HTMLButtonElement;
const resultBlock4 = document.getElementById('resultBlock') as HTMLDivElement;
const resultContent = document.getElementById('result-content') as HTMLElement;

checkButton?.addEventListener('click', (): void => {
    const dayInput: string = (document.getElementById('dayInput') as HTMLInputElement).value;

    if (!dayInput) {
        alert('Будь ласка, введіть день!');
        return;
    }

    const dayValue: DayInput = isNaN(parseInt(dayInput)) ? dayInput : parseInt(dayInput);

    const result: Result = isWorkingDay(dayValue);

    resultContent.textContent = result.message;
    resultBlock4.style.display = 'block';
});