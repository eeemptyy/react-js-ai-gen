import { Modal, ModalHeader, ModalContent, ModalTitle } from './modal';
import { Button } from './button';
import { Input } from './input';
import { expect, fn, userEvent, within } from '@storybook/test';
import * as React from 'react';

export default {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
  args: { 
    onClose: fn(),
  },
};

export const Default = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Default Modal</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p>This is a basic modal dialog. You can put any content here.</p>
          </ModalContent>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test initial state - modal should be closed
    let modal = canvas.queryByText('Default Modal');
    await expect(modal).not.toBeInTheDocument();
    
    // Test opening modal
    const openButton = canvas.getByRole('button', { name: 'Open Modal' });
    await userEvent.click(openButton);
    
    // Test modal is now visible
    modal = canvas.getByText('Default Modal');
    await expect(modal).toBeInTheDocument();
    
    // Test modal content
    const content = canvas.getByText('This is a basic modal dialog. You can put any content here.');
    await expect(content).toBeInTheDocument();
    
    // Test close button
    const closeButton = canvas.getByRole('button', { name: '' }); // X button has no text
    await userEvent.click(closeButton);
    
    // Wait for modal to close
    await expect(canvas.queryByText('Default Modal')).not.toBeInTheDocument();
  },
};

export const WithForm = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', email: '' });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };
    
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>
          Open Form Modal
        </Button>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          className="max-w-md"
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Contact Form</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal
    const openButton = canvas.getByRole('button', { name: 'Open Form Modal' });
    await userEvent.click(openButton);
    
    // Test form elements
    const nameInput = canvas.getByLabelText('Name');
    const emailInput = canvas.getByLabelText('Email');
    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    
    await expect(nameInput).toBeInTheDocument();
    await expect(emailInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
    
    // Test form input
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    
    await expect(nameInput).toHaveValue('John Doe');
    await expect(emailInput).toHaveValue('john@example.com');
    
    // Test cancel
    await userEvent.click(cancelButton);
    await expect(canvas.queryByText('Contact Form')).not.toBeInTheDocument();
  },
};

export const Confirmation = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const handleConfirm = () => {
      console.log('Action confirmed');
      setIsOpen(false);
    };
    
    return (
      <div className="p-8">
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          className="max-w-sm"
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Confirm Deletion</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Delete
              </Button>
            </div>
          </ModalContent>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open confirmation modal
    const deleteButton = canvas.getByRole('button', { name: 'Delete Item' });
    await userEvent.click(deleteButton);
    
    // Test confirmation dialog
    const confirmTitle = canvas.getByText('Confirm Deletion');
    const confirmMessage = canvas.getByText('Are you sure you want to delete this item? This action cannot be undone.');
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    const confirmButton = canvas.getByRole('button', { name: 'Delete' });
    
    await expect(confirmTitle).toBeInTheDocument();
    await expect(confirmMessage).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
    await expect(confirmButton).toBeInTheDocument();
    
    // Test confirmation
    await userEvent.click(confirmButton);
    await expect(canvas.queryByText('Confirm Deletion')).not.toBeInTheDocument();
  },
};

export const LargeContent = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>
          Open Large Modal
        </Button>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          className="max-w-2xl"
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Terms and Conditions</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4 text-sm">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
              <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
              <p>Qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
            </div>
            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Accept
              </Button>
            </div>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const BackdropClick = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (Click backdrop to close)
        </Button>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Backdrop Click Test</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p>Click outside this modal (on the backdrop) to close it.</p>
          </ModalContent>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal
    const openButton = canvas.getByRole('button', { name: 'Open Modal (Click backdrop to close)' });
    await userEvent.click(openButton);
    
    // Verify modal is open
    const modal = canvas.getByText('Backdrop Click Test');
    await expect(modal).toBeInTheDocument();
    
    // Note: Testing backdrop click is challenging in Storybook
    // In a real test environment, you could click on the backdrop element
    // For now, we'll test that the modal is properly rendered
    const instruction = canvas.getByText('Click outside this modal (on the backdrop) to close it.');
    await expect(instruction).toBeInTheDocument();
  },
};

export const InteractionTest = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    
    return (
      <div className="p-8">
        <div className="space-y-4">
          <p data-testid="counter-display">Counter: {counter}</p>
          <Button onClick={() => setIsOpen(true)}>
            Open Interactive Modal
          </Button>
        </div>
        
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <ModalHeader onClose={() => setIsOpen(false)}>
            <ModalTitle>Interactive Modal</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-4">
              <p>Counter inside modal: <span data-testid="modal-counter">{counter}</span></p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setCounter(c => c + 1)}
                  data-testid="increment"
                >
                  +1
                </Button>
                <Button 
                  onClick={() => setCounter(c => c - 1)}
                  data-testid="decrement"
                >
                  -1
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCounter(0)}
                  data-testid="reset"
                >
                  Reset
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test initial state
    const counterDisplay = canvas.getByTestId('counter-display');
    await expect(counterDisplay).toHaveTextContent('Counter: 0');
    
    // Open modal
    const openButton = canvas.getByRole('button', { name: 'Open Interactive Modal' });
    await userEvent.click(openButton);
    
    // Test modal counter
    const modalCounter = canvas.getByTestId('modal-counter');
    await expect(modalCounter).toHaveTextContent('0');
    
    // Test increment
    const incrementButton = canvas.getByTestId('increment');
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    
    await expect(modalCounter).toHaveTextContent('2');
    await expect(counterDisplay).toHaveTextContent('Counter: 2');
    
    // Test decrement
    const decrementButton = canvas.getByTestId('decrement');
    await userEvent.click(decrementButton);
    
    await expect(modalCounter).toHaveTextContent('1');
    
    // Test reset
    const resetButton = canvas.getByTestId('reset');
    await userEvent.click(resetButton);
    
    await expect(modalCounter).toHaveTextContent('0');
    await expect(counterDisplay).toHaveTextContent('Counter: 0');
    
    // Close modal and verify counter persists
    const closeButton = canvas.getByRole('button', { name: '' }); // X button
    await userEvent.click(closeButton);
    
    await expect(counterDisplay).toHaveTextContent('Counter: 0');
  },
};