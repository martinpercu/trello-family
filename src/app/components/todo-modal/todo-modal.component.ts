import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';


import { faClose, faCheckToSlot, faBars, faTag, faCheckSquare, faClock, faUser } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {

  private dialogRef = inject(DialogRef);

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faUser = faUser;

  close() {
    this.dialogRef.close();
  }

}
