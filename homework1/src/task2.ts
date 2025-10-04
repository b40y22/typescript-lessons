type Book = {
    title: string;
    author: string;
    year: number;
    pages: number;
    genre: string;
    isbn: string;
    available: boolean;
}

const book: Book = {
    title: "Мальва Ланда",
    author: "Юрій Вінничук",
    year: 2012,
    pages: 384,
    genre: "Історичний роман",
    isbn: "978-966-441-234-7",
    available: true
};

const localStorageBlock: HTMLElement | null = document.getElementById('localStorage-content');

localStorage.setItem('data', JSON.stringify(book));

if (localStorageBlock) {
    try {
        const storedData: string = localStorage.getItem('data')!;
        const parsedData: Data = JSON.parse(storedData);

        localStorageBlock.textContent = JSON.stringify(parsedData, null, 2);
    } catch (error) {
        localStorageBlock.textContent = 'Помилка при читанні даних: ' + error;
    }
}