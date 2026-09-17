import express, { type Request, type Response } from 'express';

const router = express.Router();

// GET api/suppliers/
router.get("/", (req: Request, res: Response) => {
    res.json({httpMethod: "get"})
})
// GET api/suppliers/search 
router.get("/search", (req: Request, res: Response) => {
    res.json({ httpMethod: "get", action: "GetSupplierByName", query: req.query });
});

// POST api/suppliers
router.post("/", (req: Request, res: Response) => {
    res.json({ httpMethod: "post", action: "AddSupplier", body: req.body });
});

// PATCH api/suppliers/:id 
router.patch("/:id", (req: Request, res: Response) => {
    res.json({ httpMethod: "patch", action: "UpdateSupplier", id: req.params.id });
});

// PATCH api/suppliers/deactivate/:id
router.patch("/deactivate/:id", (req: Request, res: Response) => {
    res.json({ httpMethod: "patch", action: "DeactivateSupplier", id: req.params.id });
});

export default router