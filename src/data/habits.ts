import { Activity, Book, Camera, Coffee, Dumbbell, Feather, Moon, Music, PenTool, Sun, Droplet, Utensils, Bike, Waves, Brain } from 'lucide-react';
export type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';
export interface Habit {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  category: HabitCategory;
  description: string;
  suggestedFrequency: number; // days per week
}
export const HABIT_CATEGORIES: HabitCategory[] = ['Fitness', 'Wellness', 'Learning', 'Lifestyle', 'Creative'];
export const HABITS: Habit[] = [
// Fitness
{
  id: 'h1',
  name: 'Gym Workout',
  icon: Dumbbell,
  category: 'Fitness',
  description: 'Weight training or cardio',
  suggestedFrequency: 4
}, {
  id: 'h2',
  name: 'Running',
  icon: Activity,
  category: 'Fitness',
  description: 'Outdoor or treadmill running',
  suggestedFrequency: 3
}, {
  id: 'h3',
  name: 'Yoga',
  icon: Sun,
  category: 'Fitness',
  description: 'Practice yoga or pilates',
  suggestedFrequency: 3
}, {
  id: 'h4',
  name: 'Cycling',
  icon: Bike,
  category: 'Fitness',
  description: 'Road cycling or spin class',
  suggestedFrequency: 2
}, {
  id: 'h5',
  name: 'Swimming',
  icon: Waves,
  category: 'Fitness',
  description: 'Pool laps or open water',
  suggestedFrequency: 2
},
// Wellness
{
  id: 'h6',
  name: 'Meditation',
  icon: Brain,
  category: 'Wellness',
  description: 'Mindfulness practice',
  suggestedFrequency: 7
}, {
  id: 'h7',
  name: 'Sleep 8h',
  icon: Moon,
  category: 'Wellness',
  description: "Get full night's rest",
  suggestedFrequency: 7
}, {
  id: 'h8',
  name: 'Hydration',
  icon: Droplet,
  category: 'Wellness',
  description: 'Drink 3L water daily',
  suggestedFrequency: 7
},
// Learning
{
  id: 'h9',
  name: 'Reading',
  icon: Book,
  category: 'Learning',
  description: 'Read books or articles',
  suggestedFrequency: 5
}, {
  id: 'h10',
  name: 'Language',
  icon: Activity,
  category: 'Learning',
  description: 'Practice a new language',
  suggestedFrequency: 4
},
// Lifestyle
{
  id: 'h11',
  name: 'Cooking',
  icon: Utensils,
  category: 'Lifestyle',
  description: 'Cook healthy meals',
  suggestedFrequency: 5
}, {
  id: 'h12',
  name: 'Morning Routine',
  icon: Coffee,
  category: 'Lifestyle',
  description: 'Start day with intention',
  suggestedFrequency: 7
},
// Creative
{
  id: 'h13',
  name: 'Writing',
  icon: Feather,
  category: 'Creative',
  description: 'Journaling or creative writing',
  suggestedFrequency: 3
}, {
  id: 'h14',
  name: 'Photography',
  icon: Camera,
  category: 'Creative',
  description: 'Taking and editing photos',
  suggestedFrequency: 2
}, {
  id: 'h15',
  name: 'Music',
  icon: Music,
  category: 'Creative',
  description: 'Playing instrument or practice',
  suggestedFrequency: 3
}, {
  id: 'h16',
  name: 'Art',
  icon: PenTool,
  category: 'Creative',
  description: 'Drawing, painting, or crafting',
  suggestedFrequency: 2
}];