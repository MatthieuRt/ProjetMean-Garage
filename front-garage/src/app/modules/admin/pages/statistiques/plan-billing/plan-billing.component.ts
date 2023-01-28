import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,private _statistiquesService: StatistiquesService
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
        
    }
}
