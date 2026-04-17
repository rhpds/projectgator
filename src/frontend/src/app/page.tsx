'use client';

import { PageSection, Title, Card, CardBody, Grid, GridItem, Button } from '@patternfly/react-core';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <PageSection>
      <Title headingLevel="h1" size="2xl" style={{ marginBottom: '2rem' }}>
        Welcome to Projectgator
      </Title>

      <Grid hasGutter>
        <GridItem span={4}>
          <Card isFullHeight>
            <CardBody>
              <Title headingLevel="h2" size="xl">Projects</Title>
              <p>Manage your projects, track progress, and collaborate with your team.</p>
              <Button variant="primary" onClick={() => router.push('/projects')} style={{ marginTop: '1rem' }}>
                View Projects
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={4}>
          <Card isFullHeight>
            <CardBody>
              <Title headingLevel="h2" size="xl">Tasks</Title>
              <p>Track work items, assign to team members, and monitor completion.</p>
              <Button variant="primary" onClick={() => router.push('/tasks')} style={{ marginTop: '1rem' }}>
                View Tasks
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={4}>
          <Card isFullHeight>
            <CardBody>
              <Title headingLevel="h2" size="xl">Milestones</Title>
              <p>Set key deadlines and track progress toward major deliverables.</p>
              <Button variant="secondary" isDisabled style={{ marginTop: '1rem' }}>
                Coming Soon
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
