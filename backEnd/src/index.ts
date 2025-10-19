import express from "express";
import bodyParser from "body-parser";
import { initDb } from "./db";
import usersRouter from "./routes/users";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API to manage users",
        },
        servers: [{ url: `http://localhost:${PORT}` }],
        paths: {}, // ✅ prevents TS error
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Test to see the server working in the browser
app.get("/", (req, res) => {
    res.send("<h1>User API</h1>")
})

// Routes
app.use("/users", usersRouter);


initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});

