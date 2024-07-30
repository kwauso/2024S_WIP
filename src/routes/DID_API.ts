import express from 'express';
import { agent } from '../setup.js';
const router = express.Router();

async function listDID() {
  const identifiers = await agent.didManagerFind();
  router.get("/", (req:express.Request, res:express.Response)=>{
    res.render("listDID", {identifiers:identifiers});
    });
    identifiers.map((id) => {
        router.get(`/${id["alias"]}`, (req:express.Request, res:express.Response)=>{
            res.json(id);
        });
    })
}

listDID();

export default router
