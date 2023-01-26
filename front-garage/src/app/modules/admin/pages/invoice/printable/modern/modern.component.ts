import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BonDeSortieService } from 'app/modules/admin/dashboards/bon-de-sortie/bon-de-sortie.service';
import { Voiture } from 'app/modules/admin/dashboards/bon-de-sortie/bon-de-sortie.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'modern',
    templateUrl    : './modern.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModernComponent
{
   
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    idVoiture:String;
    voiture?:Voiture;
    proprio?:any;
     /**
     * Constructor
     */
    constructor(private route: ActivatedRoute, private _bonDeSoriteService: BonDeSortieService,
                private _changeDetectorRef: ChangeDetectorRef){
    }
    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.route.paramMap.subscribe(params => {
                this.idVoiture = params.get('id');
            });

        });
   
        this._bonDeSoriteService.getVoitureById(this.idVoiture) 
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((car: Voiture) => {
            this.voiture  = car;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
        this._bonDeSoriteService.proprietaire$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            this.proprio = user;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            console.log(this.proprio)
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
}
