import { Locator, Page, expect } from "@playwright/test";
import { ConfirmationPage } from "./confirmationPage";


export class OrderPage {
    private readonly page: Page;
    private readonly btnContinue: Locator;
    private readonly btnContinue2: Locator;
    private readonly payMethSelector: Locator;
    private readonly termAndCond: Locator;
    private readonly payButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.btnContinue = this.page.getByRole('button', { name: 'CONTINUE' });
        this.btnContinue2 = this.page.locator('button[name="confirmDeliveryOption"]');
        this.payMethSelector = this.page.locator('#payment-option-2');
        this.termAndCond = this.page.getByRole('checkbox',{name:'I agree to the terms of service and will adhere to them unconditionally.'});
        this.payButton = this.page.getByRole('button', { name: 'ORDER WITH AN OBLIGATION TO PAY' });

    }

    async personalInfo() {
        await this.btnContinue.click();
    }
    async shippingMethod() {
        if (await this.btnContinue2.isVisible())
            await this.btnContinue2.click();
        else
            console.log('No se activa el boton del Envio');

    }
    async paymentMethod() {
        await this.payMethSelector.check();
        await this.termAndCond.check();
        if (await this.payButton.isEnabled()) {
            await Promise.all([
              this.page.waitForNavigation({timeout:120000}), // espera a que la página navegue
              this.payButton.click()
            ])
            await this.page.waitForLoadState('domcontentloaded');
            return new ConfirmationPage(this.page);           

        }
        else {
            console.log('Deshabilitado');
            return null;

        }

            
    }



}