import express, { response } from "express";
import cors from "cors";
import { connection } from "./config/mysql.js";
import { isModuleNamespaceObject } from "util/types";
const app = express();
const port = 3000;

app.use(cors());
app.get(express.json());

// const produtosMock = [
//   { id: 1, name: 'Products 1', category: "abc", price: 20.0 },
//   { id: 2, name: 'Products 2', category: "abc", price: 30.0 },
//   { id: 3, name: 'Products 3', category: "abc", price: 25.0 },
// ];'

// const produtos = produtosMock;
app.get('/produtos', async (req, res) => {
    const sql = `SELECT id, name, image, value, categoryId_FK
    FROM eduzz_teste.products`;

    const [rows, fields] = await connection.execute(sql);

    return res.json(rows)

});

const middwereAuth = (req, res, next) => {
    console.log("passou no middwere de autentificação", new Date())
    next()
};

const middwereRota = (req, res, next) => {
    console.log("passou no middwere de rota", new Date())
    console.log("req", req.url)

    req.xablau = 12345
    // req.xablau = 1234

    if (req.xablau !== 1234) {
        return next()
    }

    console.log('passou no middwere de rota')
    return next()
};

app.get('/produtos/name/:name', middwereAuth, middwereRota, async (req, res) => {
    const { name } = req.params
console.log('name', name)

    if (!!Number(),name) {
console.log('passou no name', name)

    }

    const sql = `SELECT id, name, image, value, categoryId_FK
    FROM products WHERE name = ?`;

    const [rows, fields] = await connection.execute(sql, [name]);

    if (!rows.length) {
        return res.status(404).json({ message: 'Nome não encontrado' });
    }

    return res.json(rows)
});




app.get('/produtos/name/:name', middwereAuth, middwereRota, async (req, res) => {

})

app.post('/produtos', async (req, res) => {
    const options = ["dog", "", 10, 1];

    const sql = `INSERT INTO products
    (name, image, value, categoryId_FK)
    VALUES( ?, ?, ?, ?);`

    const [rows, fields] = await connection.execute(sql, options);

    console.log(rows, fields)
    return res.json({ rows, fields })
})

app.delete('/produtos/id/:id', middwereAuth, middwereRota, async (req, res) => {
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