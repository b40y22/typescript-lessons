type FirstSeasonMonth = 3 | 6 | 9 | 12;

function validateMonth(month: number): asserts month is FirstSeasonMonth {
    if (month < 1 || month > 12 || !Number.isInteger(month)) {
        throw new Error("❌ Некоректний номер місяця! Місяць повинен бути числом від 1 до 12.");
    }

    if (month !== 3 && month !== 6 && month !== 9 && month !== 12) {
        throw new Error(`❌ Місяць ${month} не є першим місяцем пори року! Перші місяці: 3 (березень), 6 (червень), 9 (вересень), 12 (грудень).`);
    }
}

function getSeason(month: FirstSeasonMonth): string {
    let res: string

    switch (month) {
        case 3:
            res = "Весна";
            break
        case 6:
            res = "Літо";
            break
        case 9:
            res = "Осінь";
            break
        case 12:
            res = "Зима";
            break
        default:
            const _exCheck: never = month
            throw new Error(`Необроблений випадок`);
    }

    return res
}

function determineSeason(month: number): string {
    validateMonth(month);
    const season: string = getSeason(month);

    const seasonEmojis: Record<string, string> = {
        "Весна": "🌸",
        "Літо": "☀️",
        "Осінь": "🍂",
        "Зима": "❄️"
    };

    const monthNames: Record<FirstSeasonMonth, string> = {
        3: "березень",
        6: "червень",
        9: "вересень",
        12: "грудень"
    };

    return `${seasonEmojis[season]} Місяць ${month} (${monthNames[month]}) - це ${season}!`;
}

const checkButton21 = document.getElementById('checkSeason') as HTMLButtonElement;
const resultBlock21 = document.getElementById('resultBlock') as HTMLDivElement;
const errorBlock21 = document.getElementById('errorBlock') as HTMLDivElement;
const resultContent21 = document.getElementById('result-content') as HTMLElement;
const errorContent21 = document.getElementById('error-content') as HTMLElement;

checkButton21?.addEventListener('click', (): void => {
    const monthInput = document.getElementById('monthInput') as HTMLInputElement;
    const monthValue: number = parseInt(monthInput.value);

    resultBlock21.style.display = 'none';
    errorBlock21.style.display = 'none';

    if (!monthInput.value || isNaN(monthValue)) {
        errorContent21.textContent = '❌ Будь ласка, введіть номер місяця!';
        errorBlock21.style.display = 'block';
        return;
    }

    try {
        resultContent21.textContent = determineSeason(monthValue);
        resultBlock21.style.display = 'block';
    } catch (error) {
        errorContent21.textContent = '❌ Помилка: ' + error;
        errorBlock21.style.display = 'block';
    }
});