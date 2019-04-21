module.exports = {
	port: 7000,
	url: 'mongodb://111.231.93.99:27017/dbc',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}