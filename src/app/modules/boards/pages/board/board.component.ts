import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray,
  transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

import { Todo, Column } from '@models/todo.model';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

import { BoardsService } from '@services/boards.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
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
  ],
})
export class BoardComponent implements OnInit{

  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private boardsService = inject(BoardsService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('boardId');
      if (id) {
        this.getBoard(id)
      }
    })
  }

  board: Board | null = null

  // columns: Column[] = [
  //   {
  //     title: 'Todos',
  //     todos: [
  //       {
  //         id: '1',
  //         title: 'Tache N°1'
  //       },
  //       {
  //         id: '2',
  //         title: 'Tache N°2'
  //       },
  //       {
  //         id: '6',
  //         title: 'Tache N°6'
  //       },
  //     ]
  //   },{
  //     title: 'Doing',
  //     todos: [
  //       {
  //         id: '4',
  //         title: 'Tache N°4'
  //       },
  //       {
  //         id: '5',
  //         title: 'Tache N°5'
  //       },
  //       {
  //         id: '9',
  //         title: 'Tache N°9'
  //       }
  //     ]
  //   },{
  //     title: 'Done',
  //     todos: [
  //       {
  //         id: '7',
  //         title: 'Tache N°7'
  //       },
  //       {
  //         id: '8',
  //         title: 'Tache N°8'
  //       },
  //       {
  //         id: '3',
  //         title: 'Tache N°3'
  //       }
  //     ]
  //   }
  // ]

  todos: Todo[] = [];
  doing: Todo[] = [];
  done: Todo[] = [];


  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const rta = this.boardsService.getPosition(event.container.data, event.currentIndex);
    console.log(rta);

  }

  addColumn() {
    // this.columns.push({
    //   title: 'New Column',
    //   todos: [],
    // });
  }

  openDialog(task: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '250px',
      maxWidth: '65%',
      data: {
        card: task,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  // From older ts

  dropOld(event: CdkDragDrop<Todo[]>) {
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
    // moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  addColumnOld() {
    // this.columns.push({
    //   title: 'new column',
    //   todos: []
    // })
  }

  removeColumn(column: any) {
    console.log(column);

  }

  clonColumn(column: any) {
    // this.columns.push({
    //   title: 'clon ' + column.title,
    //   todos: column.todos
    // })
  }

  openDialogOld(task: Todo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
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

  private getBoard(id: string) {
    this.boardsService.getBoard(id)
    .subscribe(board => {
      this.board = board
    })
  }


}
