import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormControlDirective, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { StatistiquesService } from 'app/modules/admin/pages/statistiques/statistiques.service';

@Component({
    selector       : 'statistiques-plan-billing',
    templateUrl    : './plan-billing.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatistiquesPlanBillingComponent implements OnInit
{
    planBillingForm: UntypedFormGroup;
    plans: any[];
    months : any;
    monthControl = new FormControl();
    yearControl = new FormControl();
    salaireControl = new FormControl();
    loyerControl = new FormControl();
    piecesControl = new FormControl();
    depensesControl = new FormControl();
    benefice : any;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,private _statistiquesService: StatistiquesService,private _changeDetectorRef: ChangeDetectorRef
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
        this.piecesControl.disable()
        this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        // Create the form
        this.planBillingForm = this._formBuilder.group({
            plan          : ['team'],
            cardHolder    : ['Brian Hughes'],
            cardNumber    : [''],
            cardExpiration: [''],
            cardCVC       : [''],
            country       : ['usa'],
            zip           : ['']
        });

        // Setup the plans
        this.plans = [
            {
                value  : 'basic',
                label  : 'BASIC',
                details: 'Starter plan for individuals.',
                price  : '10'
            },
            {
                value  : 'team',
                label  : 'TEAM',
                details: 'Collaborate up to 10 people.',
                price  : '20'
            },
            {
                value  : 'enterprise',
                label  : 'ENTERPRISE',
                details: 'For bigger businesses.',
                price  : '40'
            }
        ];
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
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getBenefices(){
        console.log("clicked on getBenefices")
        this._statistiquesService.getBenefice(this.monthControl.value,this.yearControl.value).subscribe((res:any)=>{
            if(res.length>0){
                console.log("Ok")
                this.benefice = res[0];
                
            }else{
                this.benefice = null;
                console.log("pas ok")
            }
            this._changeDetectorRef.markForCheck()
        })
    }

    addBenefice(){
        this._statistiquesService.insertBenefice(this.salaireControl.value,this.loyerControl.value,this.piecesControl.value,this.depensesControl.value,this.monthControl.value,this.yearControl.value).subscribe((res:any)=>{

        });
        console.log(this.salaireControl.value,this.loyerControl.value,this.piecesControl.value,this.depensesControl.value,this.monthControl.value,this.yearControl.value);
    }
}
