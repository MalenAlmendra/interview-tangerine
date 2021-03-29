const mongoose=require('mongoose')
const URI=process.env.URI_MONGOOSE

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
})

const connection=mongoose.connection;
connection.once('open',()=>console.log('Conectado a la base de datos'))