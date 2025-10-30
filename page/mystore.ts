import { Page, Locator, expect } from "@playwright/test";
import { ProductPage } from "./productPage";
export class Mystore {
    private readonly page: Page;
    private readonly singOutLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly searchResult: Locator;
    private readonly sorByOption: Locator;
    private readonly dropDownMenu: Locator;
    private readonly sorByOptionSelected: Locator;
    private readonly articles;

    constructor(page: Page) {
        this.page = page;
        this.singOutLink = page.getByRole('link', { name: ' Sign out' });
        this.searchInput = page.getByPlaceholder('Search our catalog');
        this.searchButton = page.locator('[type="submit"]>[class="material-icons search"]');
        this.searchResult = page.getByRole('heading', { name: "SEARCH RESULTS" });
        this.sorByOption = page.locator('[class="btn-unstyle select-title"]');
        this.dropDownMenu = page.locator('[class="dropdown-menu"]');
        this.sorByOptionSelected = page.getByRole('link', { name: "Price, low to high" });
        this.articles = page.locator('article.product-miniature.js-product-miniature');


    }
    async itIsLoged() {
        try {
            await expect(this.singOutLink).toBeVisible({ timeout: 2000 });
            console.log('esta logueado');
            return true
        }
        catch {
            console.log('no esta logueado');
            return null;
        }
    }

    async searchProduct(product: string) {

        await this.searchInput.fill(product);
        await this.searchButton.click();
        await expect(this.searchResult).toBeVisible();

    }

    async orderByLowToHidePrice() {
        await this.sorByOption.click();
        await this.dropDownMenu.waitFor({ state: 'visible' });
        await this.sorByOptionSelected.click();
        await expect(this.sorByOption).toContainText('Price, low to high ');
    }

    async displaySearchResult() {
        // Contar cuántos artículos hay
        await this.articles.first().waitFor({ state: 'visible' });
        const articlesArray = this.articles.all();
        const total = (await articlesArray).length;
        console.log(` ${total}`);
        // Mostrar nombre y precio de los artículos que se muestran en la búsqueda

        for (let article of await articlesArray) {
            let productName = await article.locator('div.product-description>h2.h3.product-title>a').textContent();
            let productPrice = await article.locator('div.product-description>div.product-price-and-shipping>span.price').textContent();
            console.log(`${productName}`);
            console.log(`${productPrice}`);

        }
        await this.page.screenshot({ path: 'search-results.png', fullPage: true });

    }

    async clickOnSpecificProduct(product: string) {

        // Localizar el producto  
        const target = await this.articles.filter({ hasText: product });

        // Verificar que existe y es visible
        if (await target.isVisible({ timeout: 3000 })) {
            // Hacer clic en su enlace
            await target.click();
            return new ProductPage(this.page, product);
        
        }
        else 
           return null; 


    }

    async quickViewSpecificProduct(product: string) {

        // Localizar el producto  
        const target = await this.articles.filter({ hasText: product });

        // Verificar que existe y es visible
        await expect(target).toBeVisible();

        // hover en el nombre
        await target.hover();
        // seleccionar el QuickView
        const quickView = await target.getByRole('link', { name: ' Quick view' }).first();
        await quickView.waitFor({ state: 'visible' });
        // Hacer click sobre el QuickView
        await quickView.click();
        // Verificar que se muestre el modal de Quick
        await expect(this.page.getByRole('heading', { name: product })).toBeVisible();
        // Cerrar el modal
        await this.page.locator('button.close').click();

    }


} 