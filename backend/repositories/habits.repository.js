const habits = require('../models/habits.model')
const habitLogs = require('../models/habit_logs.model')


exports.createHabit = async (userData) => {
    return await habits.create(userData);
};

exports.updateHabit = async (userData, data) => {
    return await habits.findOneAndUpdate(userData, data, { new: true });
};

exports.deleteHabit = async (userData) => {
    return await habits.findOneAndUpdate(userData, { isActive: false },
        { new: true });
};

exports.allHabits = async (userData) => {
    return await habits.find(userData);
}

exports.overviewLogs = async (userId, startDate, endDate) => {
    return await habitLogs.find({
        userId,
        date: { $gte: startDate, $lte: endDate }
    });

}

exports.findExistingLogs = async (userData) => {
    return await habitLogs.findOne(userData);
}

exports.deleteLog = async (logId) => {
    return await habitLogs.deleteOne(logId);
}

exports.createLog = async (userData) => {
    return await habitLogs.create(userData);
}



