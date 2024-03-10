const express = require('express');
const app = express();
const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./open-api.yaml');

app.use(cors());
app.use(express.json());
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api.yaml',
        ignoreUndocumented: true
    })
);

const booksRouter = require('./routers/books');
app.use('/books', booksRouter);
const usersRouter = require('./routers/users');
app.use('/users', usersRouter);
const axiosRouter = require('./routers/axios');
app.use('/axios', axiosRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message, status: error.status});
});

module.exports = app;