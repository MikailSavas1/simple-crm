import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-name',
  templateUrl: './dialog-edit-name.component.html',
  styleUrls: ['./dialog-edit-name.component.scss']
})
export class DialogEditNameComponent implements OnInit {

  user: User;
  userId: string;

  isLoading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditNameComponent>) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.isLoading = true;

    this.firestore.
      collection('users')
      .doc(this.userId)
      .update(this.user.toJson())
      .then((result)=>{
        console.log('EDIT Update finished!');
        this.isLoading = false;
        this.dialogRef.close();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
