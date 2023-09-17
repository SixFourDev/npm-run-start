const stripe = require('stripe')(process.eventNames.STRIPE_KEY);

module.exports = stripe;