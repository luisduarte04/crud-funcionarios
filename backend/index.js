import express from "express"
import cors from "cors"
import {bd} from "./banco.js"

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.post("/cadastro", (req, res) => {
    const {nome, rg, cpf, nascimento, admissao} = req.body
    const query = "insert into cadastro(nome, rg, cpf, nascimento, admissao) values (?, ?, ?, ?, ?)"
    bd.query(query, [nome, rg, cpf, nascimento, admissao], (err) => {
        if(err){
            console.log("Erro ao enviar dados", err)
            return res.status(500).send("Erro ao enviar dados")
        }else{
            console.log("Dados enviados com sucesso!")
            return res.status(200).json({"Nome": nome, "rg": rg, "cpf": cpf, "nascimento":nascimento, "admissao": admissao})
        }
    })
})

app.get("/cadastro", (req, res) => {
    const query = "select * from cadastro"
    bd.query(query, (err, result) => {
        if(err){
            console.log("Erro ao puxar os dados", err)
            return res.status(500).send("Erro ao puxar os dados")
        } else{
            console.log("Dados encontrados")
            return res.status(200).json(result)
        }
    })
})

app.put("/cadastro/:id", (req, res) => {
    const id = req.params.id
    const {nome, rg, cpf, nascimento, admissao} = req.body
    const query = "update cadastro set nome = ?, rg = ?, cpf = ?, nascimento = ?, admissao = ? where id = ?"
    bd.query(query, [nome, rg, cpf, nascimento, admissao, id], (err) => {
        if(err){
            console.log("Erro ao atualizar dados")
            return res.status(500).send("Erro ao atualizar dados")
        } else{
            console.log("Dados atualizados")
            return res.status(200).send("Dados atualizados")
        }
    })
})

app.delete("/cadastro/:id", (req, res) => {
    const id = req.params.id
    const query = "delete from cadastro where id = ?"
    bd.query(query, id, (err) => {
        if(err){
            console.log("Erro ao deletar dados")
            return res.status(500).send("Erro ao deletar dados")
        } else{
            console.log("Deletado com sucesso")
            return res.status(200).send("Deletado com sucesso")
        }
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})