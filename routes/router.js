const express=require('express');
const datas=require('../model/userModel');
const route=express.Router();
route.get('/',(req,res)=>
{
    res.render('login');
})
route.get('/create',(req,res)=>
{
    res.render('create');
})
route.get('/update',async(req,res)=>
{
    let uid=req.query.uid;
    const getone=await datas.findOne({_id:uid})
    res.render('edit',{getone});
})
route.get('/view',async(req,res)=>
{
    const records=await datas.find();
    let did=req.query.did;
    if(req.query.did)
    {
        await datas.deleteOne({_id:did});
        return res.redirect('/view');
    }
    res.render('view',{records});
})
route.post('/new',async(req,res)=>
{
    const rec=await new datas({
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        pass:req.body.pass,
        mobile:req.body.mobile,
        add:req.body.add
    })
    rec.save();
   return res.redirect('/');
})
route.post('/change/:id',async(req,res)=>
{
    const daat={
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        pass:req.body.pass,
        mobile:req.body.mobile,
        add:req.body.add
    }
    await datas.updateOne({_id:req.params.id},{$set:daat});
    return res.redirect('/view');
})
route.post('/log',async(req,res)=>
{
    const result=await datas.findOne({email:req.body.email} && {pass:req.body.pass});
    if(result)
    {
        return res.redirect('/view');
    }
    else
    {
        let msg="Login Failed";
        res.render('login',{msg});
    }
})
module.exports=route;