import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const router = Router();

// GET all users
// localhost:3000/v1/users
router.get("/", async (req, res) => {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");
    res.json({ value: users });
});

// Create a new student
router.post("/", async (req, res) => {
    console.log(req)
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const { username, phone, password, email, job_id } = req.body;
    const id = uuidv4();
    const db = await openDb();
    await db.run(
        "INSERT INTO users (id, username, phone, password, email, job_id) VALUES (?, ?, ?, ?, ?, ?)",
        id, username, phone, password, email, job_id
    );
    const newUser = await db.get("SELECT * FROM users WHERE id = ?", id);
    res.status(201).json(newUser);
});

// Update a Student Record
router.put("/:id", async (req, res) => {
    const { username, phone, password, email, job_id } = req.body;
    const db = await openDb();
    await db.run(
        "UPDATE users SET username=?, phone=?, password=?, email=?, job_id=? WHERE id=?",
        username, phone, password, email, job_id, req.params.id
    );
    const updatedStudent = await db.get("SELECT * FROM users WHERE id = ?", req.params.id);
    res.json(updatedStudent);
});

// Delete a Student 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM users WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual Student
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const student = await db.get("SELECT * FROM users WHERE id = ?", req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
});

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - phone
 *               - password
 *               - email
 *               - job_id
 *             properties:
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               job_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               job_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       204:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */


export default router;
