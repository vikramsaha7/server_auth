const express =require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const bcrtpt =require('bcrypt')

mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost:27017/auth',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const {User} =require('./models/user')
const cookieParser= require('cookie-parser')
const {auth}=require('./middleware/auth')

app.use(bodyParser.json());  //everything converted to json
app.use(cookieParser());

app.post('/api/user',(req,res)=>{
    const user=new  User({
        email:req.body.email,
        password:req.body.password
    })

    user.save((err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(doc)
    })
})

app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message:'Auth failed, user not found'})

        // bcrtpt.compare(req.body.password,user.password,(err,isMatch)=>{
        //     if(err) throw err;
        //     res.status(200).send(isMatch)
        // })

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) throw err
            if(!isMatch) return res.status(400).json({
                message:'Wrong password'
            });
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).send('ok fine')
            })
        })
    })
})



app.get('/user/profile',auth,(req,res)=>{
    res.status(200).send(req.token)
})

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Started at port ${port}`)
})