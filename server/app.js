require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");

let journal = require('./controllers/journalcontroller');
let user = require("./controllers/usercontroller");
let calculator = require("./controllers/calculatorcontroller")

sequelize.sync();
app.use(require('./middleware/header'));
app.use(express.json());

app.use('/user', user);
app.use('/journal', journal);
app.use('/calculator', calculator)

app.listen(3000, function()
    {console.log('app is listening on port 3000');
    });


