const inputOne = document.querySelector('.input-one');
const inputTwo = document.querySelector('.input-two');
const result = document.querySelector('.result');

document.querySelector('.btn').addEventListener('click', addButton);

function addButton() {
  if (isNaN(inputOne.value) || isNaN(inputTwo.value) || inputOne.value < 100 || inputOne.value > 300 || inputTwo.value < 100 || inputTwo.value > 300) {
    result.textContent = 'Одно из чисел вне диапазона от 100 до 300';
  } else {
    result.textContent = '';

    fetch(`https://dummyimage.com/${inputOne.value}x${inputTwo.value}/`)
      .then(res => {
        if (!res.ok) {
          throw Error('Что-то пошло не так!');
        }
        return res.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        const image = document.createElement('img');
        image.src = imageUrl;
        result.appendChild(image);
      })
      .catch(err => {
        console.log('Ошибка запроса:', err);
      });
  }
}