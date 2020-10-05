const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err);
    
//     bcrypt.hash('Password123',salt,(err,hash)=>{
//         if(err) return next(err);
//         console.log(hash)
//     })
// })

const id=1000;
const secret='supersecret'
const reveivedToken='eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token=jwt.sign(id,secret);
const decode=jwt.verify(reveivedToken,secret); 
console.log(decode)
