'use client';

import { useState, useEffect } from 'react';
import {
  PageSection,
  Title,
  Button,
  Modal,
  ModalVariant,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  DatePicker,
  Card,
  CardBody,
  Gallery,
  Label,
  Flex,
  FlexItem,
  Alert,
  AlertVariant,
  AlertActionCloseButton,
  Spinner,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

interface Project {
  id: number;
  name: string;
  description: string | null;
  status: string;
  owner_id: number;
  start_date: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    start_date: '',
    due_date: '',
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      // Reset form when opening
      setFormData({
        name: '',
        description: '',
        status: 'planning',
        start_date: '',
        due_date: '',
      });
      setError(null);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          owner_id: 1, // TODO: Get from auth context
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setSuccess('Project created successfully!');
        handleModalToggle();
        setTimeout(() => setSuccess(null), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || 'Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Fetch projects on mount
    setIsLoading(true);
    fetch('/api/v1/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please refresh the page.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'blue' | 'green' | 'orange' | 'grey' | 'red'> = {
      planning: 'blue',
      active: 'green',
      on_hold: 'orange',
      completed: 'grey',
      cancelled: 'red',
    };
    return colors[status] || 'grey';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planning: 'Planning',
      active: 'Active',
      on_hold: 'On Hold',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <>
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Title headingLevel="h1" size="2xl">
            Projects
          </Title>
          <Button variant="primary" icon={<PlusCircleIcon />} onClick={handleModalToggle}>
            New Project
          </Button>
        </div>

        {success && (
          <Alert
            variant={AlertVariant.success}
            title={success}
            actionClose={<AlertActionCloseButton onClose={() => setSuccess(null)} />}
            style={{ marginBottom: '1rem' }}
          />
        )}

        {error && !isModalOpen && (
          <Alert
            variant={AlertVariant.danger}
            title={error}
            actionClose={<AlertActionCloseButton onClose={() => setError(null)} />}
            style={{ marginBottom: '1rem' }}
          />
        )}

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Spinner size="xl" />
            <p style={{ marginTop: '1rem' }}>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardBody>
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
                  No projects yet
                </Title>
                <p style={{ marginBottom: '2rem' }}>
                  Get started by creating your first project.
                </p>
                <Button variant="primary" icon={<PlusCircleIcon />} onClick={handleModalToggle}>
                  Create Your First Project
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <Gallery hasGutter minWidths={{ default: '100%', md: '350px', lg: '400px' }}>
            {projects.map((project) => (
              <Card key={project.id} isSelectable isFullHeight>
                <CardBody>
                  <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
                    <FlexItem>
                      <Title headingLevel="h3" size="lg">
                        {project.name}
                      </Title>
                    </FlexItem>
                    <FlexItem>
                      <Label color={getStatusColor(project.status)}>
                        {getStatusLabel(project.status)}
                      </Label>
                    </FlexItem>
                    {project.description && (
                      <FlexItem>
                        <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                          {project.description}
                        </p>
                      </FlexItem>
                    )}
                    {project.due_date && (
                      <FlexItem>
                        <small style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                          Due: {new Date(project.due_date).toLocaleDateString()}
                        </small>
                      </FlexItem>
                    )}
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Gallery>
        )}
      </PageSection>

      <Modal
        variant={ModalVariant.medium}
        title="Create New Project"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button
            key="create"
            variant="primary"
            onClick={handleSubmit}
            isDisabled={isSubmitting || !formData.name.trim()}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle} isDisabled={isSubmitting}>
            Cancel
          </Button>,
        ]}
      >
        {error && (
          <Alert
            variant={AlertVariant.danger}
            title={error}
            actionClose={<AlertActionCloseButton onClose={() => setError(null)} />}
            style={{ marginBottom: '1rem' }}
          />
        )}
        <Form>
          <FormGroup label="Project Name" isRequired fieldId="project-name">
            <TextInput
              isRequired
              type="text"
              id="project-name"
              name="project-name"
              value={formData.name}
              onChange={(_event, value) => {
                setFormData({ ...formData, name: value });
                if (error && value.trim()) {
                  setError(null);
                }
              }}
              validated={error && !formData.name.trim() ? 'error' : 'default'}
            />
          </FormGroup>

          <FormGroup label="Description" fieldId="project-description">
            <TextArea
              id="project-description"
              name="project-description"
              value={formData.description}
              onChange={(_event, value) => setFormData({ ...formData, description: value })}
              rows={3}
            />
          </FormGroup>

          <FormGroup label="Start Date" fieldId="project-start-date">
            <DatePicker
              value={formData.start_date}
              onChange={(_event, value) => setFormData({ ...formData, start_date: value })}
            />
          </FormGroup>

          <FormGroup label="Due Date" fieldId="project-due-date">
            <DatePicker
              value={formData.due_date}
              onChange={(_event, value) => setFormData({ ...formData, due_date: value })}
            />
          </FormGroup>
        </Form>
      </Modal>
    </>
  );
}
