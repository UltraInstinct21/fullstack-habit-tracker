const habitRepository = require('../repositories/habits.repository')

const { getPreviousDate, getAllDates } = require('../utils/date.utils')

exports.createHabit = async (userId, title, description) => {
    userData = {
        userId: userId,
        title: title,
        description: description
    };

    return await habitRepository.createHabit(userData);
}

exports.updateHabit = async (userId, habitId, title, description) => {
    const userData = {
        _id: habitId,
        userId: userId
    }

    const data = {};
    if (title) data.title = title;
    if (description) data.description = description;

    return await habitRepository.updateHabit(userData, data);
}

exports.deleteHabit = async (userId, habitId) => {

    const userData = {
        _id: habitId,
        userId: userId,
        isActive: true,
    }
    return await habitRepository.deleteHabit(userData);
}

exports.overview = async (userId, days) => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - (days - 1));

    //  Fetch habits
    const userData = {
        userId,
        isActive: true
    }

    let habits = await habitRepository.allHabits(userData);

    habits = habits.map(habit => ({
        habitId: habit._id.toString(),
        title: habit.title,
        description: habit.description
    }));

    //  Fetch logs
    let logs = await habitRepository.overviewLogs(userId, startDate, endDate);

    logs = logs.map(log => ({
        habitId: log.habitId.toString(),
        date: log.date.toISOString().split('T')[0],
        status: log.status
    }));

    //  Generate dates array
    const dates = [];
    for (let i = days - 2; i >= -1; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }

    //  Build lookup map
    const logMap = {};
    for (const log of logs) {
        if (!logMap[log.habitId]) {
            logMap[log.habitId] = {};
        }
        logMap[log.habitId][log.date] = log.status;
    }

    //  Build final habits array
    const resultHabits = habits.map(habit => {
        const habitLogs = {};

        for (const date of dates) {
            habitLogs[date] =
                logMap[habit.habitId]?.[date] ?? false;
        }

        return {
            habitId: habit.habitId,
            title: habit.title,
            description: habit.description,
            logs: habitLogs
        };
    });

    return { dates, resultHabits };


}

exports.upsertLog = async (userId, habitId, date) => {

    const [y, m, d] = date.split("-");
    const logDate = new Date(`${y}-${m}-${d}T00:00:00Z`);
    logDate.setUTCHours(0, 0, 0, 0);

    const userData_find = {
        userId,
        habitId,
        date: logDate
    };

    const existingLog = await habitRepository.findExistingLogs(userData_find);

    if (existingLog) {

        const logId = { _id: existingLog._id };

        await habitRepository.deleteLog(logId);

        return {
            status: false,
            message: 'Habit marked as missed'
        };
    }

    const userData_create = {
        userId,
        habitId,
        date: logDate,
        status: true
    }

    await habitRepository.createLog(userData_create);

    return {
        status: true,
        message: 'Habit marked as done'
    };


}