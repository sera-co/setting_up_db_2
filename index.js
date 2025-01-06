const mongoose=require('mongoose')
const express = require('express');
const { resolve } = require('path');
const dotenv=require('dotenv').config()
const user=require('./schema.js')

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json())
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log("Error connecting to database"))

app.post('/api/users',async(req,res)=>{
  try{
    const userdetails=req.body
    const newuser=new user(userdetails)
    await newuser.save()
    res.status(200).json({message:"User created successfully"})

  }
  catch(err){
    if(err.name=='ValidationError'){
      res.status(400).json({message:"Validation Error",Explanation:err.message})
    }
    else{
      res.status(500).json({message:"Server error",Explanation:err.message})
    }
  }

})
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
