import '@patternfly/patternfly/patternfly.css';
import { Page, PageSection, Masthead, MastheadMain, MastheadBrand, MastheadContent } from '@patternfly/react-core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projectgator',
  description: 'Simple project management tool',
};

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
