const reviewService = require('../services/reviewService')
//user_id	forum_id	rating	comment	
exports.addReview = async (req, res) => {
    try {
        const result = await reviewService.addReview(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const result = await reviewService.deleteReview(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getReview = async (req, res) => {
    try {
        const result = await reviewService.getReview(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateReview = async (req, res) => {
    try {
        const result = await reviewService.updateReview(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getAllReview = async (req, res) => {
    try {
        const result = await reviewService.getAllReview(req, res)
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}