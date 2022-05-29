const customersRouter = require('./routes/customers.routes');
const historyRouter = require('./routes/history.routes')
const regionsRouter = require('./routes/regions.routes');
const reviewsRouter = require('./routes/reviews.routes');
const orderRouter = require('./routes/order.routes');
const callsRouter = require('./routes/calls.routes');
const adminRouter = require('./routes/admin.routes');
const itemRouter = require('./routes/items.routes');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/uploads`));
app.use('/customers', cors(), customersRouter);
app.use('/history', cors(), historyRouter);
app.use('/orders', cors(), orderRouter);
app.use('/colls', cors(), callsRouter);
app.use('/admin', cors(), adminRouter);
app.use('/items', cors(), itemRouter);
app.use('/regions', cors(), regionsRouter);
app.use('/reviews', cors(), reviewsRouter);

app.listen(3001, () => console.log('👌🚀🌈'));