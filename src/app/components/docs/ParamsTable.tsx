interface ParamsTableProps {
  isDarkMode: boolean;
  headers: string[];
  rows: string[][];
}

export function ParamsTable({ headers, rows, isDarkMode }: ParamsTableProps) {
  return (
    <div className={`my-4 overflow-x-auto rounded-lg border ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <table className="w-full min-w-[600px]">
        <thead className={isDarkMode ? 'bg-[#161b22]' : 'bg-gray-50'}>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={isDarkMode ? 'bg-[#0d1117]' : 'bg-white'}>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 text-sm ${
                    cellIndex === 0
                      ? `font-mono ${isDarkMode ? 'text-[#c5e063]' : 'text-[#04403a]'}`
                      : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
