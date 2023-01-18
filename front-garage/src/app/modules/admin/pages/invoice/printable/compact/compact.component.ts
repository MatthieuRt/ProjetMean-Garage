import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector       : 'compact',
    templateUrl    : './compact.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactComponent
{
    /**
     * Constructor
     */
    id : string;
    reparation : any;
    listePieces : any;
    constructor(private route: ActivatedRoute,private _academyService: AcademyService)
    {
        
    }

    ngOnInit():void{
        this.route.paramMap.subscribe(params => {
            this.route.paramMap.subscribe(params => {
                this.id = params.get('id');
            });
            
          });
        
        this._academyService.getReparationById(this.id).subscribe((res : any)=>{
            this.reparation = res[0];
            const listeVoitures = [{ "id": "1", "modele": "Nissan Qashqai" }, { "id": "2", "modele": "Renault Express" }]
            for(let i = 0; i < listeVoitures.length;i++){
                if(listeVoitures[i].id==this.reparation.idVoiture){
                    this.reparation.modele = listeVoitures[i].modele;
                }
            }
            
            /*for(let i = 0; i < this.reparation.listeReparation.lenghth;i++){
                const idPiece = this.reparation.listeReparation[i].idPiece;
                this._academyService.getPieceById(idPiece).subscribe(
                    piece => {
                      this.reparation.listeReparation[i].piece = piece;
                    },
                    error => {
                      console.log(error);
                    }
                  );
            }*/
        })
        
    }
}
