import express from "express";
import cors from "cors"
const app = express();
const port = 3000;

app.use(cors());
app.get(express.json());

const produtos = [
  { id: 1, name: 'Products 1', category: "abc", price: 20.0 },
  { id: 2, name: 'Products 2', category: "abc", price: 30.0 },
  { id: 3, name: 'Products 3', category: "abc", price: 25.0 },
];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});