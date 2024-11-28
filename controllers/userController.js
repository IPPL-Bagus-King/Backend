const userService = require('../services/userService');

exports.getUserID = async (req, res) => {
    try {
        const result = await userService.getUserById(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}