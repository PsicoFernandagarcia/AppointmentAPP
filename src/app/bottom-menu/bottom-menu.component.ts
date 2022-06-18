import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent {
  role:string = 'COMMON';
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>
    ,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {role: string}
    ) {
      this.role = data.role;
    }

  close(){
    this._bottomSheetRef.dismiss();
  }

  logout(){
    this._bottomSheetRef.dismiss("logout");
  }

}
