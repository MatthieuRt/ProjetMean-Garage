import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CryptoService } from 'app/modules/admin/dashboards/crypto/crypto.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

    /**
     * Constructor
     */
    constructor(
        private _cryptoService: CryptoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
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
    activeCustomers = [
        {
            'name': 'John',
            'age' : 14
        },
        {
            'name': 'Waston',
            'age' : 17
        },      
    ];
    
      inactiveCustomers = [
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
    activeCustomers:
    ${JSON.stringify(this.activeCustomers, null, ' ')}
    
    inactiveCustomers:
    ${JSON.stringify(this.inactiveCustomers, null, ' ')}`;
      }
    
    public markdown = `
    # Material Design: Angular 7, drag-and-drop list
    requires:
    - \`CdkDragDrop\`, \`moveItemInArray\` and \`transferArrayItem\` imports
    - \`cdkDropList\` directive and \`cdkDropListDropped\` event
    - CSS \`flex\` layout
    
    `;
    
      pre = `
    activeCustomers:
    ${JSON.stringify(this.activeCustomers, null, ' ')}
    
    inactiveCustomers:
    ${JSON.stringify(this.inactiveCustomers, null, ' ')}`;
}
