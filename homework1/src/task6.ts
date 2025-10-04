type Currency = "USD" | "EUR" | "UAH";

const EXCHANGE_RATES = {
    USD_TO_UAH: 41.5,
    USD_TO_EUR: 0.92,

    EUR_TO_UAH: 45.0,
    EUR_TO_USD: 1.09,

    UAH_TO_USD: 0.024,
    UAH_TO_EUR: 0.022
} as const;

function convertCurrency(amount: number, fromCurrency: Currency): string {
    let result = `Конвертація ${amount.toFixed(2)} ${fromCurrency}:\n\n`;

    if (fromCurrency === "UAH") {
        const usd: number = amount * EXCHANGE_RATES.UAH_TO_USD;
        const eur: number = amount * EXCHANGE_RATES.UAH_TO_EUR;

        result += `💵 USD: ${usd.toFixed(2)}\n`;
        result += `💶 EUR: ${eur.toFixed(2)}`;
    } else if (fromCurrency === "USD") {
        const uah: number = amount * EXCHANGE_RATES.USD_TO_UAH;
        const eur: number = amount * EXCHANGE_RATES.USD_TO_EUR;

        result += `💴 UAH: ${uah.toFixed(2)}\n`;
        result += `💶 EUR: ${eur.toFixed(2)}`;
    } else if (fromCurrency === "EUR") {
        const uah: number = amount * EXCHANGE_RATES.EUR_TO_UAH;
        const usd: number = amount * EXCHANGE_RATES.EUR_TO_USD;

        result += `💴 UAH: ${uah.toFixed(2)}\n`;
        result += `💵 USD: ${usd.toFixed(2)}`;
    }

    return result;
}

const convertBtn = document.getElementById('convertBtn') as HTMLButtonElement;
const resultBlockExchange = document.getElementById('resultBlock') as HTMLDivElement;
const resultContentExchange = document.getElementById('result-content') as HTMLElement;

convertBtn?.addEventListener('click', () => {
    const amountInput = document.getElementById('amountInput') as HTMLInputElement;
    const currencySelect = document.getElementById('currencySelect') as HTMLSelectElement;

    const amount: number = parseFloat(amountInput.value);
    const currency = currencySelect.value as Currency;

    if (isNaN(amount) || amount <= 0) {
        alert('Будь ласка, введіть коректну суму!');
        return;
    }

    resultContentExchange.textContent = convertCurrency(amount, currency);
    resultBlockExchange.style.display = 'block';
});