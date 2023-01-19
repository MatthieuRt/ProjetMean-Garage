import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CryptoService } from 'app/modules/admin/dashboards/crypto/crypto.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector       : 'crypto',
    templateUrl    : './crypto.component.html',
    styleUrls: ['./crypto.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoComponent implements OnInit, OnDestroy
{
    @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
    appConfig: any;
    btcOptions: ApexOptions = {};
    data: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    watchlistChartOptions: ApexOptions = {};
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    listVoiture :any;
    selectedVoiture : any = undefined;
    user:any;
    /**
     * Constructor
     */
    constructor(
        private _cryptoService: CryptoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: UntypedFormBuilder,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.user = user;
        this.listVoiture = user.listeVoiture;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // code 
    reparation = [
        {
            'name': 'John',
            'age' : 14
        },
        {
            'name': 'Waston',
            'age' : 17
        },      
    ];
    
      reparationToAdd = [
        {
            'name': 'Adam',
            'age' : 14
        },
        {
            'name': 'Jack',
            'age' : 11
        },
        {
            'name': 'Katherin',
            'age' : 12
        },
      ];
    
      drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
          moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        } else {
          console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
    
        this.pre = `
        reparation:
        ${JSON.stringify(this.reparation, null, ' ')}

        reparationToAdd:
        ${JSON.stringify(this.reparationToAdd, null, ' ')}`;
    }
    
    public markdown = `
    # Material Design: Angular 7, drag-and-drop list
    requires:
    - \`CdkDragDrop\`, \`moveItemInArray\` and \`transferArrayItem\` imports
    - \`cdkDropList\` directive and \`cdkDropListDropped\` event
    - CSS \`flex\` layout
    
    `;
    
    pre = `
        reparation:
        ${JSON.stringify(this.reparation, null, ' ')}
        
        reparationToAdd:
        ${JSON.stringify(this.reparationToAdd, null, ' ')}`;

    confirmeDemandePaiement(){

    }
    choisirVehicule(event){
        let idVoiture = event.value;
        this.selectedVoiture = this.listVoiture.find(voiture => voiture._id ===idVoiture);
        console.log(this.selectedVoiture)
        const onSuccess = (response:any)=>{
            console.log(response);
        }
        this._cryptoService.getHistoriqueReparation(this.user._id,idVoiture).subscribe(onSuccess);
    }

}
