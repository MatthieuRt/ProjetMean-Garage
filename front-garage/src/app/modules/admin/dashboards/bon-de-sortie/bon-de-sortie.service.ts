import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BonDeSortieService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    getAllCar(): Observable<any>{
        let url = baseUrl+'user/carlist';
        return this._httpClient.get(url);
    }
    
}
