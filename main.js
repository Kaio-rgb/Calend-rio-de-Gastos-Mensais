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

function adicionarGasto() {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');

    const descricao = descricaoInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const data = dataInput.value;

    if (descricao && !isNaN(valor) && data) {
        const novoGasto = { id: Date.now(), descricao, valor, data };
        gastos.push(novoGasto);
        atualizarListaDeGastos();
        atualizarTotal();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}
