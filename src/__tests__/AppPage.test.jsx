import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AppPage from '../AppPage'

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const MockIcon = () => <div data-testid="mock-icon" />
  return {
    ArrowLeft: MockIcon,
    Send: MockIcon,
    Settings: MockIcon,
    User: MockIcon,
    Plus: MockIcon,
    CreditCard: MockIcon,
    History: MockIcon,
    X: MockIcon,
    DollarSign: MockIcon,
    Check: MockIcon,
  }
})

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }) => <p {...props}>{children}</p>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
}))

jest.mock('@/components/ui/input', () => ({
  Input: (props) => <input {...props} />,
}))

jest.mock('@/components/ui/modal', () => ({
  Modal: ({ children, isOpen, ...props }) => 
    isOpen ? <div data-testid="modal" {...props}>{children}</div> : null,
  ModalHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  ModalContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  ModalTitle: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
}))

describe('AppPage Snapshot Tests', () => {
  test('AppPage renders and matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    )
    
    expect(container.firstChild).toMatchSnapshot()
  })
  
  test('AppPage contains welcome message and balance', () => {
    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    expect(screen.getByText('Available Balance')).toBeInTheDocument()
    expect(screen.getByText('$2847.50')).toBeInTheDocument()
  })
})