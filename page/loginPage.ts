import { Page, Locator, expect } from "@playwright/test";
import {Myaccount } from './myaccount';
import { TIMEOUT } from "dns";
export class LogingPage {
    private readonly page: Page;
    private readonly logText: Locator;
    private readonly emailInput: Locator;
    private readonly passInput: Locator;
    private readonly buttonSing: Locator;
    private readonly errorMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.logText = page.getByText('  Log in to your account');
        this.emailInput= page.locator('[class="form-control"]');
        this.passInput= page.locator('input[name="password"]');
        this.errorMessage =page.locator('.alert.alert-danger:has-text("Authentication failed.")');
        this.buttonSing =page.getByRole('button', { name: "SIGN IN" });

    }
    async inloginpage() {
        try{
            await (expect(this.logText).toBeVisible);
            return true
        }
      catch{
         return false
        }
       
    }

    async login() {
        
        await (this.emailInput.fill('test1@testingyes.com'));
        await (this.passInput.fill('test12345'));
        await (this.buttonSing.click());
        if (await this.errorMessage.isVisible({timeout:3000})){
            return null;
        }
        return new  Myaccount(this.page);
    }
} 