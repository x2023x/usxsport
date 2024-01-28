const mongoose = require("mongoose")
const passSchema = new mongoose.Schema({ 
    pass: String,
});

const Pass = new mongoose.model('Pass', passSchema);
module.exports = Pass;