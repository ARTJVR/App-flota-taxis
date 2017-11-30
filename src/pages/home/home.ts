import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";

import { LoginPage } from "../index.paginas";

//Servicios - provider
import { UsuarioProvider } from "../../providers/usuario/usuario";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	usuario:any = {};

	lat: number = 51.678418;
  	lng: number = 7.809007;

  constructor(public navCtrl: NavController, 
  	private _ubicacion:UbicacionProvider,
  	private _us:UsuarioProvider) {

  	this._ubicacion.iniciar_localizacion();

  	this._ubicacion.usuario.valueChanges().
  	subscribe((data)=>{
  		this.usuario = data;

  		console.log(this.usuario);

  	});

  }

  salir(){
  	this._us.borrar_usuario();
  	this._ubicacion.detener_watch();
  	this.navCtrl.setRoot(LoginPage);
  }

}
