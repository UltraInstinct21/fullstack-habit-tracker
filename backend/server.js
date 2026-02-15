require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const authRoutes = require('./routes/auth.routes')
const habitRoutes = require('./routes/habits.routes')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'));

app.use('/auth', authRoutes);
app.use('/api/habits', habitRoutes)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})