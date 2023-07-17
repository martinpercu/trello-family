import { Component, inject, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { faClose, faCheckToSlot, faBars, faTag, faCheckSquare, faClock, faUser } from '@fortawesome/free-solid-svg-icons'

import { Todo } from 'src/app/models/todo.models'


interface InputData {
  todo: Todo;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faUser = faUser;

  todo: Todo;

  private dialogRef = inject(DialogRef<OutputData>);

  constructor (
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.todo = data.todo;
  }


  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({
      rta
    });
  }

}
