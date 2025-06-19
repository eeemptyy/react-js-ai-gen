import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Smartphone: () => <div data-testid="smartphone-icon" />,
  Palette: () => <div data-testid="palette-icon" />,
  Route: () => <div data-testid="route-icon" />,
  Puzzle: () => <div data-testid="puzzle-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Users: () => <div data-testid="users-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  Send: () => <div data-testid="send-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  User: () => <div data-testid="user-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  CreditCard: () => <div data-testid="credit-card-icon" />,
  History: () => <div data-testid="history-icon" />,
  X: () => <div data-testid="x-icon" />,
  DollarSign: () => <div data-testid="dollar-sign-icon" />,
  Wallet: () => <div data-testid="wallet-icon" />,
  Check: () => <div data-testid="check-icon" />,
}))

// Mock UI components for AppPage
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, ...props }) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  CardDescription: ({ children, className, ...props }) => (
    <p className={className} {...props}>
      {children}
    </p>
  ),
  CardHeader: ({ children, className, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }) => (
    <h3 className={className} {...props}>
      {children}
    </h3>
  ),
}))

jest.mock('@/components/ui/input', () => ({
  Input: ({ className, ...props }) => (
    <input className={className} {...props} />
  ),
}))

jest.mock('@/components/ui/modal', () => ({
  Modal: ({ children, isOpen, onClose, ...props }) => 
    isOpen ? <div data-testid="modal" {...props}>{children}</div> : null,
  ModalHeader: ({ children, onClose, ...props }) => (
    <div data-testid="modal-header" {...props}>
      {children}
      <button onClick={onClose} data-testid="modal-close">×</button>
    </div>
  ),
  ModalContent: ({ children, ...props }) => (
    <div data-testid="modal-content" {...props}>
      {children}
    </div>
  ),
  ModalTitle: ({ children, className, ...props }) => (
    <h2 className={className} {...props}>
      {children}
    </h2>
  ),
}))

describe('App Component with Router', () => {
  test('renders MainPage on root path - snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(container.firstChild).toMatchSnapshot('MainPage')
  })

  test('renders AppPage on /app path - snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/app']}>
        <App />
      </MemoryRouter>
    )
    expect(container.firstChild).toMatchSnapshot('AppPage')
  })

  test('MainPage route renders correct content', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    
    expect(getByText('PayWise')).toBeInTheDocument()
    expect(getByText('Send Money in Seconds with PayWise')).toBeInTheDocument()
    expect(getByText('Start Transferring')).toBeInTheDocument()
  })

  test('AppPage route renders correct content', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/app']}>
        <App />
      </MemoryRouter>
    )
    
    expect(getByText('Welcome back!')).toBeInTheDocument()
    expect(getByText('Available Balance')).toBeInTheDocument()
    expect(getByText('$2847.50')).toBeInTheDocument()
  })

  test('navigation between routes works correctly', () => {
    const { getByText, rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    
    // Should show MainPage content
    expect(getByText('Send Money in Seconds with PayWise')).toBeInTheDocument()
    
    // Re-render with /app route
    rerender(
      <MemoryRouter initialEntries={['/app']}>
        <App />
      </MemoryRouter>
    )
    
    // Should show AppPage content
    expect(getByText('Welcome back!')).toBeInTheDocument()
  })
})