import { Droplet, Hospital, Search, UserPlus } from 'lucide-react';
import { arNum } from './homeFormat';
import { partnerHospitals, platformStats, requestsByType, urgentRequests } from './homeData';
import HomeHero from './components/HomeHero';
import HowItWorks from './components/HowItWorks';
import PageFeedback from './components/PageFeedback';
import PartnerHospitals from './components/PartnerHospitals';
import PlatformStats from './components/PlatformStats';
import RulesBar from './components/RulesBar';
import ServiceTile from './components/ServiceTile';
import TrustLevels from './components/TrustLevels';
import TypeFilter from './components/TypeFilter';
import UrgentCard from './components/UrgentCard';

// The lookup lives in the hero, so this tile just moves focus there instead of changing page
function focusLookup(event) {
  event.preventDefault();
  document.getElementById('ref')?.focus();
}

export default function HomePage() {
  return (
    <>
      <HomeHero
        activeRequests={platformStats.activeRequests}
        partnerHospitals={platformStats.partnerHospitals}
      />

      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative z-2 -mt-[72px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UrgentCard requests={urgentRequests} />

          <ServiceTile
            primary
            to="/requests/new"
            code="SRV-01"
            icon={Droplet}
            title="طلب دم"
            text="لمريض في مستشفى، بورقة رسمية تثبت الاحتياج."
            meta="فوري · مجاناً"
            cta="ابدأ الخدمة"
          />
          <ServiceTile
            to="/signup"
            code="SRV-02"
            icon={UserPlus}
            title="تسجيل متبرع"
            text="أنشئ حساباً وارفع شهادة فصيلة الدم."
            meta="١٠ دقائق · مجاناً"
            cta="ابدأ"
          />
          <ServiceTile
            to="/"
            onClick={focusLookup}
            code="SRV-03"
            icon={Search}
            title="الاستعلام عن طلب"
            text="بالرقم المرجعي، بدون تسجيل."
            meta="بدون حساب"
            cta="استعلم"
          />
          <ServiceTile
            to="/hospital"
            code="SRV-04"
            icon={Hospital}
            title="المستشفيات الشريكة"
            text="الدليل، وبوابة الموظفين لمسح رموز الحضور."
            meta={`${arNum(platformStats.partnerHospitals)} مستشفى`}
            cta="تصفّح"
          />

          <TypeFilter counts={requestsByType} />
          <PlatformStats stats={platformStats} />
          <HowItWorks />
          <TrustLevels />
          <RulesBar />
        </div>

        <PartnerHospitals hospitals={partnerHospitals} />
        <PageFeedback />
      </div>
    </>
  );
}
