$(function(){
	$("#btnParser").click(function(){
		var entrada = $("#textareaInput").val();
		var pathFile = $("#pathFile").val();
		if(pathFile == null || pathFile.length > 3) {
			console.log("path no definido");
		}
		var packaging = $("input[type=radio][name=packaging]").val();
		var lineas = entrada.split("<");
		var groupId, artifactId, version;
		for(var i = 0; i < lineas.length; i++) {
			if(lineas[i].includes("groupId") && !groupId) {
				groupId = lineas[i].substring(lineas[i].indexOf(">")+1);
			}
			if(lineas[i].includes("artifactId") && !artifactId) {
				artifactId = lineas[i].substring(lineas[i].indexOf(">")+1);
			}
			if(lineas[i].includes("version") && !version) {
				version = lineas[i].substring(lineas[i].indexOf(">")+1);
			}
		}
		var resultado = "mvn install:install-file" + " ";
		resultado += "-Dfile=" + pathFile + artifactId + "-" + version + "." + packaging + " ";
		resultado += "-DgroupId=" + groupId + " ";
		resultado += "-DartifactId=" + artifactId + " ";
		resultado += "-Dversion=" + version + " ";
		resultado += "-Dpackaging=" + packaging + " ";
		$("#textareaOutput").val(resultado);
	});
});

//mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> 
//-DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>