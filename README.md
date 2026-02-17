# Mini CRM Comercial (Portfolio para Upwork)

Projeto front-end de **CRM leve** para cadastro, consulta e acompanhamento de clientes, com foco em demonstracao profissional para portfolio e propostas na Upwork.

## Objetivo comercial

Este projeto foi estruturado para mostrar, de forma direta, capacidade de entregar:

- interface limpa e responsiva;
- fluxo de autenticacao simples;
- CRUD basico orientado a negocio (cadastro + busca + detalhes);
- organizacao de codigo clara para evolucao rapida.

## O que o sistema faz

- Login de demonstracao (controle de sessao no `localStorage`);
- Cadastro de clientes com dados de contato e perfil;
- Registro de interacoes comerciais;
- Busca inteligente por nome, telefone, e-mail, documento e profissao;
- Lista de resultados com abertura de detalhes;
- Feedback visual de acoes (salvar/limpar).

## Melhorias aplicadas nesta versao

- Correcao de imagem de fundo quebrada;
- Correcao de bug na abertura de detalhes apos busca filtrada;
- Inclusao do campo `documento` no salvamento;
- Validacao minima de campos obrigatorios (nome e telefone);
- Melhorias de UX/UI para visual mais profissional;
- Padronizacao de estrutura para facilitar manutencao.

## Stack

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Persistencia local via `localStorage`

## Como executar localmente

1. Clone este repositorio:
   ```bash
   git clone <repo-url>
   ```
2. Abra a pasta no VS Code.
3. Inicie com Live Server (ou abra `index.html` no navegador).
4. Acesse:
   - `index.html` para login
   - `crm.html` para o painel

## Credenciais de demonstracao

- Usuario: `admin`
- Senha: `123`

> Nota: autenticacao atual e apenas para demo. Em producao, recomenda-se backend com JWT/sessao segura.

## Proximos passos (nivel producao)

- API REST (Node.js, Python, etc.) para persistencia real;
- Banco de dados relacional;
- Autenticacao segura e controle de perfil de usuario;
- Edicao/exclusao de clientes;
- Dashboard com metricas de vendas e funil.

## Pronto para uso em propostas Upwork

Este repositorio pode ser apresentado como base para servicos de:

- criacao de CRM personalizado para pequenos negocios;
- modernizacao de sistemas internos simples;
- desenvolvimento rapido de MVP comercial.
