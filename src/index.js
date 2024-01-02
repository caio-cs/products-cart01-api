import express, { response } from "express";
import cors from "cors";
import { connection } from "./config/mysql.js";
const app = express();
const port = 3000;

app.use(cors());
app.get(express.json());

// const produtosMock = [
//   { id: 1, name: 'Products 1', category: "abc", price: 20.0 },
//   { id: 2, name: 'Products 2', category: "abc", price: 30.0 },
//   { id: 3, name: 'Products 3', category: "abc", price: 25.0 },
// ];


// const produtos = produtosMock;
app.get('/produtos',async (req, res) => {
       const sql = `SELECT id, name, image, value, categoryId_FK
    FROM eduzz_teste.products`;

    const [rows, fields] = await connection.execute(sql);

    return res.json(rows)

});

app.get('/produtos/id/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    
    const sql = `SELECT id, name, image, value, categoryId_FK
    FROM products WHERE id = ?`;
    
    const [rows, fields] = await connection.execute(sql, [id]);
    
    return res.json(rows)
    
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

app.get('/produtos/name/:name',async (req, res) => {

})

app.post('/produtos',async (req, res) => {
    const options = ["dog", "", 10, 1];

    const sql = `INSERT INTO products
    (name, image, value, categoryId_FK)
    VALUES( ?, ?, ?, ?);`

    const [rows, fields] = await connection.execute(sql, options);

    console.log(rows, fields)
    return res.json({rows, fields})
})

app.delete('/produtos/id/:id', async (req, res) => {
    try {
        const productId = req.params.id; 
        const options = [productId];  
        const sql = 'DELETE FROM products WHERE id = ?;';

        const [rows, fields] = await connection.execute(sql, options);

        console.log(rows, fields);
        return res.json({ success: true, message: 'Produto excluído com sucesso.', });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({ success: false, message: 'Erro ao excluir produto.' });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});