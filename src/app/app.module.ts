import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-rooting.module';
import { PokemonsModule} from './pokemons/pokemons.module';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './longin-routing.module';




@NgModule({
  imports:      [ BrowserModule , 
                  HttpClientModule,
                  FormsModule,
                  HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation : false }),
                  PokemonsModule,
                  LoginRoutingModule,
                  AppRoutingModule ],

  declarations: [ AppComponent, LoginComponent ,PageNotFoundComponent],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }