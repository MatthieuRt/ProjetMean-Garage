import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BonDeSortieService } from './bon-de-sortie.service';

@Component({
  selector: 'app-bon-de-sortie',
  templateUrl: './bon-de-sortie.component.html',
  styles         : [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 112px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
            }
        }
    `
],
encapsulation  : ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
animations     : fuseAnimations
})
export class BonDeSortieComponent implements OnInit {

  listVoiture:any;
  constructor(private _bondeSortieServ : BonDeSortieService) { }

  ngOnInit(): void {
    const onSuccessCar =  (response:any)=>{
      if(response.message=='OK'){
           console.log('_____________Car___________________')
          console.log(response)
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
                      identifiant: user.identifiant
                  };
              });
          }).flat();
          console.log(newList);
          this.listVoiture = newList;
      }
    }
    this._bondeSortieServ.getAllCar().subscribe(onSuccessCar);
  }
  validerBonDeSortie(index){
    
  }
}
