import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
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

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="terms" element={<TermsPage />} />

        <Route path="donor">
          <Route path="requests" element={<DonorRequestsPage />} />
          <Route path="requests/:id" element={<RequestDetailsPage />} />
          <Route path="certificate" element={<CertificatePage />} />
          <Route path="history" element={<DonationHistoryPage />} />
        </Route>

        <Route path="requests">
          <Route path="new/:step?" element={<NewRequestPage />} />
          <Route path=":id" element={<RequestProgressPage />} />
          <Route path=":id/confirm" element={<ConfirmDonationPage />} />
        </Route>

        <Route path="hospital">
          <Route index element={<HospitalDashboardPage />} />
          <Route path="papers" element={<HospitalPapersPage />} />
          <Route path="join" element={<HospitalJoinPage />} />
        </Route>

        <Route path="admin">
          <Route index element={<AdminDashboardPage />} />
          <Route path="papers" element={<AdminPapersPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="hospitals" element={<AdminHospitalsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
