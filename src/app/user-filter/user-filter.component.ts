import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() patients:any[] = [];
  @Output() onPatientSelectedEvent = new EventEmitter<any>(); 
  patientSelected :any;
  patientsSelected :any[]=[];
  patientFormControl = new FormControl('');
  filteredOptions!: Observable<any[]>;

  @ViewChild('patientsInput') patientsInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
   this.setFilter(); 
  }
  setFilter(){
    this.filteredOptions = this.patientFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value )
      }),
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value?.patientName?.toLowerCase() ?? value;
    return this.patients.filter(p => p.patientName.toLowerCase().includes(filterValue));
  }
  removeFilter(patient:any){
    this.onPatientSelectedEvent.emit(0);
    const index = this.patientsSelected.indexOf(patient);
    if (index >= 0) {
      this.patientsSelected.splice(index, 1);
    }
    this.setFilter();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const itemSelected =this.patients.filter(p => p.patientName.trim() === event.option.viewValue)[0];
    this.patientsSelected.push(itemSelected);
    this.onPatientSelectedEvent.emit(itemSelected.patientId);
    this.patientsInput.nativeElement.value = '';
    this.patientFormControl.setValue(null);
  }
}
