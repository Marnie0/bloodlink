import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Ref from '@/components/ui/Ref';
import Tag from '@/components/ui/Tag';

export default function QrTicket({ pledge, hospitalName }) {
  return (
    <div className="rounded-card border-line bg-surface shadow-card min-w-0 overflow-hidden border">
      <div className="bg-urgent p-5 text-white">
        <div className="text-small flex items-center justify-between gap-2 opacity-95">
          <span>
            رقم الموعد <Ref>{pledge.id}</Ref>
          </span>
          <Tag tone="glass">شريك</Tag>
        </div>
        <h2 className="mt-2 text-[1.3rem] font-bold text-white">رمز الحضور</h2>
        <p className="text-small opacity-95">اعرضه على موظف بنك الدم في {hospitalName}.</p>
      </div>

      <div className="border-line before:border-line before:bg-canvas after:border-line after:bg-canvas relative grid justify-items-center border-t-2 border-dashed p-[22px] before:absolute before:-start-[15px] before:-top-3.5 before:size-7 before:rounded-full before:border before:content-[''] after:absolute after:-end-[15px] after:-top-3.5 after:size-7 after:rounded-full after:border after:content-['']">
        {/* Replace with <QRCodeSVG value={pledge.qr.token} bgColor="#fff" fgColor="#0E2A47" /> (qrcode.react).
            Keep it dark-on-white in ALL themes. Never encode personal data. */}
        <div
          role="img"
          aria-label={`رمز QR للموعد ${pledge.id}`}
          className="border-line aspect-square w-[210px] max-w-full rounded-[18px] border bg-white p-3"
        >
          <svg
            viewBox="0 0 21 21"
            className="size-full text-[#0E2A47]"
            shapeRendering="crispEdges"
            aria-hidden
          >
            {[
              [0, 0],
              [14, 0],
              [0, 14],
            ].map(([x, y]) => (
              <g key={`${x}${y}`}>
                <rect x={x} y={y} width="7" height="7" fill="currentColor" />
                <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
                <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
              </g>
            ))}
            <path
              d="M9 1h2v2H9zM9 5h2v2H9zM8 9h3v1H8zM12 9h2v3h-2zM9 12h2v2H9zM15 14h4v2h-4zM17 18h3v2h-3zM12 16h2v4h-2z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div dir="ltr" className="font-head text-head mt-3 text-[1.05rem] font-bold tracking-widest">
          {pledge.code}
        </div>
        <p className="text-tiny text-ink-3 mt-1 text-center">
          صالح حتى <Ref>{pledge.validUntilLabel}</Ref> · للمستشفيات الشريكة فقط
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button variant="navy" size="sm" icon={Download}>
            حفظ الرمز
          </Button>
          <Button variant="line" size="sm">
            إضافة للتقويم
          </Button>
        </div>
      </div>
    </div>
  );
}
