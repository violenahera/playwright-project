import { test, expect } from '@playwright/test';
import {FirstPage} from '../page/firstPage';
import {LogingPage } from '../page/loginPage';
import {Myaccount } from '../page/myaccount';
import path from 'path';


let pageLanding : FirstPage;
let logingPage: LogingPage;
let myaccountPage: Myaccount;


test('login', async ({ page }) => {
  pageLanding= new FirstPage(page);
  await page.goto('http://www.testingyes.com/onlineshop/');
  /* Loguearse por primera vez
  // Verificar que no está ya logueado */
   await (pageLanding.isNotLogin());
   // Click en el botón para ir a la página de login
   logingPage=await pageLanding.gotoLogin();
   // Verificar que está en la página de login
   await (logingPage.inloginpage());
   // Entrar usuario y pass y dar click al login
   let myaccountPage=await logingPage.login();
   // Comprobar que el usuario está logueado
    expect(myaccountPage).not.toBeNull();
    await myaccountPage!.itIsLoged();
   // Almacenar datos de la sesión
   let statePath = path.resolve(__dirname, '../jsons/state.json');
   await page.context().storageState({ path: statePath });
 
});

