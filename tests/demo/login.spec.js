import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { generateRandomCredentials } from '../../utils/randomUser';

test('Test login with Random Email & Password', async ({ page }) => {

  const login = new LoginPage(page)
  const { email, password } = generateRandomCredentials();
  await login.gotologinpage()
  await login.login(email,password)
  // await login.gotodashboard()

});

test('Test login with Valid Email & Password', async ({ page }) => {

  const login = new LoginPage(page)
  await login.gotologinpage()
  await login.login("profile1@yopmail.com","University@123")
  await login.gotodashboard()
  await expect(page).toHaveURL('https://gl.vteamslabs.com/login?redirect=%2Fdashboard%2F46');


});