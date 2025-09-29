const express = require("express");
const database = require("./db")
const log = require("./route")
const cors = require("cors");
const app = express();
const port = 3000;
database();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST"],
  credentials: true
}));

app.use("/app",log);

app.listen(port, () => {
  console.log(`server runs on http://localhost:${port}`);
});