# Notas de Memória — TechPulse

**Data:** 2026-08-11

## Resumo

Registro consolidado das ações e decisões do projeto `TechPulse`, extraído da memória MCP e alinhado ao estado atual do projeto.

## Pendências

- Nenhuma pendência explícita registrada na memória para esta data.

## Decisões de arquitetura

- Diagrama de arquitetura criado (Whimsical) — definição inicial da topologia e componentes do sistema.
- Diagrama de Fluxo de Dados criado (Whimsical) — formalização dos caminhos de dados entre componentes.
- Política de segurança para frontend estático e backend em Make.com registrada — a validação crítica de tokens e ações administrativas permanece fora do navegador.
- Decisão de separar segredos locais do repositório com `.env` e documentar nomes de variáveis em `.env.example`.

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
- **Schemas principais (resumo):** Noticia, PrecoAtivo, Insight, Configuracao, Erro (ver `techpulse-openapi.yaml` para detalhes completos)
- **APIs externas referenciadas:** GNews (artigos), CoinGecko (cotações/variações)

## Gestão de segredos e ambiente

- O projeto não versiona credenciais em código-fonte. O arquivo `.env.example` documenta as variáveis sem valores reais.
- O arquivo `.env` armazena os valores reais, é listado em `.gitignore` e nunca é enviado ao GitHub.
- `GNEWS_API_KEY` é usada em conexão HTTP configurada no Make.com e apenas em testes locais antes da configuração final.
- `AIRTABLE_PAT` é usado pelo frontend estático com escopo somente leitura, para consultas de dados já públicos.
- `ADMIN_BEARER_TOKEN` é comparado por um filtro no Make.com para autorizar ou bloquear ações administrativas em `/configuracoes`.
- Como o frontend é 100% estático, nenhum valor sensível deve ser embutido em JavaScript público; a autenticação administrativa é tratada fora do navegador.

## Links e anexos

- Especificação OpenAPI (arquivo canônico no repositório): techpulse-openapi.yaml
- Diagramas (Whimsical): https://whimsical.com/gabi466/techpulse-DVVoPp8z291ePoxFoBjazT

## MCP / Memória

- MCP de memória configurado — a memória registra criação do projeto, rascunho do Contrato API, configuração do MCP, criação dos diagramas (arquitetura e fluxo de dados) e a decisão de segurança de chaves/ambiente.

## Erros resolvidos

- Nenhum erro resolvido está registrado na memória para esta data.

## Atualização de progresso — 2026-08-19

### Contexto e estado atual

- Testes das integrações com GNews e CoinGecko concluídos.
- Ajustes no contrato OpenAPI concluídos, com exemplos nos schemas `Noticia`, `PrecoAtivo`, `Configuracao` e `Insight`.
- Respostas de erro reutilizáveis documentadas para `401`, `403`, `404` e `500`, com a nova resposta genérica `400 DadosInvalidos`.
- Etapa atual: contrato OpenAPI e testes das integrações externas concluídos.

### Decisões técnicas

- **GNews:** uma chamada por idioma, mantendo o filtro explícito e evitando misturar resultados de idiomas diferentes.
- **CoinGecko:** campos da fonte mapeados para `PrecoAtivo`; valores numéricos `0` são válidos e devem ser tratados como dados presentes no frontend.
- **Contrato OpenAPI:** exemplos foram adicionados aos schemas e às respostas de erro para tornar os payloads esperados mais claros e reutilizáveis.

### Arquivos ativos

- `techpulse-openapi.yaml`
- `docs/memoria-projeto.json`
- `docs/notas-memoria.md`

### Próximos passos

- Validar o contrato OpenAPI com uma ferramenta de lint/validação.
- Configurar as chamadas validadas no fluxo do Make.com.
- Implementar no frontend o tratamento de valores `0` retornados pela CoinGecko.

## Observações e próximos passos recomendados

- Vincular aqui a versão canônica da especificação OpenAPI (ou um link público) se houver alteração futura.
- Incluir resumo de mudanças ao atualizar `techpulse-openapi.yaml` para manter rastreabilidade na memória.
- Evoluir a memória com futuras decisões de integração e operação do fluxo de dados quando novas automações forem adicionadas.
