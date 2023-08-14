const express=require("express")
const {UserModel}=require("../model/usermodel")
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken")
const UserRouter=express.Router()

//regiseter the user
UserRouter.post("api/register",async(req,res)=>{
    try{
       const payload=req.body;
            const haspass=await bcrypt.hashSync(payload.password,8)
            payload.password=haspass;
     
            const newuser=new UserModel(payload)
            await newuser.save()
            res.status(200).send("User register")
      
    }catch(err){
        console.log(err.message)
        res.send(err)
    }
})



UserRouter.post("api/login",async(req,res)=>{
    try{
        const payload=req.body;
        const user= await UserModel.findOne({email:payload.email});
        
        if(!user)
        {
           res.status(400).send({msg:"please register"})
        }

        const ispasscorr=await bcrypt.compareSync(
            payload.password,
            user.password
        )

        if(ispasscorr)
        {
            const token=await jwt.sign({email:user.email,userid:user._id},"masai")

            res.status(200).send({"msg":"login sucsess","token":token})

        }
        else{
            res.status(400).send({"msg":"wrong pass"})
        }

    }catch{
        console.log("error while login")
    }
})



module.exports={
    UserRouter
}