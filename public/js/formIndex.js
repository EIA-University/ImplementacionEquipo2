$(function () {
    //Advanced form with validation
    var form = $('#wizard_with_validation').show();

    jQuery.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != param;
    }, "Seleccione un valor que no sea el predeterminado");

    form.steps({
        headerTag: 'h3',
        bodyTag: 'fieldset',
        transitionEffect: 'slideLeft',
        labels: {
            current: "paso actual:",
            pagination: "Paginacion",
            finish: "Finalizar",
            next: "Siguiente",
            previous: "Anterior",
            loading: "Cargando ..."
        },
        onInit: function (event, currentIndex) {
            $.AdminBSB.input.activate();

            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css('width', (100 / tabCount) + '%');

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; }

            if (currentIndex < newIndex) {
                form.find('.body:eq(' + newIndex + ') label.error').remove();
                form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
            }

            form.validate().settings.ignore = ':disabled,:hidden';
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            if (currentIndex == 1 && priorIndex == 0) {
                console.log("aqui");
                var intervalo = 30/parseInt($("#intervalo").val());
                console.log("intervalo: " + intervalo);
                var ingresoEgreso = $("#holapp");

                for (var i = intervalo; i <= 30; i+=intervalo) {
                    //ingresoEgreso.append("<p>hola pp</p>");
                    console.log("Dia: " + i);
                    ingresoEgreso.append(createInputComp(i));
                    /*
                    ingresoEgreso.append(createInputIngreso(i));
                    ingresoEgreso.append(createInputEgreso(i));
                    */
                }
            }

            if (currentIndex == 0 && priorIndex == 1) {
                var ingresoEgreso = $("#holapp");
                ingresoEgreso.empty();
            }

            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ':disabled';
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
           // swal("Good job!", "Submitted!", "success");
            swal({
                title: "Buen trabajo",
                text: "los datos se han guardado",
                type: "success",
                confirmButtonText: "calcular!",
                closeOnConfirm: true
            }, function() {
                $(form).submit();
            });
        }
    });

    form.validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        rules: {
            'intervalo': {
                notEqual: " "
            }
        }
    });
});

function createInputIngreso(dia) {
    var input= [];
    var name = "ingreso" + dia;
    input.push(
        '<div class="col-sm-6">',
            '<div class="input-group">',
                '<span class="input-group-addon">$</span>',
                '<div class="form-line">',
                    '<input type="number" min="0" name="' + name +'" class="form-control" placeholder="Ingresos dia ' + dia + '" required>',
                '</div>',
                '<span class="input-group-addon">.00</span>',
            '</div>',
        '</div>'
    );
    return input.join("");
}

function createInputEgreso(dia) {
    var input= [];
    var name = "egreso" + dia;
    input.push(
        '<div class="col-sm-6">',
            '<div class="input-group">',
                '<span class="input-group-addon">$</span>',
                '<div class="form-line">',
                    '<input type="number" min="0" name="' + name +'" class="form-control" placeholder="Egresos dia ' + dia + '" required>',
                '</div>',
                '<span class="input-group-addon">.00</span>',
            '</div>',
        '</div>'
    );
    return input.join("");
}

function createInputComp(dia) {
    var input= [];
    var namEgreso = "egreso" + dia;
    var nameIngreso = "ingreso" + dia;
    input.push(
        '<h2 class="card-inside-title">Dia ' + dia + '</h2>',
        '<div class="row clearfix">',
            '<div class="col-sm-6">',
                '<div class="input-group">',
                    '<span class="input-group-addon">$</span>',
                    '<div class="form-line">',
                        '<input type="number" min="0" name="' + nameIngreso +'" class="form-control" placeholder="Ingresos dia ' + dia + '" required>',
                    '</div>',
                    '<span class="input-group-addon">.00</span>',
                '</div>',
            '</div>',
            '<div class="col-sm-6">',
                '<div class="input-group">',
                    '<span class="input-group-addon">$</span>',
                    '<div class="form-line">',
                        '<input type="number" min="0" name="' + namEgreso +'" class="form-control" placeholder="Egresos dia ' + dia + '" required>',
                    '</div>',
                    '<span class="input-group-addon">.00</span>',
                '</div>',
            '</div>',
        '</div>'
    );
    return input.join("");
}

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
    $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
}