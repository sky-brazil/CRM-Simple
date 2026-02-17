# Mini CRM Comercial (Projeto de Portfolio)

Projeto front-end de **CRM leve** para cadastro, consulta e acompanhamento de clientes, com foco em apresentar um portfolio profissional de desenvolvimento web.

## Objetivo do projeto

Este projeto foi estruturado para demonstrar:

- interface limpa, moderna e responsiva;
- fluxo de autenticacao simples para demonstracao;
- logica de cadastro, busca e consulta de clientes;
- organizacao de codigo clara para manutencao e evolucao.

## Funcionalidades

- Login de demonstracao com controle de sessao (`localStorage`);
- Cadastro de clientes com dados de contato e perfil;
- Registro de interacoes comerciais;
- Busca por nome, telefone, e-mail, documento e profissao;
- Lista de resultados com visualizacao de detalhes;
- Feedback visual para acoes de salvar e limpar.

## Melhorias aplicadas

- Correcao de imagem de fundo com caminho adequado;
- Correcao do bug de detalhes apos busca filtrada;
- Inclusao do campo `documento` no salvamento;
- Validacao minima de campos obrigatorios (nome e telefone);
- Refinamento de UX/UI para aspecto mais profissional;
- Estrutura JavaScript mais robusta e legivel.

## Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Persistencia local com `localStorage`

## Como executar localmente

1. Clone este repositorio:
   ```bash
   git clone <repo-url>
   ```
2. Abra a pasta no VS Code.
3. Execute com Live Server (ou abra `index.html` no navegador).
4. Navegue por:
   - `index.html` (login)
   - `crm.html` (painel)

## Credenciais de demonstracao

- Usuario: `admin`
- Senha: `123`

> Nota: a autenticacao atual e apenas para fins de demonstracao de portfolio.

## Evolucoes sugeridas

- Integracao com API REST para persistencia real;
- Banco de dados relacional;
- Controle de usuarios e niveis de acesso;
- Edicao e exclusao de clientes;
- Dashboard com indicadores de funil e vendas.

## Uso no portfolio

Este repositorio e indicado para:

- demonstrar dominio de front-end sem frameworks;
- evidenciar capacidade de transformar requisitos de negocio em interface;
- apresentar base para evolucao de um CRM completo.
