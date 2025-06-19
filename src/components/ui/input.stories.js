import { Input } from './input';
import { expect, fn, userEvent, within } from '@storybook/test';

export default {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: { 
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    // Test input is rendered
    await expect(input).toBeInTheDocument();
    
    // Test placeholder
    await expect(input).toHaveAttribute('placeholder', 'Enter text...');
    
    // Test typing
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
  },
};

export const Email = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    // Test email input type
    await expect(input).toHaveAttribute('type', 'email');
    
    // Test email validation
    await userEvent.type(input, 'test@example.com');
    await expect(input).toHaveValue('test@example.com');
  },
};

export const Password = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your password...');
    
    // Test password input type
    await expect(input).toHaveAttribute('type', 'password');
    
    // Test password input
    await userEvent.type(input, 'secretpassword');
    await expect(input).toHaveValue('secretpassword');
  },
};

export const Number = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
    min: 0,
    max: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('spinbutton');
    
    // Test number input type
    await expect(input).toHaveAttribute('type', 'number');
    
    // Test number input
    await userEvent.type(input, '42');
    await expect(input).toHaveValue(42);
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit this',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    // Test disabled state
    await expect(input).toBeDisabled();
    await expect(input).toHaveClass('disabled:opacity-50');
  },
};

export const WithLabel = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="name-input" className="text-sm font-medium">
        Full Name
      </label>
      <Input id="name-input" {...args} />
    </div>
  ),
  args: {
    placeholder: 'John Doe',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Full Name');
    const label = canvas.getByText('Full Name');
    
    // Test label association
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
    
    // Test input focus via label click
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

export const WithError = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="email-input" className="text-sm font-medium">
        Email Address
      </label>
      <Input 
        id="email-input" 
        {...args} 
        className="border-red-500 focus-visible:ring-red-500"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <p id="email-error" className="text-sm text-red-500">
        Please enter a valid email address
      </p>
    </div>
  ),
  args: {
    type: 'email',
    placeholder: 'Enter email...',
    value: 'invalid-email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Email Address');
    const errorMessage = canvas.getByText('Please enter a valid email address');
    
    // Test error state
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveClass('border-red-500');
    await expect(errorMessage).toBeInTheDocument();
  },
};

export const SearchInput = {
  args: {
    type: 'search',
    placeholder: 'Search products...',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    
    // Test search input
    await expect(input).toHaveAttribute('type', 'search');
    
    // Test search functionality
    await userEvent.type(input, 'react components');
    await expect(input).toHaveValue('react components');
    
    // Test clear search (common in search inputs)
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
  },
};

export const InteractionTest = {
  render: (args) => {
    const [value, setValue] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="interactive-input" className="text-sm font-medium">
            Interactive Input
          </label>
          <Input
            id="interactive-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type something..."
            data-testid="interactive-input"
          />
        </div>
        <div className="text-sm text-gray-600">
          <p data-testid="value-display">Value: "{value}"</p>
          <p data-testid="focus-display">Focused: {focused ? 'Yes' : 'No'}</p>
          <p data-testid="length-display">Length: {value.length}</p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Get elements
    const input = canvas.getByTestId('interactive-input');
    const valueDisplay = canvas.getByTestId('value-display');
    const focusDisplay = canvas.getByTestId('focus-display');
    const lengthDisplay = canvas.getByTestId('length-display');
    
    // Test initial state
    await expect(valueDisplay).toHaveTextContent('Value: ""');
    await expect(focusDisplay).toHaveTextContent('Focused: No');
    await expect(lengthDisplay).toHaveTextContent('Length: 0');
    
    // Test focus
    await userEvent.click(input);
    await expect(focusDisplay).toHaveTextContent('Focused: Yes');
    
    // Test typing
    await userEvent.type(input, 'Hello');
    await expect(valueDisplay).toHaveTextContent('Value: "Hello"');
    await expect(lengthDisplay).toHaveTextContent('Length: 5');
    
    // Test blur
    await userEvent.tab();
    await expect(focusDisplay).toHaveTextContent('Focused: No');
    
    // Test clear and retype
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, 'New text');
    await expect(valueDisplay).toHaveTextContent('Value: "New text"');
    await expect(lengthDisplay).toHaveTextContent('Length: 8');
  },
};