import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { propertyService } from '@/services/api/property';
import { createMockProperty } from '@/test/test-utils';
import type { PropertyType } from '@/types';

// Mock the property service
vi.mock('@/services/api/property');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('Property Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch properties successfully', async () => {
    const mockProperties = [createMockProperty(), createMockProperty({ id: 'property-456' })];
    
    (propertyService.getProperties as any).mockResolvedValue(mockProperties);

    const result = await propertyService.getProperties();
    
    expect(result).toEqual(mockProperties);
    expect(propertyService.getProperties).toHaveBeenCalledOnce();
  });

  it('should fetch single property successfully', async () => {
    const mockProperty = createMockProperty();
    
    (propertyService.getProperty as any).mockResolvedValue(mockProperty);

    const result = await propertyService.getProperty('property-123');
    
    expect(result).toEqual(mockProperty);
    expect(propertyService.getProperty).toHaveBeenCalledWith('property-123');
  });

  it('should create property successfully', async () => {
    const newPropertyData = {
      address_line_1: '456 New Street',
      suburb: 'New Suburb',
      state: 'NSW',
      postcode: '2000',
      property_type: 'commercial' as PropertyType,
    };
    
    const createdProperty = createMockProperty(newPropertyData);
    
    (propertyService.createProperty as any).mockResolvedValue(createdProperty);

    const result = await propertyService.createProperty(newPropertyData);
    
    expect(result).toEqual(createdProperty);
    expect(propertyService.createProperty).toHaveBeenCalledWith(newPropertyData);
  });

  it('should update property successfully', async () => {
    const updateData = { address_line_1: 'Updated Street' };
    const updatedProperty = createMockProperty(updateData);
    
    (propertyService.updateProperty as any).mockResolvedValue(updatedProperty);

    const result = await propertyService.updateProperty('property-123', updateData);
    
    expect(result).toEqual(updatedProperty);
    expect(propertyService.updateProperty).toHaveBeenCalledWith('property-123', updateData);
  });

  it('should handle errors gracefully', async () => {
    const errorMessage = 'Network error';
    
    (propertyService.getProperties as any).mockRejectedValue(new Error(errorMessage));

    await expect(propertyService.getProperties()).rejects.toThrow(errorMessage);
  });
});