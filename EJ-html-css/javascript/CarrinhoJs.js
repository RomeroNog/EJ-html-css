function abrirCarrinho() {
    document.getElementById('overlay').classList.toggle('visivel');
    document.getElementById('carrinho-drawer').classList.toggle('aberto');
}
function fecharCarrinho() {
    document.getElementById('overlay').classList.remove('visivel');
    document.getElementById('carrinho-drawer').classList.remove('aberto');
}
function finalizarCompra(){
    carrinho = [];
    renderizarCarrinho();
    fecharCarrinho();
    mostrarToast('Pedido realizado com sucesso!');
}

function mostrarToast(mensagem){
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('mostrar');
    setTimeout(() => toast.classList.remove('mostrar'), 1500);
}

function calcularTotal(){
    return carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
}

function calcularTotalItens(){
    return carrinho.reduce((soma, item) => soma + item.quantidade, 0);
}
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarCarrinho(){
    const lista = document.getElementById('lista-itens');
    const totalEl = document.getElementById('total-compra');
    const botaoFinalizar = document.getElementById('botao-finalizar-compra');
    const span = document.querySelector('.qtd-span');

    span.textContent = calcularTotalItens();

    if(carrinho.length === 0){
        lista.innerHTML = `
        <li class="carrinho-vazio">
            Seu Carrinho está vazio.
        </li>
        `;
        totalEl.textContent = 'R$ 0,00';
        botaoFinalizar.disabled = true;
        return;
    }

    botaoFinalizar.disabled = false;

    lista.innerHTML = carrinho.map(item => `
        <li class="item-carrinho">
          <div class="item-info">
            <div class="item-nome">${item.nome}</div>
            <div class="item-calculo">
              ${formatarMoeda(item.preco)} × ${item.quantidade} =
              <strong>${formatarMoeda(item.preco * item.quantidade)}</strong>
            </div>
          </div>
          <div class="controles-qtd">
            <button class="botao-qtd" onclick="decrementar(${item.id})">−</button>
            <span class="numero-qtd">${item.quantidade}</span>
            <button class="botao-qtd" onclick="incrementar(${item.id})">+</button>
          </div>
        </li>
      `).join('');

      totalEl.textContent = formatarMoeda(calcularTotal());
}


const catalogo = [
    { id: 1, nome: "Ração Pedigree",      preco: 65.00  },
    { id: 2, nome: "Tapete Higiênico",    preco: 40.00  },
    { id: 3, nome: "Remédio para Pulgas", preco: 100.00 },
    { id: 4, nome: "Brinquedo de Corda",  preco: 30.00  },
    { id: 5, nome: "Torre para Gatos",    preco: 350.00 },
];

let carrinho = [];

function adicionarAoCarrinho(id){
    const produto = catalogo.find(p => p.id === id);
    const itemExiste = carrinho.find(i => i.id === id);

    if(itemExiste){
        itemExiste.quantidade++;
    } else{
        carrinho.push({...produto, quantidade: 1})
    }

    mostrarToast(`${produto.nome} adicionado!`);
    renderizarCarrinho();
}

function incrementar(id){
    const item = carrinho.find(i => i.id === id);
    if(item) item.quantidade++;
    renderizarCarrinho();
}

function decrementar(id){
    const indice = carrinho.findIndex(i => i.id === id);
    if(indice === -1) return;

    carrinho[indice].quantidade--;

    if(carrinho[indice].quantidade <=0){
        carrinho.splice(indice, 1);
    }

    renderizarCarrinho()
}

renderizarCarrinho();