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
    constructor(private route: ActivatedRoute)
    {
    }

    ngOnInit():void{
        this.route.paramMap.subscribe(params => {
            this.route.paramMap.subscribe(params => {
                this.id = params.get('id');
            });
            console.log(this.id);
          });
    }
}
