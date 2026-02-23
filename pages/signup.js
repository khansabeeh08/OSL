exports.SignupPage = class SignupPage {
    constructor(page) {
        this.page = page;
        this.first_name = page.locator('input[name="first_name"]');
        this.last_name = page.locator('input[name="last_name"]');
        this.organ_name = page.locator('input[name="organization_name"]');
        this.business_type = this.page.locator('.css-wvzlfo');
        this.email_signup = this.page.locator('input[name="email"]');
        this.password_signup = this.page.locator('input[name="password"]');
        this.conpassword_signup = this.page.locator('input[name="re_password"]');
        this.termscheckbox = this.page.locator('input[name="accept_terms"]');
        this.signup_btn = this.page.locator('button[type="submit"]');

    }

    async fillSignupForm(firstName, lastName, organizationName, businessType, email, password, confirmPassword) {
        await this.first_name.fill(firstName);
        await this.last_name.fill(lastName);
        await this.organ_name.fill(organizationName);
        await this.page.locator('.css-wvzlfo').click();                // open dropdown
        await this.page.getByText(businessType, { exact: true }).click();
        await this.email_signup.fill(email);
        await this.password_signup.fill(password);
        await this.conpassword_signup.fill(confirmPassword);
    }

    async acceptTerms() {
        await this.termscheckbox.check();
    }

    async submit() {
        await this.signup_btn.click();
    }
}
