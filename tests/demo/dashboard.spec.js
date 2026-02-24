import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/dashboard";

// Increase test timeout for slow dashboard
test.describe("Dashboard Module", () => {
  test.use({ timeout: 120000 });
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000); // Set 2-minute timeout for this hook

    await page.goto("https://gl.vteamslabs.com/login");
    await page.fill('input[name="email"]', "profile1@yopmail.com");
    await page.fill('input[name="password"]', "University@123");

    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeEnabled({ timeout: 5000 });
    await loginButton.click();

    await page.waitForURL("https://gl.vteamslabs.com/dashboard", { timeout: 60000 });

    const dashboardContainer = page.locator("div.container-fluid");
    await dashboardContainer.waitFor({ state: "visible", timeout: 80000 });
  });


  test("Verify all dashboard main elements are visible", async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.verifyVisibility();
    await expect(dashboard.dashboardLink).toBeVisible();
    await expect(dashboard.profileMenu).toBeVisible();
    await expect(dashboard.avatar).toBeVisible();
  });


    test("Click all dashboard tabs", async ({ page }) => {
    const dashboard = new DashboardPage(page);

    const tabs = [
      dashboard.chartOfAccounts,
      dashboard.journalEntries,
      dashboard.users,
      dashboard.roles
    ];

    for (const tab of tabs) {
      await tab.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/.*\/(chart-of-accounts|journal-entries|users|roles|dashboard\/\d+)/);
      await expect(dashboard.recentActivities).toBeVisible();
    }
  });

  test("Click all analytics buttons", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.clickAllAnalyticsButtons();

    // Verify that some analytics content is displayed after clicks
    await expect(page.getByText("Financial Graphs", { exact: true })).toBeVisible();
  });

  test("Click all time filters", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.clickAllTimeFilters();

    // Optionally verify that data updates according to filter
    await expect(page.getByText("Financial Graphs", { exact: true })).toBeVisible();
  });

  test("Expand all expandable sections", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.expandAllSections();

    // Verify that expanded content is visible
    const count = await page.locator(".expanded-content").count();
    for (let i = 0; i < count; i++) {
      const section = page.locator(".expanded-content").nth(i);
      await section.waitFor({ state: "visible", timeout: 10000 });
      await expect(section).toBeVisible();
    };
  });
  });