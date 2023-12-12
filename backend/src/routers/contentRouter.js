const express = require('express')
const contentRouter = express.Router()
const contentController = require('../controllers/contentController')

contentRouter.route('/contents')
.get((req, res) => contentController.getContents(req, res))

contentRouter.route('/content/update')
.put((req, res) => contentController.updateContent(req, res))

contentRouter.route('/content/create')
.post((req, res) => contentController.createContent(req, res))

contentRouter.route('/content/:title')
.get((req, res) => contentController.getContentByTitle(req, res))
.delete((req, res) => contentController.deleteContentByTitle(req, res))

module.exports = contentRouter