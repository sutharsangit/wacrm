export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'sales' | 'manager';
  industry?: string;
  businessName?: string;
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Sutharsan',
    email: 'admin@whatsappcrm.com',
    role: 'admin',
    industry: 'Real Estate',
    businessName: 'Apex Properties',
  },
  {
    id: 'u2',
    name: 'Sarah Connor',
    email: 'sarah@whatsappcrm.com',
    role: 'sales',
    businessName: 'Apex Properties',
  },
  {
    id: 'u3',
    name: 'John Doe',
    email: 'john@whatsappcrm.com',
    role: 'sales',
    businessName: 'Apex Properties',
  },
  {
    id: 'u4',
    name: 'Alice Johnson',
    email: 'alice@whatsappcrm.com',
    role: 'manager',
    businessName: 'Apex Properties',
  }
];

export const currentUser = mockUsers[0];
