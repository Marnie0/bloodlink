/*  1) دوال الاتصال بالـ backend (API): كل دالة بترجع بيانات تجريبية (من donorData.js)،
     وتحتها سطور fetch الحقيقية معمولة تعليق. */
import { useEffect, useState } from "react";
import { DonorContext } from "./DonorContext";
import {
  certificateResultsByStatus,
  donationHistoryList,
  donorProfile,
  hospitalsList,
  nearbyRequestsList,
} from "./donorData";

// عايز تجرب حالة "مش قادرين نقرأ الشهادة"؟ اكتب هنا 'needs_review'. وسيبها null عادي.
const forcedCertificateStatus = null;

// بتستنى شوية عشان نشوف شكل "جارٍ التحميل" (زي الإنترنت الحقيقي)
const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// بيانات المتبرع (الصفحات التلاتة)
async function getDonorProfile() {
  await wait(300);
  return donorProfile;

  // const response = await fetch('', { credentials: 'include' });
  // if (!response.ok) throw new Error('تعذر تحميل بيانات المتبرع');
  // return await response.json();
}

// مفتاح "متاح لاستقبال الطلبات"
async function changeAvailability(isAvailable) {
  await wait(300);
  donorProfile.available = isAvailable;
  return { available: isAvailable };

  // const response = await fetch(' ', {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   credentials: 'include',
  //   body: JSON.stringify({ available: isAvailable }),
  // });
  // if (!response.ok) throw new Error('تعذر تغيير الحالة');
  // return await response.json();
}

//  الطلبات القريبة
// الـ backend هو اللي هيفلتر حسب فصيلة الدم والمسافة (FR-12, FR-13)، هنا بنفلتر حسب الزرار اللي اتداس عليه بس.
async function getNearbyRequests(filterName) {
  await wait(400);

  if (filterName === "urgent") {
    return nearbyRequestsList.filter((request) => request.urgency === "urgent");
  }
  if (filterName === "verified") {
    return nearbyRequestsList.filter((request) => request.trust === "verified");
  }
  if (filterName === "lt5km") {
    return nearbyRequestsList.filter((request) => request.distanceKm < 5);
  }
  if (filterName === "today") {
    const today = new Date().toDateString();
    return nearbyRequestsList.filter(
      (request) => new Date(request.expiresAt).toDateString() === today,
    );
  }
  return nearbyRequestsList;

  // const response = await fetch(``, { credentials: 'include' });
  // if (!response.ok) throw new Error('تعذر تحميل الطلبات');
  // return await response.json();
}

//  الشهادة
async function getHospitals() {
  await wait(300);
  return hospitalsList;

  // const response = await fetch('');
  // return await response.json();
}

// بنبعت الملف + المستشفى + التاريخ + الموافقة على الفحص الآلي.
// هنا الملف مبيتبعتش لأي مكان، بنستنى ونرجع نتيجة تجريبية:
// مستشفى شريك -> pending_hospital، مستشفى غير شريك -> looks_valid
// formValues = { file, hospitalId, certificateDate }
async function uploadCertificate(formValues) {
  await wait(1500);

  if (forcedCertificateStatus)
    return certificateResultsByStatus[forcedCertificateStatus];

  const chosenHospital = hospitalsList.find(
    (hospital) => hospital.id === formValues.hospitalId,
  );
  const status = chosenHospital.partner ? "pending_hospital" : "looks_valid";
  return certificateResultsByStatus[status];

  // الملف بيتبعت كـ multipart/form-data مش JSON:
  // const formData = new FormData();
  // formData.append('file', formValues.file);
  // formData.append('hospitalId', formValues.hospitalId);
  // formData.append('date', formValues.certificateDate);
  // formData.append('aiConsent', 'true');
  // const response = await fetch('/api/donor/certificate', { method: 'POST', credentials: 'include', body: formData });
  // if (!response.ok) throw new Error('تعذر رفع الشهادة');
  // return await response.json();
}

async function askForManualReview() {
  await wait(600);
  return { queued: true };

  // const response = await fetch('/api/donor/certificate/manual-review', { method: 'POST', credentials: 'include' });
  // if (!response.ok) throw new Error('تعذر طلب المراجعة');
  // return await response.json();
}

