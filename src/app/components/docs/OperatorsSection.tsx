import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface OperatorsSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function OperatorsSection({ isDarkMode, selectedLanguage }: OperatorsSectionProps) {
  return (
    <section id="operators" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Operators
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Manage operator information and settings.
      </p>

      {/* Operator */}
      <div id="operators-operator" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Operator
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/operator?phone=77775415544" \\
    -X GET \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json"`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "status": 200,
  "operator": "beeline"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def operator(request):
    MERCHANT_PRIVATE_KEY = 'merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/operator?phone=77775415544' % (SANDBOX_URL), headers=headers)`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "status": 200,
  "operator": "beeline"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Retrieve operator account information, settings, and limits.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/operator'
        </p>

        <h3 className={`text-lg font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Response Fields
        </h3>
        <ParamsTable
          headers={['Field', 'Type', 'Description']}
          rows={[
            ['id', 'integer', 'Unique operator identifier'],
            ['name', 'string', 'Operator name'],
            ['email', 'string', 'Operator email address'],
            ['company', 'string', 'Company name'],
            ['status', 'string', 'Account status: active or inactive'],
            ['created_at', 'string', 'Account creation timestamp'],
            ['settings', 'object', 'Operator settings and configuration'],
            ['limits', 'object', 'Transaction limits'],
          ]}
          isDarkMode={isDarkMode}
        />

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Update Operator Settings
            </h3>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/operator" \\
    -X PUT \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "webhook_url": "https://example.com/new-webhook",
        "notification_email": "new-notifications@example.com"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "errors": [],
  "status": 200,
  "message": "Settings updated successfully"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-2 mt-6 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          PUT '/api/v1/operator'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Updatable Fields
        </h3>
        <ParamsTable
          headers={['Parameter', 'Type', 'Description']}
          rows={[
            ['webhook_url', 'string', 'URL for webhook notifications'],
            ['notification_email', 'string', 'Email for notifications'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}