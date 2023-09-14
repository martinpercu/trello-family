

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


# Token and manage session

## Protect Route if not logged (manage session)
- The session token is what we use to manage the session so create a service to manage this token.
```sh
ng g s services/token --skip-tests
```
- Only y this branch the token will be saved in localStorage. (this is not reccomended).
- In new token.service create save, get and remove token methods.
- In auth.service in the login() use .pipe to save the token.
- In folder models create new file to define the responseModel in the login.
- In auth.service import the ResponseModel.
- In auth.service add the ResponseModel in the login().
- OK... now when login we have in local storage.
- Now create a guard... ===>
```sh
ng g g guards/auth --skip-tests
```
- Select CanActivate
- In the new auth.guard import TokenService + Router. Then ...
- Implement the logic to check if there is a token to allow or not.
- NOW in app-routing.module import the AuthGuard and add canActivate in the path to the 'app'. Now only if the token OK we have access to the app area (boards, profile and users).
- IMPORTANT!!! Since Angular 15 we can use canActivate as a function directly in the app-routing.
- In app-routing import TokenService and the "inject" from angular/core
- In token.service create a method to return true or false if find the token. ===> checkToken().
- In app-routing replace the "AuthGuard" with the function checkToken().
-     canActivate: [() => inject(TokenService).checkToken()]
- So you no need the AuthGuard anymore... 
- I left the guard it in the project and commented old lines to see an exemple for migration from Angular 14 to 15 and above. 

## Protect Route if not logged (manage session)
- To save our token in a cookie install first ===>
```sh
npm i typescript-cookie
```
- Now in token.service.ts make chanches to use it. (I left commented old line to see the changes).  From now the token name will be tokenFrello, just because I like it ;).
- To set the cookie add time for expiration. This case 365 days.
- VERY IMPORTANT!!! In the cookie the PATH must be set. (in this case '/'). This allow to use it everywhere for create it for delete etc.

## Redirect when log & logout implementation
- In token.service add a new "guard" checkTokenRedirect().
- Imported in app-routing.module
- For logout in the auth.service.ts add method logout().
- In navbar.component.ts import Authservice and Router
- In navbar.component.ts create a logout() using authservice and Router. Once cookie delete navigate to /login.
- In navbar.component.html add the (click) action.

## Getting all Users
- Create service to get all users ===>
```sh
ng g s services/users --skip-tests
```
- In the new users.service implement logic to get the users
- In modules/users/pages/user-table import the UserService
- Create a User model!!!!!
- In user.service the get will use <User[]>!!!
- In data-source.ts replace the any[] for the new User[].
- In user.service add the headers: ==> authorization: Bearer + token. (to get the tokes user tokenService + getToken())


## Getting the profile
- In auth.service create a method getProfile(). Is almost the same as the getUsers().
- Then add all the logic to import the method in the navbar.component.ts
- In the navbar.component.html add the logic for binding. 
- Important I left commented the old line to see the changes.


## Reactivity in the profile
- We will create an observable with the profile an use this info without doing a request. (Just a request in login and the use the observable).
- In auth.service ===> user$ = new BehaviorSubject<User | null>(null);
- In auth.service ===> in getProfile() add a pipe + tap and add the user in the user$ (the observable).
- In layout.component we will put the user$ (this place is good because is where we load the main app.) 
- In layout.component import { AuthService } from '@services/auth.service';
- In navbar.component change the user to user$ (I left the old line commented to see changes) ===> user$ = this.authService.user$;
- In navbar.component we can remove the ngOnInit.
- In navbar.component.html add a tag <ng-container *ngIf="user$ | async as user"> and put all inside. This is beacuse the observable is null at start so this wait just to get the user$ for then construc the html
- To get user info in other places ===> in auth.service create a method to get the observable info ==> getDataUser().
- As exemple in user-table.component in the ngOnInit ====>
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    });



## Interceptor for Token
- The intercepto allow to catch all request and do something with this.
```sh
ng g interceptor interceptors/token --skip-tests
```
- In the new file import the token service.
- Add the logic to add the token in the interceptor. ==> addToken().
- IMPORTANT "good practices" ===> add a context to the interceptor.
- Import HttpContext, HttpContextToken
- const CHECK_TOKEN
- export function checkToken()
- in the intercept add the login to check the context.
- IMPORTANT ! ==> in app.module ADD the interceptor!!! 
- in app.module import HTTP_INTERCEPTORS and add in in providers.
- Now in all endpoint thats need use the token write logic (in all cases I left commented lines in order to see the changes)
- In auth.service import the ""checkToken""" from the interceptor
- In auth.service the getProfile() make modification to user the checkToken()
- In user.service import the ""checkToken""" from the interceptor
- In user.service the getUsers() make modification to user the checkToken(). Also commented the lines with TokenService no need anymore



