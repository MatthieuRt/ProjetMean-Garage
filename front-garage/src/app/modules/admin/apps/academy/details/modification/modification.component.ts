import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {

  etatForm : UntypedFormGroup;
  listEtat :String[];
  constructor( private _formBuilder: UntypedFormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.listEtat = [];
    this.listEtat.push('Terminé');
    this.listEtat.push('En cours');
    this.etatForm = this._formBuilder.group({
      etat  : ['', [Validators.required]],
    })
  }

}
