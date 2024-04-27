import TeesWomenPage from "./teesWomenPage";
import TopsWomenPage from "./topsWomenPage";
import BottomsWomenPage from "./bottomsWomenPage";

class WomenPage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getWomenTeesLink: () => this.page.getByRole('link', { name: 'Women’s Tees' }),
        getWomenTopsLink: () => this.page.getByRole('link', { name: 'Tops' }),
        getWomenBottomsLink: () => this.page.getByRole('link', { name: 'Bottoms' })
    }

    async clickWomenTeesLink() {
        await this.locators.getWomenTeesLink().click();

        return new TeesWomenPage(this.page);
    }
    async clickWomenTopsLink() {
        await this.locators.getWomenTopsLink().click();

        return new TopsWomenPage(this.page);
    }
    async clickWomenBottomsLink() {
        await this.locators.getWomenBottomsLink().click();

        return new BottomsWomenPage(this.page);
    }
}

export default WomenPage;