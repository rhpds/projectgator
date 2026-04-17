'use client';

import { PageSection, Title, Button, Card, CardBody } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import BullseyeIcon from '@patternfly/react-icons/dist/esm/icons/bullseye-icon';

export default function MilestonesPage() {
  return (
    <PageSection padding={{ default: 'padding' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title headingLevel="h1" size="2xl">
          Milestones
        </Title>
        <Button variant="primary" icon={<PlusCircleIcon />} isDisabled>
          New Milestone
        </Button>
      </div>

      <Card>
        <CardBody>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <BullseyeIcon style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--pf-v6-global--Color--200)' }} />
            <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
              Coming Soon
            </Title>
            <p>
              Milestone tracking is coming soon. You'll be able to set key deadlines and track progress toward major deliverables.
            </p>
          </div>
        </CardBody>
      </Card>
    </PageSection>
  );
}
