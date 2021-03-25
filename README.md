# sales-express-demo

# To start the project please follow below steps 

1  Clone the repository and create database `test` in RoboMongo or any tool you are using 

2  Run a command `npm i`

3  Create .env file and set a value something like below 
   ```js
       NODE_ENV=development
       PORT=3001
       TOKEN_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c60
   ``` 
   
4  Run the file using command `node server.js`   

5  Check the server is running at `http://localhost:3001` 

6  Once the server started Call the below apis 

   - for user registration call the route http://localhost:3001/users/save (Sign up api)
      ```js
         {
              "name":"Shilpa Vasava",
              "username":"shilpa",
              "email":"shilpa@gmail.com",
              "password":"*****"
         }
      ```
   
   - for user list call the route http://localhost:3001/users/list
   
   - for auth signin call the route http://localhost:3001/auth/signin         
      ```js
               {                    
                    "username":"shilpa",                    
                    "password":"*****"
               }
       ```
