const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('linked!'));
app.listen(8001, () => console.log('Server Up and running at 8001'));