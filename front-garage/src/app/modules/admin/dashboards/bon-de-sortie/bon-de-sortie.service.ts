import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from 'environments/environment';
import { Voiture } from './bon-de-sortie.types';


@Injectable({
    providedIn: 'root'
})
export class BonDeSortieService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private listeVoiture: BehaviorSubject<Voiture[]> = new BehaviorSubject(null);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    /**
    * Getter for listeVoiture
    */
    get listeVoiture$(): Observable<Voiture[]>
    {
        return this.listeVoiture.asObservable();
    }
    /**
     * Get listeVoiture
     */
    getListeVoiture(): Observable<any>
    {
        let url = baseUrl+'user/carlist';
        return this._httpClient.get<Voiture[]>(url).pipe(
            tap((response:any) => {
                if(response.message==='OK'){
                    let liste = response.value
                    const newList = liste.map(user => {
                    return user.listeVoiture.map(voiture => {
                        return {
                            utilisateurId: user._id,
                            numero: voiture.numero,
                            modele: voiture.modele,
                            dateAjout: voiture.dateAjout,
                            enCoursDepot: voiture.enCoursDepot,
                            voitureId: voiture._id,
                            identifiant : user.identifiant.charAt(0).toUpperCase()+user.identifiant.substring(1,user.identifiant.length)
                        };
                    });
                }).flat();
                    this.listeVoiture.next(newList);
                }
               
            })
        );
    }
    getAllCar(): Observable<any>{
        let url = baseUrl+'user/carlist';
        return this._httpClient.get(url);
    }
}
