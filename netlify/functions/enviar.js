// Função-servidor: recebe os dados do app (mesma origem, sem bloqueios de
// navegador) e repassa para o Google Apps Script por trás dos panos.

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3yZ9xO8si8z6pfR2ZoqwTIf4VsnuDfMj8AAwN6WXpwWwKVgp17EETp1Fha26qbfU3/exec';

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const resposta = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: event.body
    });

    const texto = await resposta.text();

    return {
      statusCode: 200,
      body: texto
    };
  } catch (erro) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: erro.message })
    };
  }
};
