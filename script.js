const AUTH_KEY = "logged";
const CLIENTS_KEY = "clients";
const isDashboardPage = window.location.pathname.includes("crm.html");
const isLoginPage =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === "";

function createClientId(index) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${index}`;
}

function normalizeClientRecord(client, index) {
  const createdAt = Number(client.createdAt);
  return {
    id: client.id || createClientId(index),
    fullName: String(client.fullName || "").trim(),
    documentId: String(client.documentId || "").trim(),
    phone: String(client.phone || "").trim(),
    email: String(client.email || "").trim(),
    profession: String(client.profession || "").trim(),
    postalCode: String(client.postalCode || "").trim(),
    city: String(client.city || "").trim(),
    interestedProduct: String(client.interestedProduct || "").trim(),
    customerProfile: String(client.customerProfile || "").trim(),
    interactionNotes: String(client.interactionNotes || "").trim(),
    createdAt: Number.isFinite(createdAt) && createdAt > 0 ? createdAt : Date.now() - index
  };
}

function getClients() {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    let changed = false;
    const normalized = parsed.map((client, index) => {
      const next = normalizeClientRecord(client, index);
      if (JSON.stringify(next) !== JSON.stringify(client)) {
        changed = true;
      }
      return next;
    });

    if (changed) {
      saveClients(normalized);
    }

    return normalized;
  } catch (error) {
    return [];
  }
}

function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

function ensureStorage() {
  if (!localStorage.getItem(CLIENTS_KEY)) {
    saveClients([]);
  }
}

if (isDashboardPage) {
  if (localStorage.getItem(AUTH_KEY) !== "true") {
    window.location.href = "index.html";
  } else {
    ensureStorage();
  }
}

if (isLoginPage && localStorage.getItem(AUTH_KEY) === "true") {
  window.location.href = "crm.html";
}

function showFeedback(message) {
  const feedbackElement = document.getElementById("feedbackMessage");
  if (!feedbackElement) return;
  feedbackElement.textContent = message;
}

function updateResultsSummary(total) {
  const summaryElement = document.getElementById("resultsSummary");
  if (!summaryElement) return;

  if (total === 0) {
    summaryElement.textContent = "No clients found.";
    return;
  }

  summaryElement.textContent = `${total} client record(s) found. Click an item to view details.`;
}

function signOut() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "index.html";
}

function signIn() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "admin" && password === "123") {
    localStorage.setItem(AUTH_KEY, "true");
    window.location.href = "crm.html";
    return;
  }

  alert("Invalid username or password.");
}

function clearFormFields(showMessage = true) {
  const fields = document.querySelectorAll(".client-form input, .client-form textarea");
  fields.forEach((field) => {
    field.value = "";
  });

  if (showMessage) {
    showFeedback("Form fields cleared.");
  }
}

function saveClient() {
  ensureStorage();

  const fullName = document.getElementById("fullName")?.value.trim() || "";
  const documentId = document.getElementById("documentId")?.value.trim() || "";
  const phone = document.getElementById("phone")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const profession = document.getElementById("profession")?.value.trim() || "";
  const postalCode = document.getElementById("postalCode")?.value.trim() || "";
  const city = document.getElementById("city")?.value.trim() || "";
  const interestedProduct = document.getElementById("interestedProduct")?.value.trim() || "";
  const customerProfile = document.getElementById("customerProfile")?.value.trim() || "";
  const interactionNotes = document.getElementById("interactionNotes")?.value.trim() || "";

  if (!fullName || !phone) {
    showFeedback("Please fill in at least Full Name and Phone before saving.");
    return;
  }

  const client = {
    id: createClientId(0),
    fullName,
    documentId,
    phone,
    email,
    profession,
    postalCode,
    city,
    interestedProduct,
    customerProfile,
    interactionNotes,
    createdAt: Date.now()
  };

  const clients = getClients();
  clients.push(client);
  saveClients(clients);

  clearFormFields(false);
  showFeedback("Client saved successfully.");
  filterClients();
}

function renderResults(clients) {
  const listElement = document.getElementById("results");
  if (!listElement) return;

  listElement.innerHTML = "";
  updateResultsSummary(clients.length);

  clients.forEach((client) => {
    const item = document.createElement("li");
    item.textContent = `${client.fullName} - ${client.phone || "No phone number"}`;
    item.addEventListener("click", () => showClientDetails(client.id));
    listElement.appendChild(item);
  });
}

function filterClients() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchTerm = searchInput.value.trim().toLowerCase();
  const clients = getClients();

  const filtered = clients
    .filter((client) => {
      const searchableFields = [
        client.fullName,
        client.documentId,
        client.phone,
        client.email,
        client.profession
      ]
        .filter(Boolean)
        .map((value) => value.toLowerCase());

      return searchableFields.some((value) => value.includes(searchTerm));
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  renderResults(filtered);
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleString("en-US");
}

function showClientDetails(clientId) {
  const clients = getClients();
  const client = clients.find((item) => item.id === clientId);
  if (!client) {
    alert("Client not found.");
    return;
  }

  const details = [
    `Full Name: ${client.fullName || "-"}`,
    `Document ID: ${client.documentId || "-"}`,
    `Phone: ${client.phone || "-"}`,
    `Email: ${client.email || "-"}`,
    `Profession: ${client.profession || "-"}`,
    "",
    `Postal Code: ${client.postalCode || "-"}`,
    `City: ${client.city || "-"}`,
    "",
    `Interested Product: ${client.interestedProduct || "-"}`,
    `Customer Profile: ${client.customerProfile || "-"}`,
    `Interaction Notes: ${client.interactionNotes || "-"}`,
    `Created At: ${formatTimestamp(client.createdAt)}`
  ].join("\n");

  alert(details);
}

if (isDashboardPage) {
  filterClients();
}

if (isLoginPage) {
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        signIn();
      }
    });
  }
}
