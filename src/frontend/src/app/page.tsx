'use client';

import {
  PageSection,
  Title,
  Card,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  Button,
  Gallery,
} from '@patternfly/react-core';
import ProjectDiagramIcon from '@patternfly/react-icons/dist/esm/icons/project-diagram-icon';
import ListIcon from '@patternfly/react-icons/dist/esm/icons/list-icon';
import BullseyeIcon from '@patternfly/react-icons/dist/esm/icons/bullseye-icon';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Projects',
      icon: ProjectDiagramIcon,
      description: 'Create and manage projects with descriptions, deadlines, and status tracking.',
      path: '/projects',
      color: '#06c',
      available: true,
    },
    {
      title: 'Tasks',
      icon: ListIcon,
      description: 'Track work items with priorities, assignees, and time estimates.',
      path: '/tasks',
      color: '#3e8635',
      available: true,
    },
    {
      title: 'Milestones',
      icon: BullseyeIcon,
      description: 'Set key deadlines and track progress toward major deliverables.',
      path: '/milestones',
      color: '#f0ab00',
      available: false,
    },
  ];

  return (
    <>
      <PageSection variant="light">
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <Title headingLevel="h1" size="4xl" style={{ marginBottom: '1rem' }}>
            🐊 Welcome to Projectgator
          </Title>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            A simple, powerful project management tool. Track projects, tasks, and milestones
            without the complexity of cloud deployment orchestration.
          </p>
          <Link href="/projects">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </PageSection>

      <PageSection padding={{ default: 'padding' }}>
        <Title headingLevel="h2" size="xl" style={{ marginBottom: '1.5rem' }}>
          Features
        </Title>

        <Gallery hasGutter minWidths={{ default: '100%', md: '350px' }}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              isFullHeight
              style={{
                opacity: feature.available ? 1 : 0.6,
              }}
            >
              <CardTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <feature.icon
                    style={{
                      fontSize: '1.5rem',
                      color: feature.color,
                    }}
                  />
                  <span>{feature.title}</span>
                  {!feature.available && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--pf-v6-global--palette--gold-200)',
                        color: 'var(--pf-v6-global--palette--black-900)',
                        borderRadius: '3px',
                        fontWeight: 600,
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </CardTitle>
              <CardBody>
                <p>{feature.description}</p>
                {feature.available ? (
                  <Link href={feature.path}>
                    <Button variant="secondary" style={{ marginTop: '1rem' }}>
                      View {feature.title}
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" isDisabled style={{ marginTop: '1rem' }}>
                    View {feature.title}
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </Gallery>
      </PageSection>

      <PageSection variant="light">
        <Grid hasGutter>
          <GridItem span={6}>
            <Title headingLevel="h3" size="lg" style={{ marginBottom: '1rem' }}>
              Built with PatternFly
            </Title>
            <p>
              Projectgator uses Red Hat's PatternFly design system for a consistent,
              accessible, and professional user experience.
            </p>
          </GridItem>
          <GridItem span={6}>
            <Title headingLevel="h3" size="lg" style={{ marginBottom: '1rem' }}>
              Based on Labagator
            </Title>
            <p>
              Simplified from the battle-tested Labagator architecture, focusing on core
              project management without cloud deployment complexity.
            </p>
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
}
