# 👑 plataforma de contratação de Freelancer

## Tecnologias
👉 Backend principal em NestJS (Node + TS) para lidar com usuários, pagamentos, jobs, segurança, notificações, etc.
👉 Microserviços em Python (FastAPI) dedicados a IA, análise de métricas e recomendações inteligentes.
👉 Comunicação entre eles por mensageria (ex: Kafka ou RabbitMQ) ou gRPC/REST interno.

## Intuito de juntar:
Velocidade e escala do Nest.
Poder do Python para IA/ML.
Produtividade máxima (tudo em TypeScript + Python só no que realmente precisa).

# 🏗️ Arquitetura inicial sugerida
Frontend Web: Next.js + TypeScript
App Mobile: React Native + Expo
Backend Principal (API Gateway / Core Services): NestJS
IA e Métricas: Microserviços em FastAPI (Python)
Banco de Dados: PostgreSQL (relacional) + Redis (cache)
Mensageria/Eventos: Kafka ou RabbitMQ
Infra: Docker + (Kubernetes - depois)

## Banco de Dados
Use PostgreSQL como base relacional (suporta bem marketplace).
ORM: Sequelize (você já conhece Sequelize 👍).
Autenticação & Autorização
@nestjs/passport + JWT para login.
Guards para RBAC (roles: cliente, freelancer, admin).
## Segurança
helmet (headers HTTP).
@nestjs/throttler (rate limiting).
Sanitização de inputs (class-validator + class-transformer).
Escalabilidade
Adapter Fastify para ganhar mais performance que Express.
@nestjs/microservices para futuros serviços independentes (chat, pagamentos, IA).
Cache e performance
Redis para cache de consultas frequentes.
Redis também para filas de tarefas (BullMQ).

## Observabilidade
Logs estruturados (winston/pino).
Métricas Prometheus + Grafana.
Health checks com @nestjs/terminus.

## Alise de estrutura banco
🔹 Perfil
Foto, bio, portfólio, habilidades (tags).
Avaliações & notas.
Experiência profissional.

🔹 Projetos (Jobs)
Cliente posta com título, descrição, orçamento, prazo.
Categorias e subcategorias (ex: Design → UI/UX).
Status (Aberto, Em Progresso, Concluído, Cancelado).

🔹 Propostas
Freelancer envia proposta: valor, prazo, mensagem.
Cliente aceita ou recusa.

🔹 Contrato
Quando uma proposta é aceita → vira contrato.
Regras de pagamento (escrow ou milestones).
Status (Ativo, Pausado, Concluído, Cancelado).

🔹 Pagamentos
Gateways: Stripe, PayPal, Pix.
Taxa de serviço da plataforma.
Histórico de transações.

🔹 Chat/Mensagens
Comunicação entre cliente e freelancer.
Upload de arquivos (com limite de tamanho).
Notificações em tempo real.

🔹 Avaliações
Após finalizar contrato → cliente e freelancer avaliam-se mutuamente (1–5 estrelas + comentário).

🔹 Sistema de Recomendação (IA futura)
Jobs recomendados para freelancers.
Freelancers recomendados para clientes.

🔹 Administração (Backoffice)
Dashboard de métricas (número de jobs, pagamentos).
Gestão de usuários.
Moderação de disputas.

Novas Entidades / Ajustes

- [x] User      (Usuario)    - id, name, email, password, role (client/freelancer/admin), score, bio, skills, hourly_rate (taxa horaria), photo
- [x] Portfolio (Portfolio)  - id, profileId (FK), title, description, link, # TODO: tipo (projeto real, demo, etc.)
- [x] Job       (Trabalho)   - id, clientId (FK), title, description, categoryId (FK), budget (orçamento), deadline (prazo final), status
- [x] Proposal  (Proposta)   - id, jobId (FK), freelancerId (FK), value, deadline, message, status
- [x] Contract  (Contrato)   - id, proposalId (FK), start_date, end_date, status, payment_status   { É o registro formal de que um job foi aceito e que o freelancer vai executá-lo }
- [x] Payment   (Pagamento)  - id, contractId (FK), amount, method, transaction_status, created_at                     
- [x] Message   (Chat)       - id, senderId (FK), receiverId (FK), contractId (FK), content, timestamp {comunicação entre cliente e freelancer.}
- [x] Review    (Avaliação)  - id, contractId (FK), reviewerId (FK), reviewedId (FK), rating, comment
- [x] Category  (Categoria)  - id, name (Designer, Dev, Marketing, etc.), parentId (FK opcional)       {Representa as áreas em que jobs podem ser classificados}
 

💡 Observações de implementação:
Score do freelancer:
Média ponderada das avaliações recebidas (Review) + métricas de performance (entregas no prazo, aceitação de propostas, número de contratos concluídos).
Portfólio: cada freelancer pode ter vários projetos vinculados ao seu perfil.
Avaliações mútuas: Review liga quem avaliou e quem foi avaliado.
