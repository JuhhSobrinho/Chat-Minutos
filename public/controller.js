const btnUser = document.getElementById('enviar-user');
const userInput = document.getElementById('user-input');

let user = "";


function seTLocarStorage(chave, value){
    localStorage.setItem(chave, JSON.stringify(value)); ///O json pega a parada muda pra string e salva nele. ////salva a ids
}

function geTLocalStorage(chave){
    return  JSON.parse(localStorage.getItem(chave)); ///nesse caso é o contrario, json pega e transforma em objeto oq era texto/string
}


btnUser.addEventListener('click', () => {
    if (userInput.value !== "" && userInput.value !== " ") {
        user = userInput.value;
        seTLocarStorage("user", user);

        window.location.href = 'public/chat.html';
    }
})

if (geTLocalStorage("user")) {
    window.location.href = 'public/chat.html';
}