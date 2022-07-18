import express, { application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from "mongoose";
import router from './routes';

//Conexion a la bas de datos:

const dbUrl = 'mongodb://localhost:27017/dbproyectomevn';
mongoose.connect(dbUrl)
.then(mongoose =>console.log('Conectando a la Bd en el puerto 27017'))
.catch(err=>console.log(err));
const app=express();

/////
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/api',router);
app.set('port',process.env.PORT||3000);


app.listen(app.get('port'),()=>{
    console.log('ruta:'+ __dirname + '\\public');
    console.log('server on port' + app.get('port'));
    
});
