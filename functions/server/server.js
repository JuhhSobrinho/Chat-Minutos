const { Server } = require('ws');
const { Server: SocketServer } = require('socket.io');

// Criar servidor WebSocket
const wss = new Server({ noServer: true });

// Criar servidor Socket.IO
const io = new SocketServer({
  cors: {
    origin: 'https://chat-minuto.netlify.app', // Seu domínio
    methods: ['GET', 'POST']
  }
});

// Configurar a rota /socket.io/ para o servidor Socket.IO
io.httpServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
  response.end('WebSocket servidor ativo.');
});

// Lidar com upgrade para WebSocket
exports.handler = async (event) => {
  const { request, socket, head } = event;
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });

  io.attach(wss);

  return {
    statusCode: 200,
    body: 'WebSocket servidor ativo.',
  };
};
