const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// check the require const 
//check all const step to steps 

const { errorHandler } = require('./middleware/errorMiddleware'); 

const app = express();

//app user stpes to ues in postman 
//now show real.....req

app.use(cors());
app.use(express.json()); 

app.get("/", (req,res) => {
   res.send("API is running...");
});

//mongo conect......
mongoose
  .connect(process.env.mongo_url)
 .then(() => console.log("MongoDB connected successfully")) 
.catch((error) => console.log("MongoDB error:", error)); 

// for routes import
// for resource check in post man 

const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes"); 

//end point......
//user last source......

app.use("/api/users", userRoutes); 
app.use("/api/resources", resourceRoutes); // This is the correct endpoint for the Day 4 Resource API

//for error handler check save port.....
app.use(errorHandler);


const port = process.env.PORT || 5000; 

// Start the server 
app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});