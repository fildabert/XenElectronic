import express from 'express';
import cors from 'cors';


const port = 3030;
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get<{},{data: string}, {asd: string}>('/ping', (req, res) => {
  res.status(200).json({data: 'pong'});
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})