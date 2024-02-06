const http = require('http');
const express = require('express');
const aplicacao = express();

const servidor = require('./servidor');

const port = 3000;

const servidorHttp = http.createServer(aplicacao);
const io = require('socket.io')(servidorHttp);

aplicacao.use(express.static('public'));

io.addListener('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('newMsg', (dadosMensagem) => {
        io.emit('newMsg', dadosMensagem);
    });
})



servidorHttp.listen(port, '192.168.0.3');


