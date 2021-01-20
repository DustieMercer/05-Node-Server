let express = require('express');
let router = express.Router();

router.post('/add', function (req, res) {
   console.log("Dustie!");
   let number1 = req.body.num1;
   let number2 = req.body.num2;
   res.json({total: number1+number2})
})



module.exports = router;