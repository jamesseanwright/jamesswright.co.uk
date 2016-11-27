'use strict';

const CLIENT_ACCOUNT_KEY = process.env.CLIENT_ACCOUNT_KEY;

// Route to serve ACME keys for cerbot renewal
module.exports = function getAcmeKeyAuth(req, res) {
    const keyAuth = `${req.params.token}.${CLIENT_ACCOUNT_KEY}`;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end(keyAuth, 'utf-8');
};