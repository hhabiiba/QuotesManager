const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
const User = require('../models/userModel.js')
const List = require('../models/quoteListModel.js')
const Quote = require('../models/quoteModel.js')

const testUsers = [{
        username: 'user1',
        password: 'password1',
        quoteLists: [],
    },
    {
        username: 'user2',
        password: 'password2',
        quoteLists: [],
    }
]

const testQuoteLists = [{
        name: 'List 1',
        quotes: [],
    },
    {
        name: 'List 2',
        quotes: [],
    }
];

const testQuotes = [{
        quote: 'Quote 1',
        author: 'Option 1',
        category: 10,
    },
    {
        quote: 'Quote 2',
        author: 'Option 2',
        category: 10,
    }
];

describe('Quote API endpoints', () => {
    test('dummy test case to prevent timeout', () => {
        expect(true).toBe(true);
    }, 1000);
});

beforeEach(async() => {
    for (const testUser of testUsers) {
        const newUser = new User({
            username: testUser.username,
            password: testUser.password,
        })
        await newUser.save()
    }

    for (const testList of testQuoteLists) {
        const newList = new List({
            name: testList.name,
            quotes: testList.quotes,
        })
        await newList.save()
    }

    for (const testQuote of testQuotes) {
        const newQuote = new Quote({
            quote: testQuote.quote,
            author: testQuote.author,
            category: testQuote.category,
        })
        await newQuote.save()
    }
})

afterEach(async() => {
    await User.deleteMany()
    await List.deleteMany()
    await Quote.deleteMany()
})

afterAll(async() => {
    await User.deleteMany()
    await List.deleteMany()
    await Quote.deleteMany()
    await mongoose.connection.close()
})

describe('GET /api/users/', () => {
    test('should return all users', async() => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('GET /api/users/:userId', () => {
    test('should return a user by ID', async() => {
        const users = await User.find();
        const userId = users[0]._id;

        const response = await request.get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
    });
});

describe('GET /api/quoteLists', () => {
    test('should return all quoteLists', async() => {
        const response = await request.get('/api/quoteLists');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('GET /api/quoteLists/:id', () => {
    test('should return a quoteList by ID', async() => {
        const quoteLists = await List.find();
        const quizId = quoteLists[0]._id;

        const response = await request.get(`/api/quoteLists/${quizId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('List 1');
    });
});

describe('GET /api/quotes', () => {
    test('should return all quotes', async() => {
        const response = await request.get('/api/quotes');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/quotes/:questionId', () => {
    test('should return a quote by ID', async() => {
        const questions = await Quote.find();
        const questionId = questions[0]._id;

        const response = await request.get(`/api/quotes/${questionId}`);
        expect(response.status).toBe(200);
    });
});