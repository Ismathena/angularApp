import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Pokemon } from './pokemons/pokemon';
import { POKEMONS } from './pokemons/mock-pokemons';

@Component({

  selector : 'pokemon-app', // Nom de mon composant -> la balise html 
  templateUrl: './app/app.component.html', // le code html que le composant contient ou le template

})

export class AppComponent{ }

