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
  FormSelect,
  FormSelectOption,
  Card,
  CardBody,
  Gallery,
  Label,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignee_id: number | null;
  reporter_id: number;
  due_date: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project_id: 1,
    due_date: '',
    estimated_hours: '',
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        project_id: 1,
        due_date: '',
        estimated_hours: '',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/v1/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reporter_id: 1, // TODO: Get from auth context
          estimated_hours: formData.estimated_hours ? parseFloat(formData.estimated_hours) : null,
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        handleModalToggle();
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    fetch('/api/v1/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'blue' | 'green' | 'orange' | 'grey' | 'red'> = {
      todo: 'blue',
      in_progress: 'cyan',
      blocked: 'red',
      done: 'green',
    };
    return colors[status] || 'grey';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, 'grey' | 'blue' | 'orange' | 'red'> = {
      low: 'grey',
      medium: 'blue',
      high: 'orange',
      critical: 'red',
    };
    return colors[priority] || 'grey';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      todo: 'To Do',
      in_progress: 'In Progress',
      blocked: 'Blocked',
      done: 'Done',
    };
    return labels[status] || status;
  };

  return (
    <>
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Title headingLevel="h1" size="2xl">
            Tasks
          </Title>
          <Button variant="primary" icon={<PlusCircleIcon />} onClick={handleModalToggle}>
            New Task
          </Button>
        </div>

        {tasks.length === 0 ? (
          <Card>
            <CardBody>
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
                  No tasks yet
                </Title>
                <p style={{ marginBottom: '2rem' }}>
                  Create your first task to get started.
                </p>
                <Button variant="primary" icon={<PlusCircleIcon />} onClick={handleModalToggle}>
                  Create Your First Task
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <Gallery hasGutter minWidths={{ default: '100%', md: '350px', lg: '400px' }}>
            {tasks.map((task) => (
              <Card key={task.id} isSelectable isFullHeight>
                <CardBody>
                  <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
                    <FlexItem>
                      <Title headingLevel="h3" size="lg">
                        {task.title}
                      </Title>
                    </FlexItem>
                    <FlexItem>
                      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <Label color={getStatusColor(task.status)}>
                            {getStatusLabel(task.status)}
                          </Label>
                        </FlexItem>
                        <FlexItem>
                          <Label color={getPriorityColor(task.priority)}>
                            {task.priority.toUpperCase()}
                          </Label>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                    {task.description && (
                      <FlexItem>
                        <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                          {task.description}
                        </p>
                      </FlexItem>
                    )}
                    {task.due_date && (
                      <FlexItem>
                        <small style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                          Due: {new Date(task.due_date).toLocaleDateString()}
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
        title="Create New Task"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button key="create" variant="primary" onClick={handleSubmit}>
            Create
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        <Form>
          <FormGroup label="Task Title" isRequired fieldId="task-title">
            <TextInput
              isRequired
              type="text"
              id="task-title"
              name="task-title"
              value={formData.title}
              onChange={(_event, value) => setFormData({ ...formData, title: value })}
            />
          </FormGroup>

          <FormGroup label="Description" fieldId="task-description">
            <TextArea
              id="task-description"
              name="task-description"
              value={formData.description}
              onChange={(_event, value) => setFormData({ ...formData, description: value })}
              rows={3}
            />
          </FormGroup>

          <FormGroup label="Priority" fieldId="task-priority">
            <FormSelect
              value={formData.priority}
              onChange={(_event, value) => setFormData({ ...formData, priority: value })}
              id="task-priority"
              name="task-priority"
            >
              <FormSelectOption value="low" label="Low" />
              <FormSelectOption value="medium" label="Medium" />
              <FormSelectOption value="high" label="High" />
              <FormSelectOption value="critical" label="Critical" />
            </FormSelect>
          </FormGroup>

          <FormGroup label="Due Date" fieldId="task-due-date">
            <DatePicker
              value={formData.due_date}
              onChange={(_event, value) => setFormData({ ...formData, due_date: value })}
            />
          </FormGroup>

          <FormGroup label="Estimated Hours" fieldId="task-estimated-hours">
            <TextInput
              type="number"
              id="task-estimated-hours"
              name="task-estimated-hours"
              value={formData.estimated_hours}
              onChange={(_event, value) => setFormData({ ...formData, estimated_hours: value })}
            />
          </FormGroup>
        </Form>
      </Modal>
    </>
  );
}
