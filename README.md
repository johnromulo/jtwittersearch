## Twitterfilter-backend

Um diretor de TV precisa exibir em um telão, os tweets que chegam contendo uma determinada hashtag que varia diariamente. Foi pedido que esses tweets fossem inseridos no telão por um controle: Através de um sistema web que seria comandado pelo pessoal de operações do estúdio, neste caso o mesmo deveria aprovar os tweets que estão chegando para que o mesmo seja exibido. Para essa exibição, deverá obrigatoriamente ter efeito de transição entre os tweets que foram aprovados no sistema de control.

### Instalação

- `$ yarn install`

### Executar

#### 1. Build desenvolvimento

- renomear o arquivo **.env-example** para **.env.development** é necessário preencher algumas variávei de ambiente correspondentes no arquivo.

_obs.: para falicilar deixei minhas váriaveis abaixo para que não haja a necessidade de instalação de ferramentas externas._

 NODE_ENV=development # Mongo MONGO_URL=mongodb://root:tw65fs22@ds155292.mlab.com:55292/heroku_853130qf

 # Redis
REDIS_HOST=redis-18918.c85.us-east-1-2.ec2.cloud.redislabs.com
REDIS_PORT=18918
REDIS_USER=
REDIS_PASSWORD=bl9OXd8R9FlVhZyp13Iv8leNXGMg3P1z

 # TwitterAPI
TWITTER_CONSUMER_KEY=zYvKbeBJlZIX0TsZXAhL7HhSV
TWITTER_CONSUMMER_SECRET=L1NMofIZZoYz0LRWPm2bpvUZ4BLSno2PIrLFxfdSbWhfHKeEgG
TWITTER_ACCESS_TOKEN_KEY=3592503497-x8wdMBUvh3EqYQisd6HSLnjlHdomlibsJl4FG8L
TWITTER_ACCESS_TOKEN_SECRET=xNxeiVREgcNcJaS6rjAhVhuQ4fVg8VT68YZzbcxFYaOFh


- `$ yarn start`

#### 2. Build Produção

- renomear o arquivo **.env-example** para **.env.production** é necessário preencher algumas variávei de ambiente co respondentes no arquivo.

      	NODE_ENV=production

* `$ yarn build`
* `$ yarn serve`
