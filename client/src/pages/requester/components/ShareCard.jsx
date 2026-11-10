import { useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import BloodTypeChip from '@/components/ui/BloodTypeChip';
import TrustBadge from '@/components/ui/TrustBadge';

// never put a phone number in the share text (FR-17)
export default function ShareCard({ request, disabled = false }) {
  const [copy, setCopy] = useState('idle'); // 'idle' | 'copied' | 'failed'
  const fullUrl = `https://${request.shareUrl}`;
  const text = `مطلوب متبرعون بفصيلة ${request.bloodType} في ${request.hospital}. ${fullUrl}`;

  const shareWhatsApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text, url: fullUrl });
        return;
      } catch {
        /* user closed the sheet → fall through to wa.me */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
    setTimeout(() => setCopy('idle'), 2500);
  };

  return (
    <Panel id="share-title" as="h3" title="شارك الطلب">
      <div className="rounded-tile border-line bg-surface-2 hc:border-2 border p-3.5">
        <div className="flex items-center gap-2.5">
          <BloodTypeChip type={request.bloodType} solid />
          <div className="min-w-0">
            <b className="text-small block">
              مطلوب متبرعون بفصيلة <bdi dir="ltr">{request.bloodType}</bdi>
            </b>
            <span className="text-tiny text-ink-3 block">
              {request.hospital} · {request.area}
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <TrustBadge level={request.trust} />
          <span className="text-tiny text-ink-3 min-w-0">
            رابط:{' '}
            <bdi dir="ltr" className="break-all">
              {request.shareUrl}
            </bdi>
          </span>
        </div>
      </div>

      <div className="xs:flex-row xs:flex-wrap mt-4 flex flex-col gap-2 lg:flex-col xl:flex-row">
        <Button variant="whatsapp" icon={MessageCircle} disabled={disabled} onClick={shareWhatsApp}>
          مشاركة على واتساب
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={copy === 'copied' ? Check : Copy}
          disabled={disabled}
          onClick={copyLink}
        >
          {copy === 'copied' ? 'تم النسخ' : 'نسخ الرابط'}
        </Button>
      </div>

      {/* confirmation for screen readers and sighted users (Toast alternative) */}
      <p role="status" className="text-tiny text-ink-3 mt-2 min-h-5">
        {copy === 'copied' && 'نسخنا الرابط.'}
        {copy === 'failed' && 'تعذّر النسخ، انسخ الرابط يدوياً.'}
        {copy === 'idle' &&
          (disabled ? 'انتهى الطلب، فلا يمكن مشاركته.' : 'الرابط يفتح صفحة الطلب المفحوص، بدون أي رقم هاتف.')}
      </p>
    </Panel>
  );
}
