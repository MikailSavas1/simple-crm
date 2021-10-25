import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  user: User = new User();
  userId: string;

  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.isLoading = true;

    this.firestore.
      collection('users')
      .doc(this.userId)
      .update(this.user.toJson())
      .then((result) => {
        console.log('EDIT Update finished!');
        this.isLoading = false;
        this.dialogRef.close();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
