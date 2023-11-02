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

async function searchKeywordWithLocation(locationName, result, radius, keyword) {
    let result_list = [];
    try {
        // 지역 이름을 기반으로 위치 좌표를 검색
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${googleMapApiKey}`;
        const geoResponse = await axios.get(geocodeUrl);
        const location = geoResponse.data.results[0].geometry.location;

        // 좌표와 키워드를 사용하여 장소를 검색
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=${keyword}&key=${googleMapApiKey}`;
        const placesResponse = await axios.get(placesUrl);
        const places = placesResponse.data.results;
        if (places.length > 0) { // 여기를 수정했습니다.
            for (const place of places) {
                const rating = place.rating || 0;
                // place_id가 이미 result 배열에 있는지 확인
                if (rating >= 1 && !result.find(result => result.place_id === place.place_id)) {
                    // 결과 배열에 장소 이름, 별점, 위도, 경도, 주소, 그리고 place_id 저장
                    result_list.push({
                        result_value: 1,
                        name: place.name,
                        rating: place.rating,
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                        address: place.vicinity,
                        place_id: place.place_id
                    });
                    return result_list; // 일치하는 첫 번째 결과를 반환
                }
            }
        } else {
            result_list.push({
                result_value: 0
            });
        }
    } catch (error) {
        result_list.push({
            result_value: 0
        });
        console.error(`에러 발생: ${error.message}`); // 에러 메시지를 출력
    }
    return result_list; // 일치하는 결과가 없거나 에러가 발생한 경우
}