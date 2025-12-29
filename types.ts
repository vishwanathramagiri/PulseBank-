
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface BloodInventory {
  type: BloodGroup;
  units: number;
  criticalLevel: number;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  lastDonationDate: string;
  contact: string;
  status: 'Available' | 'On Hold' | 'Recent';
}

export interface BloodRequest {
  id: string;
  hospitalName: string;
  bloodGroup: BloodGroup;
  unitsRequested: number;
  urgency: 'Normal' | 'High' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Delivered' | 'Rejected';
  timestamp: string;
}

export type UserRole = 'ADMIN' | 'HOSPITAL' | 'DONOR' | 'GUEST';
