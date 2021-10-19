import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  user: User = new User();
  birthDate: Date;

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User: ', this.user);

    this.firestore
    .collection('users')
    .add(this.user.toJson())
    .then((result)=>{
      console.log('Then(): ',result);
      
    })
  }

}
