// Declarando as bibliotecas a serem utilizadas
const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");

// Declarando constantes
// É uma boa prática colocar essas constantes no início, para facilitar
// a manutenção do código. Melhor ainda separar em um arquivo de configuração.
const piadas_nerd = "https://geek-jokes.sameerkumar.website/api?format=json";
const piadas_chuq = "https://api.chucknorris.io/jokes/random";

// Criando o objeto do bot
const bot = new Telegraf(process.env.FUNNY_BOT_TOKEN);

//Mapeando uma ação ao comando padrão de start do bot
bot.start((ctx) => {
  // ctx.reply é a função que retorna mensagem de resposta do bot
  // Ela é um atalho para a função bot.telegram.sendMessage
  // ctx é um objeto de contexto, que guarda informações básicas
  // do usuário que está conversando com o bot
  ctx.reply(`Olá ${ctx.from.first_name}! Eu sou o Funny Bot!`);
});

// As próximas funções mapeiam o que o bot pode 'escutar' ou seja,
// respostas que o usuário escreve e que o bot pode interpretar
// para dar uma resposta

// Se o usuário digitar nerd, o bot vai entender que deve mostrar uma
// piada de nerd
bot.hears("nerd", async (ctx) => {
  let response = await fetch(piadas_nerd);
  let json = await response.json();
  ctx.reply(json.joke);
});

// Se o usuário digitar chuqnoia, o bot vai trazer um Chuck Norris Fact
bot.hears("chuqnoia", async (ctx) => {
  let response = await fetch(piadas_chuq);
  let json = await response.json();
  ctx.reply(json.value);
});

// Se o usuário digitar um número, o bot vai trazer uma tirinha XKCD
bot.hears(/[0-9]+/, async (ctx) => {
  const stripId = ctx.update.message.text;
  const tirinha_xkcd = `https://wvcode-persona-api.herokuapp.com/xkcd/${stripId}`;
  const xkcd_carregando = `Opa, carregando tirinha ${stripId} do XKCD...`;
  const xkcd_erro = `Xi, a tirinha ${stripId} não foi encontrada. Tenta novamente!`;

  // aqui neste if verificamos se temos um número válido
  // em caso afirmativo exibimos a mensagem de carregando e chamamos a API
  if (!isNaN(parseInt(stripId))) {
    ctx.reply(xkcd_carregando);

    let response = await fetch(tirinha_xkcd);

    // se a chamada a api retornou erro, enviamos uma mensagem ao usuário
    // caso nenhum erro ocorra, enviamos para o usuário a imagem
    if (response.status !== 200) {
      ctx.reply(xkcd_erro);
    } else {
      let json = await response.json();
      bot.telegram.sendPhoto(ctx.chat.id, json.img);
    }
  }
});

//Inicia o bot
bot.launch();
