import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { recipeRouter } from "./routers/recipe.router.js";
import { sequelize } from "./db.js"; // підключаємо базу

dotenv.config();
const PORT = process.env.PORT || 1111;

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // або конкретно URL фронтенду на GitHub Pages
  })
);

// Роутер
app.use("/recipes", recipeRouter);

// Перевірка підключення до бази перед запуском сервера
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to DB:", err);
  });
