// Quantidade inicial de cada prato (8 pratos)
const quantidades = [0, 0, 0, 0, 0, 0, 0, 0];

// Preço correspondente de cada prato (mesma ordem do array acima)
const precos = [20, 30, 40, 35, 24, 38, 36, 15];

/**
 * Atualiza o conteúdo da tela de resumo do pedido.
 * Mostra os pratos escolhidos com quantidade e preço total por prato.
 */
function atualizarResumo() {
  const container = document.getElementById("resumoItens");
  container.innerHTML = ""; // Limpa o conteúdo anterior

  quantidades.forEach((qtd, i) => {
    if (qtd > 0) {
      const preco = precos[i] * qtd;
      // Adiciona parágrafo com nome fictício do prato e valores
      container.innerHTML += `
        <p>Prato ${i + 1} - Quantidade: ${qtd} - Preço: R$ ${preco.toFixed(2)}</p>
      `;
    }
  });
}

/**
 * Vai para uma nova "tela" (div com classe .tela), ativando a visível.
 * Se for a tela "resumo", atualiza os dados antes.
 */
function proximaTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  if (id === "resumo") atualizarResumo();
  document.getElementById(id).classList.add("ativa");
}

/**
 * Volta para uma tela específica.
 */
function voltarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

/**
 * Adiciona comportamento aos botões + e - de cada prato.
 * Atualiza a quantidade escolhida e exibe no HTML.
 */
document.querySelectorAll(".item").forEach((item, index) => {
  const menos = item.querySelector(".menos"); // Botão -
  const mais = item.querySelector(".mais");   // Botão +
  const span = item.querySelector("span");     // Elemento que mostra a quantidade

  // Clique no botão "-"
  menos.addEventListener("click", () => {
    if (quantidades[index] > 0) quantidades[index]--;
    span.textContent = quantidades[index]; // Atualiza no HTML
  });

  // Clique no botão "+"
  mais.addEventListener("click", () => {
    quantidades[index]++;
    span.textContent = quantidades[index]; // Atualiza no HTML
  });
});

/**
 * Copia a chave PIX para a área de transferência e avisa o usuário.
 */
function copiarPix() {
  const chavePix = "124.047.019-32";
  navigator.clipboard.writeText(chavePix).then(() => {
    alert("Chave PIX copiada para a área de transferência!");
  });
}

/**
 * Valida os dados do formulário e, se estiverem completos,
 * finaliza a compra e exibe a tela de sucesso com confetes.
 */
function finalizarCompra() {
  const nome = document.getElementById("nome").value;
  const nascimento = document.getElementById("nascimento").value;
  const cpf = document.getElementById("cpf").value;

  if (!nome || !nascimento || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }

  // Oculta todas as telas
  document.querySelectorAll(".tela").forEach(tela => tela.classList.remove("ativa"));
  // Mostra a tela de sucesso
  document.getElementById("sucesso").classList.add("ativa");

  iniciarConfete(); // Inicia o efeito de confete
}

/**
 * Gera vários confetes animados usando o emoji ✨
 * Cada um com variações aleatórias de posição e duração.
 */
function iniciarConfete() {
  const emojis = ["✨"];
  const quantidade = 100; // Diminui para desempenho

  for (let i = 0; i < quantidade; i++) {
    criarEmojiConfete();
  }
}

/**
 * Cria um emoji visual ✨ que cairá da parte superior da tela.
 * Define propriedades aleatórias de duração, posição e rotação.
 */
function criarEmojiConfete() {
  const emoji = document.createElement('div');
  emoji.className = 'confete-emoji';
  emoji.textContent = '✨';

  // Define propriedades CSS customizadas (usadas no CSS com var(--nome))
  emoji.style.setProperty('--duracao', `${(Math.random() * 1 + 1.5).toFixed(2)}s`); // 1.5s a 2.5s
  emoji.style.setProperty('--posicaoX', `${Math.random() * 100}vw`); // posição horizontal aleatória
  emoji.style.setProperty('--rotacaoInicial', `${Math.random() * 360}deg`); // rotação inicial

  document.body.appendChild(emoji);

  // Remove o emoji após a animação
  setTimeout(() => emoji.remove(), 3000);
}
