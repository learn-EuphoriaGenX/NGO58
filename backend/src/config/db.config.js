const mongoose=require('mongoose')

const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb+srv://nayanika035:RQCXfzwnOno15inH@hello.ymrv7dg.mongodb.net/backend?retryWrites=true&w=majority&appName=Hello')
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(error);
        
        console.log('Error connecing to MongoDB')
    }
}
module.exports=connectDb;