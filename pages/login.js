exports.LoginPage= class LoginPage {
    constructor(page) {
        this.page = page
        email_field = page.getByPlaceholder('Enter email')
        password_field = page.getByPlaceholder('Enter password')
        login_button = page.getByRole('button', { name: 'Sign In' })
    }

    async gotologinpage(){
        await page.goto('https://gl.vteamslabs.com/login');
    }

    async gotodashboard(){
        await page.goto('https://gl.vteamslabs.com/dashboard/46');
    }

    async login(email, password){
        await this.email_field.fill(email)
        await this.password_field.fill(password)
        await this.login_button.click()
    }

}