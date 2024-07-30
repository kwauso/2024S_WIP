import express from 'express';
import { agent } from '../setup.js';
const router = express.Router();

async function listVC() {
  const identifiers = await agent.didManagerFind();
    identifiers.map((id) => {
        router.get(`/did/${id["alias"]}`, (req:express.Request, res:express.Response)=>{
            res.json(id);
        });
    })
}

listVC();

export default router