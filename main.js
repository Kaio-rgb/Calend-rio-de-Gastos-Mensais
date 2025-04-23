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

function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function adicionarEventListenersAcoes() {
    document.querySelectorAll('.remover-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idRemover = parseInt(this.dataset.id);
            removerGasto(idRemover);
        });
    });

    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idEditar = parseInt(this.dataset.id);
            carregarGastoParaEdicao(idEditar);
        });
    });
}

function removerGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
    atualizarListaDeGastos();
    atualizarTotal();
}

function carregarGastoParaEdicao(id) {
    const gastoParaEditar = gastos.find(gasto => gasto.id === id);
    if (gastoParaEditar) {
        document.getElementById('descricao').value = gastoParaEditar.descricao;
        document.getElementById('valor').value = gastoParaEditar.valor;
        document.getElementById('data').value = gastoParaEditar.data;
        idEdicao = id;
        document.querySelector('.cadastro-gastos h2').textContent = 'Editar Gasto';
        document.querySelector('.cadastro-gastos button[type="submit"]').textContent = 'Salvar Edição';
    }
}

function salvarEdicaoGasto() {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');

    const descricao = descricaoInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const data = dataInput.value;

    if (descricao && !isNaN(valor) && data) {
        gastos = gastos.map(gasto => {
            if (gasto.id === idEdicao) {
                return { ...gasto, descricao, valor, data };
            }
            return gasto;
        });
        atualizarListaDeGastos();
        atualizarTotal();
        limparFormulario();
        idEdicao = null;
        document.querySelector('.cadastro-gastos h2').textContent = 'Cadastrar Novo Gasto';
        document.querySelector('.cadastro-gastos button[type="submit"]').textContent = 'Adicionar Gasto';
    } 

    else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Inicialização (se houver dados salvos localmente, você pode carregar aqui)