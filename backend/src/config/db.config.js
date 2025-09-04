const mongoose=require('mongoose')

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(error);
        
        console.log('Error connecing to MongoDB')
    }
}
module.exports=connectDb;