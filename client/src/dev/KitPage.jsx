import LayoutSection from './kit/LayoutSection';
import BasicsSection from './kit/BasicsSection';
import FormsSection from './kit/FormsSection';
import DataSection from './kit/DataSection';
import DialogsSection from './kit/DialogsSection';

export default function KitPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 p-6">
      <h1 className="text-3xl">مكونات رابط الحياة</h1>
      <LayoutSection />
      <BasicsSection />
      <FormsSection />
      <DataSection />
      <DialogsSection />
    </div>
  );
}
