const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const UserSchema = mongoose.Schema(
    {
        _id: Number,
        name: String,
        age: Number,
        email: String,
    }
);

UserSchema.plugin(AutoIncrement, { inc_field: '_id' });

module.exports = mongoose.model('User', UserSchema);