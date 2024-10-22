const mongoose = require('mongoose');

const crmSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String
});

const campaignSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String
});

const CRM = mongoose.model('CRM', crmSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = { CRM, Campaign };
