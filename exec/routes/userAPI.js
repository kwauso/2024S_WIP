import express from 'express';
const router = express.Router();
const json_1 = [{ id: 1, name: "taro" }, { id: 2, name: 2 }];
const json_2 = [{ number: 123 }, { number: 456 }];
const how_many_api = 3;
router.get("/", (req, res) => {
    res.send("This API page. Here is API index below.");
});
router.get("/api1", (req, res) => {
    res.json(json_1);
});
router.get("/api2", (req, res) => {
    res.json(json_2);
});
for (let i = 0; i < 6; i++) {
    const res_json = [{ number: i }, { number: i ** i }, { number: i ** i ** i }];
    router.get(`/api${i}`, (req, res) => {
        res.json(res_json);
    });
}
export default router;
