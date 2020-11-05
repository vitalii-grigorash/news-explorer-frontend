const apiKey = '9a85e58bf1d64dcab6f8e933010a49cc';

export const searchNews = (inputValue) => fetch (
    `http://newsapi.org/v2/everything?q=${inputValue}&from=2020-11-04&sortBy=popularity&apiKey=${apiKey}`)
    .then((res) => {
        return res.json()
    })