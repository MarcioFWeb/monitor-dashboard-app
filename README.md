
# MONITOR DASHBOARD APP (WEB) 1.0.0

Aplicação WEB Monitor Dashboard.

* Controle de login por usuário (email e senha).
* Apresenta informações de 3 gráficos (sobre serviços Cloud). "Monitor Dashboard".
* Gerencia usuários do sistema (somente usuários ADMINISTRADORES podem acessar esta função).

# SOBRE

* Tecnologias, frameworks: React, Redux, Hooks, React Router, Recharts, Material UI, Axios ...

## Especificidades

* Criado a partir do Create React APPS [e do código base criado pela equipe do [Material UI](https://mui.com/pt/).
* Utilizando CRACO como modelo da criação da aplicação e execução. [CRACO - Create React App Configuration Override](https://www.npmjs.com/package/@craco/craco)
* Responsivo (web, tablets, mobile).
* Navegação através de react router (browser router).
* Gráficos criados usando [Recharts](https://recharts.org/en-US) e Ícones do Material UI.
* Utilizando estilização e componentes do Material UI (com alguma personalização).
* Uso de Redux em parte da aplicação (Autenticação e Autorização).
* Uso de Localstorage para controlar sessão.
* Uso de Fetch (Axios) + Hooks para consumir dados dos gráficos e também operações com usuário (listagem, inclusão, alteração, exclusão).
* Os 2 usuários básicos NÃO podem ser alterados. (Comportamento controlado na API).
* Usuários básicos: "usuariocomum@teste.com.br" e "usarioadm@teste.com.br" [Senha padrão? Me consultar por email [Enie-me um email](mailto:marciofweb@gmail.com))
* Os 2 perfis são: "administrador" e "funcionario".
* Operações reais com os usuários. Conectado à API, persistindo o cadastro de usuário em uma base de dados MONGODB.
* Uso de hooks + media queryes permitindo alterações dinâmicas no layout entre telas maiores e pequenas (smartphones, etc).
* Organização do design da aplicação, utlizando de vários recursos:
* Organização das VIEWS em "páginas" e "componentes" (reutilização de diversas partes da aplicação).
* Organização dos componentes de STORAGE do REDUX.
* Organização dos objetos de domínio (services, helpers, enuns) para reutilização, semântica e otimização.

## Autoria

* Criado por: Marcio Figueiredo [email](mailto:marciofweb@gmail.com)

## BACKEND/API

* A aplicação WEB se conecta com a API REST publicada no endereço:
[API Adress](https://monitor-dashboard-api-maofigueiredo.vercel.app)

* Se desejar, pode realizar Download da COLLECTION do POSTMAN, para utilizar a API isoladamente (e conhecer as rotas).
[Documentação Postman](https://drive.google.com/file/d/1P1X-C1UxQyAeZJSwY5LcoN1N4TKwi_tG/view?usp=sharing)

# COMO EXECUTAR LOCAL

Baixe ou clone o projeto localmente.

Instale as dependências:

    npm install

Execute a aplicação localmente:

    npm start
