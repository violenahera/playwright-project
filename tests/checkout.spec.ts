import { test, expect } from '@playwright/test';
import { Mystore } from '../page/mystore';
import path from 'path';
import { ProductPage } from '../page/productPage';
import { CartPage } from '../page/cartPage';
import { OrderPage } from '../page/orderPage';
import { ConfirmationPage } from '../page/confirmationPage';
import { ProductVariant } from '../type/productVariant';

let mystore: Mystore;
const otherPath = path.resolve(__dirname, '../jsons/state.json');
test.use({ storageState: otherPath });

test('compra', async ({ page }, testInfo) => {
 
  testInfo.setTimeout(120000);
   const product: ProductVariant ={
          name: 'Hummingbird printed t-shirt', 
          color: 'White', 
          size: 'L', 
          quantity: '1' 
     };
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
   const productPage=await mystore.clickOnSpecificProduct(product.name);
  // Mostrar el carrito
  await expect(productPage).not.toBeNull;
  const cartpag=await productPage!.addToCar(product);
  await expect (cartpag).not.toBeNull;
  const orderpag=await cartpag!.clickOnCheckOut();
  await expect (orderpag).not.toBeNull;
  await orderpag.personalInfo();
  await orderpag.shippingMethod();
  let confirmatPag=await orderpag!.paymentMethod();
  await expect(confirmatPag).not.toBeNull;
  await confirmatPag!.displayInfo();
 

}); 