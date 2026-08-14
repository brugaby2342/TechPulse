### Gerenciamento de chaves e variáveis de ambiente

O TechPulse segue a prática recomendada de nunca versionar credenciais no
código-fonte. Para isso, o projeto define dois arquivos:

- **`.env.example`** — commitado no repositório, documenta o nome e o
  propósito de cada variável de ambiente utilizada (`GNEWS_API_KEY`,
  `AIRTABLE_PAT`, `AIRTABLE_BASE_ID`, `ADMIN_BEARER_TOKEN`), sem conter
  nenhum valor real.
- **`.env`** — contém os valores reais, listado no `.gitignore` e nunca
  enviado ao GitHub.

**Uso prático dessas variáveis na arquitetura do TechPulse:**

| Chave | Onde é efetivamente usada em produção | Papel do `.env` |
|---|---|---|
| `GNEWS_API_KEY` | Conexão HTTP configurada dentro do cenário do Make.com (armazenamento criptografado da própria plataforma) | Usado apenas em scripts locais de teste/exploração da API antes da configuração no Make.com |
| `AIRTABLE_PAT` (somente leitura) | Consumido diretamente pelo frontend estático (GitHub Pages) para consultar os dados consolidados | Documentação e testes locais |
| `ADMIN_BEARER_TOKEN` | Comparado por um módulo Filter no cenário do Make.com, que autoriza (ou bloqueia com 401/403) ações administrativas no endpoint `/configuracoes` | Documentação e testes locais |

**Trade-off documentado:** diferente de uma aplicação com backend próprio,
o TechPulse tem um frontend estático servido via GitHub Pages. Nesse
modelo, qualquer valor embutido no JavaScript entregue ao navegador é
tecnicamente visível a quem inspecionar o código (DevTools). Por isso,
duas decisões de arquitetura foram tomadas conscientemente:

1. O token do Airtable usado pelo frontend tem escopo **somente leitura**
   (`data.records:read`), o que limita o impacto de uma eventual exposição
   a, no máximo, leitura indevida de dados já publicamente exibidos na
   própria interface — nunca escrita ou exclusão.
2. Toda ação administrativa (escrita/configuração) não passa pelo
   JavaScript público do GitHub Pages: é disparada por uma chamada
   autenticada com Bearer Token diretamente ao webhook do Make.com, e a
   validação do token ocorre no lado do Make.com — nunca no navegador.
   O valor do token, quando usado, permanece apenas na memória de
   execução da página (nunca escrito no código-fonte versionado).

Essa abordagem reconhece a limitação inerente de um frontend 100%
estático e prioriza minimizar a superfície de exposição em vez de
prometer uma segurança que a arquitetura escolhida não pode garantir de
fato — coerente com o princípio de responsabilidade e transparência na
governança de dados adotado neste projeto.
