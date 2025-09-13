import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// === load env ===
dotenv.config();

// === define command interface ===
interface ICommand extends Document {
  cmd: string;
  description: string;
}

// === define command schema ===
const commandSchema: Schema = new Schema(
  {
    cmd: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// === create command model ===
const Command = mongoose.model<ICommand>("Command", commandSchema);

// === connect db ===
const mongoUri: string = process.env.MONGO_URI || "";
if (!mongoUri) {
  console.error("MongoDB URI not found in environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// === initialize app ===
const app = express();
const port = process.env.PORT || 5000;

// === middleware ===
app.use(cors());
app.use(express.json()); // For parsing application/json

// === === === === === API ENDPOINTS === === === === ===

// health check
app.get("/", async (req, res) => {
  res.send({
    statusCode: 200,
    success: true,
    message: "system working!",
  });
});

// CREATE a new command
app.post("/api/commands", async (req: Request, res: Response) => {
  try {
    const { cmd, description } = req.body;
    if (!cmd || !description) {
      return res
        .status(400)
        .json({ message: "Both cmd and description are required." });
    }
    const newCommand = new Command({ cmd, description });
    await newCommand.save();
    res.status(201).json(newCommand);
  } catch (error) {
    res.status(500).json({ message: "Error creating command", error });
  }
});

// READ all commands
app.get("/api/commands", async (req: Request, res: Response) => {
  try {
    const commands = await Command.find({});
    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching commands", error });
  }
});

// DELETE a command by ID
app.delete("/api/commands/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCommand = await Command.findByIdAndDelete(id);

    if (!deletedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }

    res
      .status(200)
      .json({ message: "Command deleted successfully", deletedCommand });
  } catch (error) {
    res.status(500).json({ message: "Error deleting command", error });
  }
});

// === start the server ===
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
