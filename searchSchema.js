var mongoose = require('mongoose');

var searchSchema = {
	term: {
		type: String,
		required: true
	},
	when: {
		type: Date,
		required: true
	}
}

module.exports = new mongoose.Schema(searchSchema,{ capped: { size: 1024, max: 10, autoIndexId: true } })
module.exports.searchSchema = searchSchema;