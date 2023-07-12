

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
- 
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
