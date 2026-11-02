const { Mongoose } = require("mongoose");

const schema=new Mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please provide a name"],
            trim:true,
            maxlength:[100,"name cannot exceed 100 characters"]
        },
        email:{
            type:String,
            required:[true,"please provide an email"],
            unique:true,
            lowercase:true,
            match:[
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "please provide a valid email"
            ]
        },
        password:{
            type:String,
            required:[true,"please provide a password"],
            minlength:[4,"password must be at least 4 characters"],
            select:false //don't return password by default for security reason
        },
        role:{
            type:String,
            enum:["admin","moderator"],
            default:"moderator"
        },
        isActive:{
            type:Boolean,
            default:true
        },
        createdAt:{
            date:Date,
            default:Date.now
        }
    },
    {timestamps:true},
)

schema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try{

    }catch(error){
        next(error);
    }
})