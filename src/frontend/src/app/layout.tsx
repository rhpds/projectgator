'use client';

import '@patternfly/react-core/dist/styles/base.css';
import { useEffect, useState } from 'react';
import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Nav,
  NavList,
  NavItem,
  PageSidebar,
  PageSidebarBody,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
  PageToggleButton,
  MastheadToggle,
} from '@patternfly/react-core';
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon';
import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import ProjectDiagramIcon from '@patternfly/react-icons/dist/esm/icons/project-diagram-icon';
import ListIcon from '@patternfly/react-icons/dist/esm/icons/list-icon';
import BullseyeIcon from '@patternfly/react-icons/dist/esm/icons/bullseye-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('projectgator-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('pf-v6-theme-dark');
    } else {
      root.classList.remove('pf-v6-theme-dark');
    }
    localStorage.setItem('projectgator-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { label: 'Projects', path: '/projects', icon: ProjectDiagramIcon },
    { label: 'Tasks', path: '/tasks', icon: ListIcon },
    { label: 'Milestones', path: '/milestones', icon: BullseyeIcon },
  ];

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen}>
      <PageSidebarBody>
        <Nav>
          <NavList>
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                itemId={item.path}
                isActive={pathname === item.path}
              >
                <Link href={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <item.icon /> {item.label}
                </Link>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  const masthead = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant="plain"
          aria-label="Toggle navigation"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand href="/">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🐊</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Projectgator</span>
          </Link>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar isFullHeight isStatic>
          <ToolbarContent>
            <ToolbarItem>
              <Button
                variant="plain"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                onClick={toggleTheme}
                icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Page masthead={masthead} sidebar={sidebar} isManagedSidebar isContentFilled>
          {children}
        </Page>
      </body>
    </html>
  );
}
