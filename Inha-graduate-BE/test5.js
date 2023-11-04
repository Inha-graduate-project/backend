// selectDestination 함수

const axios = require('axios'); //json을 받아오기 위함
require('dotenv').config();
const selectDestination = require('./selectDestination.js');
const Personalities = require('./personalities-definition.js');
//const Informations = require('./informations-definition');
const mongoose = require('mongoose');
const uri = process.env.uri; // MongoDB Atlas 연결 URI

async function test5(userId) {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const user_infor = await selectDestination(userId);
    console.log(user_infor);
    console.log(user_infor[1]);
    mongoose.connection.close();
}

test5(11111)