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

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
    dataSource = new MatTableDataSource<any>();
   
    isLoading = true;
   
    pageNumber: number = 1;
    VOForm: FormGroup;
    isEditableNew: boolean = true;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: InventoryProduct | null = null;

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
    )
    {
    }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

     this.VOForm = this.fb.group({
              VORows: this.fb.array(this.ELEMENT_DATA.map(val => this.fb.group({
                position: new FormControl(val.position),
                name: new FormControl(val.name),
                weight: new FormControl(val.weight),
                symbol: new FormControl(val.symbol),
                action: new FormControl('existingRecord'),
                isEditable: new FormControl(true),
                isNewRow: new FormControl(false),
              })
              )) //end of fb array
            }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
      this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
        return filterPredicate.call(this.dataSource, data.value, filter);
      }

      //Custom filter according to name column
    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');

   this.onPaginateChange(this.paginator, this.paginatorList);

   this.paginator.page.subscribe(() => { // this is page change event
     this.onPaginateChange(this.paginator, this.paginatorList);
   });
  }
  
   applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }


paginatorList: HTMLCollectionOf<Element>;
idx: number;
onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
     setTimeout((idx) => {
         let from = (paginator.pageSize * paginator.pageIndex) + 1;

         let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
             ? paginator.length
             : paginator.pageSize * (paginator.pageIndex + 1);

         let toFrom = (paginator.length == 0) ? 0 : `${from} - ${to}`;
         let pageNumber = (paginator.length == 0) ? `0 of 0` : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
         let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

         if (list.length >= 1)
             list[0].innerHTML = rows; 

     }, 0, paginator.pageIndex);
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
}

