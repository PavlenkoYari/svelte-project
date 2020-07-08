import sirv from 'sirv';
import polka from 'polka';
import session from 'express-session';
import {json} from 'body-parser'
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cryptoDb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
const dbConnection = mongoose.connection;

polka() // You can also use Express
	.use(json())
	.use(
		session({
			secret: 'secret',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
		}),
	)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				user: req.session && req.session.user,
				lang: req.session && req.session.lang ? req.session.lang  : "eu"
			}),
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
