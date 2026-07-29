import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemMessage } from '../_models/message';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SystemMessage | null
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!(this.data && this.data.id !== undefined);

    const dateFromValue = this.data?.dateFrom ? new Date(this.data.dateFrom) : new Date();
    const dateToValue = this.data?.dateTo ? new Date(this.data.dateTo) : new Date();

    this.form = this.fb.group({
      id: [this.data?.id ?? null],
      title: [this.data?.title ?? '', Validators.required],
      content: [this.data?.content ?? '', Validators.required],
      dateFrom: [dateFromValue, Validators.required],
      dateTo: [dateToValue, Validators.required],
      active: [this.data?.active ?? true]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const result: SystemMessage = {
      ...formValue,
      dateFrom: new Date(formValue.dateFrom).toISOString(),
      dateTo: new Date(formValue.dateTo).toISOString()
    };

    if (!this.isEditMode) {
      delete result.id;
    }

    this.dialogRef.close(result);
  }
}
