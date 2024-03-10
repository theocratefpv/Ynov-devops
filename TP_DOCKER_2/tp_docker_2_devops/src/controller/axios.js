const axios = require('axios');

// This route is handled by a cache middleware, see the axios router
exports.getMeteo = async (req, res, next) => {
    const meteoResult = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m');
    if (meteoResult && meteoResult.data) {
        res.json(meteoResult.data);
    } else {
        res.status(400).json({success: false, message: 'Cannot get meteo result'});
    }
}

exports.postBook = async (req, res, next) => {
    axios.post('http://localhost:3000/books', {
        title: req.body.title,
        date: req.body.date
    }).then((result) => {
        if (result && result.data) {
            res.status(result.status).json(result.data);
        }
    }).catch((e) => {
        if (e.response && e.response.status && e.response.data) {
            res.status(e.response.status).json(e.response.data);
        } else {
            next(e);
        }
    });
}