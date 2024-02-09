const http = require('http');
const express = require('express');
const aplicacao = express();
const server = http.createServer(aplicacao);
const io = require('socket.io')(server);

aplicacao.use(express.static('public'));

let porta = process.env.PORT || 3000; // Usar a porta fornecida pelo ambiente ou a 3000 por padrão

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('newMsg', (dadosMensagem) => {
        io.emit('newMsg', dadosMensagem);
    });
});

server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});


