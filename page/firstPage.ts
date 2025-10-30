import { Page, Locator, expect } from "@playwright/test";
import {LogingPage} from './loginPage';
export class FirstPage {
    private readonly page: Page;
    private readonly linkSingIn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.linkSingIn = page.locator('//span[contains(text(), "Sign")]');

    }
    async isNotLogin() {
        try {
            await (expect(this.linkSingIn).toBeVisible({timeout:2000}));
            return true
        }
        catch {
            return false

        }

    }

    async gotoLogin() {
        
        await this.linkSingIn.click();
         // Devolver un nuevo objeto LogingPage
         return new LogingPage(this.page);


        
    }
} 