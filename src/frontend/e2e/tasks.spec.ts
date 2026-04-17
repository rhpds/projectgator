import { test, expect } from '@playwright/test';

test.describe('Tasks Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tasks');
    await page.waitForLoadState('networkidle');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tasks', level: 1 })).toBeVisible();
  });

  test('should have New Task button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'New Task' })).toBeVisible();
  });

  test('should open modal when clicking New Task', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();
  });

  test('should close modal when clicking Cancel', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    // Use last Cancel button (modal's cancel)
    await page.getByRole('button', { name: 'Cancel' }).last().click();
    await expect(page.locator('.pf-v6-c-modal-box')).not.toBeVisible();
  });

  test('should disable Create button when task title is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    const createButton = page.getByRole('button', { name: 'Create' });
    await expect(createButton).toBeDisabled();
  });

  test('should enable Create button when task title is filled', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    await page.locator('#task-title').fill('Test Task');

    const createButton = page.getByRole('button', { name: 'Create' });
    await expect(createButton).toBeEnabled();
  });

  test('should create a new task successfully', async ({ page }) => {
    // Open modal
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    // Fill form
    await page.locator('#task-title').fill('E2E Test Task');
    await page.locator('#task-description').fill('This is a test task created by e2e tests');

    // Submit
    await page.getByRole('button', { name: 'Create' }).click();

    // Wait for modal to close
    await expect(page.locator('.pf-v6-c-modal-box')).not.toBeVisible();

    // Should show success message
    await expect(page.getByText('Task created successfully!')).toBeVisible({ timeout: 10000 });

    // Should show the new task in the list
    await expect(page.getByText('E2E Test Task')).toBeVisible();
  });

  test('should allow selecting priority', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    const prioritySelect = page.locator('#task-priority');
    await expect(prioritySelect).toBeVisible();

    // Verify we can select different priorities
    await prioritySelect.selectOption('high');
    await expect(prioritySelect).toHaveValue('high');

    await prioritySelect.selectOption('low');
    await expect(prioritySelect).toHaveValue('low');

    await prioritySelect.selectOption('critical');
    await expect(prioritySelect).toHaveValue('critical');
  });

  test('should show validation behavior', async ({ page }) => {
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page.locator('.pf-v6-c-modal-box')).toBeVisible();

    const createButton = page.getByRole('button', { name: 'Create' });
    const titleInput = page.locator('#task-title');

    // Initially disabled
    await expect(createButton).toBeDisabled();

    // Enable when filled
    await titleInput.fill('Test Task');
    await expect(createButton).toBeEnabled();

    // Disable when cleared
    await titleInput.clear();
    await expect(createButton).toBeDisabled();
  });
});
