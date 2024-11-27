const { User } = require('../models');

const updateTeacherStatus = async (teacherId, action) => {
  // Cek apakah ada teacher dengan status pending
  const teacher = await User.findOne({
    where: { id: teacherId, role: 'teacher', status: 'pending' },
  });

  if (!teacher) {
    throw new Error('Teacher not found or already approved/rejected.');
  }

  // Ubah status berdasarkan aksi
  if (action === 'approve') {
    // Ubah status ke approved
    teacher.status = 'approved';
    await teacher.save();
  } else if (action === 'reject') {
    // Hapus teacher jika statusnya reject
    await teacher.destroy();
  }
};

const getPendingTeachers = async () => {
  try {
    const pendingTeachers = await User.findAll({
      where: { status: 'pending' },
    });
    return pendingTeachers;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateTeacherStatus,
  getPendingTeachers,
};
