require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./config/mongoDb');
const middleware = require('./utils/middleware');
const quoteRouter = require('./routers/quoteRouter');
const quoteListsRouter = require('./routers/quoteListRouter');
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
    res.send("hello")
})

// Routes
app.use('/api/quotes', quoteRouter);
app.use('/api/quoteLists', quoteListsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

// Unknown endpoint handler
app.use(middleware.unknownEndpoint);

// Connect to MongoDB
connectDB()
    // .then(() => {
    //     const PORT = process.env.PORT || 4000;
    //     export const server =  app.listen(PORT, () => {
    //         console.log(`Server running on PORT: ${PORT}`);
    //     });
    // })
    // .catch((err) => {
    //     console.error('Error connecting to MongoDB:', err);
    // });

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

module.exports = server;