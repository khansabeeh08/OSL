import { test, expect } from '@playwright/test';
import {LoginPage } from '../../pages/login'
import { generateRandomCredentials } from '../../utils/randomUser';

test('test', async ({ page }) => {

  const login = new LoginPage(page)
  const { email, password } = generateRandomCredentials();
  await login.gotologinpage()
  await login.login(email,password)
  await login.gotodashboard()

});