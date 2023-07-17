

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
- in board.ts ===> import { Todo } from './../../models/todo.model'
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


# Modals

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


# Scroll

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


# Tables

## Tables and style for table
- Creation a page pagepage (important no styles and no testing)
```sh
ng g c pages/table --style=none --skip-tests
```
- In appModule ===> import {CdkTableModule} from '@angular/cdk/table';
- Create model for Product. Then export it to scroll and to the new table.ts
- In table.ts almost the same as scroll ts
- Important!!! The order of columns is defined in the table.ts<br>
columns: string[] = ['id/ID', 'Name/title', 'Price', 'ImageOrCover'];<br>
- As exemple the Image in the html is first but render as the last one.
- IMPORTANT!! Is possible to add style in a cell or row with conditions. Example: <br>
 td> cdk-cell class="px-6 py-4" [ngClass]="{'bg-green-200': row.price < 350}" *cdkCellDef="let row">{{ row.price }}</td  ==> <br>
 This is to show background in light green if the value is lower than 350. <br>
 - A footer is possible cdkFooterRowDef.

 
 ## DataSource (as observable) to table
- Refactor of the table in last branch using DataSource.
- I left commented lines to make easy to see the difference between last commit. 
- New file in table==> data-source.ts
- in data-source.ts  ==> import {CollectionViewer, DataSource} from '@angular/cdk/collections'
- In data-soruce.ts ==> export class DataSourceProducts extends DataSource<Product>
- In table.ts import Datasource from data-source. 
- Now the dinamic actions. ==> add a new column name action. Creation button update and also a method "update()" tu update the product in render. 
- in data-set.ts also a method "update()" and here make the changes
- IMPORTANT! findIndex not find anything return "-1". See that in update() in data-source.ts.


## Filters & Debounce in table
- Add input in html.
- In app module import the ReactiveFormsModule. 
- In table.ts import the FormControl. 
- In table.ts  ==> input = new FormControl('', { nonNullable: true}); (very important nonNullable).
- In table.ts in the ngOnInit ==> subcribe to valueChanges getting in the input
- Add in valueChanges a pipe with debounceTime to wait a little bit before start to search the inputs. (Otherwise on each character typed is making a search).
- In data-source.ts add ==> find(query: string) ==> only for title
- In data-source.ts add ==> findEverything(query: string) ==> for search id, title or price. 
- In table.ts in the ngOnInit use find() or findEverything() as you like.
- Important!! Add logic for each new search using an "dataOriginal" (added in the data-source.ts). In the init() we say this.dataOriginal = products. 


## Improvement button + overlays
- In Nav add (overlayOutsideClick)="isOpen = !isOpen" ===> really easy. Now when click outside the overlay will be closed.
- Button html minor change in class. 
- In todo-modal html add the class in each button
- In btn.component.ts refactor colors and text with mapColors
- Fix old issues ! ! ! !


# Authentication

## Authentication setup 
- Re order files routing and modules
- This will be the structure to continue. 
```sh
ng g m modules/users --routing
ng g c modules/users/pages/users-table --style=none --skip-tests

ng g m modules/profile --routing
ng g c modules/profile/pages/profile --style=none --skip-tests

ng g m modules/auth --routing
ng g c modules/auth/components/background --style=none --skip-tests
ng g c modules/auth/components/footer --style=none --skip-tests
ng g c modules/auth/components/forgot-password-form --style=none --skip-tests
ng g c modules/auth/components/header --style=none --skip-tests
ng g c modules/auth/components/login-form --style=none --skip-tests
ng g c modules/auth/components/recovery-form --style=none --skip-tests
ng g c modules/auth/components/register-form --style=none --skip-tests

ng g c modules/auth/pages/forgot-password --style=none --skip-tests
ng g c modules/auth/pages/login --style=none --skip-tests
ng g c modules/auth/pages/recovery --style=none --skip-tests
ng g c modules/auth/pages/register --style=none --skip-tests

ng g m modules/boards --routing
ng g c modules/boards/pages/board --style=none --skip-tests
ng g c modules/boards/pages/boards --style=none --skip-tests
ng g c modules/boards/components/todo-dialog --style=none --skip-tests

ng g m modules/layout --routing
ng g c modules/layout/components/layout --style=none --skip-tests
ng g c modules/layout/components/navbar --style=none --skip-tests

ng g m modules/shared
ng g c modules/shared/components/button --style=none --skip-tests
```
- Connect all imports for routing.
- Util folders + validators.ts
- Add Routes '' and 'app' in app-routing-module
- Add Routes in Childs in app-routing-module


## Authentication setup html ts
- In all modules html create a body with connectors
- Add a path in tsconfig for easier imports with @. (personal shortscuts)


## Login flow
- Add in the environments the api URL (this is hidden in gitignore). 
- Creation login service
```sh
ng g s services/auth --skip-tests 
```
- In auth.service import HttpClient
- In auth.service import Environments vars ==> the API url (remember hidden)
- In auth.service create method login()
- In login-form implement the logic to log the user


## Register
- In auth.service create method register()
- In register-form implement the logic to create the new user


## Email validation 
- The api has a validation email to know if the user already exist!!!. 
- In auth.service create method isAvailable()
- In register-form implement the logic to check email availability. New form formAvailableEmail + method validateUserEmail() with the logic.
- In register-form html first check the email. Then if email already in DB redirect to Login if the email is not in DB continuer to register new user.
- Create a boolean value "showRegister" ==> then use in the html for show only one of the 2 forms.
- Prefill the email into login. In navigate add ==> queryParams: { email }
- In login-form .. import ==> ActivetedRoute
- In login-form add logic to get the params. Then ==> this.form.controls.email.setValue(email);


## Register + Login 
- Implement all in one... make the register and directly log the new user.
- In auth.service create the method registerAndLogin ===> register() + login() with a switchMap -- avoiding callback hell ;) --
- In register-form.component in the register() change the authService.register() for the new method authService.registerAndLogin() (I left commented the old line to see the change)
- Also change the navigate ===> /login to /app/boards  (I left commented the old line to see the change)

## Recovery password
- The API has a recovery and a change password POST.
- In auth.servie a method recovery().
- In auth.servie a method changePassword().
- In forgot-password-form apply logic from a authService.
- When we send an email knowed in the DB the api return a token to insert in the recovery page. (Usully the server will send an email with the link with this token in the as a param).
- In recovery-form IMPORTANT ! Import ActivatedRoute from angular/router. We need it to read the queryparam==> the token previously received.
- In recovery-form in method recovery() add logic to change the password using the token get + the new password.















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
