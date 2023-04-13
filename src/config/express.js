const express = require('express');
const cors = require('cors');

const { auth } = require('../middlewares/authMiddleware'); 

function setupExpress(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(auth);
}

module.exports = setupExpress;
