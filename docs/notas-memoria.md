# Notas de Memória — TechPulse

**Data:** 2026-08-11

## Resumo

Registro consolidado das ações e decisões do projeto `TechPulse`, extraído da memória MCP.

## Pendências

- Nenhuma pendência explícita registrada na memória para esta data.

## Decisões de arquitetura

- Diagrama de arquitetura criado (Whimsical) — definição inicial da topologia e componentes do sistema.
- Diagrama de Fluxo de Dados criado (Whimsical) — formalização dos caminhos de dados entre componentes.

## Contrato API (resumo)

- **Título:** TechPulse - Central Inteligente de Insights de Inovação
- **Versão:** 1.0.0
- **Servidor base:** https://api.techpulse.exemplo.com/v1
- **Autenticação:** bearerAuth (JWT) — exigida para endpoints de escrita e para a tela de configuração; leitura pública pode ser permitida conforme política.
- **Principais recursos / endpoints:**
	- `GET /noticias` — listar notícias (filtros: `palavraChave`, `jaProcessada`)
	- `GET /noticias/{id}` — detalhe da notícia
	- `GET /precos-ativos` — listar cotações (filtro: `ativo`, `desde`)
	- `GET /precos-ativos/ultimos` — últimas cotações por ativo
	- `GET /insights` — listar insights; `POST /insights` — criar insight (autenticado)
	- `PATCH /insights/{id}` — atualizar status do insight (autenticado)
	- `GET /configuracoes` e `PATCH /configuracoes` — consultar/atualizar parâmetros (autenticado)
- **Schemas principais (resumo):** Noticia, PrecoAtivo, Insight, Configuracao, Erro (ver `contrato.yaml` para detalhes completos)
- **APIs externas referenciadas:** GNews (artigos), CoinGecko (cotações/variações)

## Links e anexos

- Especificação OpenAPI (arquivo no repositório): contrato.yaml
- Diagramas (Whimsical): https://whimsical.com/gabi466/techpulse-DVVoPp8z291ePoxFoBjazT

## MCP / Memória

- MCP de memória configurado — a memória registra criação do projeto, rascunho do Contrato API, configuração do MCP e criação dos diagramas (arquitetura e fluxo de dados).

## Erros resolvidos

- Nenhum erro resolvido está registrado na memória para esta data.

## Observações e próximos passos recomendados

- Vincular aqui a versão canônica da especificação OpenAPI (ou um link público) se houver alteração futura.
- Incluir resumo de mudanças ao atualizar `contrato.yaml` para manter rastreabilidade na memória.
