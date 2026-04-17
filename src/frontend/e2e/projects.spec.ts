import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  });

  test('should have New Project button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'New Project' })).toBeVisible();
  });

  test('should open modal when clicking New Project', async ({ page }) => {
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();
  });

  test('should close modal when clicking Cancel', async ({ page }) => {
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    // Use last Cancel button (modal's cancel)
    await page.getByRole('button', { name: 'Cancel' }).last().click();
    await expect(page.locator('.pf-v6-c-modal-box')).not.toBeVisible();
  });

  test('should disable Create button when project name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    // Find Create button (will be the primary button in modal footer)
    const createButton = page.getByRole('button', { name: 'Create' });
    await expect(createButton).toBeDisabled();
  });

  test('should enable Create button when project name is filled', async ({ page }) => {
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    await page.locator('#project-name').fill('Test Project');

    const createButton = page.getByRole('button', { name: 'Create' });
    await expect(createButton).toBeEnabled();
  });

  test('should create a new project successfully', async ({ page }) => {
    // Open modal
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    // Fill form
    await page.locator('#project-name').fill('E2E Test Project');
    await page.locator('#project-description').fill('This is a test project created by e2e tests');

    // Submit
    await page.getByRole('button', { name: 'Create' }).click();

    // Wait for modal to close
    await expect(page.locator('.pf-v6-c-modal-box')).not.toBeVisible();

    // Should show success message
    await expect(page.getByText('Project created successfully!')).toBeVisible({ timeout: 10000 });

    // Should show the new project in the list
    await expect(page.getByText('E2E Test Project')).toBeVisible();
  });

  test('should show validation behavior', async ({ page }) => {
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    const createButton = page.getByRole('button', { name: 'Create' });
    const nameInput = page.locator('#project-name');

    // Initially disabled
    await expect(createButton).toBeDisabled();

    // Enable when filled
    await nameInput.fill('Test');
    await expect(createButton).toBeEnabled();

    // Disable when cleared
    await nameInput.clear();
    await expect(createButton).toBeDisabled();
  });
});
