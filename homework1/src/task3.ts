type Product = {
    name: string;
    price: number;
    quantity: number;
}

const silpoMottos: string[] = [
    "Посміхайтесь! Життя прекрасне!",
    "Сьогодні чудовий день для нових звершень!",
    "Ви неймовірні! Гарного дня!",
    "Смакуйте кожну мить!",
    "Будьте щасливими! Ви це заслужили!",
    "Сьогодні ваш день!",
    "Радійте життю!",
    "Усмішка - найкраша прикраса!",
    "Ви робите світ кращим!",
    "Кожен день - нова можливість!",
    "Даруйте радість іншим!",
    "Вірте у себе!",
    "Ви особливі! Не забувайте про це!",
    "Хай щастить у всіх справах!",
    "Ловіть позитивні моменти!",
    "Будьте добрими до себе!",
    "Сьогодні - ідеальний день!",
    "Ваша посмішка змінює світ!",
    "Мрійте сміливо!",
    "Дякуємо, що обрали нас!"
];

const generateButton = document.getElementById('generateReceipt') as HTMLButtonElement;
const receiptBlock = document.getElementById('receiptBlock') as HTMLDivElement;
const receiptContent = document.getElementById('receipt-content') as HTMLElement;

generateButton?.addEventListener('click', () => {
    const product1: Product = {
        name: (document.getElementById('product1Name') as HTMLInputElement).value,
        price: parseFloat((document.getElementById('product1Price') as HTMLInputElement).value),
        quantity: parseInt((document.getElementById('product1Quantity') as HTMLInputElement).value)
    };

    const product2: Product = {
        name: (document.getElementById('product2Name') as HTMLInputElement).value,
        price: parseFloat((document.getElementById('product2Price') as HTMLInputElement).value),
        quantity: parseInt((document.getElementById('product2Quantity') as HTMLInputElement).value)
    };

    if (!product1.name || !product2.name || isNaN(product1.price) || isNaN(product2.price) ||
        isNaN(product1.quantity) || isNaN(product2.quantity)) {
        alert('Будь ласка, заповніть всі поля!');
        return;
    }

    const product1Total: number = product1.price * product1.quantity;
    const product2Total: number = product2.price * product2.quantity;
    const subtotal: number = product1Total + product2Total;

    const hasDiscount: boolean = subtotal > 1000;
    const discount: number = hasDiscount ? subtotal * 0.01 : 0;
    const totalSum: number = subtotal - discount;

    const randomMotto: string = silpoMottos[Math.floor(Math.random() * silpoMottos.length)];

    // Формування чека
    let receipt: string = `
═══════════════════════════════════════
                СІЛЬПО
═══════════════════════════════════════

${product1.name}
  ${product1.quantity} шт. x ${product1.price.toFixed(2)} грн = ${product1Total.toFixed(2)} грн

${product2.name}
  ${product2.quantity} шт. x ${product2.price.toFixed(2)} грн = ${product2Total.toFixed(2)} грн

───────────────────────────────────────
ПРОМІЖНИЙ ПІДСУМОК:      ${subtotal.toFixed(2)} грн`;

    if (hasDiscount) {
        receipt += `
ЗНИЖКА 1%:               -${discount.toFixed(2)} грн`;
    }

    receipt += `
───────────────────────────────────────
ВСЬОГО ДО СПЛАТИ:        ${totalSum.toFixed(2)} грн
#######################################

   ${randomMotto}

#######################################

    `;

    receiptContent.textContent = receipt;
    receiptBlock.style.display = 'block';
});