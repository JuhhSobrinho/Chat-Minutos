const btnEnviar = document.getElementById('enviar');
const inputMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');
const socket = io();

const chatPoup = document.getElementsByClassName('msg-topicos');


const userNome = document.getElementById('user-titulo');


function geTLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)); ///nesse caso é o contrario, json pega e transforma em objeto oq era texto/string
}


const user = geTLocalStorage("user");


if (user) {
    userNome.innerText = user;
} else {
    window.location.href = './index.html';
}



btnEnviar.addEventListener('click', () => {
    const mensagem = inputMensagem.value;
    if (inputMensagem.value !== "") {
        const dadosMensagem = {
            mensagem: mensagem,
            usuario: user
        };

        socket.emit('newMsg', dadosMensagem);

        inputMensagem.value = "";
    }
})


socket.addEventListener('newMsg', (dadosMensagem) => {
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
        // Obtém o elemento <h1> dentro de cada div
        const h1Element = div.querySelector('h1');
        const liElement = div.querySelector('li');

        // Acessa o texto dentro do elemento <h1>
        const value = h1Element.textContent || h1Element.innerText;

        if (value === user) {
            console.log("digasim");
            liElement.style.backgroundColor = '#2E87A1';
            liElement.style.borderRadius = "14px 14px 3px 14px";
            div.style.alignItems = 'flex-end';
        }
        
        console.log(value);
    }
});
