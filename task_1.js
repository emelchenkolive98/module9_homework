//Задание 1

// Создание экземпляра класса DOMParser. Он позволит парсить XML
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Преобразование XML в JS-объект
const student = Array.from(xmlDOM.querySelectorAll('student')).map(student => ({
  name: student.querySelector('name > first').textContent + ' ' + student.querySelector('name > second').textContent,
  age: Number(student.querySelector('age').textContent),
  prof: student.querySelector('prof').textContent,
  lang: student.querySelector('name').getAttribute('lang')
}));

const result = { list: student };
console.log(result);