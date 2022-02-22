const UserRoutes = require('express').Router()
const { isAuth } = require("../../middleware/auth")
const { postNewUser, loginUser, logoutUser, getUser, getAllUsers, patchUser, deleteFavorite} = require('../controllers/user.controller')
const upload = require("../../middleware/file")


UserRoutes.post('/register', upload.single("image"), postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.patch('/:id', patchUser)
UserRoutes.get('/', getAllUsers)
UserRoutes.patch('/delete/:id/:idProduct', deleteFavorite)


module.exports = UserRoutes