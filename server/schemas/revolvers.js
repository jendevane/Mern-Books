const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
        

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },


        Mutation: {
  
            login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('Incorrect credentials');
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }

                const token = signToken(user);
                return { token, user };
            },
            addUser: async (parent, args, context) => {
                if (context.user) {
                    const user = await User.create({ ...args, username: context.user.username });

    

                    return user;
                }

                throw new AuthenticationError('You need to be logged in!');
            },
            deleteBook = async (req, res) => {
                await Book.findOneAndDelete({ _id: req.params.id }, (err, Book) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
            
                    if (!Book) {
                        return res
                            .status(404)
                            .json({ success: false, error: `Book not found` })
                    }
            
                    return res.status(200).json({ success: true, data: Book })
                }).catch(err => console.log(err))
            },
            createBook = (req, res) => {
                const body = req.body
            
                if (!body) {
                    return res.status(400).json({
                        success: false,
                        error: 'You must provide a book',
                    })
                }
            
                const Book = newBook(body)
            
                if (!Book) {
                    return res.status(400).json({ success: false, error: err })
                }
            
                Book
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            id: movie._id,
                            message: 'Book created!',
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            error,
                            message: 'Book not created!',
                        })
                    })
            }
    
        
    }
}
module.exports = resolvers;