import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { BoardsService } from '@services/boards.service';
import { Allcolors } from '@models/colors.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  @Output() closeOverlay = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);
  private boardsService = inject(BoardsService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Allcolors>('green', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  createNewBoard() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      console.log(title, backgroundColor);
      this.boardsService.createBoard(title, backgroundColor)
      .subscribe(board => {
        console.log(board);
        this.closeOverlay.next(false);
        this.router.navigate(['./app/boards', board.id])
      })

      // create
    } else {
      this.form.markAllAsTouched();
    }
  }



}
