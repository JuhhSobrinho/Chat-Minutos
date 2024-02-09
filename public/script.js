const btnEnviar = document.getElementById('enviar');
const inputMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');
const userNome = document.getElementById('user-titulo');
const chatPoup = document.getElementsByClassName('msg-topicos');

function geTLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

const user = geTLocalStorage("user");

if (user) {
    userNome.innerText = user;
} else {
    window.location.href = 'public/index.html';
}

// Conectar ao servidor WebSocket
const socket = new WebSocket('wss://seu-app-netlify.netlify.app/.netlify/functions/server');

socket.onopen = (event) => {
    console.log('Conectado ao servidor WebSocket');
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Mensagem recebida:', message);


    const dadosMensagem = JSON.parse(event.data);

    // Lógica para processar a mensagem recebida e atualizar o DOM
    const msgContainer = document.createElement('div');
    msgContainer.classList.add('msg-topicos');

    const msgElement = document.createElement('li');
    msgElement.textContent = dadosMensagem.mensagem;
    msgElement.classList.add('mensagem');

    const userElement = document.createElement('h1');
    userElement.textContent = dadosMensagem.usuario;
    userElement.classList.add('user-nome-chat');

    msgContainer.appendChild(msgElement);
    msgContainer.appendChild(userElement);

    chat.appendChild(msgContainer);

    for (const div of chatPoup) {
        const h1Element = div.querySelector('h1');
        const liElement = div.querySelector('li');
        const value = h1Element.textContent || h1Element.innerText;

        if (value === user) {
            liElement.style.backgroundColor = '#2E87A1';
            liElement.style.borderRadius = "14px 14px 3px 14px";
            div.style.alignItems = 'flex-end';
        }
    }
};

socket.onclose = (event) => {
    console.log('Conexão fechada');
};

const sendMessage = (message) => {
    socket.send(JSON.stringify({ type: 'newMsg', data: message }));
};

btnEnviar.addEventListener('click', () => {
    const mensagem = inputMensagem.value;
    if (inputMensagem.value !== "") {
        const dadosMensagem = {
            mensagem: mensagem,
            usuario: user
        };

        // Enviar mensagem para o servidor WebSocket
        socket.send(JSON.stringify(dadosMensagem));

        inputMensagem.value = "";
    }
});
