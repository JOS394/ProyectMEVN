import moongose,{Schema} from 'mongoose'
const usuarioSchema = new Schema({
    role:{type:String, maxlength:30, required:true},
    name:{type:String,maxlength:50,unique:true,required:true},
    type_document:{type:String,maxlength:20},
    document_number:{type:String,maxlength:70},
    address:{type:String,maxlength:70},
    phone:{type:String,maxlength:20},
    email:{type:String,maxlenght:50,unique:true,required:true},
    password:{type:String,maxlength:64,required:true},
    state:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}

});

const Usuario=moongose.model('usuario',usuarioSchema);
export default Usuario;