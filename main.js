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

function atualizarListaDeGastos() {
    listaDeGastos.innerHTML = '';
    gastos.forEach(gasto => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${gasto.descricao} - R$ ${gasto.valor.toFixed(2)} (${formatarData(gasto.data)})</span>
            <div class="acoes">
                <button class="editar-btn" data-id="${gasto.id}">Editar</button>
                <button class="remover-btn" data-id="${gasto.id}">Remover</button>
            </div>
        `;
        if (gasto.valor > 100) {
            listItem.classList.add('alto-valor');
        }
        listaDeGastos.appendChild(listItem);
    });
    adicionarEventListenersAcoes();
}

function atualizarTotal() {
    const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
    totalElement.textContent = total.toFixed(2);
}

function limparFormulario() {
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('data').value = '';
}
