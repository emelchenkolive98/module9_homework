const result = document.querySelector('.result');
const inputNumber = document.querySelector('.input');

document.querySelector('.btn').addEventListener('click', addButton);

function addButton() {
  if (inputNumber.value < 1 || inputNumber.value > 10) {
    result.textContent = 'Число вне диапазона от 1 до 10';
  } else {
    result.textContent = '';

    // Создаем экзепляр класса XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Инициализируем запрос
    xhr.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${inputNumber.value}`);

    // Добавляем обработчик ответа сервера
    xhr.onload = function () {
      if (xhr.status < 200 || xhr.status > 299) {
        console.log(`Статус ответа:, ${xhr.status}`);
      } else {

        // Парсим и перебираем
        let parse = JSON.parse(xhr.responseText);

        parse.forEach(images => {
          let img = document.createElement('img');
          img.src = images.thumbnailUrl;
          result.appendChild(img);
        });
      }
    }

    // Добавляем обрабочик процесса загрузки
    xhr.onprogress = function (e) {
      console.log(`Загружено ${e.loaded} из ${e.total}`);
    }

    // Добавляем обработчик ошибки
    xhr.onerror = function () {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    }

    // Отправляем запрос
    xhr.send();
  }
}