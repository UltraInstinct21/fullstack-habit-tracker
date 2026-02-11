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


// app.get('/', (req, res) => {
//   date = new Date();
//   res.send(`<h1>Home Page ${date}</h1>`)


// })

// app.post('/api/habits', protect, async (req, res) => {

//   try {
//     const { title, description } = req.body;

//     if (!title)
//       return res.status(400).json({ message: "Title required" });

//     const habit = await habitModel.create({
//       userId: req.user.userId,
//       title: title,
//       description: description
//     });
//     console.log(habit)
//     res.status(201).json(habit);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to create habit" });
//   }

// })

// app.patch('/api/habits/:habitId', protect, async (req, res) => {

//   try {
//     const habitId = req.params.habitId;
//     const userId = req.user.userId;
//     const { title, description } = req.body;

//     if (!title && !description) {
//       return res.status(400).json({
//         message: "At least one field (title or description) is required"
//       });
//     }

//     const data = {};
//     if (title) data.title = title;
//     if (description) data.description = description;
//     const updatedHabit = await habitModel.findOneAndUpdate({
//       _id: habitId,
//       userId: userId
//     }, data, { new: true })

//     if (!updatedHabit) {
//       return res.status(404).json({
//         message: "Habit not found or not authorized"
//       });
//     }
//     res.status(201).json(updatedHabit);
//   }

//   catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to update habit" });
//   }
// })

// app.delete("/api/habits/:habitId", protect, async (req, res) => {
//   try {
//     const habitId = new mongoose.Types.ObjectId(req.params.habitId);
//     const userId = new mongoose.Types.ObjectId(req.user.userId);

//     const deletedHabit = await habitModel.findOneAndUpdate(
//       {
//         _id: habitId,
//         userId: userId,
//         isActive: true,
//       },
//       { isActive: false },
//       { new: true }
//     );

//     if (!deletedHabit) {
//       return res.status(404).json({
//         message: "Habit not found or already deleted",
//       });
//     }

//     res.status(200).json({
//       message: "Habit deleted successfully",
//       habitId: deletedHabit._id,
//     });
//   } catch (err) {
//     console.error("DELETE HABIT ERROR:", err);
//     res.status(500).json({ message: "Failed to delete habit" });
//   }
// });


// app.get('/api/habits/overview', protect, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.userId);
//     const days = Number(req.query.days) || 7;

//     // Normalize date range
//     const endDate = new Date();
//     endDate.setHours(23, 59, 59, 999);

//     const startDate = new Date();
//     startDate.setHours(0, 0, 0, 0);
//     startDate.setDate(startDate.getDate() - (days - 1));

//     // 1️⃣ Fetch habits
//     let habits = await habitModel.find({
//       userId,
//       isActive: true
//     });

//     console.log(habits);

//     habits = habits.map(habit => ({
//       habitId: habit._id.toString(),
//       title: habit.title,
//       description: habit.description
//     }));

//     // 2️⃣ Fetch logs
//     let logs = await habit_logsModel.find({
//       userId,
//       date: { $gte: startDate, $lte: endDate }
//     });

//     logs = logs.map(log => ({
//       habitId: log.habitId.toString(),
//       date: log.date.toISOString().split('T')[0],
//       status: log.status
//     }));

//     // 3️⃣ Generate dates array
//     const dates = [];
//     for (let i = days - 2; i >= -1; i--) {
//       const d = new Date();
//       d.setHours(0, 0, 0, 0);
//       d.setDate(d.getDate() - i);
//       dates.push(d.toISOString().split('T')[0]);
//     }

//     // 4️⃣ Build lookup map
//     const logMap = {};
//     for (const log of logs) {
//       if (!logMap[log.habitId]) {
//         logMap[log.habitId] = {};
//       }
//       logMap[log.habitId][log.date] = log.status;
//     }

//     // 5️⃣ Build final habits array
//     const resultHabits = habits.map(habit => {
//       const habitLogs = {};

//       for (const date of dates) {
//         habitLogs[date] =
//           logMap[habit.habitId]?.[date] ?? false;
//       }

//       return {
//         habitId: habit.habitId,
//         title: habit.title,
//         description: habit.description,
//         logs: habitLogs
//       };
//     });

//     // 6️⃣ Send response
//     res.json({
//       dates,
//       habits: resultHabits
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load overview" });
//   }
// });

// app.patch('/api/habits/:habitId/log', protect, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.userId);
//     const habitId = new mongoose.Types.ObjectId(req.params.habitId);
//     const { date } = req.body;

//     const [y, m, d] = date.split("-");
//     const logDate = new Date(`${y}-${m}-${d}T00:00:00Z`);
//     logDate.setUTCHours(0, 0, 0, 0);



//     const existingLog = await habit_logsModel.findOne({
//       userId,
//       habitId,
//       date: logDate
//     });

//     if (existingLog) {
//       await habit_logsModel.deleteOne({ _id: existingLog._id });

//       return res.json({
//         status: false,
//         message: 'Habit marked as missed'
//       });
//     }

//     await habit_logsModel.create({
//       userId,
//       habitId,
//       date: logDate,
//       status: true
//     });

//     return res.json({
//       status: true,
//       message: 'Habit marked as done'
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update habit log' });
//   }
// });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})