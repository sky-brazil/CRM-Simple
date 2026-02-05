// Proteção da página principal
if (window.location.pathname.includes("crm.html")) {
  if (localStorage.getItem("logged") !== "true") {
    window.location.href = "index.html"
  }
}

function logout() {
  localStorage.removeItem("logged")
  window.location.href = "index.html"
}

function login() {
  const u = document.getElementById("user").value
  const p = document.getElementById("pass").value

  if (u === "admin" && p === "123") {
    localStorage.setItem("logged", "true")
    window.location.href = "crm.html"
  } else {
    alert("Usuário ou senha incorretos")
  }
}

// Criar lista se não existir
if (!localStorage.getItem("clientes")) {
  localStorage.setItem("clientes", JSON.stringify([]))
}

// Função para limpar campos
function limparCampos() {
  document.querySelectorAll("input, textarea").forEach(campo => campo.value = "")
}

// Função salvar (compatível com seu formulário atual)
function salvar() {
  const cliente = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    profissao: document.getElementById("profissao").value,

    cep: document.getElementById("cep").value,
    frequencia: document.getElementById("frequencia").value,
    quantidade: document.getElementById("quantidade").value,
    cidade: document.getElementById("cidade").value,
    seguro: document.getElementById("seguro").value,
    categoria: document.getElementById("categoria").value,
    notas: document.getElementById("notas").value,

    produto: document.getElementById("produto").value,
    perfil: document.getElementById("perfil").value,
    interacao: document.getElementById("interacao").value,

    data: new Date().toLocaleString()
  }

  const lista = JSON.parse(localStorage.getItem("clientes"))
  lista.push(cliente)
  localStorage.setItem("clientes", JSON.stringify(lista))

  alert("Cliente salvo com sucesso!")
  limparCampos()
}

// Função buscar
function buscar() {
  const termo = document.getElementById("search").value.toLowerCase()
  const lista = JSON.parse(localStorage.getItem("clientes"))
  const ul = document.getElementById("resultados")

  ul.innerHTML = ""

  lista
    .filter(c => c.nome.toLowerCase().includes(termo))
    .forEach((c, index) => {
      const li = document.createElement("li")
      li.textContent = c.nome
      li.style.cursor = "pointer"
      li.onclick = () => mostrarDetalhes(index)
      ul.appendChild(li)
    })
}
    .forEach((c, index) => {
      const li = document.createElement("li")
      li.textContent = `${c.nome} - ${c.telefone}`
      li.style.cursor = "pointer"
      li.onclick = () => mostrarDetalhes(index)
      ul.appendChild(li)
    })
}

// Mostrar detalhes do cliente
function mostrarDetalhes(index) {
  const lista = JSON.parse(localStorage.getItem("clientes"))
  const c = lista[index]

  alert(
    "Nome: " + c.nome + "\n" +
    "Telefone: " + c.telefone + "\n" +
    "Email: " + c.email + "\n" +
    "Profissão: " + c.profissao + "\n\n" +

    "CEP: " + c.cep + "\n" +
    "Frequência: " + c.frequencia + "\n" +
    "Quantidade: " + c.quantidade + "\n" +
    "Cidade: " + c.cidade + "\n" +
    "Seguro: " + c.seguro + "\n" +
    "Categoria: " + c.categoria + "\n" +
    "Notas: " + c.notas + "\n\n" +

    "Produto: " + c.produto + "\n" +
    "Perfil: " + c.perfil + "\n" +
    "Interação: " + c.interacao + "\n" +
    "Data: " + c.data
  )

}

