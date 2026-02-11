const mongoose = require('mongoose');
const habitServices = require('../services/habits.services')

exports.createHabit = async (req,res) => {
      try {
        const { title, description } = req.body;

        const userId = req.user.userId;

        if (!title)
            return res.status(400).json({ message: "Title required" });
    
        const habit = await habitServices.createHabit(userId, title, description);

        console.log(habit)
        res.status(201).json(habit);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create habit" });
    }
}

exports.updateHabit = async (req, res) => {
     try {
        const habitId = req.params.habitId;
        const userId = req.user.userId;
        const { title, description } = req.body;

        if (!title && !description) {
            return res.status(400).json({
                message: "At least one field (title or description) is required"
            });
        }

        const updatedHabit = await habitServices.updateHabit(userId, habitId, title, description);

        if (!updatedHabit) {
            return res.status(404).json({
                message: "Habit not found or not authorized"
            });
        }
        res.status(201).json(updatedHabit);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update habit" });
    }
}

exports.deleteHabit = async (req, res) => {
     try {
        const habitId = new mongoose.Types.ObjectId(req.params.habitId);
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        
        const deletedHabit = await habitServices.deleteHabit(userId, habitId);

        if (!deletedHabit) {
            return res.status(404).json({
                message: "Habit not found or already deleted",
            });
        }

        res.status(200).json({
            message: "Habit deleted successfully",
            habitId: deletedHabit._id,
        });
    } catch (err) {
        console.error("DELETE HABIT ERROR:", err);
        res.status(500).json({ message: "Failed to delete habit" });
    }
}

exports.overviewHabits = async (req, res) => {
     try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const days = Number(req.query.days) || 7;

        const overviewData = await habitServices.overview(userId, days);

        // Send response
        res.json({
            dates: overviewData.dates,
            habits: overviewData.resultHabits
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load overview" });
    }
} 

exports.upsertLogs = async (req,res) => {
     try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const habitId = new mongoose.Types.ObjectId(req.params.habitId);
        const { date } = req.body;

        const message = await habitServices.upsertLog(userId, habitId, date);

        return res.json(message);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update habit log' });
    }
}


// app.get('/api/habits/:habitId/logs/month', protect, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.userId);
//     const habitId = new mongoose.Types.ObjectId(req.params.habitId);

//     const offset = Number(req.query.offset) || 0;
//     const yearParam = Number(req.query.year);
//     const monthParam = Number(req.query.month); // 1–12

//     let year, month; // month = 0–11

//     // 1️⃣ Decide target month
//     if (yearParam && monthParam) {
//       year = yearParam;
//       month = monthParam - 1;
//     } else {
//       const now = new Date();
//       const target = new Date(now.getFullYear(), now.getMonth() + offset, 1);
//       year = target.getFullYear();
//       month = target.getMonth();
//     }

//     // 2️⃣ Month boundaries
//     const startDate = new Date(year, month, 1);
//     startDate.setHours(0, 0, 0, 0);

//     const endDate = new Date(year, month + 1, 0);
//     endDate.setHours(23, 59, 59, 999);

//     // 3️⃣ Habit ownership check
//     const habit = await habitModel.findOne({
//       _id: habitId,
//       userId,
//       isActive: true
//     });

//     if (!habit) {
//       return res.status(404).json({ message: "Habit not found" });
//     }

//     // 4️⃣ Fetch logs
//     let logs = await habit_logsModel.find({
//       userId,
//       habitId,
//       date: { $gte: startDate, $lte: endDate }
//     });

//     logs = logs.map(log => ({
//       date: log.date.toISOString().split('T')[0],
//       status: log.status
//     }));

//     // 5️⃣ Generate full month dates
//     const dates = [];
//     const daysInMonth = endDate.getDate();

//     for (let day = 1; day <= daysInMonth; day++) {
//       const d = new Date(year, month, day);
//       dates.push(d.toISOString().split('T')[0]);
//     }

//     // 6️⃣ Map logs
//     const logMap = {};
//     for (const log of logs) {
//       logMap[log.date] = log.status;
//     }

//     const habitLogs = {};
//     for (const date of dates) {
//       habitLogs[date] = logMap[date] ?? false;
//     }

//     // 7️⃣ Response
//     res.json({
//       habitId: habit._id.toString(),
//       title: habit.title,
//       year,
//       month: month + 1,
//       offset,
//       dates,
//       logs: habitLogs,
//       pagination: {
//         prevOffset: offset - 1,
//         nextOffset: offset + 1
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load month logs" });
//   }
// });


