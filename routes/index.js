var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Extrapolador'});
});

router.post('/extrapolar', function(req, res, next) {
  console.log(req.body);
  var img = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  res.render('displayResultados', { 
    title: 'Resultados', 
    invInicial: 30000, 
    meses: 125, 
    porcentaje: 20, 
    meta: 200000000, 
    img: img,
    posible: true
  });
});

module.exports = router;
