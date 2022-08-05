export default function Table({headings, rows}: {headings: string[], rows: string[][]}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {headings.map((heading: string, headingIx: number) => (
                      <th key={headingIx} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rows.map((row: string[], rowIx: number) => (
                    <tr key={rowIx}>
                      {row.map((item, itemIx) => (
                        <td key={itemIx} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
