import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// GET all users
// localhost:3020/users
router.get("/", async (req, res) => {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");
    res.json({ value: users });
});

// Create a new user
router.post("/", upload.none(),async (req, res) => {
    const { username, phone, password, email, job_id } = req.body;
    const id = uuidv4();
    const db = await openDb();
    const pass = bcrypt.hashSync(password, 10);

    if (regex.test(email) && email.length > 0)
    {
        if (pass.length > 0)
        {
            if (username.length > 0)
            {
                await db.run(
                    "INSERT INTO users (id, username, phone, password, email, job_id) VALUES (?, ?, ?, ?, ?, ?)",
                    id, username, phone, pass, email, job_id
                );
                const newUser = await db.get("SELECT * FROM users WHERE id = ?", id);
                newUser.password = undefined;
                res.status(201).json(newUser);
                res.status(400).json(newUser);
            } 
            else
            {
                console.log("Not an valid username");
                res.status(400).json("Not an valid username");
            }
        } 
        else
        {
             console.log("Not an valid password");
            res.status(400).json("Not an valid password");
        }
    }
    else
    {
        console.log("Not an email");
        res.status(400).json("Not an email");
    }
});

// Update a User Record
router.put("/:id", upload.none(), async (req, res) => {
    const { username, phone, password, email, job_id } = req.body;
    const db = await openDb();    
    const pass = bcrypt.hashSync(password, 10);

    if (regex.test(email))
    {
        await db.run(
            "UPDATE users SET username=?, phone=?, password=?, email=?, job_id=? WHERE id=?",
            username, phone, pass, email, job_id, req.params.id
        );
        const updatedUser = await db.get("SELECT * FROM users WHERE id = ?", req.params.id);
        res.json(updatedUser);
    }
    else
    {
        res.status(400).json("Not an email");
    }
});

// Delete a User 
router.delete("/:id", async (req, res) => {
    const db = await openDb();
    await db.run("DELETE FROM users WHERE id=?", req.params.id);
    res.status(204).send();
});

// GET Individual User
router.get("/:id", async (req, res) => {
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Login user
router.post("/login", upload.none(),async (req, res) => {
    const { email, password } = req.body;
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", email);
    
    if (user != null && user != undefined && bcrypt.compareSync(password, user.password) === true)
    {     
        res.status(201).json({
            _id: user.id,
            email: user.email,
            job_id: user.job_id,
            token: jwt.sign(
            {
                email: user.email,
                username: user.username,
                _id: user.id
            }, "p0rt")
       });
    }
    else
    {
        res.status(400).json("Invalid credentials");
    }
});

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *         description: User created
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
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
 *         description: User updated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */


export default router;
