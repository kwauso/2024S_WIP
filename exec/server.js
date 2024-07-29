import express from 'express';
import cors from 'cors';
import api from './routes/userAPI.js';
const app = express();
app.use(express.static('/home/akira/2024S_WIP/public'));
app.use(cors());
app.use('/api', api);
app.get("/", (req, res) => {
    res.send();
});
app.listen(3000, () => {
    console.log('ポート3000番で起動しました');
});
