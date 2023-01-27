import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { StatistiquesService } from 'app/modules/admin/pages/statistiques/statistiques.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'statistiques-security',
    templateUrl: './security.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatistiquesSecurityComponent implements OnInit {
    securityForm: UntypedFormGroup;
    date1Control = new FormControl();
    date2Control = new FormControl();
    chart :any;
    chiffreAffaires: any;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder, private _statistiquesService: StatistiquesService, private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword: [''],
            newPassword: [''],
            twoStep: [true],
            askPasswordChange: [false]
        });
    }

    getDates(startDate: Date, endDate: Date) {
        let dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            let date = currentDate.toISOString().substring(0, 10);
            dates.push(date);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    getChiffreAffaires() {
        /*console.log(this.date1Control.value);
        console.log(this.date2Control.value);

        
        this._statistiquesService.getChiffreAffaire(this.date1Control.value,this.date2Control.value).subscribe((res:any)=>{
            this.chiffreAffaires = res.moyenne;
            this._changeDetectorRef.markForCheck();
        })*/
        
        /*let label = this.getDates(new Date(this.date1Control.value), new Date(this.date2Control.value))
        let data = [];
        for(let i = 0;i<label.length;i++){
            console.log(label[i]);
            this._statistiquesService.getChiffreAffaireByDay(label[i]).subscribe((res:any)=>{
                data[i] = res;
            })
        }
        console.log(data);*/

        this.chart = new Chart("MyChart", {
            type: 'bar', //this denotes tha type of chart
      
            data: {// values on X-Axis
              labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                                       '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
                 datasets: [
                {
                  label: "Sales",
                  data: ['467','576', '572', '79', '92',
                                       '574', '573', '576'],
                  backgroundColor: 'blue'
                },
                {
                  label: "Profit",
                  data: ['542', '542', '536', '327', '17',
                                           '0.00', '538', '541'],
                  backgroundColor: 'limegreen'
                }  
              ]
            },
            options: {
              aspectRatio:2.5
            }
            
          });
    }

    onCheckboxChange(event) {
        const checkboxValue = event.target.checked;
        console.log(checkboxValue);
    }
}
