# Funny Bot

Um bot do telegram que conta piadas!

## Objetivo

O objetivo de criar este bot foi para demonstrar para alunos de 1o semestre da faculdade o dia-a-dia de uma pessoa desenvolvedora e quais os desafios existentes para se criar uma aplicação. O bot do telegram foi utilizado por ser um tópico atual ([conheça mais sobre bots](https://medium.com/botsbrasil)).

## Onde tudo começa - Requisitos

Em um ambiente empresarial, a pessoa desenvolvedora recebe um requisito, no formato de uma estória de usuário ou documento de requisitos que diz o que precisa ser criado ou alterado em uma aplicação, sem no entanto, entrar nos detalhes técnicos. Geralmente, os requisitos especificam o que o usuário da aplicação espera do comportamento.

Para a nossa demonstração, o nosso requisito será bem simples:

```
Crie um bot na plataforma telegram que seja capaz de contar piadas e mostrar as tirinhas do site XKCD.
```

Observe que o requisito não especificou claramente de onde devemos buscar essas piadas. Temos apenas uma referência para as tirinhas, que é o site XKCD. Em situações como essa, a pessoa desenvolvedora tem duas opções: realizar uma pesquisa na internet para descobrir possíveis fontes de dados que atendam ao requisito (e posteriormente aprovar com o usuário) ou solicitar ao usuário que informe de quais fontes ele deseja buscar a informação.

Já se a pessoa desenvolvedora está programando de maneira independente, concretizando uma idéia, seja por lucro ou diversão (sim, acreditem, programar é divertido!), os requisitos são criados de maneira mais informal, isso quando são pensados. Uma dica: organize suas idéias para que consiga tira-las de sua cabeça e concretiza-las!

Para facilitar o nosso aprendizado, seguem aqui sugestões de fontes de dados para usarmos. Essas idéias foram tiradas do seguinte repositório da internet: [Public APIs](https://github.com/public-apis/public-apis).

Essas fontes de dados são chamadas de APIs e tem como objetivo facilitar o acesso a informação. Geralmente uma API tem vários endpoints, que nada mais são que URLs parecidos com o de um site, mas que retornam dados. Você pode inclusive tentar no seu browser diretamente. APIs retornam a informação geralmente no formato [JSON](https://pt.wikipedia.org/wiki/JSON).

- Chuck Norris Jokes - Chuck Norris é uma lenda da internet graças as piadas em forma de 'Fatos'. Quer saber mais sobre o Chuck Norris? Leia [aqui](https://pt.wikipedia.org/wiki/Chuck_Norris#Meme_de_Internet)

  - URL: https://api.chucknorris.io/jokes/random.
  - Formato:
    ```json
    {
      "categories": [],
      "created_at": "2020-01-05 13:42:29.296379",
      "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      "id": "jSy8jwZLQgKNJW0PBhMZAg",
      "updated_at": "2020-01-05 13:42:29.296379",
      "url": "https://api.chucknorris.io/jokes/jSy8jwZLQgKNJW0PBhMZAg",
      "value": "Chuck Norris can turn out the light, brush his teeth and get into bed before the room gets dark."
    }
    ```

- Geek Jokes - Piadas para nerds.
  - URL: https://geek-jokes.sameerkumar.website/api?format=json
  - Formato:
    ```json
    {
      "joke": "Beware of programmers that carry screwdrivers."
    }
    ```
- Tirinhas XKCD: O site XKCD (https://xkcd.com) contém tirinhas baseados em assuntos científicos.
  - URL: https://wvcode-persona-api.herokuapp.com/xkcd/${numero}
    - ${numero} deve ser substituido por um numero qualquer e retornará a tirinha correspondente
  - Formato:
    ```json
    {
      "month": "1",
      "num": 1,
      "link": "",
      "year": "2006",
      "news": "",
      "safe_title": "Barrel - Part 1",
      "transcript": "[[A boy sits in a barrel which is floating in an ocean.]]\nBoy: I wonder where I'll float next?\n[[The barrel drifts into the distance. Nothing else can be seen.]]\n{{Alt: Don't we all.}}",
      "alt": "Don't we all.",
      "img": "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg",
      "title": "Barrel - Part 1",
      "day": "1"
    }
    ```

## Criando a Solução Técnica

Nesta fase, tendo já os requisitos bem definidos, a pessoa desenvolvedora irá começar nas tecnologias que serão necessárias para atender os requisitos.

Normalmente, a pessoa desenvolvedora irá decidir, baseada em uma boa pesquisa na internet, os seguintes pontos:

- Qual a linguagem de programação mais indicada para a tarefa?
- Que bibliotecas a linguagem possui que auxiliam a resolver o problema?
- Essas bibliotecas são seguras?

No nosso caso, escolhemos a linguagem Javascript, por ser a única linguagem de programação que a turma conhece. Mais especificamente, como o código do bot não é um código que é executado a partir de uma página HTML, iremos utilizar javascript send executada através do [nodeJS](https://nodejs.org/en/).

O assunto bibliotecas por si só é um mundo a parte. Chamamos de bibliotecas ou _libraries_ em inglês a um pedaço de código que é auto-contido e que nos ajuda a escrever o nosso código. Geralmente, a biblioteca existe para resolver um problema específico em nosso código. No caso da nossa implementação de bot, precisamos de uma biblioteca para se conectar ao Telegram e também uma biblioteca que possa fazer a chamada as APIs.

Pesquisando na internet por artigos atuais, temos que as seguintes bibliotecas podem ser usadas para nosso objetivo:

- Telegraf - para conexão ao Telegram
  - URL: https://telegraf.js.org/
- Node-fetch - para buscar dados em APIs
  - URL: https://github.com/node-fetch/node-fetch

Como iremos utilizar node, as bibliotecas que instalamos em nosso programa podem ser gerenciadas através do [NPM](https://www.npmjs.com/).

## A SOLUÇÃO - Passo a Passo

O código completo do nosso bot está aqui neste repositório (arquivo index.js), e colocamos comentários.

Abaixo, iremos listar os passos para que você consiga ver o bot funcionando.

1. Clone este repositório

```
$ /projetos/ > git clone https://github.com/wvcode/funny-bot.git
```

2. Navegue até o diretório recém-criado

```
$ /projetos/ > cd funny-bot
```

3. Rode o comando para instalar as bibliotecas

```
$ /projetos/funny-bot > npm install
```

4. Crie o seu próprio bot no Telegram
   1. Abra o Telegram e procure pelo BotFather
   2. Inicie a conversa com o BotFather
   3. Digite o comando /newbot
   4. Digite um nome para o seu bot
   5. Digite um username para o seu bot
   6. Copie o token
5. Altere a linha 5 do index.js substituindo a variável process.env.FUNNY_BOT_TOKEN com o seu token ou criando uma variável de ambiente chamada FUNNY_BOT_TOKEN com o valor do seu token
6. Agora é só rodar:

```
$ /projetos/funny-bot > node index.js
```

7. Se nenhum erro ocorreu, vá até o Telegram, procure o seu bot pelo Nome ou username e clique START button. Voilá, seu bot no ar!

## Finalizando

Espero que este pequeno tutorial, associado a gravação da palestra tenha ajudado vocês a entender um pouco como é o dia a dia de uma pessoa desenvolvedora e que tenham gostado de criar um bot de maneira tão rápida!

Att,

Walter
