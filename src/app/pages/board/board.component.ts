import { Component, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoModalComponent } from '../../components/todo-modal/todo-modal.component'

import { Todo, Column } from './../../models/todo.models'


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

    ::-webkit-scrollbar {
      width: 16px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #5555cc85;
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #9d9d9dc2;
      border-radius: 10px;
      border: solid 3px #645b67cc;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #b02bd4cf;
    }
  `

  ]
})
export class BoardComponent {

  private dialog = inject(Dialog);


  columns: Column[] = [
    {
      title: 'Todos',
      todos: [
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
      ]
    },{
      title: 'Doing',
      todos: [
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
        }
      ]
    },{
      title: 'Done',
      todos: [
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
        }
      ]
    }
  ]

  todos: Todo[] = [];
  doing: Todo[] = [];
  done: Todo[] = [];



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
    console.log(event);
    console.log(this.todos);

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    // console.log(event);
    // moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  dropColumn(event: CdkDragDrop<Column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  addColumn() {
    this.columns.push({
      title: 'new column',
      todos: []
    })
  }

  removeColumn(column: any) {
    console.log(column);

  }

  clonColumn(column: any) {
    this.columns.push({
      title: 'clon ' + column.title,
      todos: column.todos
    })
  }

  openDialog(task: Todo) {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      minWidth: '250px',
      maxWidth: '65%',
      data: {
        todo: task,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output)
    })
  }
}