//  سجل التبرعات
async function getDonationHistory() {
  await wait(400);
  return donationHistoryList;

  // const response = await fetch('', { credentials: 'include' });
  // if (!response.ok) throw new Error('تعذر تحميل السجل');
  // return await response.json();
}

// 2) الـ Provider: بيجيب الداتا بالدوال اللي فوق ويوزعها على الصفحات
export default function DonorProvider({ children }) {
  //  (أ) بيانات المتبرع (كارت المتبرع + مفتاح الاستقبال)
  const [donor, setDonor] = useState(null);

  //  (ب) الطلبات القريبة (صفحة الطلبات + العداد اللي في قايمة حسابي)
  const [requests, setRequests] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allRequestsCount, setAllRequestsCount] = useState(null);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsError, setRequestsError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [requestsReloadCount, setRequestsReloadCount] = useState(0);

  //  (ج) المستشفيات (القايمة المنسدلة في صفحة الشهادة)
  const [hospitals, setHospitals] = useState([]);
  const [hospitalsError, setHospitalsError] = useState(false);

  //  (د) سجل التبرعات
  const [donations, setDonations] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

  // بيانات المتبرع والمستشفيات: مرة واحدة أول ما التطبيق يفتح
  useEffect(() => {
    getDonorProfile().then(setDonor);
    getHospitals()
      .then(setHospitals)
      .catch(() => setHospitalsError(true));
  }, []);

  // الطلبات: بتتحمل أول مرة، وكل ما الفلتر يتغير، وكل ما يدوس "إعادة المحاولة".
  useEffect(() => {
    let isCancelled = false;

    getNearbyRequests(selectedFilter)
      .then((requestsList) => {
        if (isCancelled) return;
        setRequests(requestsList);
        setLastUpdate(new Date());
        setRequestsLoading(false);
        if (selectedFilter === "all") setAllRequestsCount(requestsList.length);
      })
      .catch(() => {
        if (isCancelled) return;
        setRequestsError(true);
        setRequestsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedFilter, requestsReloadCount]);

  // السجل: بيتحمل مرة واحدة أول ما الـ Provider يشتغل
  function fetchHistory() {
    getDonationHistory()
      .then((donationsList) => {
        setDonations(donationsList);
        setHistoryLoading(false);
      })
      .catch(() => {
        setHistoryError(true);
        setHistoryLoading(false);
      });
  }
  useEffect(() => {
    fetchHistory();
  }, []);

  //  الأفعال (Actions) اللي الصفحات بتناديها

  // مفتاح "متاح لاستقبال الطلبات": بنغير الشاشة فوراً، ولو الـ backend رفض بنرجع المفتاح زي ما كان
  async function toggleAvailability(newValue) {
    setDonor({ ...donor, available: newValue });
    try {
      await changeAvailability(newValue);
    } catch {
      setDonor({ ...donor, available: !newValue });
    }
  }

  // المتبرع داس على فلتر: نظهر "جارٍ التحميل" وبعدين الـ useEffect اللي فوق يجيب الطلبات
  function changeFilter(filterName) {
    setRequestsLoading(true);
    setRequestsError(false);
    setSelectedFilter(filterName);
  }

  // زرار "إعادة المحاولة" في الطلبات
  function reloadRequests() {
    setRequestsLoading(true);
    setRequestsError(false);
    setRequestsReloadCount(requestsReloadCount + 1);
  }

  // زرار "إعادة المحاولة" في السجل
  function reloadHistory() {
    setHistoryLoading(true);
    setHistoryError(false);
    fetchHistory();
  }

  // كل اللي الصفحات تحتاجه بيتحط في object واحد
  const value = {
    donor,
    toggleAvailability,

    requests,
    selectedFilter,
    changeFilter,
    allRequestsCount,
    requestsLoading,
    requestsError,
    lastUpdate,
    reloadRequests,

    hospitals,
    hospitalsError,
    sendCertificate: uploadCertificate, // بترفع الشهادة وترجع نتيجة الفحص
    requestManualReview: askForManualReview,

    donations,
    historyLoading,
    historyError,
    reloadHistory,
  };

  return (
    <DonorContext.Provider value={value}>{children}</DonorContext.Provider>
  );
}
