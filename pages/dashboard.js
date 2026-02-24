import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.tabs = [
      this.chartOfAccounts,
      this.journalEntries,
      this.users,
      this.roles,
    ];

    // Dashboard Elements
    this.fiscalYearBtn = page.getByText("Fiscal Year", { exact: true });
    this.headOfficeBtn = page.getByText("Head Office");
    this.currencyBtn = page.getByText("Currency");
    this.emptyButtons = page.getByRole("main").getByRole("button").filter({ hasText: /^$/ });

    this.chartOfAccounts = page.getByRole("main").getByText("Chart of Accounts");
    this.journalEntries = page.getByRole("main").getByText("Journal Entries", { exact: true });
    this.users = page.getByRole("main").getByText("Users");
    this.roles = page.getByRole("main").getByText("Roles");

    // Buttons in Analytics Area
    this.cashFlowBtn = page.getByRole("button", { name: "Cash Flow" });
    this.pnlBtn = page.getByRole("button", { name: "Profit & Loss" });
    this.incomeVsExpBtn = page.getByRole("button", { name: "Income vs Expenses" });
    this.accountTypesBtn = page.getByRole("button", { name: "Account Types" });
    this.thisFiscalYearBtn = page.getByRole("button", { name: "This Fiscal Year" });
    this.lastFiscalYearBtn = page.getByRole("button", { name: "Last Fiscal Year" });
    this.currentMonthBtn = page.getByRole("button", { name: "Current Month" });
    this.lastMonthBtn = page.getByRole("button", { name: "Last Month" });

    // Sections
    this.recentActivities = page.getByText("Recent Activities", { exact: true });
    this.recentJournalEntries = page.getByText("Recent Journal Entries");
    this.pendingInvitations = page.getByText("Pending Invitations");

    // Expandable Elements
    this.expandButtons = page.getByRole("button", { name: "expand" });
    this.viewAllLinks = page.getByRole("link", { name: "View all" });

    // Navigation
    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });

    // Profile / Avatar
    this.profileMenu = page.locator(".relative.w-14");
    this.avatar = page.getByRole("img", { name: "User avatar" });
  }

  async clickAllDashboardTabs() {
    await this.chartOfAccounts.click();
    await this.journalEntries.click();
    await this.users.click();
    await this.roles.click();
  }

  async clickAllAnalyticsButtons() {
    await this.cashFlowBtn.click();
    await this.pnlBtn.click();
    await this.incomeVsExpBtn.click();
    await this.accountTypesBtn.click();
  }

  async clickAllTimeFilters() {
    await this.thisFiscalYearBtn.click();
    await this.lastFiscalYearBtn.click();
    await this.currentMonthBtn.click();
    await this.lastMonthBtn.click();
  }

  async expandAllSections() {
    const count = await this.expandButtons.count();
    for (let i = 0; i < count; i++) {
      await this.expandButtons.nth(i).click();
    }
  }

  async verifyVisibility() {
    await expect(this.recentActivities).toBeVisible();
    await expect(this.pendingInvitations).toBeVisible();
    await expect(this.chartOfAccounts).toBeVisible();
  }
}