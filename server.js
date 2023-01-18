const express = require("express");
const app = express();
const initDB = require("./config/db");
const cookieParser = require('cookie-parser')
const userRoutes = require('./server/routes/user')
const itemRoutes = require('./server/routes/item')
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5000"],
  credentials: true
}))

app.use(userRoutes)
app.use(itemRoutes)

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

initDB();
