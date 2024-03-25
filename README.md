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
- > Dev container: Open Folder in Container..

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
- Os respositórios são criados a partir de agregados. Categoria é um agregado e tem-se um repositório para cada agregado. Para a entidade isolada a gente não tem.
- Primeiro cria-se uma interface (uma abistração ou contrato) pois não se sabe qual banco será implementado
- Os repositórios estão preocupados apenas com Storage (Armazenamento) e não necessariamente armazenamento em banco de dados, pode ser em um arquivo do Excel por exemplo.

# O que são test data builders

- Entidade é algo que se utiliza em todo tipo de teste. Seja em testes unitários, end-to-end ou intergração, vai pegar uma entidade, criar uma instância para fazer algo. Nos testes unitários não está se preocupando inicialmente com regras de negócios, mas em instanciar uma classe, fazer um armazenamento ou filtragem, e, se a entidade é um pouco mais complexa, onde se recebe muita coisa no construtor ou em um factory fica muito contra-produtivo fazer os testes. Em muitas entidades o intuíto é somente gerar uma entidade válida. Então a repetição da criação de entidades vai dificultando os testes.
- Então é interessante ter uma forma de gerar essas entidades tirando essa preocupação dos testes e quando essas entidades mudarem e elas vão mudar, o impacto nos testes seja mínimo.
- Vamos trabalhar então com um conceito chamado test data builders. Esse padrão foi proposto por Steve Freeman no seu livro Growing Object-Oriented Software, Guided By Tests. Ele não tem nada de novo, apenas o design pattern builder aplicado nas entidades. O Design Pattern Builder é um padrão criacional e usar isso diretamente nos testes livra o repositório fique se preocupando diretamente como usar as operações
- npm i chance @types/chance --save-dev
- Todo método with está usando um influent pattern para sempre fazer Entity.with.with ....

# Sequelize

- npm install sequelize sequelize-typescript
- npm install @types/sequelize --save-dev
- npm install sqlite3

# Criando model de Categoria

- criar a modelagem da categoria que vai representar a tabela do banco de dados dentro do projeto
- depois é pegar o modelo e traduzir para a entidade

# Criando mapeador para Categoria e o Model sequelize

- Conversão que está sendo feita, tanto da entidade rica do DDD para o modelo do Sequelize e vice-versa.

# Criando serviço de configuração para os testes

- é insdispensável fazer configurações para permitir que por meio de variáveis de ambiente ou uma parte separada da aplicação consiga configurar qual será o banco de dados por exemplo.
- a aplicação deve estar presa a um serviço de configuração específico (fora dos testes por exemplo)
- a variável de ambiente vai ser um modo onde vamos configurar esse serviço de configuração que vai espalhar esses serviços pela aplicação

# Criando helper de testes para criar instância do Sequelize

- uma pratica recomendada é criar helpers (funções que são chamadas dentro da aplicação).
- vão abstrair alguma necessidade da aplicação

# Casos de Uso

- casos de uso estão na camada de application, pois eles reunem a necessidade de fazer a operação, conectando o cliente (seja um usuário, um teste, etc.) com a camada mais importante que do domínio que são as entidades.
- as entidades por si só a gente chama de regras independentes de negócio, sozinhas elas não existem, elas precisam de uma acamada de aplicação (casos de uso) que vão orquestrar o seu uso.

- Fixtures: As fixtures são funções que fornecem dados ou objetos necessários para executar um teste. Elas ajudam a evitar repetições de código e tornam os testes mais legíveis e fáceis de entender. (Testes do caso de uso de edição da categoria)

# Sobre a validação de sintaxe vs validação de domínio

- Ao trabalhar com as métodologias de desenvolvimento como a Arquitetura Hexagonal, Clean Arquitecture, Domain-Driven Design, etc. é que o conceito de validação está presente em cada camada do software. Ele começa lá no front-end (sendo uma aplicação web ou não) e ao digitar um texto ou uma data já está sendo feito uma validação antes de submeter esses dados do formulário. Ao enviramos essa informação via verbo POST para um servidor WEB (vamos supor que seja um Nginx) ele vai validar se o nosso Body (corpo da mensagem enviada) não está excedendo o tamanho limite e outras validações acontecem e ai chega na nossa aplicação o JSON que estou recebendo da minha API REST também é validado, se ele está em um formato aceitável. Então vamos tendo uma sequência de validações até que se chega nessa camada de domínio e é processado o que é necessário.

category.validator.ts

- domain validations vs syntax validations
- domain validations são as regras cruciais do negócio. Ex: O nome da categoria deve ter no máximo 255 caracteres. Se o cliente escolher um filme da categoria Promoção, descontar 10% do preço.
- syntax validations são regras onde determinam se precisa ser um número, uma data, se pode ser ou não nula, etc.

