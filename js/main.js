$('document').ready(function(){

	$('#registro_web').validate({
		rules:{
			nombres_p:{
				required:true
			},
			apellidos_p:{
				required:true
			},
			tipo_documento:{
				required:true
			},
			num_documento:{
				required:true
			},
			cargo:{
				required:true
			},
			telefono:{
				required:true
			},
			email:{
				required:true
			},
			tipo_comprobante:{
				required:true
			},
			orden_servicio:{
				required:true
			},
			idforma_pago:{
				required:true
			},
			contacto_facturacion:{
				required:true
			},
			email_contacto:{
				required:true
			},
			telf_contacto:{
				required:true
			},
			idevento:{
				required:true
			}
		},
		messages:{
			nombres: "Ingresa los nombres del participante.",
			apellidos: "Ingresa los apellidos del participante.",
			tipo_documento: "Selecciona el tipo de documento.",
			num_documento: "Ingresa el número de documento.",
			cargo: "Ingresa el cargo o puesto del participante.",
			telefono: "Ingresa el teléfono del participante.",
			email: "Ingresa el email del participante.",
			tipo_comprobante: "Selecciona el tipo de comprobante.",
			orden_servicio: "Selecciona si requiere o no orden de servicio.",
			idforma_pago: "Selecciona el medio de pago.",
			contacto_facturacion: "Ingresa el contacto de Facturación.",
			email_contacto: "Ingresa el email del área de facturación.",
			telf_contacto: "Ingresa el teléfono de facturación.",
			idevento: "Selecciona el evento a participar."
		},
		submitHandler: submitForm
	});

	function submitForm()
	{
		// recibimos los datos del formulario
		// Se intenta realizar el registro mediante le api
		var postData = {
            "nombres": "Jhon",
            "apellidos": "Doe",
            "tipo_documento":"DNI",
            "num_documento":"12345678",
            "telefono":"987654321",
            "email":"jhondoe@prensagrupo.com",
            "cargo":"CEO",
            "empresa":"Prensa Grupo",
            "tipo_comprobante":"BOLETA",
            "orden_servicio":"NO",
            "ruc_empresa":"10123456789",
            "razon_social":"Prensa Grupo SAC",
            "direccion_fiscal":"Palo Alto, CA",
            "contacto_facturacion":"Jared P.",
            "email_contacto":"jhondoe@prensagrupo.com",
            "telf_contacto":"987321654",
            "idforma_pago":1,
            "idevento":25
        }

		$.ajax({
            url: "https://dumbo.miguelvega.pe/api/participant",
            data: $("#registro_web").serialize(),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(){
				$('#error').fadeOut();
				$('#btn-submit').html('REGISTRANDO...');
			},
            success: function(data){
                console.log(data);
                if(data=='1'){
                	console.log('successError');
                    $('#error').fadeIn('<div class="alert alert-info alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Cerrar"><span aria-hidden="true">×</span></button><p>El participante ya se encuentra registrado.</p></div>');
					$('#btn-submit').html('ENVIAR REGISTRO');
                }else if(data == 'registered'){
					console.log('success');
					$('#btn-submit').html('REGISTRANDO...');
					//setTimeout('$(".form_pago").fadeOut(500, function(){$(".form_pago").load("gracias.php"); }); ', 2500);
                }else{
                	console.log('successError');
                    $('#error').fadeIn(1000, function(){
						$('#error').html('<div class="alert alert-info alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Cerrar"><span aria-hidden="true">×</span></button>' + data + '</div>');
						$('#btn-submit').html('ENVIAR REGISTRO');
					});
                }
            },
            error: function(error){
            	console.log('Error');
                console.log(error);
                $('#btn-submit').html('ENVIAR REGISTRO');
                //$('#msgNoSaveCotizacion').slideDown(300).delay(3000).fadeOut(1000);
                //$('#cargando').hide();
            }
        });

		return false;

	}

});
