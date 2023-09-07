const url = 'https://jsonplaceholder.typicode.com/users';

class User {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.phone = params.phone;
        this.username = params.username;
    }
}

const getData = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

getData(url)
    .then(data => {
        const users = data.map(item => new User(item));
        localStorageSetArray('users', users);
        users.forEach(user => {
            let div = document.createElement('div');
            div.id = `user${user.id}`;
            div.onclick = () => {
                localStorageDeleteArrayItem('users', user.id);
                deleteDOMElement(`#user${user.id}`);
            };
            div.innerHTML = user.name;
            document.body.append(div)
        })
    })
    .catch(() => console.error('Ошибка'))


const localStorageSetArray = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const localStorageDeleteArrayItem = (key, itemId) => {
    const data = JSON.parse(localStorage.getItem(key));
    const index = data.findIndex(item => item.id === itemId);
    data.splice(index, 1)
    localStorageSetArray(key, data);
}

const deleteDOMElement = elementSelector => {
    const element = document.querySelector(elementSelector);
    element.parentNode.removeChild(element);
}