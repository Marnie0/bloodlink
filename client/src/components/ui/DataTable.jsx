// Stub from feat/frontend-setup. R5 replaces this whole file on feat/ui-data.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: caption, columns = [{ key, header, render? }], rows, getRowKey = (r) => r.id
export default function DataTable({ caption, columns = [], rows = [], getRowKey = (r) => r.id }) {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={getRowKey(r)}>
            {columns.map((c) => (
              <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
