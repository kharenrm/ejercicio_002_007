var pubsub = (function(){
      var suscriptores = {};
      function subscribe(event, callback){
        if(!suscriptores[event]){
          var suscriptorArray = [callback];
          suscriptores[event] = suscriptorArray;
        } else {
          suscriptores[event].push(callback);
        }
      }
      function publish(event, data){
        if(suscriptores[event]){
          suscriptores[event].forEach(function(callback){
            callback(data);
          });
        }
      }
      return {
        pub: publish,
        sub: subscribe
      }
  }());

var Persona = function(nombre, telefono){
	this.nombre = nombre;
	this.telefono = telefono;
}

var Iphone = function(idIphone){
	this.idIphone = idIphone;
}
Iphone.prototype.enviarMensaje = function(){
  var objGetMensaje = getMensaje(this.idIphone);
	var mensaje = new Mensaje(objGetMensaje.mensaje, this.idIphone, objGetMensaje.destinatario);
	pubsub.pub('envioMensaje', mensaje);
}

var Mensaje = function(mensaje, origen, destino){
	this.mensaje = mensaje;
	this.origen = origen;
	this.destino = destino;
}

var Conversacion = function(){
	this.personas = [];
	pubsub.sub('envioMensaje', function(mensaje){
      console.log('Mensaje enviado!');
      console.log(mensaje);
      
      pintarMensaje(mensaje.origen, mensaje.mensaje, true, );

      if(mensaje.destino == "TODOS"){
        for(var i=0; i<conversacion.personas.length; i++){
          if(conversacion.personas[i].telefono.idIphone != mensaje.origen){
            pintarMensaje(conversacion.personas[i].telefono.idIphone, mensaje.mensaje, false, mensaje.origen);
          }
        }
      } else {
        pintarMensaje(mensaje.destino, mensaje.mensaje, false, mensaje.origen);
      }
    
      
  });
}
Conversacion.prototype.addPersona = function(persona){
	this.personas.push(persona);
}

//Defino el flujo
var conversacion = new Conversacion();
	conversacion.addPersona(new Persona("Ana", new Iphone("iphone1")));
	conversacion.addPersona(new Persona("Pedro", new Iphone("iphone2")));
  conversacion.addPersona(new Persona("Marcela", new Iphone("iphone3")));
  conversacion.addPersona(new Persona("Fer", new Iphone("iphone4")));

	//conversacion.personas[0].telefono.enviarMensaje("Holi!", "066");