## Close Session decoding Token
- The token has info about their own expiration. So we will decode it in order to know if is valid or no. (we will not ask to the backend to avoid the typical return 401).
- Install the jwt decode (this it the decoder we will use)
```sh
npm i jwt-decode
```
- In token.service import the jwt-decode ===> import jwt_decode, { JwtPayload } from 'jwt-decode';
- Create a method to know if is valid the token ==> isValidToken.
- Now in checkToken() use the isValidToken(). (I commented the old checkToken and write a new one to see the changes clear).
- Now in checkTokenRedirect() use the isValidToken(). (I commented the old checkTokenRedirect and write a new one to see the changes clear).
- In navbar.component ... create a button to check if the token is valid right now. (just to show in console)
- In navbar import { TokenService } from '@services/token.service';
- A method getIfIsValidToken() with console.log(this.tokenService.isValidToken());
- In the html add a button to use this method.
- Important (the token has a durability of 5 hours). So to check this faster hardcode time in the method isValidToken in the token.service. 
- To check if token still valid once we are in the app add the same "canActivate: [() => inject(TokenService).checkToken()]," as we have in the app-routing.module in the layout-routing.module. Add in the path you think convenient.


## Refresh Token
- The Refresh Token is what we will use to keep the session active. The token expires (5 hours). 
- When login the API return 2 tokens: access_token and refresh_token.
- We will user the refresh token to get a new tokens expiring 5 hours. And each time we needed we will.
- In auth.service in login() add this.tokenService.saveRefreshToken(response.access_token) to save the refresh token also.
- In token.service duplicate the token methods but now for the refresh token.
- In token.service the checkToken() will use the isValidRefreshToken. (this control the navigation if not logged navifation to /login).
- In user-table add the logic to refresh the user list with a button.
- Till now the navigation inside the app continue if the refresh token is valid even if the access token was expired. BUT if the access token expires we can't get all users.


## Interceptor Refresh Token
- In the token.interceptor we already only add the token in a specific context. That's help in order to avoid an infinite loop etc.
- First add the endpoint for refresh. In auth.service create a refreshToken(). This endpoint give an access_token and a refresh_token. So we save both. ===> almost the same as the login().
- In token.interceptor. import tha AuthService.
- In the intercept add if token is valid. ===> "aValidToken". If OK return the addToken(). If not go to updateAccessAndRefreshToken().
- Create the updateAccessAndRefreshToken(). This method must get the refresh token. Check if refresh token is valid. If true we stop the original request because the access token I know is invalid and with the refresh token I will demand new access an refresh tokens. Then I will add the new access token to the request using the switchMap => addToken(request, next).
- The fantastic of this is we KNOW the acces_token is expired or deleted BEFORE make the request to the backend. 


## Refact for redirect with guard
- Create a guard for this redirect 
```sh
ng g g guards/redirect --skip-tests
```
- In the new redirect.guard almost copy the auth.guard but the logic is: "If you have a token continue to the app".
- In app-routing.module implement this redirect guard in "path: ''.
- Now we could eliminate the "checkTokenRedirect()" from the token.service.ts. (I will commented to see the lines anyway).
- Obviously is recommended to make the same as the previous auth.guard.
- So in app-routing.module implement this auth.guard in the "path: '/login'.
- Now we could eliminate the "checkToken()" from the token.service.ts. (I will commented to see the lines anyway).
- IMPORTANT if we eliminate the "checkToken()" we must import the auth.guard also in the layout-routing.module. (I left commented the old lines in order to see the changes).


## Connect user boards
- Create a service 
```sh
ng g s services/me
```
- In the meService add logic to get the profile.
- In auth service import the meService and use in the getProfile(). (I comment the old method so see the difference).
- Now we will get the boards of the user===> in me.service add a getMeBoards(). the logic is quite the same as the getMeProfile().
- As we will receive a list of Boards we will create the model for this.
- In folder models new file board.model.ts. Here we create the model for Boards.
- Now in boards.component.ts create a method to get the user boards using the meService ===> getMeBoards() .
- Get board list in the ngOnInito().
- In boards.component.html show with an *ngFor the list of the boards. (I left also 2 hardcoded boards to show something when user has no boards).


## Cards Colors
- Create a shared module to manage card colors 
```sh
ng g c modules/shared/components/card-color --skip-tests --style=none
```
- IMPORTANT! We are using Tailwind. We need to get the color info BEFORE render it.
- In card-color.component.ts prepare the colors will use in html. Also a method to get the colors. --> get colors()
- In card-color.component.html create the card template. Important add the [ngClass]="colors".
- Now tu use this component ===> In shared.module in the exports the CardColorComponent.
- In boards.component.html implement the <app-card-color> with also an *ngFor to render the list.
- Important in the board.model add the type backgroundColor exact as the card-color.component.ts.  


