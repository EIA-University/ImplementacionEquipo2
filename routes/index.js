var express = require('express');
var router = express.Router();


function interesMensual(interesAnual){

  return 1-Math.pow((1-interesAnual),1/12);
}

function simular(ingresos,egresos,saldo,interesAnual){


      var neto=ingresos-egresos;

      var interesMens=interesMensual(interesAnual);

      //var interesMensual=0.183;

      console.log(interesMensual);
      var meses=1;
      while(saldo>0&&saldo<1000000000){

        saldo+=neto;
        saldo+=(saldo*interesMens);

        meses++;
      }

      console.log("Meses ", meses);


      var res=[saldo,meses];


      return res;

}


function ingresoEgreso(body){




      var intervalo=body.intervalo;

      if(intervalo==1){

        var ingresos=body.ingreso30;
        var egresos=body.egreso30;

        var res=[ingresos,egresos];

        return res;

      }else if(intervalo==2){

        var ingresos=parseInt(body.ingreso30)+parseInt(body.ingreso15);
        var egresos=parseInt(body.egreso30)+parseInt(body.egreso15);

        var res=[ingresos,egresos];

        return res;

      }else if(intervalo==3){

        var ingresos=parseInt(body.ingreso30)+parseInt(body.ingreso20)+parseInt(body.ingreso10);
        var egresos=parseInt(body.egreso30)+parseInt(body.egreso20)+parseInt(body.egreso10);

        var res=[ingresos,egresos];

        return res;

      }else if(intervalo==5){
        var ingresos=parseInt(body.ingreso30)+parseInt(body.ingreso25)+parseInt(body.ingreso20)+parseInt(body.ingreso15)+parseInt(body.ingreso10)+parseInt(body.ingreso5);
        var egresos=parseInt(body.egreso30)+parseInt(body.egreso25)+parseInt(body.egreso20)+parseInt(body.egreso15)+parseInt(body.egreso10)+parseInt(body.egreso5);

        var res=[ingresos,egresos];

        return res;

      }else if(intervalo==10){

        var ingresos=parseInt(body.ingreso3)+parseInt(body.ingreso6)+parseInt(body.ingreso9)+parseInt(body.ingreso12)+parseInt(body.ingreso15)+parseInt(body.ingreso18)+parseInt(body.ingreso21)+parseInt(body.ingreso24)+parseInt(body.ingreso27)+parseInt(body.ingreso30);
        var egresos=parseInt(body.egreso3)+parseInt(body.egreso6)+parseInt(body.egreso9)+parseInt(body.egreso12)+parseInt(body.egreso15)+parseInt(body.egreso18)+parseInt(body.egreso21)+parseInt(body.egreso24)+parseInt(body.egreso27)+parseInt(body.egreso30);

        var res=[ingresos,egresos];

        return res;

    }else if(intervalo==15){
        var ingresos=parseInt(body.ingreso2)+parseInt(body.ingreso4)+parseInt(body.ingreso6)+parseInt(body.ingreso8)+parseInt(body.ingreso10)+parseInt(body.ingreso12)+parseInt(body.ingreso14)+parseInt(body.ingreso16)+parseInt(body.ingreso18)+parseInt(body.ingreso20)+parseInt(body.ingreso22)+parseInt(body.ingreso24)+parseInt(body.ingreso26)+parseInt(body.ingreso28)+parseInt(body.ingreso30);

        var egresos=parseInt(body.egreso2)+parseInt(body.egreso4)+parseInt(body.egreso6)+parseInt(body.egreso8)+parseInt(body.egreso10)+parseInt(body.egreso12)+parseInt(body.egreso14)+parseInt(body.egreso16)+parseInt(body.egreso18)+parseInt(body.egreso20)+parseInt(body.egreso22)+parseInt(body.egreso24)+parseInt(body.egreso26)+parseInt(body.egreso28)+parseInt(body.egreso30);

        var res=[ingresos,egresos];

        return res;

      }
      else if(intervalo==30){

        var ingresos=parseInt(body.ingreso1)+parseInt(body.ingreso2)+parseInt(body.ingreso3)+parseInt(body.ingreso4)+parseInt(body.ingreso5)+parseInt(body.ingreso6)+parseInt(body.ingreso7)+parseInt(body.ingreso8)+parseInt(body.ingreso9)+parseInt(body.ingreso10)+parseInt(body.ingreso11)+parseInt(body.ingreso12)+parseInt(body.ingreso13)+parseInt(body.ingreso14)+parseInt(body.ingreso15)+parseInt(body.ingreso16)+parseInt(body.ingreso17)+parseInt(body.ingreso18)+parseInt(body.ingreso19)+parseInt(body.ingreso20)+parseInt(body.ingreso21)+parseInt(body.ingreso22)+parseInt(body.ingreso23)+parseInt(body.ingreso24)+parseInt(body.ingreso25)+parseInt(body.ingreso26)+parseInt(body.ingreso27)+parseInt(body.ingreso28)+parseInt(body.ingreso29)+parseInt(body.ingreso30);

        egresos=parseInt(body.egreso1)+parseInt(body.egreso2)+parseInt(body.egreso3)+parseInt(body.egreso4)+parseInt(body.egreso5)+parseInt(body.egreso6)+parseInt(body.egreso7)+parseInt(body.egreso8)+parseInt(body.egreso9)+parseInt(body.egreso10)+parseInt(body.egreso11)+parseInt(body.egreso12)+parseInt(body.egreso13)+parseInt(body.egreso14)+parseInt(body.egreso15)+parseInt(body.egreso16)+parseInt(body.egreso17)+parseInt(body.egreso18)+parseInt(body.egreso19)+parseInt(body.egreso20)+parseInt(body.egreso21)+parseInt(body.egreso22)+parseInt(body.egreso23)+parseInt(body.egreso24)+parseInt(body.egreso25)+parseInt(body.egreso26)+parseInt(body.egreso27)+parseInt(body.egreso28)+parseInt(body.egreso29)+parseInt(body.egreso30);

        var res=[ingresos,egresos];

        return res;

      }


}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Extrapolador'});
});




router.post('/extrapolar', function(req, res, next) {

  console.log(req.body);

  var rest=ingresoEgreso(req.body);

  var ingresos=rest[0];
  var egresos=rest[1];

  console.log(ingresos," ",egresos);

  var saldo=200000000;

  var interesAnual=req.body.intereses;

  var interMensual=interesMensual(interesAnual);

  var finRes=simular(ingresos,egresos,saldo,interesAnual);

var img = Math.floor(Math.random() * (6 - 1 + 1)) + 1;


  if(finRes[0]>0){

      res.render('displayResultados', {
            title: 'Resultados',
            invInicial: 200000000,
            meses:finRes[1],
            porcentaje: interesAnual*100,
            meta:1000000000,
            saldoF:finRes[0],
            img: img,
            posible: true

          });


      }else{
        res.render('displayResultados', {
              title: 'Resultados',
              invInicial: 200000000,
              meses: 'Nunca',
              porcentaje: 20,
              meta:1000000000,
              saldoF:0,
              img: img,
              posible: false

            });



      }



  });







module.exports = router;
