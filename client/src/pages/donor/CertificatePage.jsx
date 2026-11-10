import { TriangleAlert } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CertificateForm from './components/CertificateForm';
import EmptyState from '@/components/ui/EmptyState';
import HeaderChip from '@/components/ui/HeaderChip';
import Ltr from '@/components/ui/Ltr';
import PageHeader from '@/components/ui/PageHeader';
import PaperCheckResult from './components/PaperCheckResult';
import Panel from '@/components/ui/Panel';
import SideMenu from './components/SideMenu';
import { useDonor } from './DonorContext';

export default function CertificatePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // عشان نفتح اختيار الملف من زرار "رفع صورة أوضح"

  const { donor, allRequestsCount, hospitals, hospitalsError, sendCertificate, requestManualReview } =
    useDonor();

  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

  const isChecking = result !== null && result.status === 'checking';

  async function handleFileReady({ file, hospitalId, certificateDate }) {
    const chosenHospital = hospitals.find((hospital) => hospital.id === hospitalId);

    setSelectedFile(file);
    setUploadError(null);
    setReviewStatus('idle');
    setResult({ status: 'checking', hospital: chosenHospital });

    try {
      const checkResult = await sendCertificate({
        file,
        hospitalId,
        certificateDate,
      });
      // بنحفظ المستشفى مع النتيجة، عشان لو غيّر المستشفى بعدين النتيجة تفضل ماشية مع مستشفاها
      setResult({ ...checkResult, hospital: chosenHospital });
    } catch {
      setSelectedFile(null);
      setResult(null);
      setUploadError('تعذّر إرسال الشهادة. لم يضِع شيء، حاول مرة أخرى.');
    }
  }

  async function handleRequestReview() {
    setReviewStatus('sending');
    try {
      await requestManualReview();
      setReviewStatus('sent');
    } catch {
      setReviewStatus('idle');
    }
  }

  return (
    <div>
      {/* ===== فوق: مسار الصفحة + الشريط الكحلي ===== */}
      <div className="mx-auto max-w-310 px-4 md:px-6">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', to: '/' },
            { label: 'حسابي', to: '/donor/requests' },
            { label: 'شهادة فصيلة الدم' },
          ]}
        />
        <PageHeader
          title="شهادة فصيلة الدم"
          subtitle="ارفع شهادة من المستشفى تثبت فصيلتك وقدرتك على التبرع. تظهر علامة الثقة للطلبات، والشهادة نفسها لا تظهر لأحد."
          chips={
            donor && (
              <HeaderChip>
                رقم المتبرع <Ltr bold>{donor.id}</Ltr>
              </HeaderChip>
            )
          }
        />
      </div>

      {/* ===== تحت: العمود الجانبي + المحتوى ===== */}
      <div className="mx-auto max-w-310 px-4 pt-[22px] pb-10 md:px-6">
        <div className="grid items-start gap-5 *:min-w-0 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* العمود الجانبي: قايمة حسابي بس */}
          <div className="space-y-[18px]">
            <SideMenu nearbyCount={allRequestsCount} />
          </div>

          {/* المحتوى */}
          <div>
            <Panel title="رفع الشهادة">
              {hospitalsError ? (
                <EmptyState icon={TriangleAlert} tone="err" title="تعذّر التحميل">
                  حدثت مشكلة في الاتصال. لم يضِع شيء.
                </EmptyState>
              ) : hospitals.length === 0 ? (
                <div className="p-[18px]">
                  <div className="skeleton h-48" aria-busy="true" />
                </div>
              ) : (
                <CertificateForm
                  hospitals={hospitals}
                  selectedFile={selectedFile}
                  isChecking={isChecking}
                  uploadError={uploadError}
                  fileInputRef={fileInputRef}
                  onFileReady={handleFileReady}
                />
              )}
            </Panel>

            {/* نتيجة الفحص (بتظهر بعد ما يختار ملف) */}
            {result && (
              <Panel title="نتيجة فحص الشهادة" className="mt-[18px]">
                <div className="p-[18px]">
                  <PaperCheckResult
                    result={result}
                    hospital={result.hospital}
                    reviewStatus={reviewStatus}
                    onSave={() => navigate('/donor/requests')}
                    onReupload={() => fileInputRef.current.click()}
                    onRequestReview={handleRequestReview}
                  />
                </div>
              </Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
