# sales-express-demo

# To start the project please follow below steps 

1  Clone the repository

2  Run a command `npm i`

3  Create .env file and set a value something like below 
   ```js
       NODE_ENV=development
       PORT=3001
       DB=postgres
       DB_HOST=localhost
       DB_PORT=5432
       DB_USER=postgres
       DB_PASSWORD=postgres
       DB_SCHEMA=public
   ``` 
   
4  Run the file using command `node server.js`   

5  Check the server is running at `http://localhost:3001` 

6  Once the server started Call the below apis 

   - to save sales data call the route http://localhost:3001/sales/save
      ```js
         {
              "amount":100,
              "username":"shilpa",
              "date":"2021-03-01T09:06:20.280Z"
         }
      ```

   - to fetch sales data   call the route http://localhost:3001/sales/fetch/:statsType   (statsType must be any of `daily`,`weekly`, `monthly`)
    