- Por enquanto estamos misturando as abordagem de domínio e de sintaxe. Porém qual é o problema disso? Vai acabar sobrecarregando o domínio com essas validações sendo que temos outras camadas externas desse software que vão acabar usando a nossa camada de aplicação, como os controladores que vão usar os nossos casos de uso.

# Sobre o lançamento de exceções do validar entidades

- por enquanto toda vez que a categoria é invalidada, nós lançamos uma exceção. No exemplo do create e update category use-case, ficar usando o bloco try/catch geraria um tremendo code smell. No caso do update, lançar uma exceção diretamente tem uma consequência para o nosso código. É melhor retornar todo os histórico de problemas do que um a um.
- então nesse caso é melhor trabalhar com um padrão conhecido como notification pattern onde eu consigo chegar em cada método.
- Ter na camada de aplicação a possibilidade de orquestrar o lançamento de exceções é melhor do que deixar a entidade sendo impositiva.

# Integração com Nest.js

## Criando o projet Nest.js

- Alterar Dockerfile instalando o CLI do nest de modo global

- Rebuildar container

- nest new nest

- criar diretorio tmp na raiz, mover todos os arquivos que estão na raiz para tmp

- rm -rf node_modules e rm -rf nest/node_modules/

- criar src/core e mover shared | caterogy para lá

- a aplicação do nest vai ficar na própria raiz

- mover os arquivos da pasta nest/src para a src

- mover a pasta nest/tests para a raiz do projeto

- mover os arquivos da raiz do nest também vão para a raiz do projeto

- apagar a pasta nest

- copiar as dependencias do package.json do temp e colar nas dependencias do package.json da raiz do projeto

- apagar tmp/package.json tmp/tsconfig.json e tmp/.gitignore

- npm install

# Reconfigurando SWC e Jest

- npm i --save-dev @swc/cli @swc/core
- npm i --save-dev jest @swc/core @swc/jest

- nest-cli.json "builder": "swc"
  // só compila, não verifica a tipagem
  // verifica a tipagem
- package.json

# Sobre o registro de serviços no Nest.js

- O Nest vai servir para a montagem da API.
- Dentro do Core nós temos os repositórios, os casos de uso e sempre vamos ter algumas classes que vão receber algumas dependências que por enquanto estão sendo usados somente nos testes.
- Podemos usar o Nest para poder organizar os nossos serviços e dependências pois o Nest contém mecanismos para gerenciamento dessas coisas.

- category-sequelize.repository.ts Decorator Injectable(): registra a classe dentro de um módulo dando a possibilidade de passar a referência do parâmetro do construtor
- Porém em uma abordagem purista o intuíto é deixar o core o mais livre possível de libs
- Então quando não tem o decorator Injectable() precisa "ensinar" para o Nest o que ele precisa prover
- Aqui se inverte as dependências onde o Framework Nest depende do core.

# Criando módudo Nest para Categoria

- Para poder fazer a integração com serviços, a primeira coisa a ser criada é um módulo. O módulo é uma estrutura dentro do NestJS que permite o agrupamento de coisas pré-relacionadas para poder disponilizar um tipo de serviço na nossa aplicação. Dentro de um módulo temos controladores que vão disponibilizar rotas de acesso, serviços que vão poder executar algo como regras de negócios e tudo isso pode ser utilizado pelo restante da aplicação.
- O módulo é uma maneira bem interessante de organizar o projeto pois permite agrupar essas coisas que estão relacionadas que vão poder ser reutilizadas. Posso pegar esse módulo e transportar para outra aplicação.
- Vamos criar um módulo por entidade
- o cli do nest fornece a opção generate que gera várias coisas, entre elas o módulo de category. Depois precisaria gerar um controller para o módulo.
- podemos usar a opção resource pois ela gerar um CRUD completo.
- nest g resource
  resource? categories
  meio de transporte (REST API)? REST API
  gerar CRUD? Y

# Integração do Nest com Sequelize

- npm i @nestjs/sequelize

- app.module.ts
  imports: [ SequelizeModule.... ]

# Criando módulo para banco de dados

- nest g module database

# Criando módulo para configuração

- npm install @nestjs/config
- nest g module config

# Validando valores das configurações

- npm install joi

# Integração com MySQL, tmpfs (temporary FileSystem) e docker por ambiente

- tmpfs criar um sistema de arquivos em memória RAM ao invês de criar no disco (torna o IO muito mais rápido)
- o Docker já incorpora esse conceito que os Sistemas Operacionais já possuem
- o comportamento do tmpfs é quando o container for parado você perde os dados, não precisa nem destruir o container

