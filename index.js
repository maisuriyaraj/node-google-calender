const express = require('express');
const userRoute = require('./routes');

const app = express();

app.use(express.json());
app.use('/api',userRoute);

app.listen(2003,()=>{
    console.log("Server Started on http://localhost:2003/");
});
