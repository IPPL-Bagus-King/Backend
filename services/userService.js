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
                "id": user.id,
                "username": user.name,
                "picture": user.picture,
                "phone_number": user.phone_number,
                "email": user.email,
                "created_at": user.createdAt,
                "updated_at": user.updatedAt

            }
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}