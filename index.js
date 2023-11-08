const express=require('express');
const app=express();
const hbs=require('hbs');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const admin=require('./routes/router');
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/account",()=>
{
    console.log("DB Connected!!");
})
app.set('view engine','hbs');
app.set('views','views');
app.use(admin);
app.listen(5000,()=>
{
    console.log("Server Connected!!!");
})