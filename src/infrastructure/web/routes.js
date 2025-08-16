const express = require('express');
const multer = require('multer');

module.exports = (projectController) => {
    const router = express.Router();
    const upload = multer({ storage: multer.memoryStorage() });

    router.get('/', (req, res) => res.render('upload'));
    router.post('/upload', upload.single('projectImage'), (req, res) => projectController.create(req, res));
    router.get('/projects/:projectId', (req, res) => projectController.find(req, res));

    return router;
};