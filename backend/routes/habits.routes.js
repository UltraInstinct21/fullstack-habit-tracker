const express = require('express');
const { protect } = require('../middlewares/protect')
const router = express.Router();
const habitsController = require('../controllers/habits.contollers')


router.post('/', protect, habitsController.createHabit)

router.patch('/:habitId', protect, habitsController.updateHabit)

router.delete("/:habitId", protect, habitsController.deleteHabit);

router.get('/overview', protect, habitsController.overviewHabits);

router.patch('/:habitId/log', protect, habitsController.upsertLogs);

module.exports = router;
