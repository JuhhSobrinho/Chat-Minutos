const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();


const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('newMsg', (dadosMensagem) => {
    io.emit('newMsg', dadosMensagem);
  });
});

// index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.suaFuncao = functions.https.onRequest((req, res) => {
    console.log('Função iniciada.'); // Adicione este log para indicar que a função foi iniciada.

    // Restante do seu código aqui.

    console.log('Função concluída.'); // Adicione este log para indicar que a função foi concluída.
    return res.status(200).send('OK');
});


exports.app = functions.https.onRequest(app);
