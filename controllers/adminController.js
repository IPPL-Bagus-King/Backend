const adminService = require('../services/adminService');

// fungsi untuk menyetujui atau menolak pengajar ketika mendaftar ke aplikasi
const updateTeacherStatus = async (req, res) => {
  try {
    const { teacherId } = req.params; // ambil ID teacher dari parameter
    const { action } = req.body; // ambil aksi (approve/reject) dari request body

    if (!['approve', 'reject'].includes(action)) {
      // untuk cek apakah request body (action) mengandung isi array
      return res
        .status(400)
        .json({ message: 'Invalid action. Use "approve" or "reject".' });
    }

    await adminService.updateTeacherStatus(teacherId, action);

    return res.status(200).json({
      message: `Teacher has been ${action}d successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// fungsi untuk mendapatkan data pengajar yang statusnya pending
const getPendingTeachers = async (req, res) => {
  try {
    const pendingTeachers = await adminService.getPendingTeachers();
    return res.status(200).json({
      message: 'Pending teachers retrieved successfully',
      data: pendingTeachers,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateTeacherStatus,
  getPendingTeachers,
};
