import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { StatistiquesService } from 'app/modules/admin/pages/statistiques/statistiques.service';

@Component({
    selector       : 'statistiques-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatistiquesSecurityComponent implements OnInit
{
    securityForm: UntypedFormGroup;
    date1Control = new FormControl();
    date2Control = new FormControl();

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
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
            twoStep          : [true],
            askPasswordChange: [false]
        });
    }

    getChiffreAffaires(){
        console.log(this.date1Control.value);
        console.log(this.date2Control.value);
    }
}
