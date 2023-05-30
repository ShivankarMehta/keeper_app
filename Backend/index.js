import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB", {useNewUrlParser:true, useUnifiedTopology:true},()=>console.log("DB Connected"))

const keeperSchema=mongoose.Schema({
    title:String,
    description:String
})
const keeper= new mongoose.model("keeper", keeperSchema)
const app= express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.get("/api/getALL",(req,res)=>{
    keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(keeperList)
        }
    })
})

app.post("/api/addNew",(req,res)=>{
    const {title,description}= req.body;
    const keeperobj =new keeper({
        title,
        description,
    })
    keeperobj.save(err=>{
        if(err){
            console.log(err);
        }
        keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(keeperList)
            }
        })
    })
})

app.post("/api/delete",(req,res)=>{
   const {id} =req.body;
   keeper.deleteOne({_id:id}, ()=>{
    keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(keeperList)
        }
    })
   });

})

app.listen(3001,()=>{
    console.log("Backend created at port 3001")
})