const APIKEY = '9a85e58bf1d64dcab6f8e933010a49cc';
const BASE_URL = 'http://newsapi.org';

const dateLocales = "fr-CA";
const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const from = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now() - oneWeek);
const to = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now());

export function searchNews (inputValue) {
    return fetch (
        `${BASE_URL}/v2/everything?` +
        `q=${inputValue}&` +
        `from=${from}&` +
        `to=${to}&` +
        `pageSize=100&` +
        `apiKey=${APIKEY}`
    )
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((news) => {
        return news;
    })
    .catch((err) => { 
        throw new Error(err.message);
    });
}