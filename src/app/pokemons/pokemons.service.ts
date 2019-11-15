import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http'; // httpclient permettre de faire des requetes http, httphaders permettent d'ecrire les les urls 
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class PokemonsService {


    constructor( private http : HttpClient){}
    private pokemonsUrl = 'api/pokemons'; // url vers laquelle on stock l'API 

    private log(log:String){

      console.info(log); //afficher les logs dans la console js. il seriat possible aussi de les stocker  dans un fichier ou autre 
    }

    private handleError<T>( operation='operation', result?:T){
      return(error:any):Observable<T> =>{

        console.log(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };

    }

    // supprimer un pokemon

    deletePokemon (pokemon : Pokemon): Observable <Pokemon>{ 

      const url =`${this.pokemonsUrl}/${pokemon.id}`;

      const httpOptions={
        headers : new HttpHeaders({'Content-Type' : 'application/json'})
      };

      return this.http.delete<Pokemon>( url , httpOptions ).pipe(

        tap(_ => this.log(`deleted pokemon  id=${pokemon.id}`)),
        catchError( this.handleError<any>('deletePokemon'))

        );

    }

   // Rechercher un pokemon

   searchPokemons(term : string) : Observable<Pokemon[]>{ // paramettre terme entrée par l'utlisateur 

     if (!term.trim()){ // term vide 

         return of([]); // retourner un tablea vide 
     }

     return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(

       tap(_ => this.log( `found pokemons matching "${term}"`)),
       catchError(this.handleError(`searchPokemons`, []))

       );
   }

   // mettre à jour un pokemon  
    updatedPokemon (pokemon : Pokemon ) : Observable <Pokemon>{

      const httpOptions={
        headers : new HttpHeaders({'Content-Type' : 'application/json'})
      };

      return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(

        tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>('updatedPokemon'))

        );
    }



    // Retourne tous les pokémons
    getPokemons(): Observable < Pokemon[] >{
      
      return  this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
              tap(_ => this.log('fetched pokemons')), //  centraliser la gestion des logs de notre service
              catchError(this.handleError(`getPokemons`, [])), // 

             );
    }
    
    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable <Pokemon> {

      const url =`${this.pokemonsUrl}/${id}`;   
      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log('fetched pokemon id=${id}')),
        catchError(this.handleError<Pokemon>('getPokemon id=${id}'))
          
       );

    }

    getPokemonTypes() : string[] {

    return (['Plante','Feu','Eau','Insecte','Normal','Electrik','Poison','Fée','Vol']); 

    }
}