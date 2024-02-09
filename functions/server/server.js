const { Server: WebSocketServer } = require('ws');

let wss;

const startWebSocket = () => {
  wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket');

    ws.on('message', (message) => {
      console.log(`Mensagem recebida via WebSocket: ${message}`);
      // Adapte conforme necessário para enviar a mensagem para o Socket.IO
    });
  });

  wss.httpServer.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end('WebSocket servidor ativo.');
  });

  wss.on('close', () => {
    console.log('Conexão WebSocket fechada');
    wss = null;
  });
};

exports.handler = async (event) => {
  const { request, socket, head } = event;

  if (!wss) {
    startWebSocket();

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }

  return {
    statusCode: 200,
    body: 'WebSocket servidor ativo.',
  };
};
