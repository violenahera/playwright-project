import { Locator, Page, expect } from "@playwright/test";

export class ConfirmationPage {
    private readonly page: Page;
    private readonly confirmedText: Locator;

    constructor(page: Page){
        this.page =page;
        this.confirmedText = this.page.locator('h3.h1.card-title');
        
    }
   
   async displayInfo(){
       await  this.confirmedText.waitFor({state:'visible', timeout: 120000});
       if (await  this.confirmedText.isVisible()){
         let otro =  await this.confirmedText.innerText();
         otro= otro.replace(/^\s*[^a-zA-Z0-9]*\s*/, '').trim();
         console.log(`${otro}`);
       }
       else
        console.log('No se logro la confirmación')
   }

}