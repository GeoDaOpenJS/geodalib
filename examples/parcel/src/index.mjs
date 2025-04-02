import { quantileBreaks } from '@geoda/core';

async function init() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const breaks = await quantileBreaks(5, data);

  document.getElementById('app').innerHTML = `
    <h1>Hello JavaScript!</h1>
    <p>Breaks: ${breaks}</p>
  `;
}

init();
