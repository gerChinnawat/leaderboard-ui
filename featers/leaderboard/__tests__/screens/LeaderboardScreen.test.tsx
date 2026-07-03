import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import LeaderboardScreen from '../../screens/index';
import { racers } from '../../data/racers';

// Mock the form kit animation
jest.mock('@formkit/auto-animate/react', () => ({
  useAutoAnimate: () => [{ current: null }],
}));

// Mock AddRacerForm component
jest.mock('../../components/AddRacerForm', () => {
  return function DummyAddRacerForm() {
    return <div data-testid="add-racer-form">Add Racer Form</div>;
  };
});

// Mock UI components
jest.mock('@/components/ui/item', () => ({
  Item: ({ children, ...props }: { children: ReactNode }) => <div data-testid="racer-item" {...props}>{children}</div>,
  ItemContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ItemDescription: ({ children }: { children: ReactNode }) => <div data-testid="item-description">{children}</div>,
  ItemTitle: ({ children }: { children: ReactNode }) => <div data-testid="item-title">{children}</div>,
}));

describe('LeaderboardScreen', () => {
  it('should render the leaderboard screen', () => {
    render(<LeaderboardScreen />);
    
    expect(screen.getByTestId('add-racer-form')).toBeInTheDocument();
  });

  it('should render add racer form component', () => {
    render(<LeaderboardScreen />);
    
    expect(screen.getByText(/Add Racer Form/i)).toBeInTheDocument();
  });

  it('should display initial racers', () => {
    render(<LeaderboardScreen />);
    
    const racer_items = screen.getAllByTestId('racer-item');
    expect(racer_items.length).toBeGreaterThan(0);
  });

  it('should display the same number of racers as in initial data', () => {
    render(<LeaderboardScreen />);
    
    const racer_items = screen.getAllByTestId('racer-item');
    expect(racer_items.length).toBe(racers.length);
  });

  it('should display racer names', () => {
    render(<LeaderboardScreen />);
    
    const titles = screen.getAllByTestId('item-title');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should display racer times', () => {
    render(<LeaderboardScreen />);

    const times = screen.getAllByTestId('racer-time');
    expect(times.length).toBeGreaterThan(0);
  });

  it('should display Oscar Piastri as one of the racers', () => {
    render(<LeaderboardScreen />);
    
    const titles = screen.getAllByTestId('item-title');
    const oscarFound = titles.some((title) =>
      title.textContent?.includes('Oscar Piastri')
    );
    expect(oscarFound).toBe(true);
  });

  it('should display George Russell as one of the racers', () => {
    render(<LeaderboardScreen />);
    
    const titles = screen.getAllByTestId('item-title');
    const georgeFound = titles.some((title) =>
      title.textContent?.includes('George Russell')
    );
    expect(georgeFound).toBe(true);
  });

  it('should display Max Verstappen as one of the racers', () => {
    render(<LeaderboardScreen />);
    
    const titles = screen.getAllByTestId('item-title');
    const maxFound = titles.some((title) =>
      title.textContent?.includes('Max Verstappen')
    );
    expect(maxFound).toBe(true);
  });

  it('should display racer times in correct format', () => {
    render(<LeaderboardScreen />);

    const times = screen.getAllByTestId('racer-time');
    const timeStampRegex = /^\d{1,2}:\d{2}\.\d{3}$/;

    times.forEach((time) => {
      if (time.textContent) {
        expect(timeStampRegex.test(time.textContent)).toBe(true);
      }
    });
  });

  it('should render at least 6 racers from initial data', () => {
    render(<LeaderboardScreen />);
    
    const racer_items = screen.getAllByTestId('racer-item');
    expect(racer_items.length).toBeGreaterThanOrEqual(6);
  });

  it('should display racer position numbers', () => {
    render(<LeaderboardScreen />);

    const positions = screen.getAllByTestId('racer-position');
    expect(positions.length).toBeGreaterThan(0);
    positions.forEach((position, index) => {
      expect(position.textContent).toBe(String(index + 1));
    });
  });
});
