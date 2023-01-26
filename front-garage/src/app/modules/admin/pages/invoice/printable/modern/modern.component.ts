import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BonDeSortieService } from 'app/modules/admin/dashboards/bon-de-sortie.service';

@Component({
    selector       : 'modern',
    templateUrl    : './modern.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModernComponent
{
    /**
     * Constructor
     */

    idVoiture:String;

    constructor(private route: ActivatedRoute, private _bonDeSoriteService: BonDeSortieService,
                private _changeDetectorRef: ChangeDetectorRef){
    }
    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.route.paramMap.subscribe(params => {
                this.idVoiture = params.get('id');
            });

        });
        alert(this.idVoiture)
    }
}
