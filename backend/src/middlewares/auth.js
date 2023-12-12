const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const secret = '7as8s8as4a5s4a5sa65'

const WithAuth = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).json({ error: 'Token não autorizado.' });
    } else {
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(401).json({ error: 'Token inválido.' });
            } else {
                try {
                    const user = await User.findOne({ email: decoded.email });
                    if (!user) {
                        res.status(401).json({ error: 'Usuário não encontrado.' });
                    } else {
                        req.userEmail = decoded.email;
                        req.user = user;
                        next();
                    }
                } catch (err) {
                    res.status(401).json({ error: err.message });
                }
            }
        });
    }
};

module.exports = WithAuth;