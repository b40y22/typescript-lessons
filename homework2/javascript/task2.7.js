"use strict";
var Award;
(function (Award) {
    Award["Gold"] = "\u0417\u043E\u043B\u043E\u0442\u0430 \u043C\u0435\u0434\u0430\u043B\u044C";
    Award["Silver"] = "\u0421\u0440\u0456\u0431\u043D\u0430 \u043C\u0435\u0434\u0430\u043B\u044C";
    Award["Bronze"] = "\u0411\u0440\u043E\u043D\u0437\u043E\u0432\u0430 \u043C\u0435\u0434\u0430\u043B\u044C";
    Award["Certificate"] = "\u0413\u0440\u0430\u043C\u043E\u0442\u0430";
})(Award || (Award = {}));
function generateRandomAward() {
    const awards = [Award.Gold, Award.Silver, Award.Bronze, Award.Certificate];
    const randomIndex = Math.floor(Math.random() * awards.length);
    return awards[randomIndex];
}
function getAwardEmoji(award) {
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
            const _exhaustiveCheck = award;
            throw new Error(`Необроблений тип нагороди: ${_exhaustiveCheck}`);
    }
}
function analyzeAwards(awards) {
    const stats = {
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
                const _exhaustiveCheck = award;
                throw new Error(`Необроблений тип нагороди: ${_exhaustiveCheck}`);
        }
    }
    return stats;
}
function getMostCommonAward(stats) {
    let maxCount = 0;
    let mostCommon = Award.Gold;
    for (const award in stats) {
        const awardType = award;
        const count = stats[awardType];
        if (count > maxCount) {
            maxCount = count;
            mostCommon = awardType;
        }
    }
    return mostCommon;
}
const generateBtn27 = document.getElementById('generateBtn');
const resultBlock27 = document.getElementById('resultBlock');
const arrayContent27 = document.getElementById('array-content');
const statsContent27 = document.getElementById('stats-content');
const resultContent27 = document.getElementById('result-content');
generateBtn27 === null || generateBtn27 === void 0 ? void 0 : generateBtn27.addEventListener('click', () => {
    const arraySizeInput = document.getElementById('arraySize');
    const arraySize = parseInt(arraySizeInput.value);
    if (isNaN(arraySize) || arraySize < 5 || arraySize > 100) {
        alert('Будь ласка, введіть коректну кількість нагород (від 5 до 100)!');
        return;
    }
    const awards = [];
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
