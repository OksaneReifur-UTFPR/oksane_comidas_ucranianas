const quantidades = [0, 0];
const precos = [20, 30];

function atualizarResumo() {
  const container = document.getElementById("resumoItens");
  container.innerHTML = "";

  quantidades.forEach((qtd, i) => {
    if (qtd > 0) {
      const preco = precos[i] * qtd;
      container.innerHTML += `
        <p>Prato ${i + 1} - Quantidade: ${qtd} - Preço: R$ ${preco.toFixed(2)}</p>
      `;
    }
  });
}

function proximaTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  if (id === "resumo") atualizarResumo();
  document.getElementById(id).classList.add("ativa");
}

function voltarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

document.querySelectorAll(".item").forEach((item, index) => {
  const menos = item.querySelector(".menos");
  const mais = item.querySelector(".mais");
  const span = item.querySelector("span");

  menos.addEventListener("click", () => {
    if (quantidades[index] > 0) quantidades[index]--;
    span.textContent = quantidades[index];
  });

  mais.addEventListener("click", () => {
    quantidades[index]++;
    span.textContent = quantidades[index];
  });
});

function finalizarCompra() {
  const nome = document.getElementById("nome").value;
  const pix = document.getElementById("pix").value;
  const nascimento = document.getElementById("nascimento").value;
  const cpf = document.getElementById("cpf").value;

  if (!pix || !nome || !nascimento || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }

  proximaTela("sucesso");
}
