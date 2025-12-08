const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// check the require const 
//check all const step to steps 

const { errorHandler } = require('./middleware/errorMiddleware'); 


// 1.live fornted
const allowedOrigins = [
    'http://localhost:3000', 
    'YOUR_LIVE_FRONTEND_URL_HERE'
]; 

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
//

const app = express();

//app user stpes to ues in postman 
//now show real.....req

//
app.use(cors(corsOptions)); 
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
app.use("/api/resources", resourceRoutes); 

//for error handler check save port.....
app.use(errorHandler);


const port = process.env.PORT || 5000; 
//start the main point 

// Start the server 
app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});