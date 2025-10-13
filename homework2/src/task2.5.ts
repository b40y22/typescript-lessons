type SettingStatus = 'enabled' | 'disabled';

type Settings = {
    [key: string]: SettingStatus;
}

const settings: Settings = {
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

function getEnabledSettings(settings: Settings): string[] {
    const enabled: string[] = [];

    for (const key in settings) {
        if (settings[key] === 'enabled') {
            enabled.push(key);
        }
    }

    return enabled;
}

function formatSettingName(key: string): string {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

const showButton = document.getElementById('showSettings') as HTMLButtonElement;
const allSettingsBlock = document.getElementById('allSettingsBlock') as HTMLDivElement;
const enabledSettingsBlock = document.getElementById('enabledSettingsBlock') as HTMLDivElement;
const allSettingsContent = document.getElementById('all-settings-content') as HTMLElement;
const enabledSettingsContent = document.getElementById('enabled-settings-content') as HTMLElement;

showButton?.addEventListener('click', (): void => {
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
        } else {
            disabledCount++;
        }
    }

    allSettingsContent.textContent = allSettingsText;

    const enabledSettings: string[] = getEnabledSettings(settings);

    let enabledText = `Знайдено увімкнених налаштувань: ${enabledSettings.length}\n\n`;

    if (enabledSettings.length > 0) {
        enabledSettings.forEach((setting, index) => {
            enabledText += `${index + 1}. ✅ ${formatSettingName(setting)}\n`;
        });
    } else {
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