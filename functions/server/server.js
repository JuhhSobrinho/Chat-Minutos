const { createServer } = require('http');
const { Server } = require('ws');
const { Server: SocketServer } = require('socket.io');

// Criar servidor HTTP para WebSocket
const httpServer = createServer();

// Criar servidor WebSocket
const wss = new Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Cliente conectado via WebSocket');

  ws.on('message', (message) => {
    console.log(`Mensagem recebida via WebSocket: ${message}`);

    // Encaminhar mensagem para o Socket.IO
    io.emit('newMsg', JSON.parse(message));
  });
});

// Criar servidor Socket.IO
const io = new SocketServer(httpServer, {
  cors: {
    origin: 'https://seu-app-netlify.netlify.app',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado via Socket.IO');

  socket.on('newMsg', (dadosMensagem) => {
    console.log('Mensagem recebida via Socket.IO:', dadosMensagem);
    // Lógica adicional, se necessário
  });
});

// Configurar a rota /socket.io/ para o servidor Socket.IO
io.httpServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('WebSocket servidor ativo.');
});

// Lidar com upgrade para WebSocket
httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${PORT}`);
});
