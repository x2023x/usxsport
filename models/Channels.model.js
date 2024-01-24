const mongoose = require("mongoose")
const channelSchema = new mongoose.Schema({ name: String, status: Boolean, logo: String, link: String  });



const Channel = new mongoose.model('Channel', channelSchema);
module.exports = Channel;