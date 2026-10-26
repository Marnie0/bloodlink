// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: steps = string[], current (1-based), label
export default function Stepper({ steps = [], current }) {
  return (
    <p>
      {current} / {steps.length}: {steps[current - 1]}
    </p>
  );
}
