
import { BloodInventory, Donor, BloodRequest } from './types';

export const BLOOD_GROUPS: BloodInventory[] = [
  { type: 'A+', units: 45, criticalLevel: 10 },
  { type: 'A-', units: 12, criticalLevel: 5 },
  { type: 'B+', units: 38, criticalLevel: 10 },
  { type: 'B-', units: 8, criticalLevel: 5 },
  { type: 'AB+', units: 15, criticalLevel: 5 },
  { type: 'AB-', units: 4, criticalLevel: 3 },
  { type: 'O+', units: 62, criticalLevel: 15 },
  { type: 'O-', units: 21, criticalLevel: 10 },
];

export const MOCK_DONORS: Donor[] = [
  { id: '1', name: 'John Doe', bloodGroup: 'O+', lastDonationDate: '2023-10-15', contact: '+1234567890', status: 'Available' },
  { id: '2', name: 'Jane Smith', bloodGroup: 'A-', lastDonationDate: '2024-01-20', contact: '+1987654321', status: 'Recent' },
  { id: '3', name: 'Robert Johnson', bloodGroup: 'B+', lastDonationDate: '2023-11-05', contact: '+1122334455', status: 'Available' },
  { id: '4', name: 'Sarah Wilson', bloodGroup: 'AB-', lastDonationDate: '2024-02-10', contact: '+1555666777', status: 'On Hold' },
];

export const MOCK_REQUESTS: BloodRequest[] = [
  { id: 'req-1', hospitalName: 'City General', bloodGroup: 'O-', unitsRequested: 5, urgency: 'Emergency', status: 'Pending', timestamp: '2024-05-20T10:30:00Z' },
  { id: 'req-2', hospitalName: 'St. Mary\'s', bloodGroup: 'A+', unitsRequested: 2, urgency: 'Normal', status: 'Approved', timestamp: '2024-05-19T14:20:00Z' },
  { id: 'req-3', hospitalName: 'Children\'s Hospital', bloodGroup: 'B-', unitsRequested: 3, urgency: 'High', status: 'Pending', timestamp: '2024-05-20T08:15:00Z' },
];
