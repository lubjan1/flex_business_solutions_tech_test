import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InventoryDashboard from './InventoryDashboard';
import { MemoryRouter } from 'react-router-dom';
import { useJobsStore } from '../../store/useJobsStore';

// Mock the useJobsStore hook
jest.mock('../../store/useJobsStore', () => ({
  useJobsStore: jest.fn(),
}));

// Mock data
const mockJob = {
  id: '1',
  nameJob: 'Test Job',
  category: { name: 'Test Category' },
  items: [{ id: 'item1', itemName: 'Test Item 1', status: { name: 'In Progress' } }],
};

const mockJobs = [mockJob];

// Mock the implementation of useJobsStore hook
beforeEach(() => {
  useJobsStore.mockImplementation(() => ({
    jobs: mockJobs,
    setJobs: jest.fn(),
  }));
});

describe('InventoryDashboard', () => {
  test('renders job details correctly', () => {
    render(
      <MemoryRouter initialEntries={[{ state: mockJob }]}>
        <InventoryDashboard />
      </MemoryRouter>
    );

    // Check if job name is displayed
    expect(screen.getByText('Test Job')).toBeInTheDocument();
    // Check if job category is displayed
    expect(screen.getByText('Category: Test Category')).toBeInTheDocument();
  });

  test('search input updates globalFilterValue state', () => {
    render(
      <MemoryRouter initialEntries={[{ state: mockJob }]}>
        <InventoryDashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    expect(searchInput.value).toBe('Test');
  });
});
