const express = require("express");
const app = express();
const path = require("path");

app.get("/hi", (req, res)=>{
	res.send("Hello from Texas A&M!")
});

app.get("/", (req, res)=>{
	res.sendFile(path.join(__dirname, "/;views/index.html"))
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
	console.log(`Server listening on port ${PORT}...`)
});