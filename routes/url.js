const express = require('express');
const { handleGenerateNewShortURL, handlerURLRedirect, handleAnalytics} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId', handlerURLRedirect);
router.get('/analytics/:shortId', handleAnalytics )


module.exports = router;