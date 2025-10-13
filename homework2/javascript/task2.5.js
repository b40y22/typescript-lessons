"use strict";
const settings = {
    'darkMode': 'enabled',
    'notifications': 'enabled',
    'autoSave': 'disabled',
    'twoFactorAuth': 'enabled',
    'emailUpdates': 'disabled',
    'locationServices': 'enabled',
    'cookies': 'enabled',
    'analytics': 'disabled',
    'soundEffects': 'enabled',
    'backgroundSync': 'disabled'
};
function getEnabledSettings(settings) {
    const enabled = [];
    for (const key in settings) {
        if (settings[key] === 'enabled') {
            enabled.push(key);
        }
    }
    return enabled;
}
function formatSettingName(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}
const showButton = document.getElementById('showSettings');
const allSettingsBlock = document.getElementById('allSettingsBlock');
const enabledSettingsBlock = document.getElementById('enabledSettingsBlock');
const allSettingsContent = document.getElementById('all-settings-content');
const enabledSettingsContent = document.getElementById('enabled-settings-content');
showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener('click', () => {
    let allSettingsText = '';
    let enabledCount = 0;
    let disabledCount = 0;
    for (const key in settings) {
        const status = settings[key];
        const emoji = status === 'enabled' ? '✅' : '❌';
        const statusText = status === 'enabled' ? 'Увімкнено' : 'Вимкнено';
        allSettingsText += `${emoji} ${formatSettingName(key)}: ${statusText}\n`;
        if (status === 'enabled') {
            enabledCount++;
        }
        else {
            disabledCount++;
        }
    }
    allSettingsContent.textContent = allSettingsText;
    const enabledSettings = getEnabledSettings(settings);
    let enabledText = `Знайдено увімкнених налаштувань: ${enabledSettings.length}\n\n`;
    if (enabledSettings.length > 0) {
        enabledSettings.forEach((setting, index) => {
            enabledText += `${index + 1}. ✅ ${formatSettingName(setting)}\n`;
        });
    }
    else {
        enabledText += 'Немає увімкнених налаштувань';
    }
    enabledText += `\n\n📊 Статистика:\n`;
    enabledText += `Увімкнено: ${enabledCount}\n`;
    enabledText += `Вимкнено: ${disabledCount}\n`;
    enabledText += `Всього: ${enabledCount + disabledCount}`;
    enabledSettingsContent.textContent = enabledText;
    allSettingsBlock.style.display = 'block';
    enabledSettingsBlock.style.display = 'block';
});
