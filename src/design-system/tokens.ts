export const tokens = {
  colors: {
    brand: {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
      secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      tertiary: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
      destructive: 'bg-red-50 text-red-600 hover:bg-red-100'
    },
    tiers: {
      1: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-200',
        icon: 'text-orange-600'
      },
      // Bronze
      2: {
        bg: 'bg-slate-100',
        text: 'text-slate-800',
        border: 'border-slate-200',
        icon: 'text-slate-600'
      },
      // Silver
      3: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        icon: 'text-yellow-600'
      },
      // Gold
      4: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        icon: 'text-emerald-600'
      },
      // Emerald
      5: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200',
        icon: 'text-purple-600'
      } // Platinum/Purple
    },
    activity: {
      today: 'bg-green-500',
      week: 'bg-yellow-500',
      inactive: 'bg-gray-300'
    },
    habitCategories: {
      Fitness: { active: 'bg-orange-500', inactive: 'bg-orange-100' },
      Wellness: { active: 'bg-green-500', inactive: 'bg-green-100' },
      Learning: { active: 'bg-blue-500', inactive: 'bg-blue-100' },
      Lifestyle: { active: 'bg-yellow-500', inactive: 'bg-yellow-100' },
      Creative: { active: 'bg-purple-500', inactive: 'bg-purple-100' }
    },
    semantic: {
      success: 'text-green-600 bg-green-50 border-green-200',
      error: 'text-red-600 bg-red-50 border-red-200',
      warning: 'text-amber-600 bg-amber-50 border-amber-200'
    }
  },
  typography: {
    h1: 'text-3xl font-bold tracking-tight',
    h2: 'text-2xl font-semibold tracking-tight',
    h3: 'text-xl font-semibold',
    body: 'text-base text-gray-600 leading-relaxed',
    small: 'text-sm text-gray-500',
    tiny: 'text-xs text-gray-400'
  },
  spacing: {
    page: 'px-4 py-6 max-w-md mx-auto w-full',
    section: 'space-y-6',
    stack: 'space-y-4'
  },
  animation: {
    transition: 'transition-all duration-200 ease-in-out'
  }
};