import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
})
export class ModificationComponent implements OnInit {
  etatForm:UntypedFormGroup;
  listEtat:String[];
  constructor(public matDialogRef: MatDialogRef<ModificationComponent>,
              private _formBuilder: UntypedFormBuilder) {
  }
  
  ngOnInit(): void {
    this.listEtat =['Terminé','En cours'];
    this.etatForm = this._formBuilder.group({
      etat   : ['', [Validators.required]]
    })
  }
  close(): void
  {
    // Close the dialog
      this.matDialogRef.close();
  }
  setEtat(): void{

  }
}
