const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('options.js');
const token = '6096055544:AAHF4-8dwRpkW6ShcEjcGCuhutb77lma-M4'


const bot = new TelegramApi(token, {polling: true})

const chats = {};



const startGame = async (chatID) => {
    bot.sendMessage(chatID, `Сейчас, я, загадаю число от 0 до 9, а ты должен ее угадать!`);
    // const randomNumber = Math.floor(Math.random() * 10)
    const randomNumber = 9;
    chats[chatID] = randomNumber;

     bot.sendMessage(chatID, 'Отгадывай', gameOptions);
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: `You are welcome`},
        {command: '/about', description: 'About us'},
        {command: '/game', description: 'Game'},
    ])





bot.on('message', msg => {

    const text = msg.text;
    const chatID = msg.chat.id;
    const userName = msg.chat.first_name;
    const dateMsg = msg.date;


    if (text === '/start') {
        bot.sendMessage(chatID, `Добро пожаловать ,${userName}! `);

        bot.sendAudio(chatID, 'data-media/hello.ogg');
        return bot.sendPhoto(chatID, 'data-media/hello.jpg');
    }
    if (text == '/about') {
        bot.sendMessage(chatID, `Привет,${userName},мы молодая группа программистов EANcall.records.
Мечтаем подняться на битке и купить гелик `);
        // bot.sendPhoto(chatID, 'friends.jpg');
        bot.sendVideo(chatID, 'data-media/zoolander-walkoff.gif');
        return bot.sendMessage(chatID, `Кубаныч:@kbzub
Мартин:@gasss1911
Бакыт:@bahaumesh`)
    }
    if (text == '/game') {
        return startGame(chatID);
    }


    bot.sendMessage(chatID, 'Я не понимайю, попробуй еще раз!');
    return bot.sendSticker(chatID, 'https://tlgrm.eu/_/stickers/4ed/ccf/4edccf0f-e415-3d52-92c7-f8a9a3b114a0/5.webp');


});

bot.on('callback_query', msg => {

    const data = msg.data;
    const chatID = msg.message.chat.id;

    if(data == '/again') {
return startGame(chatID);
    }

    if(data === chats[chatID]) {
        return bot.sendMessage(chatID, `Поздравляю ! Ты угадал цифру - ${data}`);
    } else {
        return bot.sendMessage(chatID, `К сожалению ты не угадал, бот загадал цифру ${chats[chatID]}`, againOptions);
    }





})
}
start()
