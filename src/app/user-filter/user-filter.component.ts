import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input() patients:User[] = [];
  @Output() onPatientSelectedEvent = new EventEmitter<any>(); 
  patientSelected :any;
  patientsSelected :User[]=[];
  patientFormControl = new UntypedFormControl('');
  filteredOptions!: Observable<User[]>;

  @ViewChild('patientsInput') patientsInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
   this.sortPatients();
   this.setFilter(); 
  } 
  sortPatients(){
     this.patients.sort((a,b)=>{
      if(this.getUserFullName(a).toLowerCase() >this.getUserFullName(b).toLowerCase())
        return 1;
      return -1;
    });
  }
  setFilter(){
    this.filteredOptions = this.patientFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value?.toLowerCase() ?? '')
      }),
    );
  }

  private _filter(value: any): any[] {
    const filterValue = this.getUserFullName(value).toLowerCase() ?? value;
    return this.patients.filter(p => this.getUserFullName(p).toLowerCase().includes(filterValue));
  }
  removeFilter(patient:User){
    this.onPatientSelectedEvent.emit(0);
    const index = this.patientsSelected.indexOf(patient);
    if (index >= 0) {
      this.patientsSelected.splice(index, 1);
    }
    this.setFilter();
  }

  onSelected(u: User): void {
    const itemSelected =this.patients.filter(p => p.id === u.id)[0];
    this.patientsSelected.push(itemSelected);
    this.onPatientSelectedEvent.emit(itemSelected.id);
    this.clearInput();
  }

  clearInput(): void {
    this.patientsInput.nativeElement.value = '';
    this.patientFormControl.setValue(null);
  }

  getUserFullName(u:User):string{
    if(!u?.lastName) return u.toString();
    return `${u.lastName}  ${u.name}`.trim();
  }
}
