import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');

// GET all containers
// localhost:3020/containers
router.get("/", async (req, res) => {
    const db = await openDb();
    const containers = await db.all("SELECT * FROM containers");
    res.json({ value: containers });
});

// Create a new container
router.post("/", upload.none(),async (req, res) => {
    const { company, location, value, droppedOff, leaving, shippedIn_id, shippedOut_id } = req.body;
    const id = uuidv4();
    const db = await openDb();
    await db.run(
        "INSERT INTO containers (id, company, location, value, droppedOff, leaving, shippedIn_id, shippedOut_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        id, company, location, value, droppedOff, leaving, shippedIn_id, shippedOut_id
    );
    const newContainer = await db.get("SELECT * FROM containers WHERE id = ?", id);
    res.status(201).json(newContainer);
});

// Update a Container Record
router.put("/:id", upload.none(), async (req, res) => {
    const { company, location, value, droppedOff, leaving, shippedIn_id, shippedOut_id } = req.body;
    const db = await openDb();
    
    await db.run(
        "UPDATE containers SET company=?, location=?, value=?, droppedOff=?, leaving=?, shippedIn_id=?, shippedOut_id=? WHERE id=?",
        company, location, value, droppedOff, leaving, shippedIn_id, shippedOut_id, req.params.id
    );
    const updatedContainer = await db.get("SELECT * FROM containers WHERE id = ?", req.params.id);
    res.json(updatedContainer);
});

// Delete a Container 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM containers WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual Container
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const container = await db.get("SELECT * FROM containers WHERE id = ?", req.params.id);
    if (!container) return res.status(404).json({ message: "Container not found" });
    res.json(container);
});

/**
 * @swagger
 * /v1/containers:
 *   get:
 *     summary: Get all containers
 *     tags: [Containers]
 *     responses:
 *       200:
 *         description: List of containers
 */

/**
 * @swagger
 * /v1/containers/{id}:
 *   get:
 *     summary: Get a container by ID
 *     tags: [Containers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The container ID
 *     responses:
 *       200:
 *         description: Container found
 *       404:
 *         description: Container not found
 */

/**
 * @swagger
 * /v1/containers:
 *   post:
 *     summary: Create a new container
 *     tags: [Containers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - location
 *               - value
 *               - droppedOff
 *               - leaving
 *               - shippedIn_id
 *               - shippedOut_id
 *             properties:
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               value:
 *                 type: number
 *               droppedOff:
 *                 type: string
 *               leaving:
 *                 type: string
 *               shippedIn_id:
 *                 type: string
 *               shippedOut_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Container created
 */

/**
 * @swagger
 * /v1/containers/{id}:
 *   put:
 *     summary: Update a container by ID
 *     tags: [Containers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The container ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               value:
 *                 type: number
 *               droppedOff:
 *                 type: string
 *               leaving:
 *                 type: string
 *               shippedIn_id:
 *                 type: string
 *               shippedOut_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Container updated
 *       404:
 *         description: Container not found
 */

/**
 * @swagger
 * /v1/containers/{id}:
 *   delete:
 *     summary: Delete a container by ID
 *     tags: [Containers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The container ID
 *     responses:
 *       204:
 *         description: Container deleted
 *       404:
 *         description: Container not found
 */


export default router;
