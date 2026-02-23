import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/signup';
import { generateRandomSignupData } from '../../utils/randomUser';

test.describe('Signup Page Tests', () => {

    // test('should sign up with valid details', async ({ page }) => {
    //     const signup = new SignupPage(page);
    //     const data = generateRandomSignupData();

    //     await page.goto('https://gl.vteamslabs.com/signup');

        

    //     await signup.fillSignupForm(
    //         data.firstName,
    //         data.lastName,
    //         data.organization,
    //         data.businessType,
    //         data.email,
    //         data.password,
    //         data.confirmPassword
        
    //     );
    //     await signup.acceptTerms();
    //     await signup.submit();

    //     // Replace with your app’s success selector or URL
    //     await expect(page).toHaveURL('https://gl.vteamslabs.com/signup');

    //     console.log("🔐 SIGNUP USER:");
    //     console.log("Email:", data.email);
    //     console.log("Password:", data.password);

    // });

      test('should not sign up without accepting terms', async ({ page }) => {
        const signup = new SignupPage(page);
        const data = generateRandomSignupData();

        await page.goto('https://gl.vteamslabs.com/signup');

        await signup.fillSignupForm(
          data.firstName,
          data.lastName,
          data.organization,
          data.businessType,
          data.email,
          data.password,
          data.confirmPassword
        );
        // Not accepting terms
        await signup.submit();

        const error = page.locator('text= You must accept the terms and conditions');
        await expect(error).toBeVisible();
      });

      test('should show error for mismatched passwords', async ({ page }) => {
        const signup = new SignupPage(page);
        const data = generateRandomSignupData();

        await page.goto('https://gl.vteamslabs.com/signup');

        await signup.fillSignupForm(
          data.firstName,
          data.lastName,
          data.organization,
          data.businessType,
          data.email,
          data.password,
          "wrongPassword123" // mismatched
        );
        // await signup.acceptTerms();
        await signup.submit();

        const error = page.locator('text=Passwords must match');
        await expect(error).toBeVisible();
      });

      test('Should show error for missing required fields', async ({ page }) => {
        const signup = new SignupPage(page);

        await page.goto('https://gl.vteamslabs.com/signup');

        // Do NOT fill anything
        await signup.submit();

        const errorMessages = [
          'First name is required',
          'Last name is required',
          'Organization name is required',
          'Business type is required',
          'Email is required',
          'Password is required',
          'Confirm password is required',
          'You must accept the terms and conditions'
        ];

        for (const msg of errorMessages) {
          await expect(page.getByText(msg, { exact: true })).toBeVisible();
        }
      });

});