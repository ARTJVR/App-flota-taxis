import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Servicios - provider
import { UsuarioProvider } from "../usuario/usuario";



@Injectable()
export class UbicacionProvider {

	usuario: AngularFireObject<any>;

	private watch:any;

  constructor(private geolocation:Geolocation, 
  	private afDB: AngularFireDatabase,
  	private _us: UsuarioProvider) {

  	if(!this._us.clave){
  		return;
  	}

  	this.usuario = this.afDB.object("/usuarios/"+ this._us.clave);
    
  }

  iniciar_localizacion(){

  	this.watch = this.geolocation.watchPosition()
	.subscribe((data) => {
	 // data can be a set of coordinates, or an error (if an error occurred).
	 // data.coords.latitude
	 // data.coords.longitude
	 //console.log(data);

	 if(!this._us.clave){
	 	return;
	 }

	 this.usuario.update({lat:data.coords.latitude, lng:data.coords.longitude});

	});

  }

  detener_watch(){
	this.watch.unsubscribe();  	
  }

}
