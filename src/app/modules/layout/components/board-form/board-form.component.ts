import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: [''],
    backgroundColor: ['']
  });

  saveCreateBoardForm() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      console.log(title, backgroundColor);

      // create
    } else {
      this.form.markAllAsTouched();
    }
  }



}
