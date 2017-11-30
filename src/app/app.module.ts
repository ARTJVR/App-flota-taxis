import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPage } from "../pages/index.paginas";

//Firebase
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from "../config/firebase.config";
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Servicios - provider
import { UsuarioProvider } from "../providers/usuario/usuario";
import { UbicacionProvider } from "../providers/ubicacion/ubicacion";

//Storage
import { IonicStorageModule } from '@ionic/storage';

//Plugins
import { Geolocation } from '@ionic-native/geolocation';

//Mapas
import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDevNnn-7oi6Ymo_KThSFhi-2WzfOd3-cc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Geolocation,
    UbicacionProvider 
  ]
})
export class AppModule {}
