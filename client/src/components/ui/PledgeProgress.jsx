// Stub from feat/frontend-setup. R5 replaces this whole file on feat/ui-data.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: pledged, needed
export default function PledgeProgress({ pledged, needed }) {
  return (
    <p>
      {pledged} / {needed}
    </p>
  );
}
