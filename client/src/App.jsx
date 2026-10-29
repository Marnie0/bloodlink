import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/home/HomePage';
import SignupPage from '@/pages/auth/SignupPage';
import LoginPage from '@/pages/auth/LoginPage';
import TermsPage from '@/pages/static/TermsPage';
import NotFoundPage from '@/pages/static/NotFoundPage';
import DonorRequestsPage from '@/pages/donor/DonorRequestsPage';
import RequestDetailsPage from '@/pages/donor/RequestDetailsPage';
import CertificatePage from '@/pages/donor/CertificatePage';
import DonationHistoryPage from '@/pages/donor/DonationHistoryPage';
import NewRequestPage from '@/pages/requester/NewRequestPage';
import RequestProgressPage from '@/pages/requester/RequestProgressPage';
import ConfirmDonationPage from '@/pages/requester/ConfirmDonationPage';
import HospitalDashboardPage from '@/pages/hospital/HospitalDashboardPage';
import HospitalPapersPage from '@/pages/hospital/HospitalPapersPage';
import HospitalJoinPage from '@/pages/hospital/HospitalJoinPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminPapersPage from '@/pages/admin/AdminPapersPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';
import AdminHospitalsPage from '@/pages/admin/AdminHospitalsPage';

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
