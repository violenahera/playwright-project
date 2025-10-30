import { test, expect } from '@playwright/test';
import { Mystore } from '../page/mystore';
import path from 'path';
import { ProductPage } from '../page/productPage';
import { CartPage } from '../page/cartPage';
import { OrderPage } from '../page/orderPage';
import { ConfirmationPage } from '../page/confirmationPage';

let mystore: Mystore;
const otherPath = path.resolve(__dirname, '../jsons/state.json');
test.use({ storageState: otherPath });

test('compra', async ({ page }, testInfo) => {
 
  testInfo.setTimeout(120000);
  await page.goto('http://www.testingyes.com/onlineshop/');
  mystore =new Mystore(page);
  
  //Verificar que está logueado
  await mystore.itIsLoged();
  // Buscar un producto 
  await mystore.searchProduct('hummingbird cushion');
  // Ordenar de menor a mayor precio
  await mystore.orderByLowToHidePrice();
  // Mostrar resultados de Búsqueda
  await mystore.displaySearchResult();
  // Hacer click en un producto 
   const productPage=await mystore.clickOnSpecificProduct('Hummingbird printed t-shirt');
  // Mostrar el carrito
  await expect(productPage).not.toBeNull;
  const cartpag=await productPage!.addToCar('Black','L');
  await expect (cartpag).not.toBeNull;
  const orderpag=await cartpag!.clickOnCheckOut();
  await expect (orderpag).not.toBeNull;
  await orderpag.personalInfo();
  await orderpag.shippingMethod();
  let confirmatPag=await orderpag!.paymentMethod();
  await expect(confirmatPag).not.toBeNull;
  await confirmatPag!.displayInfo();
 

}); 