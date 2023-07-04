

# TrelloFamily

- This will be a step by step Trello Clone.
- Using angular CDK (nothing from material design)
- Using Tailwind 


## First Steps
- Run this codes 
```sh
ng new trello-family
cd trello-family
```
- Install Tailwind (also see this: https://tailwindcss.com/docs/guides/angular)

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
- add the CDK from angular (ONLY the CDK nothing from materiel design)
```sh
ng add @angular/cdk
```



## Login Page
- Add images and svg in /assets
- Creation the login page (important no styles and no testing)
```sh
ng g c pages/login --style=none --skip-tests
```
- For Login form install: (see here: https://github.com/tailwindlabs/tailwindcss-forms)
```sh
npm install -D @tailwindcss/forms
```
- Basic html with non css files. Only in the html



## button-component
- Creation the component for button
```sh
ng g c components/btn --skip-tests --style=none
```
- Take the buttom from login
- Modify tailwind.config to extends colors to succes and primary
- To dinamic change color in the btn tailwind cannot read in process time. So create a get color function in btn component and define the colors allowed for this btn.



## Interactive component
- Creation the pages component for boards page
```sh
ng g c pages/boards --skip-tests --style=none
```
- Creation a navbar
- Creation the component for navbar
```sh
ng g c components/nav --skip-tests --style=none
```
- Login in app modules and app-routing to include nav component + boards page
- add ===> @import '@angular/cdk/overlay-prebuilt.css'; in the styles.scss
- in app.module add ===> import { OverlayModule } from '@angular/cdk/overlay'
- Add the fontawesonm library
```sh
ng add @fortawesome/angular-fontawesome
```
- Important to config tailwind "container" ...  in tailwindcss.config 
- Import Accordion of CDK in app.module ===> import { CdkAccordionModule } from '@angular/cdk/accordion';
- Implement accordion in the boards html + accordion witdh array double deep



## Drag and Drop
- Creation new page board
```sh
ng g c pages/board --skip-tests --styles=none
```
- in app.module ===>  import { DragDropModule } from '@angular/cdk/drag-drop';
- creation a models of todos
- in board.ts ===> import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
- in board.ts ===> import { Todo } from './../../models/todo.models'
- in board.ts add a list with this model to use in the html
- in board.html use ===> cdkDropListGroup + cdkDropList + (cdkDropListDropped)="drop($event)" + [cdkDropListData]="todos". 
- Important ==> Think first in just a list and move the item into this list. Then think in change the item from list. 
- So first (only in the same list) use ===> cdkDropList + (cdkDropListDropped)="drop($event)"
- Then (for move from list to list) use ===> cdkDropListGroup + [cdkDropListData]="todos"



## Dinamic Column Drag and Drop
- Creation in models a Column Model ==> just a title + an arrays of previous "todos"
- Import this model to board.ts.
- Refactor the todos into the Column model columns
- In html refactor the ngFor to match the new logic. Is easy to move the card between columns. Using the same method drop(event: CdkDragDrop<Todo[]>)
- Now adding move column also.
- In html in overall div ===> cdkDropList + cdkDropListOrientation="horizontal" + (cdkDropListDropped)="dropColumn($event)"
- in TS creadte method dropColumn($event) similar to drop($event).
- In html add cdkDrag in the column div.



## Dialog or Modal

- Adding in module ===> import {DialogModule} from '@angular/cdk/dialog';
- Creating a new component as a todo-modal
```sh
ng g c component/todo-modal --skip-test --style=none
```
- In board.ts import { Dialog } from '@angular/cdk/dialog';
- In board.ts import { TodoModalComponent }; (the component created)
- In todo-modal TS import { DialogRef } from '@angular/cdk/dialog' (to use funtions there as close modal).
- In todo-modal ts  import all fa awesome needed
- Check the button component to add and refactor some colors.

## Dialog or Modal - Info data

- Sending info/data to Modal 
- To send: In board send the task in the openDialog(task) 
- To receive the task: In todo-modal.component import todo.model create interface Data with todo: Todo + in constructor ==> @Inject(DIALOG_DATA) data: Data... etc etc etc
- In todo-modal.html {{ todo.title }}. Already get the data.
- To return some information: in todo-modal interface OutputData { rta: boolean; }
- Also ===>  private dialogRef = inject(DialogRef<OutputData>);
- In todo-modal .closeWithRta(rta: boolean) {this.dialogRef.close({ rta });}
- In html button closeWithRta(true/false) 
- The most important in board (is where will receive in return the info). In the openDialog method dialogRef.closed.subscribe(output => { console.log(output) }) 


## Scroll Virtual Scroll List

- Creation a scroll pagepage (important no styles and no testing)
```sh
ng g c pages/scroll --style=none --skip-tests
```
- In appModule ===> Import HttpClientModule
- In scroll.ts ===> Import HttpClient
- I take a from free api a list of 200 items. 
- Create in html 2 scrolling places. One for the standard ngFor list the other to implement the virtual scroll.
- To implement the Virtual Scrolling component:
- In appModule ==> import { ScrollingModule } from '@angular/cdk/scrolling';
- In html use the cdk-virtual-scroll-viewport intead of div
- SUPER IMPORTANT ==> add the itemSize="number" in the cdk-virtual-scroll-viewport (is important to allow make the calculation in order to render a defined quantity of items).
- Change the *ngFor for a *cdkVirtualFor
- Now in left Scroll the Virtual scroll is ready. 
















## All above the standard README generate by angular.

##
##
##

# TrelloFamily

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
