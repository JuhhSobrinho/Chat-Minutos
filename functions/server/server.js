const { Server } = require('socket.io');

exports.handler = async (event) => {
  // Verifica se é uma solicitação de atualização do WebSocket
  if (event.headers.upgrade === 'websocket') {
    const io = new Server();
    
    io.on('connection', (socket) => {
      console.log('Cliente conectado via WebSocket');

      socket.on('message', (message) => {
        console.log(`Mensagem recebida via WebSocket: ${message}`);

        // Lógica adicional, se necessário

        // Envia uma mensagem de volta
        socket.send('Mensagem recebida pelo servidor.');
      });
    });

    // Retornar uma resposta apropriada para solicitação de upgrade WebSocket
    return {
      statusCode: 101, // Switching Protocols
      headers: {
        ...event.headers,
        'Connection': 'upgrade',
        'Upgrade': 'websocket',
      },
      body: '',
      isBase64Encoded: false,
    };
  }

  // Se não for uma solicitação de upgrade WebSocket, responda como HTTP padrão
  return {
    statusCode: 200,
    body: 'WebSocket servidor ativo.',
  };
};
