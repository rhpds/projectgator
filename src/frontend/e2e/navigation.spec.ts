import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Welcome to Projectgator/ })).toBeVisible();
  });

  test('should navigate to Projects page from sidebar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Projects/ }).first().click();
    await expect(page).toHaveURL('/projects');
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  });

  test('should navigate to Tasks page from sidebar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Tasks/ }).first().click();
    await expect(page).toHaveURL('/tasks');
    await expect(page.getByRole('heading', { name: 'Tasks', level: 1 })).toBeVisible();
  });

  test('should navigate to Milestones page from sidebar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Milestones/ }).first().click();
    await expect(page).toHaveURL('/milestones');
    await expect(page.getByRole('heading', { name: 'Milestones', level: 1 })).toBeVisible();
  });

  test('should show Coming Soon on Milestones page', async ({ page }) => {
    await page.goto('/milestones');
    await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible();
  });

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/');

    // Initial theme (light mode)
    const html = page.locator('html');

    // Click theme toggle
    await page.getByRole('button', { name: /Switch to dark mode/ }).click();

    // Should have dark theme class
    await expect(html).toHaveClass(/pf-v6-theme-dark/);

    // Toggle back to light
    await page.getByRole('button', { name: /Switch to light mode/ }).click();

    // Should not have dark theme class
    await expect(html).not.toHaveClass(/pf-v6-theme-dark/);
  });

  test('should persist theme preference', async ({ page }) => {
    await page.goto('/');

    // Switch to dark mode
    await page.getByRole('button', { name: /Switch to dark mode/ }).click();

    // Reload page
    await page.reload();

    // Should still be in dark mode
    await expect(page.locator('html')).toHaveClass(/pf-v6-theme-dark/);
  });
});
