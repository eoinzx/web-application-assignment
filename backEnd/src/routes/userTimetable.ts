import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');

// GET all userTimetables
// localhost:3020/userTimetables
router.get("/", async (req, res) => {
    const db = await openDb();
    const userTimetables = await db.all("SELECT * FROM userTimetables");
    res.json({ value: userTimetables });
});

// Create a new userTimetable
router.post("/", upload.none(),async (req, res) => {
    const { user_id, timeTable_id } = req.body;
    const id = uuidv4(); 
    const db = await openDb();
    await db.run(
        "INSERT INTO userTimetables (id, user_id, timeTable_id) VALUES (?, ?, ?)",
        id, user_id, timeTable_id
    );
    const newUserTimetable = await db.get("SELECT * FROM userTimetables WHERE id = ?", id);
    res.status(201).json(newUserTimetable);
});

// Update a UserTimetable Record
router.put("/:id", upload.none(), async (req, res) => {
    const { user_id, timeTable_id } = req.body;
    const db = await openDb();
    
    await db.run(
        "UPDATE userTimetables SET user_id=?, timeTable_id=? WHERE id=?",
        user_id, timeTable_id, req.params.id
    );
    const updatedUserTimetable = await db.get("SELECT * FROM userTimetables WHERE id = ?", req.params.id);
    res.json(updatedUserTimetable);
});

// Delete a UserTimetable 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM userTimetables WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual UserTimetable
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const userTimetable = await db.get("SELECT * FROM userTimetables WHERE id = ?", req.params.id);
    if (!userTimetable) return res.status(404).json({ message: "UserTimetable not found" });
    res.json(userTimetable);
});

/**
 * @swagger
 * /v1/userTimetables:
 *   get:
 *     summary: Get all userTimetables
 *     tags: [UserTimetables]
 *     responses:
 *       200:
 *         description: List of userTimetables
 */

/**
 * @swagger
 * /v1/userTimetables/{id}:
 *   get:
 *     summary: Get a userTimetable by ID
 *     tags: [UserTimetables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userTimetable ID
 *     responses:
 *       200:
 *         description: UserTimetable found
 *       404:
 *         description: UserTimetable not found
 */

/**
 * @swagger
 * /v1/userTimetables:
 *   post:
 *     summary: Create a new userTimetable
 *     tags: [UserTimetables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - timeTable_id
 *             properties:
 *               user_id:
 *                 type: string
 *               timeTable_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: UserTimetable created
 */

/**
 * @swagger
 * /v1/userTimetables/{id}:
 *   put:
 *     summary: Update a userTimetable by ID
 *     tags: [UserTimetables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userTimetable ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               timeTable_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: UserTimetable updated
 *       404:
 *         description: UserTimetable not found
 */

/**
 * @swagger
 * /v1/userTimetables/{id}:
 *   delete:
 *     summary: Delete a userTimetable by ID
 *     tags: [UserTimetables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userTimetable ID
 *     responses:
 *       204:
 *         description: UserTimetable deleted
 *       404:
 *         description: UserTimetable not found
 */


export default router;
