# Code Style Guide

## Overview

This document outlines the coding standards and style guidelines for our React.js project. Following these guidelines ensures consistency, readability, and maintainability across the codebase.

## Table of Contents

- [General Principles](#general-principles)
- [JavaScript/React Guidelines](#javascriptreact-guidelines)
- [CSS/Styling Guidelines](#cssstyling-guidelines)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Git Guidelines](#git-guidelines)
- [Tools and Linting](#tools-and-linting)

## General Principles

### Code Quality
- **Clarity over cleverness** - Write code that is easy to understand
- **Consistency** - Follow established patterns throughout the project
- **Simplicity** - Keep solutions as simple as possible
- **Documentation** - Comment complex logic and provide clear documentation

### Performance
- Optimize for readability first, performance second
- Use React best practices for performance optimization
- Avoid premature optimization

## JavaScript/React Guidelines

### ES6+ Features
```javascript
// ✅ Use arrow functions for simple functions
const add = (a, b) => a + b;

// ✅ Use destructuring
const { name, email } = user;
const [count, setCount] = useState(0);

// ✅ Use template literals
const message = `Hello, ${name}!`;

// ✅ Use const/let instead of var
const API_URL = 'https://api.example.com';
let isLoading = false;
```

### React Components

#### Functional Components
```javascript
// ✅ Preferred: Functional components with hooks
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="user-profile">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default UserProfile;
```

#### Component Structure
```javascript
// ✅ Component structure order
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

// 1. Component definition
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  disabled = false,
  onClick,
  className,
  ...props 
}) => {
  // 2. Hooks (useState, useEffect, custom hooks)
  const [isPressed, setIsPressed] = useState(false);
  
  // 3. Event handlers
  const handleClick = (e) => {
    if (disabled) return;
    setIsPressed(true);
    onClick?.(e);
    setTimeout(() => setIsPressed(false), 150);
  };
  
  // 4. Computed values
  const buttonClasses = cn(
    'base-button-classes',
    variant === 'primary' && 'primary-classes',
    size === 'large' && 'large-classes',
    disabled && 'disabled-classes',
    isPressed && 'pressed-classes',
    className
  );
  
  // 5. Render
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

// 6. PropTypes
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

// 7. Export
export default Button;
```

### Hooks Guidelines

#### Custom Hooks
```javascript
// ✅ Custom hooks naming and structure
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

#### Hook Dependencies
```javascript
// ✅ Include all dependencies
useEffect(() => {
  fetchUser(userId, options);
}, [userId, options]); // Include all dependencies

// ✅ Use useCallback for function dependencies
const handleSubmit = useCallback((data) => {
  onSubmit(data, userId);
}, [onSubmit, userId]);
```

### Error Handling
```javascript
// ✅ Proper error handling
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Unable to load user data');
  }
};

// ✅ Error boundaries for React components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

## CSS/Styling Guidelines

### Tailwind CSS
```javascript
// ✅ Use Tailwind utility classes
const Card = ({ children, className }) => (
  <div className={cn(
    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
    className
  )}>
    {children}
  </div>
);

// ✅ Group related classes
const Button = ({ variant }) => (
  <button className={cn(
    // Base styles
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    // Focus styles
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    // Disabled styles
    "disabled:pointer-events-none disabled:opacity-50",
    // Variant styles
    variant === 'primary' && "bg-blue-600 text-white hover:bg-blue-700",
    variant === 'secondary' && "bg-gray-100 text-gray-900 hover:bg-gray-200"
  )}>
    Button
  </button>
);
```

### Custom CSS (when needed)
```css
/* ✅ Use CSS custom properties for theming */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --spacing-unit: 0.25rem;
  --border-radius: 0.375rem;
}

/* ✅ Use BEM methodology for custom components */
.card {
  @apply rounded-lg border border-gray-200 bg-white shadow-sm;
}

.card__header {
  @apply border-b border-gray-200 p-4;
}

.card__title {
  @apply text-lg font-semibold text-gray-900;
}

.card--highlighted {
  @apply border-blue-500 bg-blue-50;
}
```

## File Organization

### Directory Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   ├── forms/           # Form-specific components
│   └── layout/          # Layout components (Header, Footer, etc.)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── services/            # API services and external integrations
├── store/               # State management (Redux, Zustand, etc.)
├── types/               # TypeScript type definitions
├── __tests__/           # Test files
└── assets/              # Static assets (images, fonts, etc.)
```

### File Naming
```
// ✅ Component files - PascalCase
UserProfile.jsx
UserProfile.test.jsx
UserProfile.stories.js

// ✅ Utility files - camelCase
apiHelpers.js
dateUtils.js
validationHelpers.js

// ✅ Constants - UPPER_SNAKE_CASE
API_ENDPOINTS.js
ERROR_MESSAGES.js
```

## Naming Conventions

### Variables and Functions
```javascript
// ✅ Use camelCase for variables and functions
const userName = 'john_doe';
const isLoggedIn = true;
const handleUserClick = () => {};

// ✅ Use descriptive names
const fetchUserProfile = async (userId) => {};
const validateEmailFormat = (email) => {};

// ✅ Boolean variables should be questions
const isLoading = true;
const hasError = false;
const canEdit = true;
```

### Components and Classes
```javascript
// ✅ Use PascalCase for components
const UserProfile = () => {};
const NavigationMenu = () => {};

// ✅ Use descriptive component names
const ProductCard = () => {};
const ShoppingCartIcon = () => {};
```

### Constants
```javascript
// ✅ Use UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;
```

## Component Guidelines

### Props Design
```javascript
// ✅ Use descriptive prop names
const Button = ({ 
  children,           // Content of the button
  variant = 'default', // Visual style variant
  size = 'medium',    // Size of the button
  isLoading = false,  // Loading state
  disabled = false,   // Disabled state
  onClick,            // Click handler
  className,          // Additional CSS classes
  ...rest            // Forward remaining props
}) => {
  // Component implementation
};

// ✅ Provide default values
const Modal = ({ 
  isOpen = false,
  onClose = () => {},
  title = 'Modal',
  children 
}) => {
  // Component implementation
};
```

### Component Composition
```javascript
// ✅ Prefer composition over complex props
// Instead of this ❌
const Card = ({ hasHeader, headerTitle, hasFooter, footerContent }) => {};

// Do this ✅
const Card = ({ children }) => <div className="card">{children}</div>;
const CardHeader = ({ children }) => <div className="card-header">{children}</div>;
const CardContent = ({ children }) => <div className="card-content">{children}</div>;
const CardFooter = ({ children }) => <div className="card-footer">{children}</div>;

// Usage
<Card>
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Conditional Rendering
```javascript
// ✅ Use logical AND for simple conditions
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}

// ✅ Use ternary for if-else conditions
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// ✅ Use early returns for complex conditions
const UserProfile = ({ user }) => {
  if (!user) {
    return <div>No user found</div>;
  }
  
  if (!user.isActive) {
    return <div>User account is inactive</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

## Testing Guidelines

### Test File Structure
```javascript
// ✅ Test file naming: ComponentName.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  // ✅ Group related tests
  describe('Rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('States', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByText('Click me')).toBeDisabled();
    });
  });
});
```

### Test Naming
```javascript
// ✅ Use descriptive test names
it('displays loading spinner when isLoading is true', () => {});
it('submits form with valid data', () => {});
it('shows error message when API call fails', () => {});

