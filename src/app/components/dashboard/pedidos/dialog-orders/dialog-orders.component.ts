import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-orders',
  templateUrl: './dialog-orders.component.html',
  styleUrls: ['./dialog-orders.component.css']
})
export class DialogOrdersComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOrdersComponent>,

    // en la siguiente linea le pasamos el data de ropero.component.ts
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  confirm() {}
}
