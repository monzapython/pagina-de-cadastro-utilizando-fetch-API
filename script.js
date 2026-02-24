document.getElementById("cep").addEventListener("blur", (evento)=>{
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if(!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {

            if(!data.erro){
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;

                salvarDados();
            }else{
                alert("CEP não encontrado.")
            }

        })
        .catch(error => console.error("Erro ao buscar o CEP: ", error));
});


const STORAGE_KEY = 'rascunhoCadastro';

function salvarDados() {
    const dados = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}


function carregarDados() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        document.getElementById('username').value = dados.username || '';
        document.getElementById('email').value = dados.email || '';
        document.getElementById('password').value = dados.password || '';
        document.getElementById('cep').value = dados.cep || '';
        document.getElementById('logradouro').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.cidade || '';
        document.getElementById('estado').value = dados.estado || '';
        document.getElementById('numero').value = dados.numero || '';
    }
}


document.querySelectorAll('input').forEach(campo => {
    campo.addEventListener('input', salvarDados);
});


window.addEventListener('load', carregarDados);
