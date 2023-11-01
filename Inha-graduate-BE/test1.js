// setUserDestinationRank 함수 사용 예
const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`; // MongoDB Atlas 연결 URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const setUserDestinationRank = require('./setUserDestinationRank.js')

// 전체 값 출력 예시
//setUserDestinationRank(11111).then(console.log);

async function test() {
    const user_rank = await setUserDestinationRank(11111);
    console.log(user_rank.rank_mountain) // rank_mountain의 count와 rank 값 출력
    user_rank_count = user_rank.rank_mountain.count;
    user_rank_rank = user_rank.rank_mountain.rank;
    console.log(user_rank_count); // rank_mountain의 여행지 갯수
    console.log(user_rank_rank); // rank_mountain의 여행지 우선순위
    console.log(user_rank.rank_mountain.keywords);
    mongoose.connection.close(); // MongoDB 연결 종료
}

test()