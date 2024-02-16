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

# Primeiros testes de Categoria

- npm run test -- --watch (assiste se há mudança nos testes)

- Cada teste pode ter subniveis e subsuites que envolve um grupo de testes

# Sobre objetos de valores

- Pensar a médio e longo prazo se os uuids estão usáveis e vamos falar nos objetos de valores que vão nos ajudar a abstrair esse tipo de comportamento dos IDs
- Todos os outros campos da Entidade categoria podem mudar ao longo do tempo, somente a ID que não.
- Lembrando que os objetos de valores vão nos ajudar a armazenar um valor específico, fazendo validações necessárias. Eles se diferenciam das Entidades pois são livres de efeitos colaterais e são imutáveis
- Se você se dedicar mais a gerar objetos de valores você acaba gerando mais qualidade para a sua aplicação pois você pega aquele conjunto pequeno de regras em relação àquele valor e tira ela das entidades tornando aquilo reusável.
- Então você usa os objetos de valor para escrever melhor aquele valor, retira responsabilidade da entidade, reusar entre entidades diferentes e assim por diante. 

# Abstração objetos de valores
- shared/domain/value-object.ts
- install package lodash (lida com array, matrizes e objetos)
  - npm install lodash
  - npm install @types/lodash -D

# Criando objeto de valor para uuid
- na parte de crypto do nodejs
- porém temos uma lib muito bem consolidade que é o uuid
  - npm install uuid 
  - npm install --save-dev @types/uuid

- Tem uma parte do Clean Arquicture que o Uncle Bob fala da quebra parcial da arquitetura
- Muitas vezes você não consegue uma arquitetura purista por várias questões de negócio
- O Spy é um Mock, uma estrutura que a gente consegue controlar o comportamento dela

# Sobre validação de entidades

- Syntax validation: validar tipagem primitivas (string, number, null)
- Retirar a responsabilidade da Entidade e criar uma para a validação
- A classe precisa se auto-validar, porém ela não precisa prover a validação
- Não vamos usar o validator-rules.ts
- Vai se trabalhar com purismo de código tudo sem lib
  - Não! Isso é um entedimento errado dos livros do Uncle Bob e dos livros de DDD também. Lá diz que você precisa usar as libs ao seu favor e de um modo que você consiga controlar o comportamento dela.
- Vamos utilizar o classValidator, muito utlizado no Framework NestJS
- npm install class-validator
- Criar um arquivo para que o SWC trabalher com TS
    - configurações .swcrc = compilar de um modo diferente com o SWC

- npx tsc --noEmit (verifica se há algum erro de tipagem )

# Categoria - Repositório

- Respositório tornou-se um conceito muito amplo. Ele é usado em diversos lugares e normalmente não significam a mesma coisa. Porém repositório tornou-se um conceito onde uma camada que vai lidar com uma entidade.
- Os repositórios no DDD lidam com as entidades do DDD, ou seja, uma entidade que tem dados e comportamento, uma entidade que possua uma modelagem rica.
- Os respositórios são criados a partir de agregado. Categoria é um agregado e tem-se um repositório para cada agregado. Para a entidade isolada a gente não tem.
