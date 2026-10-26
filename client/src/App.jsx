import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

import HomePage from '@/features/home/HomePage';
import SignupPage from '@/features/auth/SignupPage';
import LoginPage from '@/features/auth/LoginPage';
import TermsPage from '@/features/static/TermsPage';
import NotFoundPage from '@/features/static/NotFoundPage';

import DonorRequestsPage from '@/features/donor/DonorRequestsPage';
import RequestDetailsPage from '@/features/donor/RequestDetailsPage';
import CertificatePage from '@/features/donor/CertificatePage';
import DonationHistoryPage from '@/features/donor/DonationHistoryPage';

import NewRequestPage from '@/features/requester/NewRequestPage';
import RequestProgressPage from '@/features/requester/RequestProgressPage';
import ConfirmDonationPage from '@/features/requester/ConfirmDonationPage';

import HospitalDashboardPage from '@/features/hospital/HospitalDashboardPage';
import HospitalPapersPage from '@/features/hospital/HospitalPapersPage';
import HospitalJoinPage from '@/features/hospital/HospitalJoinPage';

import AdminDashboardPage from '@/features/admin/AdminDashboardPage';
import AdminPapersPage from '@/features/admin/AdminPapersPage';
import AdminReportsPage from '@/features/admin/AdminReportsPage';
import AdminHospitalsPage from '@/features/admin/AdminHospitalsPage';

import KitPage from '@/dev/KitPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/terms" element={<TermsPage />} />

        <Route path="/donor/requests" element={<DonorRequestsPage />} />
        <Route path="/donor/requests/:id" element={<RequestDetailsPage />} />
        <Route path="/donor/certificate" element={<CertificatePage />} />
        <Route path="/donor/history" element={<DonationHistoryPage />} />

        <Route path="/requests/new" element={<Navigate to="/requests/new/1" replace />} />
        <Route path="/requests/new/:step" element={<NewRequestPage />} />
        <Route path="/requests/:id" element={<RequestProgressPage />} />
        <Route path="/requests/:id/confirm" element={<ConfirmDonationPage />} />

        <Route path="/hospital" element={<HospitalDashboardPage />} />
        <Route path="/hospital/papers" element={<HospitalPapersPage />} />
        <Route path="/hospital/join" element={<HospitalJoinPage />} />

        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/papers" element={<AdminPapersPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/hospitals" element={<AdminHospitalsPage />} />

        {import.meta.env.DEV && <Route path="/kit" element={<KitPage />} />}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
