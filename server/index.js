const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------ MiddleWares----------//

app.use(express.json());

// ----------------Routes----------//

// --------------ServerStart---------//

app.listen(PORT, () => {
        console.log(`server up port ${PORT}`);
});
