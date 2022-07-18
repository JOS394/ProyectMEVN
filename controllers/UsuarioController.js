import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';

export default {






    add: async (req,res,next) =>{
        try {
            req.body.password=await bcrypt.hash(req.body.password,10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Usuario.findOne({_id:req.query._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let value=req.query.value;
            //RegExp sirve para filtrara por letras al inicio o al final-filtrado
            const reg=await models.Usuario.
            find({$or:[{'name':new RegExp(value,'i')},
            {'email':new RegExp(value,'i')}]},
            {createdAt:0}).
            sort({'createdAt':-1});

            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            let pass=req.body.password;
            const reg0= await models.Usuario.findOne({_id:req.body._id});
            if (pass!=reg0.password) {
                req.body.password= await bcrypt.hash(req.body.password);    
            }
            
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{role:req.body.role,name:req.body.name,
                type_document:req.body.type_document,num_document:req.body.num_document,
                adress:req.body.adress,phone:req.body.phone,email:req.body.email,password:req.body.password});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{state:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    desactivate:async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{state:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },


    login:async(req,res,next)=>{

try {
    let user= await models.Usuario.findOne({email:req.body.email,state:1});
    if (user) {
   
        let match=await bcrypt.compare(req.body.password,user.password);

        if(match){
            let tokenReturn =await token.encode(user._id);
           res.status(200).json({user,tokenReturn});
        }else{
            res.status(404).send({
                message: 'Password Incorrecto'
            })
        }

    }else{
        res.status(404).send({
            message:'No existe el usuario'
        })
    }
} catch (e) {
    res.status(404).send({
        message:'No existe el usuario'
    });
    next(e);
}

    }
}
