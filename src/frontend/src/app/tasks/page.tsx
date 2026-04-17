'use client';

import { PageSection, Title, Button } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

export default function TasksPage() {
  return (
    <PageSection>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title headingLevel="h1" size="2xl">
          Tasks
        </Title>
        <Button variant="primary" icon={<PlusCircleIcon />}>
          New Task
        </Button>
      </div>

      <p>Task list will appear here.</p>
    </PageSection>
  );
}
