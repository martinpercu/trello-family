import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Todo } from './../../models/todo.models'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
  `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
  `

  ]
})
export class BoardComponent {

  todos: Todo[] = [
    {
      id: '1',
      title: 'Tache N°1'
    },
    {
      id: '2',
      title: 'Tache N°2'
    },
    {
      id: '6',
      title: 'Tache N°6'
    },
  ];
  doing: Todo[] = [
    {
      id: '4',
      title: 'Tache N°4'
    },
    {
      id: '5',
      title: 'Tache N°5'
    },
    {
      id: '9',
      title: 'Tache N°9'
    },
  ];
  done: Todo[] = [
    {
      id: '7',
      title: 'Tache N°7'
    },
    {
      id: '8',
      title: 'Tache N°8'
    },
    {
      id: '3',
      title: 'Tache N°3'
    },
  ];



  drop(event: CdkDragDrop<Todo[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   )
    // }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    // console.log(event);
    // moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

}
