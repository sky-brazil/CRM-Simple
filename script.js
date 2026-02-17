const LOGIN_KEY = "logged";
const CLIENTES_KEY = "clientes";
const isCrmPage = window.location.pathname.includes("crm.html");
const isLoginPage =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === "";

function getClientes() {
  try {
    const raw = localStorage.getItem(CLIENTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    let changed = false;
    const normalized = parsed.map((cliente, index) => {
      const next = { ...cliente };

      if (!next.id) {
        next.id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${index}`;
        changed = true;
      }

      if (!next.createdAt) {
        const parsedDate = next.data ? Date.parse(next.data) : NaN;
        next.createdAt = Number.isNaN(parsedDate) ? Date.now() - index : parsedDate;
        changed = true;
      }

      return next;
    });

    if (changed) {
      saveClientes(normalized);
    }

    return normalized;
  } catch (error) {
    return [];
  }
}

function saveClientes(clientes) {
  localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
}

function ensureStorage() {
  if (!localStorage.getItem(CLIENTES_KEY)) {
    saveClientes([]);
  }
}

// Protecao da pagina principal
if (isCrmPage) {
  if (localStorage.getItem(LOGIN_KEY) !== "true") {
    window.location.href = "index.html";
  } else {
    ensureStorage();
  }
}

if (isLoginPage && localStorage.getItem(LOGIN_KEY) === "true") {
  window.location.href = "crm.html";
}

function showFeedback(message) {
  const feedback = document.getElementById("feedback");
  if (!feedback) return;
  feedback.textContent = message;
}

function updateResultadosInfo(total) {
  const info = document.getElementById("resultadosInfo");
  if (!info) return;

  if (total === 0) {
    info.textContent = "Nenhum cliente encontrado.";
    return;
  }

  info.textContent = `${total} cliente(s) encontrado(s). Clique em um registro para ver detalhes.`;
}

function logout() {
  localStorage.removeItem(LOGIN_KEY);
  window.location.href = "index.html";
}

function login() {
  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");

  if (!userInput || !passInput) return;

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (user === "admin" && pass === "123") {
    localStorage.setItem(LOGIN_KEY, "true");
    window.location.href = "crm.html";
    return;
  }

  alert("Usuario ou senha incorretos.");
}

// Função para limpar campos
function limparCampos(showMessage = true) {
  const campos = document.querySelectorAll(".cadastro-box input, .cadastro-box textarea");
  campos.forEach((campo) => {
    campo.value = "";
  });
  if (showMessage) {
    showFeedback("Campos limpos.");
  }
}

// Função salvar
function salvar() {
  ensureStorage();

  const nome = document.getElementById("nome")?.value.trim() || "";
  const documento = document.getElementById("documento")?.value.trim() || "";
  const telefone = document.getElementById("telefone")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const profissao = document.getElementById("profissao")?.value.trim() || "";
  const cep = document.getElementById("cep")?.value.trim() || "";
  const cidade = document.getElementById("cidade")?.value.trim() || "";
  const produto = document.getElementById("produto")?.value.trim() || "";
  const perfil = document.getElementById("perfil")?.value.trim() || "";
  const interacao = document.getElementById("interacao")?.value.trim() || "";

  if (!nome || !telefone) {
    showFeedback("Preencha pelo menos Nome e Telefone antes de salvar.");
    return;
  }

  const cliente = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    nome,
    documento,
    telefone,
    email,
    profissao,
    cep,
    cidade,
    produto,
    perfil,
    interacao,
    createdAt: Date.now(),
    data: new Date().toLocaleString("pt-BR")
  };

  const lista = getClientes();
  lista.push(cliente);
  saveClientes(lista);

  limparCampos(false);
  showFeedback("Cliente salvo com sucesso.");
  buscar();
}

function renderResultados(clientes) {
  const ul = document.getElementById("resultados");
  if (!ul) return;

  ul.innerHTML = "";
  updateResultadosInfo(clientes.length);

  clientes.forEach((cliente) => {
    const li = document.createElement("li");
    li.textContent = `${cliente.nome} - ${cliente.telefone || "Sem telefone"}`;
    li.addEventListener("click", () => mostrarDetalhes(cliente.id));
    ul.appendChild(li);
  });
}

// Função buscar
function buscar() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  const termo = searchInput.value.trim().toLowerCase();
  const lista = getClientes();

  const filtrados = lista
    .filter((c) => {
      const campos = [c.nome, c.documento, c.telefone, c.email, c.profissao]
        .filter(Boolean)
        .map((item) => item.toLowerCase());
      return campos.some((item) => item.includes(termo));
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  renderResultados(filtrados);
}

// Mostrar detalhes
function mostrarDetalhes(clienteId) {
  const lista = getClientes();
  const cliente = lista.find((item) => item.id === clienteId);
  if (!cliente) {
    alert("Cliente nao encontrado.");
    return;
  }

  const detalhes = [
    `Nome: ${cliente.nome || "-"}`,
    `Documento: ${cliente.documento || "-"}`,
    `Telefone: ${cliente.telefone || "-"}`,
    `Email: ${cliente.email || "-"}`,
    `Profissao: ${cliente.profissao || "-"}`,
    "",
    `CEP: ${cliente.cep || "-"}`,
    `Cidade: ${cliente.cidade || "-"}`,
    "",
    `Produto: ${cliente.produto || "-"}`,
    `Perfil: ${cliente.perfil || "-"}`,
    `Interacao: ${cliente.interacao || "-"}`,
    `Data: ${cliente.data || "-"}`
  ].join("\n");

  alert(detalhes);
}

if (isCrmPage) {
  buscar();
}

if (isLoginPage) {
  const passInput = document.getElementById("pass");
  if (passInput) {
    passInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        login();
      }
    });
  }
}
