// ***************************************
// *** GESTION DE PARTIDAS   *************
// ***************************************
const incomodosInvitados = {
	// 	 VARIABLES GLOBALES para gestionar la partida ACTUAL, estas variables las mantenemos actualizadas durante todas las páginas.
	Id: null,
	partida: null,
	databaseJSON: null,
	mazoArray: null,
	jugadoresNumero: 3, //por defecto las partidas son de 3 jugadores
	jugadores: [	
		{nombre:"Jugador 1"},
		{nombre:"Jugador 2"},
		{nombre:"Jugador 3"}
	],

	downloadJSON: function(){
		own = this;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				own.databaseJSON = JSON.parse(this.responseText);
				console.log("JSON loaded.");
				xmlhttp  = null; // para borrar el objeto de la memoria para ahorrar RAM
				//document.getElementById("demo").innerHTML = partidas.name;
				//JSON = null;
			}
		};
		xmlhttp.open("GET", "database/PARTIDAS.json", true);
		xmlhttp.send(); 	
	},

	checkJsonEnMemoria: function() {
		if (this.databaseJSON==null) { this.downloadJSON() };
	},

	setPartida: function(part) {
		this.partida = part;
		this.mazoArray = this.partida.MAZO.replace('[','').replace(']','').split(', ').map( function(item){return parseInt(item, 10);} );	 //crea un array de Integers con map() a aprtir de la cadena MAZO.
	},
	
	mazoArrayRango: function(start, end) {
		return this.mazoArray.filter( (element, index)=>element>=start && element<=end ) //genera un array parcial del mazo, cmparando el valor  con respecto a start/end  incluídos.
	},
	
	// Busca una partida ( formato id = "123456-A" )
	partidaBuscar: function(numeroPartida, letraPartida){
		this.checkJsonEnMemoria();
		// UTIL - formato numeroPartida = 6 caracteres de largo = 5+1)
			function formatNumPartida(num, tam) {
				if (num.toString().length <= tam) return formatNumPartida(tam, "0" + num)
				else return num;
			}
		// preparar el formato de las entradas, para evitar errores de formato.
			letraPartida = letraPartida.toUpperCase(); // SIEMPRE en mayúscula.
			numeroPartida = formatNumPartida(numeroPartida, 6-1);
		IdTemporal = numeroPartida + "-" + letraPartida;
		for(var i = 0; i < this.databaseJSON.length; i++) {
			if(this.databaseJSON[i]._id == IdTemporal) {
				console.log("Encontrada partida: "+IdTemporal);
				this.setPartida(this.databaseJSON[i]);
				this.Id = IdTemporal;
				return this.partida;
			} else { console.log("NO Encontrada partida: "+IdTemporal); }
		}
	},

	partidaBuscarAleatoria: function(dificultad) {
		this.checkJsonEnMemoria();
		function getRandomInt(min, max) { //min incluido, max excluido
		  return Math.floor(Math.random() * (max - min)) + min;
		}
		var numero_random = getRandomInt (1, this.databaseJSON.length-1);
		if ( this.databaseJSON[numero_random].DIFICULTAD == dificultad ) {
			this.setPartida(this.databaseJSON[numero_random]);
			this.Id = this.partida._id;
			console.log	("Partida aleatoria encontrada. Dificultad="+this.partida.DIFICULTAD+". Id="+this.Id);   console.log(this.partida);	
			if (this.partida != null) {
				$.mobile.changePage("#page-jugadores-numero");
			}
		} else {
			this.partidaBuscarAleatoria(dificultad);
		}
	},
	
	partidaGetDificultadTxt: function() {
		this.partida.DIFICULTAD=='I' ? txt='Iniciación' :
		this.partida.DIFICULTAD=='A' ? txt='Muy Fácil' :
		this.partida.DIFICULTAD=='B' ? txt='Fácil' :
		this.partida.DIFICULTAD=='C' ? txt='Medio' :
		this.partida.DIFICULTAD=='D' ? txt='Difícil' :
		this.partida.DIFICULTAD=='E' ? txt='Muy Difícul' : TXT='ERROR';
		return txt;
	}
	
}

incomodosInvitados.downloadJSON();
//console.log(partidaa);
//incomodosInvitados.partidaBuscar('000242','J');



