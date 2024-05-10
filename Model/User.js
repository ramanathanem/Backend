const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
        },
        mobileno:{
            type:String,
        },
        role:{
            type:String,
        },
          gender:{
            type:String,
        },
        course:{
            type:String,
        }
    },{
        collection:"User"
    }
)

module.exports = mongoose.model('User',UserSchema)