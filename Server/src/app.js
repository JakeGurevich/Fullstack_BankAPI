import express from "express";
import bodyParser from "body-parser";
import "./db/mongoose.js";
import usersRoutes from "./routes/users.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
