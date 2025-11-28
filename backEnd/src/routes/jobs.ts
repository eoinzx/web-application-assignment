import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');

// GET all jobs
// localhost:3020/jobs
router.get("/", async (req, res) => {
    const db = await openDb();
    const jobs = await db.all("SELECT * FROM jobs");
    res.json({ value: jobs });
});

// Create a new job
router.post("/", upload.none(),async (req, res) => {
    const { titl, desc, salary } = req.body;
    const id = uuidv4();
    const db = await openDb();
    await db.run(
        "INSERT INTO jobs (id, titl, desc, salary) VALUES (?, ?, ?, ?)",
        id, titl, desc, salary
    );
    const newJob = await db.get("SELECT * FROM jobs WHERE id = ?", id);
    res.status(201).json(newJob);
});

// Update a Job Record
router.put("/:id", upload.none(), async (req, res) => {
    const { titl, desc, salary } = req.body;
    const db = await openDb();
    
    await db.run(
        "UPDATE jobs SET titl=?, desc=?, salary=? WHERE id=?",
        titl, desc, salary, req.params.id
    );
    const updatedJob = await db.get("SELECT * FROM jobs WHERE id = ?", req.params.id);
    res.json(updatedJob);
});

// Delete a Job 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM jobs WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual Job
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const job = await db.get("SELECT * FROM jobs WHERE id = ?", req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
});

/**
 * @swagger
 * /v1/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */

/**
 * @swagger
 * /v1/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /v1/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titl
 *               - desc
 *               - salary
 *             properties:
 *               titl:
 *                 type: string
 *               desc:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created
 */

/**
 * @swagger
 * /v1/jobs/{id}:
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titl:
 *                 type: string
 *               desc:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Job updated
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       204:
 *         description: Job deleted
 *       404:
 *         description: Job not found
 */


export default router;
