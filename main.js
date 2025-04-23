const formCadastro = document.getElementById('form-cadastro');
const listaDeGastos = document.getElementById('lista-de-gastos');
const totalElement = document.getElementById('total');
let gastos = [];
let idEdicao = null; 

// Variável para rastrear o ID do gasto em edição

formCadastro.addEventListener('submit', function(event) {
    event.preventDefault();
    if (idEdicao !== null) {
        salvarEdicaoGasto();
    } else {
        adicionarGasto();
    }
});

