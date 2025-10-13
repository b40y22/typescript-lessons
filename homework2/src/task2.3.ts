type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SeasonNumber = 1 | 2 | 3 | 4;
type SeasonName = "Весна" | "Літо" | "Осінь" | "Зима";

const MONTH_NAMES: Record<string, MonthNumber> = {
    'січень': 1, 'лютий': 2, 'березень': 3, 'квітень': 4,
    'травень': 5, 'червень': 6, 'липень': 7, 'серпень': 8,
    'вересень': 9, 'жовтень': 10, 'листопад': 11, 'грудень': 12
};

const SEASONS: Record<SeasonNumber, SeasonName> = {
    1: "Весна", 2: "Літо", 3: "Осінь", 4: "Зима"
};

function getSeasonInfo(month: MonthNumber): SeasonNumber;
function getSeasonInfo(month: string): SeasonName;

function getSeasonInfo(month: MonthNumber | string): SeasonNumber | SeasonName {
    if (typeof month === 'number') {
        if (month < 1 || month > 12) throw new Error("Місяць повинен бути від 1 до 12");

        if (month >= 3 && month <= 5) return 1;
        if (month >= 6 && month <= 8) return 2;
        if (month >= 9 && month <= 11) return 3;
        return 4;
    } else {
        const monthNum = MONTH_NAMES[month.toLowerCase().trim()];
        if (!monthNum) throw new Error("Некоректна назва місяця");

        return SEASONS[getSeasonInfo(monthNum)];
    }
}

const inputType = document.getElementById('inputType') as HTMLSelectElement;
const numberBlock = document.getElementById('numberInputBlock') as HTMLDivElement;
const nameBlock = document.getElementById('nameInputBlock') as HTMLDivElement;
const resultBlock = document.getElementById('resultBlock') as HTMLDivElement;
const errorBlock = document.getElementById('errorBlock') as HTMLDivElement;

inputType?.addEventListener('change', () => {
    const isNumber = inputType.value === 'number';
    numberBlock.style.display = isNumber ? 'block' : 'none';
    nameBlock.style.display = isNumber ? 'none' : 'block';
    resultBlock.style.display = 'none';
    errorBlock.style.display = 'none';
});

document.getElementById('checkSeason')?.addEventListener('click', () => {
    resultBlock.style.display = 'none';
    errorBlock.style.display = 'none';

    try {
        let result: string;

        if (inputType.value === 'number') {
            const value = parseInt((document.getElementById('monthNumber') as HTMLInputElement).value);
            if (isNaN(value)) throw new Error("Введіть номер місяця");

            const season = getSeasonInfo(value as MonthNumber);
            result = `Місяць ${value} → Пора року №${season} (${SEASONS[season]})`;
        } else {
            const value = (document.getElementById('monthName') as HTMLInputElement).value;
            if (!value.trim()) throw new Error("Введіть назву місяця");

            const season = getSeasonInfo(value);
            result = `"${value}" → ${season}`;
        }

        (document.getElementById('result-content') as HTMLElement).textContent = result;
        resultBlock.style.display = 'block';
    } catch (error) {
        (document.getElementById('error-content') as HTMLElement).textContent =
            error instanceof Error ? error.message : 'Помилка';
        errorBlock.style.display = 'block';
    }
});