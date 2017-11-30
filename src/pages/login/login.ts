import { Component } from '@angular/core';
import { IonicPage, NavController, 
  LoadingController, AlertController } from 'ionic-angular';

import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';

import { HomePage } from "../index.paginas";

//servicios - provider
import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

	@ViewChild(Slides) slides: Slides;

	clave:string = "12345";

  constructor(public navCtrl: NavController, 
    private _us: UsuarioProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  continuar(){

    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present();


  	//verificar si la pass es válida
    this._us.verifica_usuario(this.clave).then(valido =>{

      loading.dismiss();

      if(valido){
        //continuar a la sgte pantalla
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);

      }else{
        this.alertCtrl.create({
          title: "Clave no es correcta",
          subTitle: "Por favor verifique su clave o hable con el admin",
          buttons: ["Ok"]

        }).present();

      }

    }).catch(error=>{
      loading.dismiss();
      console.log("Error en verifica_usuario: "+ JSON.stringify(error));
    })

    
  	
  }

  ingresar(){
  	//si la clave es correcta, redireccionar al home
    this.navCtrl.setRoot(HomePage);

  }


  ngAfterViewInit(){

  	this.slides.lockSwipes(true);
  	this.slides.freeMode = false;
  	this.slides.paginationType = "progress";

  }



}
