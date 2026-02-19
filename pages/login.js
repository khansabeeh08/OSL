exports.LoginPage= class LoginPage {
    constructor(page) {
        this.page = page
        this.email_field = page.getByPlaceholder('Enter email')
        this.password_field = page.getByPlaceholder('Enter password')
        this.login_button = page.getByRole('button', { name: 'Sign In' })
    }

    async gotologinpage(){
        await this.page.goto('https://gl.vteamslabs.com/login');
    }

    async gotodashboard(){
        await this.page.goto('https://gl.vteamslabs.com/dashboard/46');
    }

    async login(email, password){
        await this.email_field.fill(email)
        await this.password_field.fill(password)
        await this.login_button.click()
    }

}