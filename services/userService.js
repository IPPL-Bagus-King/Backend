const { User } = require('../models');

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        return {
            status: 200,
            data: {
                "username": user.name,
                "picture": user.picture,
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}