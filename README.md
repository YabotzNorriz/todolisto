# TodoListo - Aplicação de Lista de Tarefas

Bem-vindo ao **TodoListo**, uma aplicação full-stack de gerenciamento de tarefas. O projeto consiste em uma API RESTful robusta desenvolvida com Java e Spring Boot, e uma interface de usuário moderna e reativa construída com Angular.

**Grupo:** João Pedro Andrade Paes Pimentel Barbosa, Pedro Gabriel Sousa Lopes e Tobias Reis Cassiano

---

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

### **Backend**
* **Java 21:** Versão mais recente do Java, garantindo performance e segurança.
* **Spring Boot 3.5:** Framework para criação de aplicações Java de forma rápida e eficiente.
* **Spring Data JPA (Hibernate):** Para persistência de dados e mapeamento objeto-relacional.
* **MySQL:** Sistema de gerenciamento de banco de dados relacional.
* **Maven:** Ferramenta para gerenciamento de dependências e build do projeto.

### **Frontend**
* **Angular 20:** Framework para a construção de Single-Page Applications (SPAs).
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **SCSS:** Pré-processador CSS que adiciona funcionalidades como variáveis, aninhamento e mixins.
* **Angular CLI:** Ferramenta de linha de comando para automação de tarefas no desenvolvimento Angular.

---

## Funcionalidades

* **CRUD completo de Tarefas:** Crie, visualize, atualize e delete tarefas.
* **Agrupamento:** Organize tarefas em grupos ou categorias.
* **Status de Conclusão:** Marque tarefas como "pendentes" ou "concluídas".
* **Filtragem Dinâmica:** Filtre tarefas por grupo ou status em tempo real.
* **Interface Reativa:** Experiência de usuário fluida e sem recarregamentos de página.
* **Validação de Formulários:** Validação robusta tanto no frontend quanto no backend.

---

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

### **Pré-requisitos**

Antes de começar, certifique-se de que você tem os seguintes softwares instalados:
* [Java (JDK) 21](https://www.oracle.com/java/technologies/downloads/#java21)
* [Apache Maven](https://maven.apache.org/download.cgi)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)
* [Node.js e npm](https://nodejs.org/)
* [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

### **1. Configuração do Backend (Java/Spring Boot)**

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/todolisto-main.git](https://github.com/seu-usuario/todolisto-main.git)
    cd todolisto-main
    ```

2.  **Configure o Banco de Dados:**
    * Execute o script SQL localizado em `scripts_sql/task.sql` em seu servidor MySQL. Isso criará o banco de dados `todolisto_db`, a tabela `task` e os triggers necessários.
    * Abra o arquivo `todolisto-backend/src/main/resources/application.properties`.
    * Atualize as propriedades `spring.datasource.username` e `spring.datasource.password` com suas credenciais do MySQL.

3.  **Execute a Aplicação Backend:**
    * Navegue até a pasta do backend:
        ```bash
        cd todolisto-backend
        ```
    * Execute a aplicação usando o Maven:
        ```bash
        mvn spring-boot:run
        ```
    * O servidor backend estará rodando em `http://localhost:8080`.

### **2. Configuração do Frontend (Angular)**

1.  **Navegue até a Pasta do Frontend:**
    * Em um novo terminal, vá para a pasta `todolisto-frontend`:
        ```bash
        cd ../todolisto-frontend
        ```

2.  **Instale as Dependências:**
    * Execute o comando abaixo para instalar todas as dependências do projeto listadas no `package.json`:
        ```bash
        npm install
        ```

3.  **Execute a Aplicação Frontend:**
    * Inicie o servidor de desenvolvimento do Angular:
        ```bash
        ng serve
        ```
    * A aplicação frontend estará acessível em `http://localhost:4200/`.

---

## 🔌 Endpoints da API

| Método HTTP | Endpoint                  | Descrição                                 |
|-------------|---------------------------|-------------------------------------------|
| `GET`       | `/api/tasks`              | Retorna todas as tarefas.                 |
| `GET`       | `/api/tasks/{id}`         | Retorna uma tarefa específica pelo seu ID.|
| `GET`       | `/api/tasks/completed`    | Retorna todas as tarefas concluídas.      |
| `GET`       | `/api/tasks/pending`      | Retorna todas as tarefas pendentes.       |
| `POST`      | `/api/tasks`              | Cria uma nova tarefa.                     |
| `PUT`       | `/api/tasks/{id}`         | Atualiza uma tarefa existente.            |
| `DELETE`    | `/api/tasks/{id}`         | Deleta uma tarefa pelo seu ID.            |
| `PATCH`     | `/api/tasks/{id}/toggle`  | Alterna o status de conclusão da tarefa.|
