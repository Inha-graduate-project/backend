const express = require('express'); // express는 웹 애플리케이션 프레임워크
const bodyParser = require('body-parser'); // body-parser는 요청의 본문을 파싱하는 미들웨어
const savePersonality = require('./personalities-create.js'); // 사용자 취향(선호도)을 저장하는 역할
const readPersonality = require('./personalities-read.js'); // 사용자 취향(선호도)을 받아오는 역할

const app = express(); // express를 사용해 앱 객체를 생성
app.use(bodyParser.json()); // / app에 body-parser의 json 미들웨어를 사용하도록 설정

app.post('/savePersonality', savePersonality); // 사용자 취향(선호도)을 저장하는 api
app.get('/readPersonality/:user_id', readPersonality); // 사용자 취향(선호도)을 가져오는 api

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});