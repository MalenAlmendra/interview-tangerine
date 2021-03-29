const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    nickname:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        default:0
    },
    photo:{
        type:String,
        default:''
    },
    isFav:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports=model('User',userSchema)