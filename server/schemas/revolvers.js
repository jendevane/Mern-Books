const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// const { param } = require('../routes');

const resolvers = {

    Query: {

        //get a user by username
        me: async (parent, args, context) => {

            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')
            
                return userData;
            }

            throw new AuthenticationError('Not logged in')

        },

    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
            //   const savedBook = await Book.create({ ...args, username: context.user.username });
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },



        removeBook: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;

                throw new AuthenticationError('You need to be logged in!');
            },
            deleteBook: async (req, res) => {
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
            createBook: (req, res) => {
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
    
        
module.exports = resolvers;