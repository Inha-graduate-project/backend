const axios = require('axios'); //json을 받아오기 위함
const Personalities = require('./personalities-definition');
const Informations = require('./informations-definition');
const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`; // MongoDB Atlas 연결 URI
const setUserDestinationRank = require('./setUserDestinationRank.js') // 여행지 추천 갯수를 가져오는 모듈
const setUserFoodRank = require('./setUserFoodRank.js') // 음식 추천 갯수를 가져오는 모듈
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const googleMapApiKey = 'AIzaSyC8h53kQ_qujP6VWvv03U61nhJAAb8fuMw';

async function selectDestination(userId) {
    try {
        const user = await Personalities.findOne({ user_id: userId }); // 해당 userId의 personalities 데이터를 가져온다.
        if (!user) { // 유저가 존재하지 않는 경우
            return null; // null 값 리턴
        }
        const travel_day = user.travel_day; // 여행일

        // 시작 좌표 설정
        let startpoint_name = user.travel_destination + "버스터미널"; // 시작좌표 이름(지역 + 버스터미널)
        let startpoint_apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'; // google api Url
        let startpoint_response = await axios.get(startpoint_apiUrl, { // api 호출
            params: {
                input: startpoint_name,
                inputtype: 'textquery',
                fields: 'formatted_address,geometry/location',
                key: googleMapApiKey,
            }
        })
        const startpoint_places = startpoint_response.data.candidates;
        const startpoint_location = startpoint_places[0].geometry.location;
        const startpoint_address = startpoint_places[0].formatted_address; // 주소 
        console.log(`Latitude: ${startpoint_location.lat}, Longitude: ${startpoint_location.lng}`);
        let latitude = startpoint_location.lat // 시작 좌표 위도
        let longitude = startpoint_location.lng // 시작 좌표 경도
        let radius = 5000; // 반경 5km
        const results = []; // 결과를 저장하는 배열
        results.push({ seq: 0, name: startpoint_name, latitude: latitude, longitude: longitude, address: startpoint_address });
        console.log(results)
        //const user_rankDestinationData = setUserDestinationRank(userId); // 여행지 추천 갯수를 가져오고, 저장하는 data
        //const user_rankFoodData = setUserFoodRank(userId); // 음식 추천 갯수를 가져오고, 저장하는 data
        user_rankDestinationData = {
            rank_mountain: { count: 3, rank: 1, keywords: ['산', '국립공원', '수목원', '식물원', '계곡'] },
            rank_sea: { count: 2, rank: 2, keywords: ['해수욕장'] },
            rank_historicalTheme: { count: 1, rank: 4, keywords: ['문화유적', '박물관'] },
            rank_experienceTheme: { count: 1, rank: 5, keywords: ['체험학습장', '체험마을'] },
            rank_buildingTheme: { count: 0, rank: 6, keywords: ['전망대', '석탑'] },
            rank_cafe: { count: 1, rank: 3, keywords: ['카페'] },
        };
        user_rankFoodData = {
            rank_koreanfood: { count: 2, rank: 1, keywords: ['한식'] },
            rank_japanesefood: { count: 1, rank: 2, keywords: ['일식'] },
            rank_chinesefood: { count: 1, rank: 3, keywords: ['중식'] },
            rank_westernfood: { count: 1, rank: 4, keywords: ['양식'] },
            rank_fastfood: { count: 1, rank: 5, keywords: ['패스트푸드'] },
            rank_meat: { count: 0, rank: 6, keywords: ['구이'] }
        };
        user_rankAccommodationData = {
            rank_hotel: { count: 1, rank: 1, keywords: ['호텔'] },
            rank_motel: { count: 1, rank: 2, keywords: ['모텔'] },
            rank_pension: { count: 0, rank: 3, keywords: ['펜션'] }
        };
        const sortedDestinationKeywords = Object.entries(user_rankDestinationData)
            .filter(([key, value]) => value.count > 0) //count가 0인지 체크
            .sort((a, b) => a[1].rank - b[1].rank); //rank 오름차순으로 정렬

        const sortedFoodKeywords = Object.entries(user_rankFoodData)
            .filter(([key, value]) => value.count > 0) //count가 0인지 체크
            .sort((a, b) => a[1].rank - b[1].rank); //rank 오름차순으로 정렬

        const sortedAccommodationKeywords = Object.entries(user_rankAccommodationData)
            .filter(([key, value]) => value.count > 0) //count가 0인지 체크
            .sort((a, b) => a[1].rank - b[1].rank); //rank 오름차순으로 정렬

        // 여행지 추천 과정 구현
        // travel_day에 따라 나누기(당일치기인지, 1박2일인지, 2박3일인지 분류)
        if (travel_day === 1) {

        }
        else if (travel_day === 2) {

        }
        else if (travel_day === 3) {

        }

    }
    catch (error) {
        console.error('여행지 추천 중 오류가 발생했습니다: ', error);
        return null;
    }
}

selectDestination(11111);


// 특정 키워드에 대한 검색 함수
async function searchKeyword(latitude, longitude, radius, results, keyword) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${googleMapApiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // place_id가 이미 results 배열에 있는지 확인
        if (data.results.length > 0) {
            for (const place of data.results) {
                const rating = place.rating || 0;

                // place_id가 이미 results 배열에 있는지 확인
                if (rating >= 1 && !results.find(result => result.place_id === place.place_id)) {
                    console.log(`${keyword} 목적지: ${place.name}, 별점: ${rating}`);

                    // 결과 배열에 장소 이름, 별점, 위도, 경도, 주소, 그리고 place_id 저장
                    results.push({
                        name: place.name,
                        rating: place.rating,
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                        address: place.vicinity,
                        place_id: place.place_id
                    });

                    return true;
                }
            }
        } else {
            console.log(`${keyword} 목적지 검색 결과가 없습니다.`);
        }
    } catch (error) {
        console.error(`에러 발생: ${error.message}`);
    }

    return false;
}

async function processKeywords() {
    const sortedKeywords = Object.entries(data)
        .filter(([key, value]) => value.count > 0) //count가 0인지 체크
        .sort((a, b) => a[1].rank - b[1].rank); //rank 오름차순으로 정렬

    while (sortedKeywords.length > 0) { //위 두 조건을 만족시켜서 sortedKeywords에 들어있음

        let keywordFound = false;

        for (const [key, value] of sortedKeywords) {
            if (value.count === 0) {
                continue; // count가 0인 키워드는 건너뛰기
            }

            for (const keyword of value.keywords) {
                if (value.count === 0) {
                    break; // count가 0이면 종료
                }
                if (await searchKeyword(keyword)) {
                    value.count--; //카운트 감소
                    keywordFound = true;
                    break;
                }
            }
        }

        //5km증가시길때 조건을 잘따져야함
        if (!keywordFound) {
            // 결과를 찾지 못한 경우, 최하위 키워드에서 최상위로 순환
            const lastKeyword = sortedKeywords.pop();
            sortedKeywords.unshift(lastKeyword);
        }

        const allCountsZero = sortedKeywords.every(([key, value]) => value.count === 0);
        if (allCountsZero) {
            // 모든 count가 0이면 반복 종료
            break;
        }

    }
}