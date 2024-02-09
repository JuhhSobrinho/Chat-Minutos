const { createServer } = require('http');
const { Server } = require('ws');
const { Server: SocketServer } = require('socket.io');

const httpServer = createServer();
const wss = new Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Cliente conectado via WebSocket');

  ws.on('message', (message) => {
    console.log(`Mensagem recebida via WebSocket: ${message}`);
    io.emit('newMsg', JSON.parse(message));
  });
});

const io = new SocketServer(httpServer, {
  cors: {
    origin: 'https://chat-minuto.netlify.app', // Altere para o seu domínio
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado via Socket.IO');

  socket.on('newMsg', (dadosMensagem) => {
    console.log('Mensagem recebida via Socket.IO:', dadosMensagem);
  });
});

io.httpServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
  response.end('WebSocket servidor ativo.');
});

httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${PORT}`);
});
