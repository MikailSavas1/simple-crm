import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  allUsers: object[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'city'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('recieved changes from DB ', changes);
        this.allUsers = changes;
      })
  }

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
