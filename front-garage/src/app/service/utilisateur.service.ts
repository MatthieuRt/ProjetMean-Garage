import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { baseUrl } from 'environments/environment';
@Injectable()
export class UtilisateurSerice
{
    private url = baseUrl+'user/';
    constructor(
        private _httpClient: HttpClient,
    )
    {
    }
    ajouterVoiture(data:any): Observable<any>{
        const url = this.url+'add/car';
        return this._httpClient.post(url,data);
    }
}