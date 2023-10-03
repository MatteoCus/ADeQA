import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  public fromPage!: {title: string, description: string};
  public fromDialog!: string;

  constructor( public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) {}

  ngOnInit(): void {
    this.fromPage = this.mydata;
    this.fromDialog = "";
  }

  public stayDialog(): void {
    this.dialogRef.close({ event: 'stay-option', data: this.fromDialog });
  }
  public exitDialog(): void {
    this.dialogRef.close({ event: 'exit-option', data: this.fromDialog });
  }
}
