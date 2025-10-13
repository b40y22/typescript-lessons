enum Award {
    Gold = "Золота медаль",
    Silver = "Срібна медаль",
    Bronze = "Бронзова медаль",
    Certificate = "Грамота"
}

type AwardStats = {
    [Award.Gold]: number;
    [Award.Silver]: number;
    [Award.Bronze]: number;
    [Award.Certificate]: number;
}

function generateRandomAward(): Award {
    const awards = [Award.Gold, Award.Silver, Award.Bronze, Award.Certificate];
    const randomIndex = Math.floor(Math.random() * awards.length);
    return awards[randomIndex];
}

function getAwardEmoji(award: Award): string {
    switch (award) {
        case Award.Gold:
            return "🥇";
        case Award.Silver:
            return "🥈";
        case Award.Bronze:
            return "🥉";
        case Award.Certificate:
            return "📜";
        default:
            const _exhaustiveCheck: never = award;
            throw new Error(`Необроблений тип нагороди: ${_exhaustiveCheck}`);
    }
}

function analyzeAwards(awards: Award[]): AwardStats {
    const stats: AwardStats = {
        [Award.Gold]: 0,
        [Award.Silver]: 0,
        [Award.Bronze]: 0,
        [Award.Certificate]: 0
    };

    for (const award of awards) {
        switch (award) {
            case Award.Gold:
                stats[Award.Gold]++;
                break;
            case Award.Silver:
                stats[Award.Silver]++;
                break;
            case Award.Bronze:
                stats[Award.Bronze]++;
                break;
            case Award.Certificate:
                stats[Award.Certificate]++;
                break;
            default:
                const _exhaustiveCheck: never = award;
                throw new Error(`Необроблений тип нагороди: ${_exhaustiveCheck}`);
        }
    }

    return stats;
}

function getMostCommonAward(stats: AwardStats): Award {
    let maxCount = 0;
    let mostCommon: Award = Award.Gold;

    for (const award in stats) {
        const awardType = award as Award;
        const count = stats[awardType];

        if (count > maxCount) {
            maxCount = count;
            mostCommon = awardType;
        }
    }

    return mostCommon;
}

const generateBtn27 = document.getElementById('generateBtn') as HTMLButtonElement;
const resultBlock27 = document.getElementById('resultBlock') as HTMLDivElement;
const arrayContent27 = document.getElementById('array-content') as HTMLElement;
const statsContent27 = document.getElementById('stats-content') as HTMLElement;
const resultContent27 = document.getElementById('result-content') as HTMLElement;

generateBtn27?.addEventListener('click', (): void => {
    const arraySizeInput = document.getElementById('arraySize') as HTMLInputElement;
    const arraySize = parseInt(arraySizeInput.value);

    if (isNaN(arraySize) || arraySize < 5 || arraySize > 100) {
        alert('Будь ласка, введіть коректну кількість нагород (від 5 до 100)!');
        return;
    }

    const awards: Award[] = [];
    for (let i = 0; i < arraySize; i++) {
        awards.push(generateRandomAward());
    }

    const stats = analyzeAwards(awards);

    arrayContent27.textContent = awards
        .map((award, index) => `${index + 1}. ${getAwardEmoji(award)} ${award}`)
        .join('\n');

    statsContent27.textContent =
        `🥇 ${Award.Gold}: ${stats[Award.Gold]}\n` +
        `🥈 ${Award.Silver}: ${stats[Award.Silver]}\n` +
        `🥉 ${Award.Bronze}: ${stats[Award.Bronze]}\n` +
        `📜 ${Award.Certificate}: ${stats[Award.Certificate]}\n\n` +
        `📊 Всього нагород: ${arraySize}`;

    const mostCommon = getMostCommonAward(stats);
    const mostCommonCount = stats[mostCommon];

    let result = `🏆 Найпопулярніша нагорода:\n`;
    result += `${getAwardEmoji(mostCommon)} ${mostCommon}\n`;
    result += `Кількість: ${mostCommonCount} (${((mostCommonCount / arraySize) * 100).toFixed(1)}%)`;

    resultContent27.textContent = result;
    resultBlock27.style.display = 'block';
});