'use client';

import '@patternfly/patternfly/patternfly.css';
import { Page, Masthead, MastheadMain, MastheadBrand, MastheadContent } from '@patternfly/react-core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Page
          masthead={
            <Masthead>
              <MastheadMain>
                <MastheadBrand href="/">
                  <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    🐊 Projectgator
                  </div>
                </MastheadBrand>
              </MastheadMain>
              <MastheadContent>
                {/* Navigation will go here */}
              </MastheadContent>
            </Masthead>
          }
        >
          {children}
        </Page>
      </body>
    </html>
  );
}
