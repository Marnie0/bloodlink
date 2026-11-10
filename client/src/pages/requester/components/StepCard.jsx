// كارت بعنوان، بتتحط فيه كل خطوة
export default function StepCard({ title, children }) {
  return (
    <section className="bg-surface border-line rounded-card shadow-card mt-4 border first:mt-0">
      <h2 className="border-line-2 flex items-center gap-2.5 border-b px-4.5 py-3.5 text-[1.05rem] font-extrabold">
        <span aria-hidden="true" className="bg-gold inline-block h-4.5 w-1 rounded" />
        {title}
      </h2>
      <div className="p-4.5">{children}</div>
    </section>
  );
}
