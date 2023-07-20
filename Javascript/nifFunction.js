// Validación del campo nif
function isValidNif(nif) {
	let numero;
	let letraNif;
	let letras;
	let regexDni = /^\d{5,8}[a-zA-Z]$/;

	if (regexDni.test(nif) == true) {
		// Recoge sólo los números del nif
		numero = nif.substr(0, nif.length - 1);
		// Recoge la letra del nif en mayúsculas
		letraNif = nif.substr(nif.length - 1, 1).toUpperCase();
		// Cálculo del resto
		numero = numero % 23;
		// Letras ordenadas de la tabla de nif según el resto resultante (de 0 22)
		letras = "TRWAGMYFPDXBNJZSQVHLCKET";
		// Calcula la letra del nif del usuario según la cadena de la variable letras
		letras = letras.substring(numero, numero + 1);
		if (letras != letraNif) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}
