# Montagem do ambiente de desenvolvimento (Docker e IDE)

# Criar uma aplicação TypeScript (Core)

# Criar entidade de Categoria

# Criar testes (pirâmide de testes - [testes unitários, testes de integração e end-to-end])

# Criar Casos de Uso e Repositório

# Nest.js - Criação de API Rest

# Criar testes e2e (end-to-end)

# Repetir para outras entidades Cast member, Genre, Video

# Integração com RabbitMQ e Encoder de vídeo

# Keycloak

# Logs

# CI (esteira com o Github Actions e montagem de um Dockerfile para produção)

# Referências Bibliográficas

- 1º: Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin)
- 2º Implementing Domain-Driven Design (Vaughn Veron)
- 3º: Domain-Driven Design: Atacando as complexidades no coração do Software (Eric Evans)
- 4º: Patterns of Enterprise Application Architecture (Martin Fowler)

# Extensões VSCode

- JavaScript and TypeScript Nightly: trabalhar com versões próximas que não é uma estável
- ESLint:
- Prettier:

# Configuração do Docker

- Criar um Dockerfile e docker-compose.yaml
- dar permissão de execução para o start.sh
  - chmod +x .docker/start.sh
- Tomar cuidado com a compatibilidade entre libs da versão do node do WSL e da imagem do Container....
  - O ideal é instalar as libs dentro do container

# Integrando com dev container

- Essa experiência de ficar rodando o comando docker compose up, dando um exec para entrar no container não é muito produtivo.
- O VSCode tem uma extensão chamada dev container mantida pelo Microsoft que vai "jogar" o VSCode para dentro do container.
- Não é para esquecer que estamos usando docker. Qualquer extensão que eu precisar instalar no vscode que precisar ver a versão do node ou algo que está dentro do container, na máquina elas não conseguem ver, pois estão enxergando somente a máquina.
- Para evitar incompatibilidade e ter uma boa experiência com as extensões usa-se o dev container para ter uma experiência completa com essas extensões no docker.
- Verificar se tem a extensão Dev Containers instalada - @installed dev containers
- No dev container há várias imagens padrões para poder desenvolver
- CTRL + P
- >Dev container: Open Folder in Container..

# Criando projeto Node.js mais TypeScript

- excluir pacakge-lock.json
- npm init -y
- npm install typescript -D
- npx tsc --init
- npm install jest @types/jest -D (jest como test runner)

- Para poder rodar esses testes com o Jest utlizando TypeScript teria que compilar para TypeScript.
- Para isso será utilizado um pacote da Vercel que faz o Next.js 
  - swc (lib construida em hust) que faz a compilação.
    - 20x mais rápido que o compilador nativo do TypeScript
- npm install @swc/core @swc/cli @swc/jest -D
- npx jest --init
- npm install ts-node --save-dev