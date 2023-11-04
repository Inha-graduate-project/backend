// setFoodRank 함수 사용 예
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.uri; // MongoDB Atlas 연결 URI
const setUserAccommodationRank = require('./setUserAccommodationRank.js')

// 전체 값 출력 예시
//setUserFoodRank(11111).then(console.log);

async function test() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const user_rank = await setUserAccommodationRank(11111);
    console.log(user_rank) // rank_mountain의 count와 rank 값 출력
    mongoose.connection.close(); // MongoDB 연결 종료
}

test()