// 데이터를 정상적으로 갖고 올 수 있는지 확인하는 테스트 파일
const fetch = require('node-fetch');

async function fetchPersonality(userId) {
    try {
        const response = await fetch(`http://localhost:8001/readPersonality/${userId}`);
        const data = await response.json();
        const data_rank_pension = data.rank_pension
        if (response.ok) {
            console.log(data);
            console.log(data_rank_pension)
        } else {
            console.log('Error:', data.message);
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
}

const userId = 11111; // 원하는 user_id 입력
fetchPersonality(userId);