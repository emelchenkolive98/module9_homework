document.addEventListener('DOMContentLoaded', function () {
  const inputNumber = document.querySelector('.input-one');
  const inputLimit = document.querySelector('.input-two');
  const result = document.querySelector('.result');

  document.querySelector('.btn').addEventListener('click', addButton);

  function addButton() {
    let inputOne = inputNumber.value;
    let inputTwo = inputLimit.value;

    if (isNaN(inputOne) || inputOne < 1 || inputOne > 10) {
      result.textContent = `Номер страницы вне диапазона от 1 до 10`;
    } else if (isNaN(inputTwo) || inputTwo < 1 || inputTwo > 10) {
      result.textContent = `Лимит вне диапазона от 1 до 10`;
    } else if (isNaN(inputOne) || isNaN(inputTwo) || inputOne < 1 || inputOne > 10 || inputTwo < 1 || inputTwo > 10) {
      result.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else {
      result.textContent = '';

      fetchImages(inputOne, inputTwo);
      let timeOut = setTimeout(function () {
        fetchImages(inputOne, inputTwo);
      }, 2000);
      clearTimeout(timeOut);

      // Сохраняем данные в локальное хранилище
      localStorage.setItem('request', JSON.stringify({ inputOne, inputTwo }));
    }
  }

  function fetchImages(inputOne, inputTwo) {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${inputOne}&_limit=${inputTwo}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Что-то пошло не так');
        }
        return res.json();
      })
      .then(data => {
        data.forEach(image => {
          const img = document.createElement('img');
          img.src = image.thumbnailUrl;
          result.appendChild(img);
        });
      })
      .catch(err => {
        console.log('Произошла ошибка с запросом:', err);
        result.textContent = 'Ошибка запроса';
      });
  }

  // Проверяем наличие сохраненных данных в локальном хранилище
  const request = JSON.parse(localStorage.getItem('request'));
  if (request) {
    inputNumber.value = request.inputOne;
    inputLimit.value = request.inputTwo;
    addButton();
  }
});