// Centralized API exports
export * from './base';
export * from './property';
export * from './reports';
export * from './auth';

// Re-export services for easy access
export { propertyService } from './property';
export { reportService } from './reports';
export { authService } from './auth';