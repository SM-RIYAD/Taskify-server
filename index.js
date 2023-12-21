const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wacbf1n.mongodb.net/?retryWrites=true&w=majority`;

// mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wacbf1n.mongodb.net/?retryWrites=true&w=majority
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

const taskCollection = client.db("taskify").collection("tasklists");



app.get("/", (req, res) => {
  res.send("taskify  server is running");
});



///adding product api
app.post("/addtask", async (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  const result = await  taskCollection.insertOne(newTask);
  res.send(result);
});


app.listen(port, () => {
  console.log(
    `brand Server is running on port: ${port}, ${process.env.DB_USER},${process.env.DB_PASS} `
  );
});
