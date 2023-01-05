const router = require('express').Router()
let catchAsync = require('../../utils/catchAsync')
let isAuth=require('../../authMiddlewares/isAuth')
const { createMessage, getUserMessages } = require('./message.controller')
router.get('/',isAuth,catchAsync(getUserMessages))
router.post('/:id',catchAsync(createMessage))




module.exports = router