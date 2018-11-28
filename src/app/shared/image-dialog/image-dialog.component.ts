import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface ImageDialogData {
  image: string;
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']

})
export class ImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
