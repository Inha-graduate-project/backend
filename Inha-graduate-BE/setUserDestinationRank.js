const mongoose = require('mongoose');
const Personalities = require('./personalities-definition.js'); // 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

async function getUserById(userId) {
    try {
        const user = await User.findOne({ user_id: userId }); // user_id를 사용하여 User 컬렉션에서 문서를 조회합니다.

        if (!user) {
            console.log('User not found.');
        }

        return user;
    } catch (error) {
        console.error('An error occurred while fetching the user:', error);
        return null;
    }
}

module.exports = getUserById; // 다른 파일에서 이 함수를 사용할 수 있도록 모듈로 내보냅니다.