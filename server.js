// server.js (Node.js/Express)
const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your secret key
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    try {
        const { tokenId, amount } = req.body;
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: 'Example charge',
            source: tokenId,
        });
        res.status(200).json(charge);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