# Testes do DatabaseModule

- npm install mysql2

# Criando camada de apresentação do resultado dos casos de uso

- serve para trabalhar com a serialização que é o ato de transformar um string em JSON (objeto) ou desserialização que é o contrário.
- npm install class-transform

# Criando operação de listar categorias

- npx nest g module shared

# Criando fixture para categoria

- Em testes mais complexos, onde há uma grande variação de dados de entrada para poder avaliar uma funcionalidade do software, usamos fixture.
- Quando a gente pensa em um conjunto de dados qual é a primeira coisa que vem na cabeça? Usa um laço de repetição para fazer as asserções com o framework de teste.
- O conceito de fixture permite que se organize esses dados de entrada, permitindo testar uma variação de dados de entrada.

# Rodando API em dev e ativando env de dev

- habilitar a extensão rest client
- criar envs/.env
- npm run start:dev

# Criando interceptors para envolver os dados da API

- cd src/nest-modules/shared-module/interceptors
- nest g interceptor wrapper-data
- main.ts
  - app.useGlobalInterceptors(new WrapperDataInterceptor());
- npm run start:dev

# Tratamento erros de not found e validação de domínio

- cd src/nest-modules/shared-module/
- nest g filter not-found

# Configuração para recriar tabelas a cada teste end to end

- Temos que tomar cuidado com uma silada com testes end2end da forma que estamos trabalhando no Jest.
- Faz parte do DNA do Jest rodar os testes de modo PARALELO, e com essa configuração do e2e estamos apontando apenas para um banco de dados.
- A cada teste, é destruída as tabelas e recriadas novamente. Então, quando um teste recriou as tabelas, outro teste começa a executar e recria, e o primeiro dá um erro de banco de dados como a tabela não existe, algo do tipo.

- precisa executar os testes de forma síncrona:
- npm run test:e2e:watch -- --runInBand
- com esse comando o Jest vai experar um teste acabar para depois executar outro
- outra estratégia é criar uma lógica que faça com que cada teste crie seu banco de dados e não dê problema de concorrência.

# Aplicando cobertura de código no projeto

- Um assunto muito relevantes quando se trata de testes é a cobertura de código, pois os tests runners das linguagens de programação conseguem passar um pente fino nas funções, nas classes, nas linhas de código e saber se os testes que estão sendo feitos estão contemplando quais linhas, quais não estão e até mesmo consegue contar: olha, esse testes que estão sendo executados aqui passaram 500 vezes em uma linha de código. Essas métricas são relevantes.
- As empresas normalmente tem uma métrica para poder ter uma certa qualidade no software que determina uma % mínima de cobertura de código.
- Ex.: 80% dos testes passaram nas linhas de código do meu projeto e no processo de CI não alcançar esses 80% é impedido de subir a próxima versão para a produção.
- Também é uma faca de 2 gumes pois ter uma alta cobertura de código não significa que de fato a sua aplicação está funcionando pois isso depende muito da qualidade dos seus testes. Você pode ter criado testes que não variam input e outputs de dados. Os testes estão bem simples, estão percorrendo todas as linhas tendo uma cobertura de testes alta mas não uma cobertura de variações de entrada e saída dos testes.
- Não necessariamente você precisa ter uma cobertura muito alta para ter essa qualidade

- jest.config.ts
- coverage: todos os parâmetros responsáveis pela cobertura de código

- vai rodar um jest --coverage (package.json)
  - npm run test:cov

# Criando instância do Umzug

- será adicionado um sistema de migração ao sistema pois apesar do sequelize identificar os models e criar as tabelas iniciais no bando de dados de produção, a medida que for sendo feita manutenção no software pode ser necessário excluir tabela, adicionar tabela, campos, etc, ele não vai conseguir sincronizar os models com os bancos de dados.
- então será necessário criar as migrações que são arquivos que descrevem as mudanças nos bancos de dados e vai versionando como se fosse um git e se quiser retroceder a um estado anterior é possível.

- npm install umzug

- /core/shared/infra/db/sequelize/migrator.ts

# Criando comando para gerenciar as migrações

- integrar com o NestJS

- nest-modules/database-module/database.module.ts

- cd src/nest-modules/database-module

- nest g module migrations (módulo independente)

- mover para a pasta database-module e retirar a integração com o database.module.ts

- criar src/migrate.ts

# Sobre testes e sincronização do banco de dados com migrações

- validação do schema (mysql que é o banco de produção)
- criar/gerar o schema do banco via models
- criar/gerar o schema do banco via migrations
- gero um dump do schema1 e schema2 e testo se as linhas contidas nos 2 arquivos são iguais