## Typing the colors
- We will typing all colors in one place to use them in cards, buttons and futures components.
- In folder model create a new file colors.model.ts. There export type "Allcolors" with the list of all colors used from button and from card-color.
- In card-color.components and in button.component import that "Allcolors" and replace the @Input.
- Ask we have more colors in Allcolors than before for each component we must to replace the mapColor for a "fullmapcolor". So un colors.model create a const ALLCOLORS with the fusion of mapColors from button and card-color.
- Then import ALLCOLORS in button.component and card-color.component and use to replace the object in mapColors.
- Now we will type the ALLCOLORS to allow only boolean assignation.
- We will use an utility type from typescrip "Record". Record is for typing objects. So ALLCOLORS will be type ObjALLCOLORS. ====> "export type ObjALLCOLORS = Record<string, Record<string, boolean>>"
- Just remember in tailwind.config we have the color config for names like succes, danger, primary etc. etc.


## Getting boards for an user
- When the API returns the "boards" from an user returns a structure like this==> <br>
```sh
{
	"id": 1,
	"title": "Board 1",
	"backgroundColor": "sky",
	"creationAt": "2023-09-13T10:44:07.000Z",
	"updatedAt": "2023-09-13T10:44:07.000Z",
	"members": [],
	"lists": [],
	"cards": []
}
```
- "members", "lists" and "cards" are arrays of objects.
- In service create a boards.service.ts . Create a method to getBoard().
- In board.component ==> "import { ActivatedRoute } from '@angular/router';" and inject in. ==> "private route = inject(ActivatedRoute);".
- In board.component implement the Oninit to get the path. Important the id we get in the path must be the same as we have in the boards-routing. (I will use 'boardId')
- In board.component add a private method to getBoard().... this will be call the ngOnInit if there is an ID for the board.
- In board.component "import { BoardsService } from '@services/boards.service';" and inject it.
- In board.component import Board model. + add ==> "board: Board | null = null". Is important to add the "null" because we need to wait a little bit to get the board from the API.
- In board.component in getBoard() a ask the boardsService and subscribe the getBoard and assig this to the "board". With this we can use in the HTML component.
- In board.component.html just with {{ board?.title }} we are using the board info. IMPORTANT we need the "?" symbol because the board start being null.
- Now will refact to render the boards with the API format.
- In board.model update the interface to match with the API format. Create the models Cards and List to match the requirements.
- Now hardcoded object "column" is not need it anymore. So refact the board component html and ts in order to render the boards comming from the API.  ==> In general in the html "columns" becomes "boards?.lists" | "column" becomes "list" | "todos" becomes "cards"
- In todo-dialog.component also refact!!!!.


## Algorithm card position
- The card has a position value to order them in the list.
- So we will create an algorithm that give a position number in relation to other.
- So we need 4 steps to get this goal.<br> <br> 

1 - The algorithm its self.<br>
2 - Detect the movement of the card.<br>
3 - Calculate the new position.<br>
4 - Update in DB the positio.<br><br>

- The algorithm is like this. We start with a bufferSpace = 65535 (check in google why this number). 
- So the first new card(A) will have this position (65535). 
- Then if a new card(B) in an first position will get the position of first card(A)divided by 2. So the card(B) position is (32767)
- If a a new card(C) fo to the last position will get the value from the bufferSpace + the position N° from last card position.
- If a card(D) moves between card(B)32765 and card(A)65535 the card position value will be the average from A and B card ===> (32757 + 65535) ÷ 2 = 49151


## Algorithm card position DETECTION
- There are 4 type of condition. <br>
1 - If is empty ===> so a new card<br>
2 - If moves on top<br>
4 - If moves somewhere in the middle<br>
3 - If moves on bottom<br>
- In board.component With the event CdkDragDrop we know if the card is move in the same list or is move to another list.
- In board.service create a method getPosition()
- In board.component after the event CdkDragDrop execute the getPosition() from boardsServices.
- The getPosition() ==> if (cards.length === 1) Is a new card.
- The getPosition() ==> if (cards.length > 1 && currentIndex === 0) Is in TOP.
- The getPosition() ==> if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) Is somewhere in the middle.
- The getPosition() ==> if (cards.length > 1 && currentIndex === lastIndex) Is the last one in the bottom of the list
- With this we know where is moved the card.


## Algorithm card position CALCULATION
- In board.service add the const bufferSpace = 65535.
- Now in each if in the getPosition() add the login to return the new position for the card. IMPORTANT!!! ==> Remember the method act just after the movement of the card. This is important in relation of index of cards.
 











##
##
##



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
