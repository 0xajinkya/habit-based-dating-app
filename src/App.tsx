import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { UserProvider } from './contexts/UserContext';
import { HabitLogProvider } from './contexts/HabitLogContext';
import { MatchProvider } from './contexts/MatchContext';
import { ToastProvider } from './design-system/components/Toast';
import { BottomNav } from './components/BottomNav';
// Auth Pages
import { SplashPage } from './pages/auth/SplashPage';
import { PhoneEntryPage } from './pages/auth/PhoneEntryPage';
import { OTPEntryPage } from './pages/auth/OTPEntryPage';
// Onboarding Pages
import { WelcomePage } from './pages/onboarding/WelcomePage';
import { BasicInfoPage } from './pages/onboarding/BasicInfoPage';
import { PhotosPage } from './pages/onboarding/PhotosPage';
import { HabitSelectionPage } from './pages/onboarding/HabitSelectionPage';
import { FrequencyGoalPage } from './pages/onboarding/FrequencyGoalPage';
import { PreferencesPage as OnboardingPreferencesPage } from './pages/onboarding/PreferencesPage';
import { CompletionPage } from './pages/onboarding/CompletionPage';
// Home Pages
import { HomePage } from './pages/home/HomePage';
// Habits Pages
import { HabitsOverviewPage } from './pages/habits/HabitsOverviewPage';
import { HabitDetailPage } from './pages/habits/HabitDetailPage';
// Matches Pages
import { MatchesPage } from './pages/matches/MatchesPage';
import { MatchProfilePage } from './pages/matches/MatchProfilePage';
// Verification Pages
import { WhyVerifyPage } from './pages/verification/WhyVerifyPage';
import { CameraPermissionPage } from './pages/verification/CameraPermissionPage';
import { LivenessCapturePage } from './pages/verification/LivenessCapturePage';
import { ProcessingPage } from './pages/verification/ProcessingPage';
import { SuccessPage } from './pages/verification/SuccessPage';
// Profile Pages
import { ProfilePage } from './pages/profile/ProfilePage';
import { EditProfilePage } from './pages/profile/EditProfilePage';
import { ManageHabitsPage } from './pages/profile/ManageHabitsPage';
import { PreferencesPage } from './pages/profile/PreferencesPage';
// Placeholder for future phases
const ChatPlaceholder = () => <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pb-24">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Chat</h1>
      <p className="text-gray-600">Phase 5 (Chat) coming soon.</p>
    </div>
  </div>;
// Layout wrapper for Onboarding
const OnboardingLayout = () => <OnboardingProvider>
    <Outlet />
  </OnboardingProvider>;
// Layout wrapper for Main App (Home + Verification + Matches + Habits)
const MainLayout = () => <HabitLogProvider>
    <MatchProvider>
      <Outlet />
      <BottomNav />
    </MatchProvider>
  </HabitLogProvider>;
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/auth/phone" element={<PhoneEntryPage />} />
              <Route path="/auth/otp" element={<OTPEntryPage />} />

              {/* Onboarding Flow */}
              <Route path="/onboarding" element={<OnboardingLayout />}>
                <Route path="welcome" element={<WelcomePage />} />
                <Route path="basic-info" element={<BasicInfoPage />} />
                <Route path="photos" element={<PhotosPage />} />
                <Route path="habits" element={<HabitSelectionPage />} />
                <Route path="frequency" element={<FrequencyGoalPage />} />
                <Route path="preferences" element={<OnboardingPreferencesPage />} />
                <Route path="completion" element={<CompletionPage />} />
              </Route>

              {/* Main App Flow */}
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />

                {/* Habits Flow */}
                <Route path="/habits" element={<HabitsOverviewPage />} />
                <Route path="/habits/:habitId" element={<HabitDetailPage />} />

                {/* Matches Flow */}
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/matches/:id" element={<MatchProfilePage />} />

                {/* Placeholders */}
                <Route path="/chat" element={<ChatPlaceholder />} />

                {/* Profile Flow */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
                <Route path="/profile/habits" element={<ManageHabitsPage />} />
                <Route path="/profile/preferences" element={<PreferencesPage />} />

                {/* Verification Flow */}
                <Route path="/verification/why" element={<WhyVerifyPage />} />
                <Route path="/verification/camera" element={<CameraPermissionPage />} />
                <Route path="/verification/capture" element={<LivenessCapturePage />} />
                <Route path="/verification/processing" element={<ProcessingPage />} />
                <Route path="/verification/success" element={<SuccessPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>;
}