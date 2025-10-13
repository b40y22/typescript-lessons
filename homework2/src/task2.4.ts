type WorkingDay = 1 | 2 | 3 | 4 | 5;
type WeekendDay = "субота" | "неділя";
type HolidayName = "Новий рік" | "Різдво" | "8 Березня" | "Великдень" | "День Праці" | "День Перемоги" | "День Незалежності";
type DayElement = WorkingDay | WeekendDay | HolidayName;

type DayStats = {
    workingDays: number;
    weekendDays: number;
    holidayDays: number;
}

const weekendDays: WeekendDay[] = ["субота", "неділя"];
const holidayNames: HolidayName[] = [
    "Новий рік",
    "Різдво",
    "8 Березня",
    "Великдень",
    "День Праці",
    "День Перемоги",
    "День Незалежності"
];

function generateRandomDayElement(): DayElement {
    const randomType = Math.floor(Math.random() * 3);

    switch (randomType) {
        case 0:
            return (Math.floor(Math.random() * 5) + 1) as WorkingDay;
        case 1:
            return weekendDays[Math.floor(Math.random() * weekendDays.length)];
        case 2:
            return holidayNames[Math.floor(Math.random() * holidayNames.length)];
        default:
            return 1;
    }
}

function isWorkingDay(element: DayElement): element is WorkingDay {
    return typeof element === 'number' && element >= 1 && element <= 5;
}

function isWeekendDay(element: DayElement): element is WeekendDay {
    return typeof element === 'string' && weekendDays.includes(element as WeekendDay);
}

function isHolidayDay(element: DayElement): element is HolidayName {
    return typeof element === 'string' && holidayNames.includes(element as HolidayName);
}

function analyzeDaysArray(daysArray: DayElement[]): DayStats {
    let workingCount = 0;
    let weekendCount = 0;
    let holidayCount = 0;

    for (const element of daysArray) {
        if (isWorkingDay(element)) {
            workingCount++;
        } else if (isWeekendDay(element)) {
            weekendCount++;
        } else if (isHolidayDay(element)) {
            holidayCount++;
        }
    }

    return {
        workingDays: workingCount,
        weekendDays: weekendCount,
        holidayDays: holidayCount
    };
}

function formatDayElement(element: DayElement): string {
    if (isWorkingDay(element)) {
        const dayNames: Record<WorkingDay, string> = {
            1: "понеділок",
            2: "вівторок",
            3: "середа",
            4: "четвер",
            5: "п'ятниця"
        };
        return `📅 ${element} (${dayNames[element]})`;
    } else if (isWeekendDay(element)) {
        return `🏖️ ${element}`;
    } else {
        return `🎉 ${element}`;
    }
}

const generateBtn24 = document.getElementById('generateBtn') as HTMLButtonElement;
const resultBlock24 = document.getElementById('resultBlock') as HTMLDivElement;
const arrayContent = document.getElementById('array-content') as HTMLElement;
const statsContent = document.getElementById('stats-content') as HTMLElement;
const resultContent = document.getElementById('result-content') as HTMLElement;

generateBtn24?.addEventListener('click', () => {
    const arraySizeInput = document.getElementById('arraySize') as HTMLInputElement;
    const arraySize = parseInt(arraySizeInput.value);

    if (isNaN(arraySize) || arraySize < 5 || arraySize > 100) {
        alert('Будь ласка, введіть коректну кількість елементів (від 5 до 100)!');
        return;
    }

    const daysArray: DayElement[] = [];
    for (let i = 0; i < arraySize; i++) {
        daysArray.push(generateRandomDayElement());
    }

    const stats = analyzeDaysArray(daysArray);

    arrayContent.textContent = daysArray
        .map((element, index) => `${index + 1}. ${formatDayElement(element)}`)
        .join('\n');

    statsContent.textContent =
        `📅 Робочих днів: ${stats.workingDays}\n` +
        `🏖️ Вихідних днів: ${stats.weekendDays}\n` +
        `🎉 Святкових днів: ${stats.holidayDays}`;

    let result: string;
    if (stats.holidayDays > stats.weekendDays) {
        result = `🎉 Святкових днів було БІЛЬШЕ!\n(${stats.holidayDays} > ${stats.weekendDays})`;
    } else if (stats.weekendDays > stats.holidayDays) {
        result = `🏖️ Вихідних днів було БІЛЬШЕ!\n(${stats.weekendDays} > ${stats.holidayDays})`;
    } else {
        result = `⚖️ Святкових і вихідних днів ПОРІВНУ!\n(${stats.holidayDays} = ${stats.weekendDays})`;
    }

    resultContent.textContent = result;
    resultBlock24.style.display = 'block';
});