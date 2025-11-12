import { test, expect } from "@playwright/test";
import { Mystore } from "../page/mystore";
import path from "path";
import { ProductPage } from "../page/productPage";
import { CartPage } from "../page/cartPage";
import { OrderPage } from "../page/orderPage";
import { ConfirmationPage } from "../page/confirmationPage";
import { ProductVariant } from "../type/productVariant";

test.describe("Checkout", async () => {
  let mystore: Mystore;
  const otherPath = path.resolve(__dirname, "../jsons/state.json");
  test.use({ storageState: otherPath });
  const products: ProductVariant[] = [
    { name: "Hummingbird - Vector graphics", quantity: "1" },
    { name: "Hummingbird cushion", color: "Black", quantity: "2" },
    {
      name: "Hummingbird printed t-shirt",
      color: "White",
      size: "L",
      quantity: "1",
    },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto("http://www.testingyes.com/onlineshop/");
  });

  test("Compra de varios productos", async ({ page }, testInfo) => {
    testInfo.setTimeout(120000);
    let cartpag: CartPage | null = null;
    mystore = new Mystore(page);
    //Verificar que está logueado
    await mystore.itIsLoged();
    // Montar en el carrito uno por uno los producto
    for (const [index, product] of products.entries()) {
      // Buscar cada producto por nombre
      await mystore.searchProduct(product.name);
      // Ordenar precio de menor a mayor precio
      await mystore.orderByLowToHidePrice();
      // Mostrar resultados de Búsqueda
      await mystore.displaySearchResult();
      // Hacer click en el producto
      const productPage = await mystore.clickOnSpecificProduct(product.name);
      // Montar ese producto en el carrito
      expect(productPage).not.toBeNull;
      cartpag = await productPage!.addToCar(product);
      // Si el producto no es el último dar click en seguir comprando
      if (index != products.length - 1) await cartpag!.clickOnContinue();
    }
    // Ir a la página del checkout
    await expect(cartpag).not.toBeNull;
    const orderpag = await cartpag!.clickOnCheckOut();
    await expect(orderpag).not.toBeNull;
    // Llenar datos de la sección personal
    await orderpag.personalInfo();
    // Llenar datos de la sección envíos
    await orderpag.shippingMethod();
    // Hacer el pago
    let confirmatPag = await orderpag!.paymentMethod();
    await expect(confirmatPag).not.toBeNull;
    await confirmatPag!.displayInfo();
  });
});
