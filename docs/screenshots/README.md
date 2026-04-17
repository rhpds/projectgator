# Screenshots

This directory contains screenshots of Projectgator in action, captured at 1920x1080 resolution.

## Screenshots Available

- `home.png` - Home page with feature overview and navigation
- `projects-empty.png` - Projects page empty state with call-to-action
- `tasks-empty.png` - Tasks page empty state with call-to-action
- `dark-mode.png` - Dark mode interface with full navigation
- `create-project-modal.png` - New project creation modal with form fields
- `create-task-modal.png` - New task creation modal with priority selection

## Capturing Screenshots

Screenshots are automatically captured using Playwright e2e tests:

```bash
cd src/frontend
npm run test:e2e -- capture-screenshots
```

This will capture screenshots at 1920x1080 resolution and save them to this directory.

### Manual Screenshot Capture

To manually update screenshots:

1. Start the application locally (`npm run dev` in src/frontend)
2. Navigate to the desired page at http://localhost:3001
3. Set browser window to 1920x1080
4. Use browser developer tools or screenshot tools
5. Save as PNG in this directory
