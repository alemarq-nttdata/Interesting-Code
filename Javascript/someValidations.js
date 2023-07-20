// Funciones que se ejecutan en el focusout de cada input de ese momento
function validaNombreApellidos(ele, texto) {
	let isValid = validationStyles(ele, validaciones(texto, "nombreApellido"));
	return isValid && texto != "";
}

function validaEmail(ele, texto) {
	let isValid = validationStyles(ele, validaciones(texto, "email"));
	return isValid && texto != "";
}

// El telefono valida las siguientes opciones:
// +34612345678
// 0034612345678
// 34612345678
// 612345678
// 712345678
// 812345678
// 912345678
function validaTelefono(ele, texto) {
	texto = texto.replaceAll(" ", "");
	let isValid = validationStyles(ele, validaciones(texto, "telefono"));
	return isValid && texto != "";
}

function validaDireccion(ele, texto) {
	let isValid = validationStyles(ele, validaciones(texto, "direccion"));
	return isValid && texto != "";
}

function validaCiudad(ele, texto) {
	let isValid = validationStyles(ele, validaciones(texto, "ciudad"));
	return isValid && texto != "";
}

function validaCodigoPostal(codigoPostal) {
	// Comprobamos que el código postal tenga la longitud correcta
	if (codigoPostal.length !== 5) {
		$("#codPostal").attr("data-verification", false);
		$("#codPostal").siblings(".floating-input__helper-text--error").removeClass("hide");
		return false;
	}
	// Comprobamos que los dos primeros dígitos sean válidos
	const primerosDigitos = codigoPostal.substring(0, 2);
	if (parseInt(primerosDigitos) < 1 || parseInt(primerosDigitos) > 52 || primerosDigitos != cityCode) {
		$("#codPostal").attr("data-verification", false);
		$("#codPostal").siblings(".floating-input__helper-text--error").removeClass("hide");
		return false;
	}
	// Comprobamos que los tres últimos dígitos sean numéricos
	const ultimosDigitos = codigoPostal.substring(2);
	if (isNaN(ultimosDigitos)) {
		$("#codPostal").attr("data-verification", false);
		$("#codPostal").siblings(".floating-input__helper-text--error").removeClass("hide");
		return false;
	}

	$("#codPostal").attr("data-verification", true);
	$("#codPostal").siblings(".floating-input__helper-text--error").addClass("hide");
	// El código postal es válido
	return true;
}

// Validaciones número de la casa y piso
function numeroDomicilio(input) {
	input.addEventListener("input", function () {
		this.value = this.value.slice(0, 3); // Limitar el input a 3 caracteres
		this.value = this.value.replace(/[^0-9]/g, ""); // Eliminar cualquier caracter que no sea un número
	});
}

function pisoDomicilio(input) {
	input.addEventListener("input", function () {
		this.value = this.value.slice(0, 3);
		this.value = this.value.replace(/[^0-9A-Za-z]/g, "");
	});
}

function codigoPostal(input) {
	input.addEventListener("input", function () {
		this.value = this.value.slice(0, 5);
		this.value = this.value.replace(/[^0-9]/g, "");
	});
}

// Muestra/esconde el mensaje de error del input y cambia la propiedad data-verification
function validationStyles(ele, isValid) {
	if (isValid) {
		ele.attr("data-verification", true);
		ele.siblings(".floating-input__helper-text--error").addClass("hide");
		// Muestra el mensaje de validez de sms y su boton en el input de telefono que esté OK
		if (ele.parent().hasClass("floating-input--telefono") && !isValidPhoneNumber) {
			ele.attr("data-verification", false);
			ele.parent().addClass("ready-sms");
			ele.siblings(".btn-validacion-sms, .floating-input__helper-text--ok").removeClass("hide");
			ele.closest(".form-profile-container__datos--telefono").find(".btn-validacion-sms").removeClass("hide");
			ele.siblings(".clear-field").addClass("warning");
		} else {
			ele.attr("data-verification", true);
			ele.parent().removeClass("ready-sms");
			ele.siblings(".btn-validacion-sms, .floating-input__helper-text--ok").addClass("hide");
			ele.closest(".form-profile-container__datos--telefono").find(".btn-validacion-sms").addClass("hide");
			ele.siblings(".clear-field").removeClass("warning");
		}
		return true;
	} else {
		ele.attr("data-verification", false);
		ele.siblings(".floating-input__helper-text--error").removeClass("hide");
		if (ele.parent().hasClass("floating-input--telefono")) {
			ele.parent().removeClass("ready-sms");
			ele.siblings(".btn-validacion-sms, .floating-input__helper-text--ok").addClass("hide");
			ele.closest(".form-profile-container__datos--telefono").find(".btn-validacion-sms").addClass("hide");
			ele.siblings(".clear-field").removeClass("warning");
		}
		return false;
	}
}

// Función principal que ejecuta todas las validaciones
function validaciones(texto, opcion) {
	let patron = "";
	switch (opcion) {
		case "nombreApellido":
			patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
			return patron.test(texto);
		case "email":
			patron = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
			return patron.test(texto);
		case "telefono":
			patron = /^((\+34)|(0034)|34)?[6|7|8|9][0-9]{8}$/;
			return patron.test(texto);
		case "direccion":
			patron = /^[a-zA-Z0-9\s\,\.\-\#\/]+$/;
			return patron.test(texto);
		case "ciudad":
			patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
			return patron.test(texto);
		default:
			break;
	}
}
