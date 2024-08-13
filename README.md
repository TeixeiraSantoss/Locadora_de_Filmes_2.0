# Locadora_de_Filmes_2.0
<h1>Sobre o projeto:</h1>

Este projeto é uma aplicação web para gerenciar filmes em uma locadora. Ele foi desenvolvido utilizando uma combinação de tecnologias backend e frontend, com suporte para diferentes níveis de acesso (usuário e administrador) e uma interface amigável para cadastro, listagem e manipulação de dados de filmes e gêneros.

<strong>Tecnologias Utilizadas:</strong>

<strong>Backend:</strong>

C#: Linguagem de programação utilizada para desenvolver a API.

Entity Framework Core: ORM utilizado para manipulação e persistência dos dados.

SQLite: Banco de dados leve, utilizado para armazenar as informações de filmes, gêneros, e usuários.

ASP.NET Core: Framework utilizado para construir a API RESTful.

<strong>Frontend:</strong>

Angular: Framework JavaScript utilizado para construir a interface do usuário.

TypeScript: Linguagem de programação utilizada no desenvolvimento do frontend.

Bootstrap: Framework CSS utilizado para estilizar a interface e torná-la responsiva.

<strong>Autenticação e Autorização:</strong>

Guards no Angular: Utilizados para proteger rotas e controlar o acesso baseado no tipo de usuário (usuário comum ou administrador).

AuthService: Serviço personalizado utilizado para gerenciar a autenticação e autorização na aplicação.

<strong>Funcionalidades:</strong>

Autenticação de Usuários: Permite que usuários se autentiquem e acessem funcionalidades de acordo com seu nível de permissão.

Gerenciamento de Filmes: Interface para listar, cadastrar, alterar e excluir filmes.

Gerenciamento de Gêneros: Interface para listar, cadastrar, alterar e excluir gêneros de filmes.

Acesso Diferenciado: Usuários comuns podem visualizar a lista de filmes, enquanto administradores têm acesso a todas as funcionalidades.

Controle de Interface: O menu é exibido ou ocultado dinamicamente, dependendo da tela em que o usuário se encontra e de suas permissões.


<h1>Como rodar o projeto?</h1>

<strong>Passo 1: Clonar o Repositório</strong>

  Abrir o terminal ou prompt de comando.
  
  Navegar até o diretório onde deseja clonar o repositório.
  
  Clonar o repositório usando o comando:
  
    git clone https://github.com/TeixeiraSantoss/Locadora_de_Filmes_2.0

(TODOS OS PASSOS DO 2 AO 5 DEVEM SER FEITOS PELO TERMINAL NO DIRETORIO ESPECIFICADO PARA CADA PASSO)

<strong>Passo 2: Configurar o Backend</strong>

  Navegar até o diretório do backend:
  
    cd ./Locadora(Filmes)/Backend
    
  Restaurar pacotes NuGet:
  
    dotnet restore
    
  Aplicar as migrações para configurar o banco de dados:
  
    dotnet ef database update
    
  (Certifique-se de que o Entity Framework Core está instalado globalmente ou como uma ferramenta local no projeto).
  
  Rodar o backend:
  
    dotnet run ou dotnet watch run

  (O backend estará disponível, por padrão, em https://localhost:7187.)

<strong>Passo 3: Configurar o Frontend</strong>

  Abrir um novo terminal e navegar até o diretório do frontend:
  
    cd ./Locadora(Filmes)/Front
    
  Instalar as dependências do Angular:
  
    npm install
    
  Rodar o frontend:
  
    ng serve -o
    
  (O frontend estará disponível em http://localhost:4200.)

<strong>Passo 4: Acessar a Aplicação</strong>

  Abrir o navegador e acessar http://localhost:4200.
  
  Realizar o login para acessar as funcionalidades de acordo com o tipo de usuário:
  
    Acessar como Usuario:
    
      Email: 'teste'
      
      Senha: 'teste'    
      
    Acessar com Administrador:
    
      Senha: '1234'

<strong>Passo 5: Desligar a Aplicação</strong>

  Parar o frontend: No terminal onde está rodando o Angular, pressione Ctrl + C.
  
  Parar o backend: No terminal onde está rodando o backend, pressione Ctrl + C.
  
Seguindo esses passos, você deverá ter o projeto rodando localmente em sua máquina.
