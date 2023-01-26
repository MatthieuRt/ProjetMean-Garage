import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class StatistiquesService{
    constructor(private _httpClient: HttpClient)
    {
    }

    getCars(){
        return this._httpClient.get("http://localhost:9000/user/car");
    }

}