export const BASE_URL = 'https://api.diploma.vit.students.nomoreparties.co';

export const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          if (err.error) {
            throw new Error(err.error);
          } else {
            throw new Error(err.message);
          }
        });
    }
    return res.json();
  })
  .catch((err) => { 
    throw new Error(err.message);
  });

  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      } 
    })
    .catch((err) => { 
      if (err.status === 400) { 
        throw new Error('Не передано одно из полей');
      }
      else if (err.status === 401) {
        throw new Error('Неправильное имя пользователя или пароль');
      }
    }); 
  };

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
    })
    .then(data => data)
    .catch((err) => { 
      throw new Error(err.message);
    }); 
  };

  export const addCard = (cardData, token) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: cardData.keyword,
        title: cardData.title,
        text: cardData.text,
        date: cardData.date,
        source: cardData.source,
        link: cardData.link,
        image: cardData.image,
      })
    })
    .then((res) => {
      return res.json();
    })
    .catch((err) => { 
      throw new Error(err.message);
    }); 
  };

  export const removeCard = (cardId, token) => {
    return fetch(`${BASE_URL}/articles/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((card) => {
      return card;
    })
    .catch((err) => { 
      throw new Error(err.message);
    });
  }

  export const getCards = (token) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((cards) => {
      return cards;
    })
    .catch((err) => { 
      throw new Error(err.message);
    });
}