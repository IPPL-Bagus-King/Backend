const { rupiahFormat } = require('../helpers/formatRupiahHelper')
const { Checkout, Forum, user } = require('../models')
require('dotenv').config();

const ServerKey = process.env.SERVER_KEY;
const ClientKey = process.env.CLIENT_KEY;

const midtransClient = require('midtrans-client');

let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : ServerKey,
    clientKey : ClientKey
});

exports.createCheckoutProduct = async (req, res) => {

    const {id_product, bank} = req.body
    const id_user = req.user.id

    const products = await Forum.findOne({where: {id: id_product}})

    if(!products){
        return {
            status: 404,
            message: "Forum dengan id tersebut tidak ditemukan"
        }
    }

    const random = Math.floor(Math.random() * 1000000);
    const splitName = req.user.name.split(' ');
    const firstName = splitName[0];
    const lastName = splitName.slice(1).join(' ');
    const dataMidstrans = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "order_id": `order-${random}`,
            "gross_amount": products.price
        },
        "items_details":[
            {
                "id": Forum.id,
                "price": Forum.price,
                "name": Forum.name,
                "subtotal": Forum.price
            }
        ],
        "bank_transfer":{
            "bank": `${bank}`
        },
        "customer_details": {
            "first_name": firstName, 
            "last_name": lastName,
            "email": req.user.email,
        }
    }

    let transactionToken = await coreApi.charge(dataMidstrans)

    console.log(transactionToken);
    let data = await Checkout.create(
        {
            order_id: `order-${random}`,
            id_user,
            id_forum: id_product,
            status: 'pending',
            bank: bank,
            va_number: transactionToken.va_numbers[0].va_number,
        
        }
    )
    
    data.dataValues.total = rupiahFormat(products.price)

    return {
        status: 201,
        data,
        message: "Success Create Data"
    }

}

exports.notificationService = async (req, res) => {
    try {
        let midtransNotification = await coreApi.transaction.notification(req.body)
        Checkout.update(
            {
                status: midtransNotification.transaction_status
            }, 
            {
                where: 
                {
                    order_id: midtransNotification.order_id
                }
            }
        )
        return {
            status: 200,
            message: "Success Update Data"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}

exports.getHistoryProduct = async (req, res) => {
    try {
        const id_user = req.user.id
        const data = await Checkout.findAll(
            {
                where: 
                {
                    id_user,
                },
                include: [
                    {
                        model: Forum,
                        as: 'forum',
                        attributes: ['name', 'description', 'price', 'picture', 'teacher_id'],
                    }
                ]
            }
        )

        data.map((item) => {
            item.dataValues.forum.dataValues.price = rupiahFormat(item.dataValues.forum.dataValues.price)
        })

        return {
            status: 200,
            data,
            message: "Success Get Data"
        }
    } catch (error) {
        return {
            status: 500,
            data: [],
            message: error.message
        }
    }
}

exports.checkPurchaseService = async (req, res) => {
    try {
        const id_user = req.user.id
        const id_forum = req.params.forumid
        const data = await Checkout.findOne(
            {
                where: 
                {
                    id_user,
                    id_forum,
                }
            }
        )

        if(data){
            return {
                status: 200,
                message: "Success Get Data",
                data: data,
            }
        } else {
            return {
                status: 404,
                message: "Data Not Found",
                data: {
                    status: null
                }
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null
        }
    }
}