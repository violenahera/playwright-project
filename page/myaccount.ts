import { Page, Locator, expect } from "@playwright/test";
import { assert } from "console";
export class Myaccount {
    private readonly page: Page;
    private readonly accountText: Locator;
    private readonly myStoreLink: Locator;
     constructor(page: Page) {
        this.page = page;
        this.accountText = page.locator('.hidden-sm-down:has-text("Sign out")'); 
        this.myStoreLink = page.locator('[class="logo img-responsive"]');    

    }
    async itIsLoged() {
        try{
            await (expect(this.accountText).toBeVisible({timeout:2000}));
            return true
        }
      catch{

         return false;
        }
       
    }
    async clickOnMyStore(){
        await this.myStoreLink.click();
    }

} 