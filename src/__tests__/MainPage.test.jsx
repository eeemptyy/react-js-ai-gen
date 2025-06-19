import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MainPage from '../MainPage'

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const MockIcon = () => <div data-testid="mock-icon" />
  return {
    Smartphone: MockIcon,
    Palette: MockIcon,
    Route: MockIcon,
    Puzzle: MockIcon,
    ArrowRight: MockIcon,
    Zap: MockIcon,
    Shield: MockIcon,
    Users: MockIcon,
  }
})

describe('MainPage Snapshot Tests', () => {
  test('MainPage renders and matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    )
    
    expect(container.firstChild).toMatchSnapshot()
  })
  
  test('MainPage contains PayWise branding', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    )
    
    expect(screen.getByText('PayWise')).toBeInTheDocument()
    expect(screen.getByText('Send Money in Seconds')).toBeInTheDocument()
  })
})