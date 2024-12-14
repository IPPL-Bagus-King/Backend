const checkoutService = require('../services/checkoutService')

exports.checkoutProductController = async (req, res) => {
    const result = await checkoutService.createCheckoutProduct(req, res)
    return res.status(result.status).json(result)
}

exports.notificationController = async (req, res) => {
    const result = await checkoutService.notificationService(req, res)
    return res.status(result.status).json(result)
}

exports.historyProductController = async (req, res) => {
    const result = await checkoutService.getHistoryProduct(req, res)
    return res.status(result.status).json(result)
}

exports.historybyForumProductController = async (req, res) => {
    const result = await checkoutService.getHistorybyForumProduct(req, res)
    return res.status(result.status).json(result)
}

exports.checkPurchaseController = async (req, res) => {
    const result = await checkoutService.checkPurchaseService(req, res)
    return res.status(result.status).json(result)
}