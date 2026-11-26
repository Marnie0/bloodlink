import clsx from 'clsx';

export default function KeyValueTable({ rows = [], className }) {
  return (
    <table className={clsx('text-small block w-full md:table', className)}>
      <tbody className="block md:table-row-group md:[&>tr:last-child>*]:border-b-0">
        {rows.map((r) => (
          <tr
            key={r.label}
            className="border-line block border-b border-dashed py-2 last:border-b-0 md:table-row md:border-b-0 md:py-0"
          >
            <th
              scope="row"
              className="text-ink-2 md:border-line block pb-0.5 text-start font-medium md:table-cell md:w-[38%] md:border-b md:border-dashed md:py-2.5 md:pe-3 md:align-top"
            >
              {r.label}
            </th>
            <td className="text-ink md:border-line block md:table-cell md:border-b md:border-dashed md:py-2.5">
              {r.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
