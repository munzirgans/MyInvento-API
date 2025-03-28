# MyInvento API
## Summary
**MyInvento-API** is a RESTful API that handles user authentication and inventory management. It allows users to register and log in securely, while also enabling CRUD operations for managing items in the inventory. The API shares the same database with the MyInvento-App Laravel project, ensuring seamless integration and data consistency between both systems. **MyInvento-API** was developed to meet the criteria for the Fullstack Developer role at **AssistXEnterprise**.

## Tech Stack
Tech stack used in development of **MyInvento-API** includes:
- Node.js
- Express.js
- Json Web Token
- MySQL

Library used in development:
- bcryptjs
- jsonwebtoken
- mysql2
- dotenv
- express


## Project Setup
Steps to setup MyInvento-API project:
1. Clone repository
    ```
    git clone git@github.com:munzirgans/MyInvento-API.git 
    cd MyInvento-API
    ```

2. Install Dependencies
    ```
    npm install
    ```
3. Setup Database
    ```
    CREATE DATABASE myinvento;

    ```
4. Set Up Environment Variables

    Rename `.env.example` file to `.env`
    Edit `.env` with your configuration
    ```
    DB_HOST=localhost
    DB_USER=your_dbusername
    DB_PASSWORD=your_dbpassword
    DB_NAME=your_dbname
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=custom_jwt_expire_time
    ```
5. Run the App
    ```
    node server.js
    ```
    App is running on http://localhost:5000
6. Test API with API testing tools (Postman, Insomnia, etc)

## RESTful API Document
| Route | Method | Description | Request Body | Response |
|-------|--------|-------------|--------------|----------|
|/api/login| POST|Login account with jwt verification|```{ "email" : string, "password" : string }```|```{ "message" : string, "token" : jwt-token }```|
|/api/register| POST|Register new account| ```{ "firstname" : string, "last_name" : string, email : string,  "password" : string, password_confirmation: string }```| ```{ "message" : string, "data" : object }```|
|/api/barang/create|POST|Create new item| ```{ "name" : string, "description" : string, "price" : numeric }```| ```{ "message" : string, "data" : object }```|
|/api/barang/data|GET|Get all item data based on ```user_id``` in jwt-token|```empty```|```{ "items" : Array of object }```|
|/api/barang/data/:id|GET|Get item data based on ```item_id``` and ```user_id``` in jwt-token|```empty```|```{ "item" : object }```|
|/api/barang/data/:id|PUT|Update item data based on ```item_id``` and ```user_id``` in jwt-token|```{ "name" : string, "description" : string, "price" : numeric }```|```{ "message" : string, "result" : object }```|
|/api/barang/data/:id|DELETE|Delete item data based on ```item_id``` and in ```user_id``` jwt-token|```empty```|```{ "message" : string }```|

Enjoy using MyInvento-API Project 😊 🌟