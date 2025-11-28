import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');

// GET all boats
// localhost:3020/boats
router.get("/", async (req, res) => {
    const db = await openDb();
    const boats = await db.all("SELECT * FROM boats");
    res.json({ value: boats });
});

// Create a new boat
router.post("/", upload.none(),async (req, res) => {
    const { name, captainName, company, arrival, departure } = req.body;
    const id = uuidv4();
    const db = await openDb();
    await db.run(
        "INSERT INTO boats (id, name, captainName, company, arrival, departure) VALUES (?, ?, ?, ?, ?, ?)",
        id, name, captainName, company, arrival, departure
    );
    const newBoat = await db.get("SELECT * FROM boats WHERE id = ?", id);
    res.status(201).json(newBoat);
});

// Update a Boat Record
router.put("/:id", upload.none(), async (req, res) => {
    const { name, captainName, company, arrival, departure } = req.body;
    const db = await openDb();
    
    await db.run(
        "UPDATE boats SET name=?, captainName=?, company=?, arrival=?, departure=? WHERE id=?",
        name, captainName, company, arrival, departure, req.params.id
    );
    const updatedBoat = await db.get("SELECT * FROM boats WHERE id = ?", req.params.id);
    res.json(updatedBoat);
});

// Delete a Boat 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM boats WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual Boat
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const boat = await db.get("SELECT * FROM boats WHERE id = ?", req.params.id);
    if (!boat) return res.status(404).json({ message: "Boat not found" });
    res.json(boat);
});

/**
 * @swagger
 * /v1/boats:
 *   get:
 *     summary: Get all boats
 *     tags: [Boats]
 *     responses:
 *       200:
 *         description: List of boats
 */

/**
 * @swagger
 * /v1/boats/{id}:
 *   get:
 *     summary: Get a boat by ID
 *     tags: [Boats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The boat ID
 *     responses:
 *       200:
 *         description: Boat found
 *       404:
 *         description: Boat not found
 */

/**
 * @swagger
 * /v1/boats:
 *   post:
 *     summary: Create a new boat
 *     tags: [Boats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - captainName
 *               - company
 *               - arrival  
 *               - departure
 *             properties:
 *               name:
 *                 type: string
 *               captainName:
 *                 type: string
 *               company:
 *                 type: string
 *               arrival:
 *                 type: string
 *               departure:
 *                 type: string
 *     responses:
 *       201:
 *         description: Boat created
 */

/**
 * @swagger
 * /v1/boats/{id}:
 *   put:
 *     summary: Update a boat by ID
 *     tags: [Boats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The boat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               captainName:
 *                 type: string
 *               company:
 *                 type: string
 *               arrival:
 *                 type: string
 *               departure:
 *                 type: string
 *     responses:
 *       200:
 *         description: Boat updated
 *       404:
 *         description: Boat not found
 */

/**
 * @swagger
 * /v1/boats/{id}:
 *   delete:
 *     summary: Delete a boat by ID
 *     tags: [Boats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The boat ID
 *     responses:
 *       204:
 *         description: Boat deleted
 *       404:
 *         description: Boat not found
 */


export default router;
