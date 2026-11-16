import { Link } from 'react-router-dom';
import { Droplet, Heart } from 'lucide-react';
import LiveDot from '@/components/ui/LiveDot';
import { arNum } from '../homeFormat';
import StatusLookup from './StatusLookup';

// The dark navy → teal band at the top. The cards under it overlap its bottom
// (the bento grid has a negative top margin), so the bottom padding is large on purpose.
export default function HomeHero({ activeRequests, partnerHospitals }) {
  return (
    <section
      aria-labelledby="home-title"
      className="hc:bg-none hc:bg-black relative overflow-hidden bg-[linear-gradient(120deg,#0B2340_0%,#0E2A47_40%,#0B5E68_100%)] text-white"
    >
      {/* decoration only: diagonal lines + a soft red glow */}
      <div
        aria-hidden="true"
        className="hc:hidden absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.03)_0_2px,transparent_2px_18px),repeating-linear-gradient(-45deg,rgba(255,255,255,.03)_0_2px,transparent_2px_18px)]"
      />
      <div
        aria-hidden="true"
        className="hc:hidden absolute -inset-s-[140px] -top-[180px] size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(228,84,77,.35),transparent_70%)]"
      />

      <div className="relative z-1 mx-auto grid max-w-7xl gap-6 px-4 pt-8 pb-24 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pt-11 lg:pb-[110px]">
        <div>
          <span className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.78rem] font-semibold">
            <span className="text-[#FF9A8A]">
              <LiveDot />
            </span>
            {arNum(activeRequests)} طلباً نشطاً الآن · {arNum(partnerHospitals)} مستشفى شريك
          </span>

          <h1 id="home-title" className="text-[1.85rem] font-extrabold text-white md:text-[2.5rem]">
            خدمات ربط المرضى بمتبرعي الدم،
            <br />
            <em className="hc:bg-none hc:text-white bg-linear-to-l from-[#FF9A8A] to-[#FFC2B4] bg-clip-text text-transparent not-italic">
              في مكان واحد.
            </em>
          </h1>
          <p className="mt-3 max-w-[560px] text-white/90">
            قدّم طلب دم بورقة رسمية من المستشفى، أو سجّل كمتبرع بشهادة فصيلة الدم. اللقاء دائماً داخل
            المستشفى، والتبرع مجاني بالكامل.
          </p>

          <div className="mt-5.5 flex flex-wrap gap-3">
            <Link
              to="/requests/new"
              className="bg-urgent shadow-urgent rounded-field hc:border-2 hc:border-white inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-[0.92rem] font-semibold text-white hover:brightness-110"
            >
              <Droplet className="size-4" aria-hidden="true" />
              تقديم طلب دم
            </Link>
            {/* outline style for a dark background */}
            <Link
              to="/donor/requests"
              className="rounded-field hc:border-2 inline-flex min-h-11 items-center gap-2 border border-white/55 px-5 py-2.5 text-[0.92rem] font-semibold text-white hover:bg-white/10"
            >
              <Heart className="size-4" aria-hidden="true" />
              أريد أن أتبرع
            </Link>
          </div>
        </div>

        <StatusLookup />
      </div>
    </section>
  );
}
