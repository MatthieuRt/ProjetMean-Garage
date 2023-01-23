import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Category, Course, ListeReparation, ReparationsVoitures, Voiture, Piece } from 'app/modules/admin/apps/academy/academy.types';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';


@Component({
    selector: 'academy-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademyDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
    listeReparations: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    reparation: any;
    listeVoitures: Voiture[];

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _academyService: AcademyService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {



        this._academyService.reparation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((course: any) => {
                console.log(course)
                // Get the course
                this.reparation = course[0];

                let user = sessionStorage.getItem("user");
                let jsonObject = JSON.parse(user);


                this.listeVoitures = jsonObject.listeVoiture;
                for (let i = 0; i < this.listeVoitures.length; i++) {
                    if (this.listeVoitures[i].id == this.reparation.idVoiture) this.reparation.voiture = this.listeVoitures[i];
                }

                for (let i = 0; i < this.reparation.listeReparation.length; i++) {
                    if (!this.reparation.listeReparation[i].piece) {

                        this._academyService.getPieceById(this.reparation.listeReparation[i].idPiece).subscribe(piece => {
                            this.reparation.listeReparation[i].piece = piece[0];
                            this._changeDetectorRef.markForCheck();
                        });
                    }
                    this._changeDetectorRef.markForCheck();
                }


                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------









    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */

}
