# Relatório de Testes e Bugtracking — Etapa 9

**Projeto:** Sistema de Fichas Técnicas  
**Curso:** Técnico em Desenvolvimento de Sistemas — SENAC  
**Etapa:** 9 — Integração Web  
**Tecnologias:** Java, Spring Boot, Spring Data JPA, MySQL, HTML, CSS e JavaScript

## 1. Objetivo

Validar o funcionamento da aplicação web de gerenciamento de produtos e fichas técnicas, verificando a integração entre frontend, API REST e banco de dados MySQL.

## 2. Testes realizados

| ID | Funcionalidade | Resultado |
|---|---|---|
| T01 | Inicialização da aplicação Spring Boot | Aprovado |
| T02 | Conexão com banco de dados MySQL | Aprovado |
| T03 | Listagem de produtos pela API REST | Aprovado |
| T04 | Exibição de produtos no frontend | Aprovado |
| T05 | Pesquisa de produtos | Aprovado |
| T06 | Cadastro de novos produtos | Aprovado |
| T07 | Visualização dos detalhes do produto | Aprovado |
| T08 | Cadastro de ficha técnica | Aprovado |
| T09 | Edição de ficha técnica | Aprovado |
| T10 | Compilação e empacotamento Maven | Aprovado |
| T11 | Teste automatizado de inicialização do contexto Spring | Aprovado |

**Observação:** Os testes T01 a T10 foram verificados por execução, navegação ou comandos durante o desenvolvimento. O teste T11 foi executado automaticamente pelo Maven/JUnit.

## 3. Registro de bugs corrigidos

| ID | Problema identificado | Correção aplicada | Situação |
|---|---|---|---|
| B01 | Páginas retornavam erro HTTP 404 | Ajuste da localização dos arquivos HTML na pasta `static` | Resolvido |
| B02 | Produtos do banco não apareciam no frontend | Integração do JavaScript com a API REST utilizando `fetch` | Resolvido |
| B03 | Cadastro de ficha técnica utilizava endpoint incorreto | Ajuste para `/api/produtos/{id}/ficha` | Resolvido |
| B04 | Erro de sintaxe no JavaScript | Correção do fechamento de bloco e função | Resolvido |
| B05 | Problemas de compilação e configuração Java/Maven | Ajustes no projeto e nas configurações de compilação | Resolvido |
| B06 | Arquivos compilados incluídos no GitHub | Configuração do `.gitignore` e remoção de `target/` do rastreamento | Resolvido |

## 4. Resultado dos testes automatizados

O comando `mvnw.cmd clean verify` foi executado com sucesso.

- Testes executados: 1
- Falhas: 0
- Erros: 0
- Testes ignorados: 0
- Resultado: BUILD SUCCESS

## 5. Conclusão

A aplicação apresentou funcionamento satisfatório nas funcionalidades verificadas, com integração entre interface web, API REST e banco de dados MySQL.

Os problemas identificados durante o desenvolvimento foram corrigidos e o projeto foi versionado no GitHub.

Os testes realizados não representam cobertura automatizada completa de todas as funcionalidades, sendo complementados por verificações manuais.