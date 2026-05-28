import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { routes } from "./routes";
import recipeRoutes from "./routes/recipe.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use("/recipes", recipeRoutes);


app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
});