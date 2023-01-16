import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../apps/notes/notes.types';
import { NotesDetailsComponent } from '../../apps/notes/details/details.component';
import { cloneDeep } from 'lodash-es';
import { DetailComponent } from './detail/detail.component';
import { UtilisateurSerice } from 'app/service/utilisateur.service';

@Component({
    selector       : 'project',
    templateUrl    : './project.component.html',
    styles         : [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class ProjectComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    displayedColumns: string[] = ['modele', 'numero', 'dateAjout', 'action'];
    dataSource = new MatTableDataSource<any>();
   
    isLoading = true;
   
    pageNumber: number = 1;
    VOForm: FormGroup;
    isEditableNew: boolean = true;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    depotForm: UntypedFormGroup;

    // data static
 public ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 6, name: 'Naina', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Matthieu', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'ADP', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'AAA', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'VVV', weight: 20.1797, symbol: 'Ne'},
];



    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _inventoryService: InventoryService,private fb: FormBuilder,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        public _utilisateurServ : UtilisateurSerice,
    )
    {
    }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.isLoading = false;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const onSuccess = (resp:any)=>{
      if(resp.message==='OK'){
          this._utilisateurServ.listVoiture = resp.value;
          this.dataSource = new MatTableDataSource(this._utilisateurServ.listVoiture);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
      }
    } 
    this._utilisateurServ.getListVoiture(user._id).subscribe(onSuccess);
 

  }
  
   applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  initiateVOForm(): FormGroup {
    return this.fb.group({

      position: new FormControl(234),
                name: new FormControl(''),
                weight: new FormControl(''),
                symbol: new FormControl(''),
                action: new FormControl('newRecord'),
                isEditable: new FormControl(false),
                isNewRow: new FormControl(true),
    });
  }
  openNoteDialog(index:any): void
  {
      this._matDialog.open(DetailComponent, {
          autoFocus: false,
      });
  }
  openDepotDialog(index): void
  {
      this.initDepotForm(index);
      const dialogRef = this._fuseConfirmationService.open(this.depotForm.value);
      dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
      });
  }
  initDepotForm(indexVoiture){
    this.depotForm = this._formBuilder.group({
      title      : 'Déposé votre voiture',
      message    : '<span class="font-medium">Vous allez déposé la voiture :'+this._utilisateurServ.listVoiture[indexVoiture].numero+' !</span>',
      icon       : this._formBuilder.group({
          show : true,
          name : 'heroicons_outline:check',
          color: 'success'
      }),
      actions    : this._formBuilder.group({
          confirm: this._formBuilder.group({
              show : true,
              label: 'OK',
              color: 'warn',
              action : ()=>{
                
              }
          }),
      }),
      dismissible: true
  });
  }
}

