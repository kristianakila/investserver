import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// PATCH /api/admin/users/:telegramId
router.patch('/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    const { balance } = req.body;

    if (!telegramId || typeof balance !== 'number') {
      return res.status(400).json({ success: false, error: 'Недостаточные параметры' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { telegramId },
      { $set: { 'gameData.balance': balance } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    return res.status(200).json({ success: true, message: 'Баланс обновлён' });
  } catch (error) {
    console.error('Ошибка в PATCH /api/admin/users/:telegramId:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
