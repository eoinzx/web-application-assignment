import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');

// GET all timeTables
// localhost:3020/timeTables
router.get("/", async (req, res) => {
    const db = await openDb();
    const timeTables = await db.all("SELECT * FROM timeTables");
    res.json({ value: timeTables });
});

// Create a new timeTable
router.post("/", upload.none(),async (req, res) => {
    const { startDate, endDate, starting, ending } = req.body;
    const id = uuidv4();
    const db = await openDb();
    await db.run(
        "INSERT INTO timeTables (id, startDate, endDate, starting, ending) VALUES (?, ?, ?, ?, ?)",
        id, startDate, endDate, starting, ending
    );
    const newTimeTable = await db.get("SELECT * FROM timeTables WHERE id = ?", id);
    res.status(201).json(newTimeTable);
});

// Update a TimeTable Record
router.put("/:id", upload.none(), async (req, res) => {
    const { startDate, endDate, starting, ending } = req.body;
    const db = await openDb();
    
    await db.run(
        "UPDATE timeTables SET startDate=?, endDate=?, starting=?, ending=? WHERE id=?",
        startDate, endDate, starting, ending, req.params.id
    );
    const updatedTimeTable = await db.get("SELECT * FROM timeTables WHERE id = ?", req.params.id);
    res.json(updatedTimeTable);
});

// Delete a TimeTable 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM timeTables WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual TimeTable
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const timeTable = await db.get("SELECT * FROM timeTables WHERE id = ?", req.params.id);
    if (!timeTable) return res.status(404).json({ message: "TimeTable not found" });
    res.json(timeTable);
});

/**
 * @swagger
 * /v1/timeTables:
 *   get:
 *     summary: Get all timeTables
 *     tags: [TimeTables]
 *     responses:
 *       200:
 *         description: List of timeTables
 */

/**
 * @swagger
 * /v1/timeTables/{id}:
 *   get:
 *     summary: Get a timeTable by ID
 *     tags: [TimeTables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The timeTable ID
 *     responses:
 *       200:
 *         description: TimeTable found
 *       404:
 *         description: TimeTable not found
 */

/**
 * @swagger
 * /v1/timeTables:
 *   post:
 *     summary: Create a new timeTable
 *     tags: [TimeTables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *               - starting
 *               - ending
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               starting:
 *                 type: string
 *               ending:
 *                 type: string
 *     responses:
 *       201:
 *         description: TimeTable created
 */

/**
 * @swagger
 * /v1/timeTables/{id}:
 *   put:
 *     summary: Update a timeTable by ID
 *     tags: [TimeTables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The timeTable ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               starting:
 *                 type: string
 *               ending:
 *                 type: string
 *     responses:
 *       200:
 *         description: TimeTable updated
 *       404:
 *         description: TimeTable not found
 */

/**
 * @swagger
 * /v1/timeTables/{id}:
 *   delete:
 *     summary: Delete a timeTable by ID
 *     tags: [TimeTables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The timeTable ID
 *     responses:
 *       204:
 *         description: TimeTable deleted
 *       404:
 *         description: TimeTable not found
 */


export default router;
