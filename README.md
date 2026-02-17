# Mini CRM Comercial (Portfolio + Upwork Ready)

Projeto front-end de **CRM leve** para cadastro, consulta e acompanhamento de clientes.

Este repositorio foi estruturado para servir em dois contextos:

- **Portfolio tecnico** (GitHub, LinkedIn, entrevistas);
- **Posicionamento comercial** para propostas no **Upwork**.

## Objetivo do projeto

Demonstrar capacidade de entregar:

- interface limpa, moderna e responsiva;
- fluxo de autenticacao simples para demonstracao;
- logica de cadastro, busca e consulta de clientes;
- codigo organizado para manutencao e evolucao.

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

> Nota: a autenticacao atual e apenas para demonstracao.

## Uso em Portfolio

Este projeto e indicado para:

- demonstrar dominio de front-end sem frameworks;
- evidenciar capacidade de transformar regra de negocio em interface;
- apresentar base para evolucao de um CRM completo.

## Uso em Propostas Upwork

Este projeto pode ser apresentado como exemplo para servicos de:

- desenvolvimento de CRM personalizado para pequenas operacoes;
- modernizacao de sistemas internos simples;
- criacao rapida de MVP comercial para validacao.

Arquivos de apoio:

- `DESCRICAO_PORTFOLIO.md`: texto para GitHub e LinkedIn;
- `DESCRICAO_UPWORK.md`: texto pronto para proposta comercial no Upwork.

## Evolucoes sugeridas (nivel producao)

- Integracao com API REST para persistencia real;
- Banco de dados relacional;
- Controle de usuarios e niveis de acesso;
- Edicao e exclusao de clientes;
- Dashboard com indicadores de funil e vendas.
