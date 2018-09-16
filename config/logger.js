const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level,
			timestamp() {
				return (new Date()).toISOString();
			},
			format: winston.format.combine(winston.format.colorize(), winston.format.simple())
		})
	]
});

module.exports = logger;