// ✅ Use "should" pattern for behavior tests
it('should navigate to profile page when profile link is clicked', () => {});
it('should validate email format before submission', () => {});
```

## Git Guidelines

### Commit Messages
```bash
# ✅ Use conventional commit format
feat: add user authentication system
fix: resolve navigation menu mobile responsive issue
docs: update API documentation
style: format code with prettier
refactor: extract common validation logic
test: add unit tests for Button component
chore: update dependencies

# ✅ Include scope when relevant
feat(auth): implement password reset functionality
fix(ui): correct button spacing in card component
test(components): add interaction tests for Modal
```

### Branch Naming
```bash
# ✅ Use descriptive branch names
feature/user-authentication
bugfix/navigation-mobile-issue
hotfix/critical-security-patch
refactor/extract-api-helpers
docs/update-readme
```

## Tools and Linting

### ESLint Configuration
```javascript
// ✅ Recommended ESLint rules for React projects
{
  "extends": [
    "eslint:recommended",
    "@eslint/js/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## Performance Best Practices

### React Optimization
```javascript
// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>;
});

// ✅ Use useMemo for expensive calculations
const ExpensiveCalculation = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};

// ✅ Use useCallback for event handlers
const Parent = ({ onItemClick }) => {
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return <Child onClick={handleClick} />;
};
```

### Bundle Optimization
```javascript
// ✅ Use dynamic imports for code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// ✅ Use React.Suspense for loading states
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## Accessibility Guidelines

### ARIA and Semantic HTML
```javascript
// ✅ Use semantic HTML elements
const Modal = ({ isOpen, onClose, title, children }) => (
  <div 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="modal-title"
    className={isOpen ? 'modal modal--open' : 'modal'}
  >
    <h2 id="modal-title">{title}</h2>
    {children}
    <button onClick={onClose} aria-label="Close modal">×</button>
  </div>
);

// ✅ Provide proper labels and descriptions
<input
  type="email"
  id="email"
  aria-label="Email address"
  aria-describedby="email-help"
  required
/>
<div id="email-help">We'll never share your email</div>
```

### Keyboard Navigation
```javascript
// ✅ Support keyboard navigation
const DropdownMenu = () => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        closeMenu();
        break;
      case 'ArrowDown':
        focusNextItem();
        break;
      case 'ArrowUp':
        focusPreviousItem();
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} role="menu">
      {/* Menu items */}
    </div>
  );
};
```

## Documentation

### Component Documentation
```javascript
/**
 * Button component for user interactions
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {'default'|'primary'|'secondary'} props.variant - Visual style
 * @param {'small'|'medium'|'large'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onClick - Click event handler
 * @param {string} props.className - Additional CSS classes
 * 
 * @example
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Save Changes
 * </Button>
 */
const Button = ({ children, variant = 'default', ...props }) => {
  // Implementation
};
```

### README Documentation
- Include project setup instructions
- Document available scripts
- Provide examples of common use cases
- Include troubleshooting section
- Document deployment process

---

## Conclusion

Following these style guidelines will help maintain a consistent, readable, and maintainable codebase. Remember that these are guidelines, not strict rules - use your best judgment and discuss with the team when exceptions might be appropriate.

For questions or suggestions about these guidelines, please reach out to the development team or create an issue in the project repository.

**Last updated**: June 19, 2025