"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http"); // httpclient permettre de faire des requetes http, httphaders permettent d'ecrire les les urls 
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var PokemonsService = /** @class */ (function () {
    function PokemonsService(http) {
        this.http = http;
        this.pokemonsUrl = 'api/pokemons'; // url vers laquelle on stock l'API 
    }
    PokemonsService.prototype.log = function (log) {
        console.info(log); //afficher les logs dans la console js. il seriat possible aussi de les stocker  dans un fichier ou autre 
    };
    PokemonsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.log(error);
            console.log(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    // supprimer un pokemon
    PokemonsService.prototype.deletePokemon = function (pokemon) {
        var _this = this;
        var url = this.pokemonsUrl + "/" + pokemon.id;
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.delete(url, httpOptions).pipe(operators_1.tap(function (_) { return _this.log("deleted pokemon  id=" + pokemon.id); }), operators_1.catchError(this.handleError('deletePokemon')));
    };
    // Rechercher un pokemon
    PokemonsService.prototype.searchPokemons = function (term) {
        var _this = this;
        if (!term.trim()) { // term vide 
            return rxjs_1.of([]); // retourner un tablea vide 
        }
        return this.http.get(this.pokemonsUrl + "/?name=" + term).pipe(operators_1.tap(function (_) { return _this.log("found pokemons matching \"" + term + "\""); }), operators_1.catchError(this.handleError("searchPokemons", [])));
    };
    // mettre à jour un pokemon  
    PokemonsService.prototype.updatedPokemon = function (pokemon) {
        var _this = this;
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(operators_1.tap(function (_) { return _this.log("updated pokemon id=" + pokemon.id); }), operators_1.catchError(this.handleError('updatedPokemon')));
    };
    // Retourne tous les pokémons
    PokemonsService.prototype.getPokemons = function () {
        var _this = this;
        return this.http.get(this.pokemonsUrl).pipe(operators_1.tap(function (_) { return _this.log('fetched pokemons'); }), //  centraliser la gestion des logs de notre service
        operators_1.catchError(this.handleError("getPokemons", [])));
    };
    // Retourne le pokémon avec l'identifiant passé en paramètre
    PokemonsService.prototype.getPokemon = function (id) {
        var _this = this;
        var url = this.pokemonsUrl + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return _this.log('fetched pokemon id=${id}'); }), operators_1.catchError(this.handleError('getPokemon id=${id}')));
    };
    PokemonsService.prototype.getPokemonTypes = function () {
        return (['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol']);
    };
    PokemonsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PokemonsService);
    return PokemonsService;
}());
exports.PokemonsService = PokemonsService;
//# sourceMappingURL=pokemons.service.js.map