import { cardClass } from '../homeFormat';

// "مستشفى النور" → "ن": skip the word "مستشفى" and the "ال" at the start of the name
const initial = (name) => name.replace(/^مستشفى\s+/, '').replace(/^ال/, '')[0];

export default function PartnerHospitals({ hospitals }) {
  return (
    <section id="partners" aria-labelledby="partners-title" className="mt-7 scroll-mt-4">
      <h2 id="partners-title" className="mb-3 text-[1.15rem] font-bold">
        المستشفيات الشريكة
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {hospitals.map((hospital) => (
          <li key={hospital.name} className={`${cardClass} flex items-center gap-3 px-3.5 py-3`}>
            <span
              aria-hidden="true"
              className="bg-teal-lt text-teal-ink font-head grid size-10 shrink-0 place-items-center rounded-xl text-[0.9rem] font-bold"
            >
              {initial(hospital.name)}
            </span>
            <div>
              <b className="text-head block text-[0.88rem]">{hospital.name}</b>
              <span className="text-ink-3 text-[0.76rem]">{hospital.place}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
