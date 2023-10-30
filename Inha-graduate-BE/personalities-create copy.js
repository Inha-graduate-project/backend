// personality collection에 데이터 삽입
const mongoose = require('mongoose');
const Personalities = require('./personalities-definition');

// MongoDB Atlas 연결 URI
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Atlas와 연결되었습니다.");
    })
    .catch((error) => {
        console.error("MongoDB Atlas와 연결 과정에서 오류가 발생했습니다. :", error);
    });

function savePersonality(req, res) {
    const userData = req.body; // 클라이언트로부터 받은 데이터를 userData 변수에 저장

    const newPersonalities = new Personalities(userData); // 받은 데이터를 사용해 newPersonalities 객체를 생성

    newPersonalities.save() // newPersonalities 객체를 DB에 저장
        .then((personalities) => {
            res.json({ // 저장에 성공하면 클라이언트에게 성공 메시지를 json 형태로 응답
                message: '데이터가 성공적으로 저장되었습니다.'
                // personalities
            });
        })
        .catch((error) => { // 저장 중 오류가 발생하면 클라이언트에게 오류 메시지를 json 형태로 응답하며, HTTP 상태 코드로 500을 반환
            res.status(500).json({ // 500: 서버 에러를 총칭하는 에러 코드
                message: '데이터 저장 중 오류가 발생했습니다.'
                // error
            });
        });
}

module.exports = savePersonality; // savePersonality 함수를 모듈로 export