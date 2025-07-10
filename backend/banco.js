import mysql from "mysql2"

export const bd = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Guilherme100!",
    database:"crud"
})

bd.connect(err => {
    if(err){
        console.log("Erro ao conectar BD")
    }else{
        console.log("Conectado ao BD")
    }
})