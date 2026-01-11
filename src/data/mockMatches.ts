import { HABITS } from './habits';
export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  distance: number; // km
  bio: string;
  photos: string[];
  habits: string[]; // habit IDs
  tier: 1 | 2 | 3 | 4 | 5;
  isVerified: boolean;
  lastActive: 'today' | 'week' | 'inactive';
  compatibility: number; // 0-100
}
const MOCK_PHOTOS = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60'];
export const MOCK_MATCHES: MatchProfile[] = [{
  id: 'm1',
  name: 'Priya',
  age: 24,
  gender: 'Female',
  distance: 3.5,
  bio: 'Fitness enthusiast and coffee lover. Looking for someone to run with on weekends! 🏃‍♀️☕️',
  photos: [MOCK_PHOTOS[0], MOCK_PHOTOS[1]],
  habits: ['h1', 'h2', 'h12'],
  // Gym, Running, Morning Routine
  tier: 3,
  isVerified: true,
  lastActive: 'today',
  compatibility: 85
}, {
  id: 'm2',
  name: 'Arjun',
  age: 26,
  gender: 'Male',
  distance: 5.2,
  bio: 'Techie by day, musician by night. Consistency is key! 🎸💻',
  photos: [MOCK_PHOTOS[5], MOCK_PHOTOS[6]],
  habits: ['h15', 'h6', 'h7'],
  // Music, Meditation, Sleep
  tier: 4,
  isVerified: true,
  lastActive: 'today',
  compatibility: 70
}, {
  id: 'm3',
  name: 'Sneha',
  age: 23,
  gender: 'Female',
  distance: 2.1,
  bio: 'Yoga teacher. Love reading and exploring new cafes in Indiranagar. 🧘‍♀️📚',
  photos: [MOCK_PHOTOS[2], MOCK_PHOTOS[4]],
  habits: ['h3', 'h9', 'h8'],
  // Yoga, Reading, Hydration
  tier: 2,
  isVerified: false,
  lastActive: 'week',
  compatibility: 60
}, {
  id: 'm4',
  name: 'Rohan',
  age: 27,
  gender: 'Male',
  distance: 8.0,
  bio: 'Training for a marathon. Need a accountability partner! 🏅',
  photos: [MOCK_PHOTOS[7], MOCK_PHOTOS[3]],
  habits: ['h2', 'h4', 'h5'],
  // Running, Cycling, Swimming
  tier: 5,
  isVerified: true,
  lastActive: 'today',
  compatibility: 95
}];