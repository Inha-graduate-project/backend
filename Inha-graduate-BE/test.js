// 데이터가 정상적으로 저장되는지 확인하기 위한 테스트 파일

const axios = require('axios');

const userData = { // 사용자 데이터 저장
    user_id: 12345, // 중복되지 않는 int 값
    travel_destination: "제주", // 여행지역
    start_day: "20231027", // 여행시작일
    finish_day: "20231028", // 여행종료일
    travel_day: 2, // 여행일
    rank_mountain: 1, // 여행지_산 우선순위
    rank_sea: 2, // 여행지_바다 우선순위
    rank_valley: 3, // 여행지_계곡 우선순위
    rank_historicalTheme: 4, // 여행지_역사관광지 우선순위
    rank_experienceTheme: 5, // 여행지_체험관광지 우선순위
    rank_buildingTheme: 6, // 여행지_건축/조형물 우선순위
    rank_cafe: 7, // 여행지_카페 우선순위
    rank_koreanfood: 1, // 음식_한식 우선순위
    rank_japanesefood: 2, // 음식_일식 우선순위
    rank_chinesefood: 3, // 음식_중식 우선순위
    rank_westernfood: 4, // 음식_양식 우선순위
    rank_fastfood: 5, // 음식_패스트푸드 우선순위
    rank_meat: 6, // 음식_고기/구이 우선순위
    rank_hotel: 1, // 숙박_호텔 우선순위
    rank_motel: 2, // 숙박_모텔 우선순위
    rank_pension: 3, // 숙박_펜션 우선순위
    transportation: "자동차" // 교통수단
};

axios.post('http://localhost:3000/savePersonality', userData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });