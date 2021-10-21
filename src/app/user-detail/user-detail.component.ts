import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditNameComponent } from '../dialog-edit-name/dialog-edit-name.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  representedUser = new User();
  userId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((changeInRoute: any) => {
      console.log('Die aktive Route abonniert und dadurch die (Dokumenten) ID ausgeloggt: ', changeInRoute.id);
      console.log('Jetzt müssen wir die spezifischen Daten aus Firestore/Dokument laden => Indem wir unseren firestore collection abonnieren');

      this.userId = changeInRoute.id;

      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((user: object) => {
          this.representedUser = new User(user);
          console.log('The User Date was loaded. Here is the user data bro: ', this.representedUser);
        })
    })
  }





  openDialogEditName() {
    let dialog = this.dialog.open(DialogEditNameComponent);
    dialog.componentInstance.user = new User(this.representedUser);
    dialog.componentInstance.userId = this.userId;
  }

  openDialogEditAddress() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.representedUser);
    dialog.componentInstance.userId = this.userId;
  }
}
