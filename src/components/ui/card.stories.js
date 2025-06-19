import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card';
import { Button } from './button';
import { expect, fn, userEvent, within } from '@storybook/test';

export default {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export const Default = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test card structure
    const card = canvas.getByRole('generic');
    await expect(card).toBeInTheDocument();
    
    // Test card title
    const title = canvas.getByText('Card Title');
    await expect(title).toBeInTheDocument();
    
    // Test card description
    const description = canvas.getByText('Card description goes here');
    await expect(description).toBeInTheDocument();
    
    // Test card content
    const content = canvas.getByText('This is the card content area.');
    await expect(content).toBeInTheDocument();
    
    // Test button in footer
    const button = canvas.getByRole('button', { name: 'Action' });
    await expect(button).toBeInTheDocument();
  },
};

export const WithoutDescription = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has no description.</p>
      </CardContent>
    </Card>
  ),
};

export const WithForm = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input 
            id="email"
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input 
            id="password"
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Sign In</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test form elements
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');
    const signInButton = canvas.getByRole('button', { name: 'Sign In' });
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    
    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();
    await expect(signInButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
    
    // Test form interaction
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('password123');
  },
};

export const ProductCard = {
  render: (args) => (
    <Card {...args} className="w-[300px]">
      <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
        <span className="text-gray-400 text-4xl">📱</span>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">iPhone 15 Pro</CardTitle>
        <CardDescription>Latest Apple smartphone with advanced features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">$999</div>
        <div className="text-sm text-gray-500 mt-1">Free shipping</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="outline" size="icon">♡</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test product information
    const productName = canvas.getByText('iPhone 15 Pro');
    const price = canvas.getByText('$999');
    const addToCartButton = canvas.getByRole('button', { name: 'Add to Cart' });
    
    await expect(productName).toBeInTheDocument();
    await expect(price).toBeInTheDocument();
    await expect(addToCartButton).toBeInTheDocument();
    
    // Test add to cart interaction
    await userEvent.click(addToCartButton);
  },
};

export const InteractionTest = {
  render: (args) => {
    const [count, setCount] = React.useState(0);
    
    return (
      <Card {...args} className="w-[300px]">
        <CardHeader>
          <CardTitle>Counter Card</CardTitle>
          <CardDescription>Test component interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold" data-testid="counter">{count}</div>
            <p className="text-sm text-gray-500 mt-2">Current count</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCount(c => c - 1)}
            data-testid="decrement"
          >
            -
          </Button>
          <Button 
            onClick={() => setCount(c => c + 1)}
            data-testid="increment"
          >
            +
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setCount(0)}
            data-testid="reset"
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Get elements
    const counter = canvas.getByTestId('counter');
    const incrementButton = canvas.getByTestId('increment');
    const decrementButton = canvas.getByTestId('decrement');
    const resetButton = canvas.getByTestId('reset');
    
    // Test initial state
    await expect(counter).toHaveTextContent('0');
    
    // Test increment
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent('1');
    
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent('3');
    
    // Test decrement
    await userEvent.click(decrementButton);
    await expect(counter).toHaveTextContent('2');
    
    // Test reset
    await userEvent.click(resetButton);
    await expect(counter).toHaveTextContent('0');
  },
};