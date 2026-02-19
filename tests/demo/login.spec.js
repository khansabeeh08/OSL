import { test, expect } from '@playwright/test';
import {LoginPage } from '../../pages/login'

test('test', async ({ page }) => {

  const login = new LoginPage(page)
  await login.gotologinpage()
  await login.login('profile1@yopmail.com','University@123')
  await ogin.gotodashboard()

});