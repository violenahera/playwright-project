import { Page, Locator, expect } from "@playwright/test";
import { CartPage } from "./cartPage";
export class ProductPage {
    private readonly page: Page;
    private readonly product: String;
    private readonly actualProduct: Locator;
    private readonly sizeControl: Locator;
    private  colorControl: Locator;
    private readonly quantityControl: Locator;
    private readonly addToCartButton: Locator;
    private readonly checkOutButton: Locator;

    constructor(page: Page, product: String) {
        this.page = page;
        this.product = product;
        this.actualProduct = this.page.locator('h1');
        this.colorControl = this.page.getByRole('radio', { name: 'White' });
        this.quantityControl = this.page.locator('#quantity_wanted');
        this.sizeControl = this.page.locator('#group_1');
        this.addToCartButton = this.page.getByRole('button', { name: ' ADD TO CART' });
        this.checkOutButton = this.page.getByText('PROCEED TO CHECKOUT');


    }

    async addToCar(color:string, size: string) {
        expect((await this.actualProduct.innerText()).toLocaleLowerCase()).toEqual(this.product.toLocaleLowerCase());
        await this.sizeControl.selectOption({ label: size });
             if (await this.colorControl.isVisible()) {
                 this.colorControl = this.page.getByRole('radio',{ name: color});
                 await this.colorControl.setChecked(true);
              
        }
        await this.quantityControl.fill('2');
        await this.addToCartButton.click();
             
       if (await this.addToCartButton.isEnabled()){
            await this.checkOutButton.click();
            return new CartPage(this.page);
        }
        else 
          return null;
       
    }
}