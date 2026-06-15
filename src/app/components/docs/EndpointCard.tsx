import { MethodBadge } from './MethodBadge';
import { CodeTabs } from './CodeTabs';
import { CodeBlock } from './CodeBlock';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface CodeExample {
  language: string;
  code: string;
}

interface EndpointCardProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  parameters?: Parameter[];
  requestExample?: CodeExample[];
  responseExample?: string;
  id?: string;
  isDarkMode?: boolean;
}

export function EndpointCard({
  method,
  endpoint,
  description,
  parameters,
  requestExample,
  responseExample,
  id,
  isDarkMode = false,
}: EndpointCardProps) {
  return (
    <div id={id} className={`scroll-mt-20 rounded-lg border p-6 shadow-sm ${
      isDarkMode
        ? 'border-gray-700 bg-gray-800'
        : 'border-gray-200 bg-white'
    }`}>
      <div className="mb-4 flex items-center gap-3">
        <MethodBadge method={method} />
        <code className={`text-sm font-mono ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          {endpoint}
        </code>
      </div>

      <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>

      {parameters && parameters.length > 0 && (
        <div className="mb-6">
          <h4 className={`mb-3 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            Request Parameters
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-900'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <th className={`px-4 py-2 text-left font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Parameter</th>
                  <th className={`px-4 py-2 text-left font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Type</th>
                  <th className={`px-4 py-2 text-left font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Required</th>
                  <th className={`px-4 py-2 text-left font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Description</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index} className={`border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <td className={`px-4 py-3 font-mono text-xs ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>{param.name}</td>
                    <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {param.type}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          param.required
                            ? 'bg-red-50 text-red-700'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {param.required ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      {param.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {requestExample && requestExample.length > 0 && (
        <div className="mb-6">
          <h4 className={`mb-3 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            Request Example
          </h4>
          <CodeTabs examples={requestExample} isDarkMode={isDarkMode} />
        </div>
      )}

      {responseExample && (
        <div>
          <h4 className={`mb-3 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            Response Example
          </h4>
          <CodeBlock code={responseExample} language="json" isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
}
