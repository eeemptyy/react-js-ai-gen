import { Button } from '../components/ui/button';
import { expect, fn, userEvent, within } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    children: 'Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test button is rendered
    await expect(button).toBeInTheDocument();
    
    // Test button text
    await expect(button).toHaveTextContent('Button');
    
    // Test button click
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test secondary variant styling
    await expect(button).toHaveClass('bg-slate-100');
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test destructive variant styling
    await expect(button).toHaveClass('bg-red-500');
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Icon = {
  args: {
    size: 'icon',
    children: '🚀',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test disabled state
    await expect(button).toBeDisabled();
    await expect(button).toHaveClass('disabled:opacity-50');
  },
};

export const InteractionTest = {
  args: {
    children: 'Click me!',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    
    // Test hover state (visual test)
    await userEvent.hover(button);
    
    // Test click interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    
    // Test multiple clicks
    await userEvent.click(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};