const { AuthenticationError } = require('@apollo/server');
const axios = require('axios');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('orders');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    products: async () => {
      return Product.find();
    },
    product: async (parent, { _id }) => {
      return Product.findById(_id);
    },
    orders: async (parent, { userId }) => {
      return Order.find({ userId }).populate('products');
    },
    product: async (parent, { productName }) => {
      try {
        // Make an HTTP GET request to the external API
        const response = await axios.get(`https://api.example.com/products?name=${productName}`);

        // Handle the API response and extract the relevant data
        const productData = response.data;

        // Return the product data
        return productData;
      } catch (error) {
        // Handle errors, e.g., if the API request fails
        console.error('Error fetching product data:', error);
        throw new Error('Failed to fetch product data');
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = await Order.create({ products, userId: context.user._id });
        return order;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createPaymentIntent: async (_, { amount, currency }) => {
      try {
        //stripe object
        const paymentIntent = await stripeKey.paymentIntents.create({
          amount,
          currency,
        });

        return paymentIntent;
      } catch (error) {
        //handle errors 
        throw new Error(`Payment intent creation failed: ${error.message}`)
      }
    }
  }
};
module.exports = resolvers;