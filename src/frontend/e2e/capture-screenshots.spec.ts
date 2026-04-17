import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const screenshotsDir = path.join(__dirname, '../../../docs/screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Capture Screenshots', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(screenshotsDir, 'home.png'),
      fullPage: true,
    });
  });

  test('projects page - empty', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    // Wait for content to load
    await page.waitForSelector('h1:has-text("Projects")');
    await page.screenshot({
      path: path.join(screenshotsDir, 'projects-empty.png'),
      fullPage: true,
    });
  });

  test('projects page - with project', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    // Create a project
    await page.getByRole('button', { name: 'New Project' }).click();
    await page.waitForSelector('.pf-v6-c-modal-box');
    await page.locator('#project-name').fill('Sample Project');
    await page.locator('#project-description').fill('This is a demo project for screenshots');
    await page.getByRole('button', { name: 'Create' }).click();

    // Wait for project to appear
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(screenshotsDir, 'projects-list.png'),
      fullPage: true,
    });
  });

  test('create project modal', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'New Project' }).click();
    await page.waitForSelector('.pf-v6-c-modal-box');

    // Fill in some example data
    await page.locator('#project-name').fill('New Project Example');
    await page.locator('#project-description').fill('This demonstrates the project creation form');

    await page.screenshot({
      path: path.join(screenshotsDir, 'create-project-modal.png'),
    });
  });

  test('tasks page - empty', async ({ page }) => {
    await page.goto('/tasks');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h1:has-text("Tasks")');
    await page.screenshot({
      path: path.join(screenshotsDir, 'tasks-empty.png'),
      fullPage: true,
    });
  });

  test('tasks page - with task', async ({ page }) => {
    await page.goto('/tasks');
    await page.waitForLoadState('networkidle');

    // Create a task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.waitForSelector('.pf-v6-c-modal-box');
    await page.locator('#task-title').fill('Sample Task');
    await page.locator('#task-description').fill('This is a demo task for screenshots');
    await page.locator('#task-priority').selectOption('high');
    await page.getByRole('button', { name: 'Create' }).click();

    // Wait for task to appear
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(screenshotsDir, 'tasks-list.png'),
      fullPage: true,
    });
  });

  test('create task modal', async ({ page }) => {
    await page.goto('/tasks');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'New Task' }).click();
    await page.waitForSelector('.pf-v6-c-modal-box');

    // Fill in some example data
    await page.locator('#task-title').fill('New Task Example');
    await page.locator('#task-description').fill('This demonstrates the task creation form');
    await page.locator('#task-priority').selectOption('critical');

    await page.screenshot({
      path: path.join(screenshotsDir, 'create-task-modal.png'),
    });
  });

  test('dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to dark mode
    await page.getByRole('button', { name: /Switch to dark mode/ }).click();
    await page.waitForTimeout(500); // Wait for theme transition

    await page.screenshot({
      path: path.join(screenshotsDir, 'dark-mode.png'),
      fullPage: true,
    });
  });
});
