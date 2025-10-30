import { Locator, Page, expect } from "@playwright/test";
import { OrderPage } from "./orderPage";

export class CartPage {
    private readonly page: Page;
    private readonly btnCheckOut: Locator;
    private readonly deleteBtn: Locator;
    constructor(page: Page){
        this.page =page;
        this.btnCheckOut = this.page.locator('a.btn.btn-primary');
        this.deleteBtn = this.page.locator('a.remove-from-cart');

    }
    async clickOnCheckOut (){
        await this.btnCheckOut.click();
        return new OrderPage(this.page);
    }
    async delete(){
    await this.deleteBtn.first().click();
   }
    


}