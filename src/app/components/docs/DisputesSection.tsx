import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface DisputesSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function DisputesSection({ isDarkMode, selectedLanguage }: DisputesSectionProps) {
  return (
    <section id="disputes" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Disputes
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Manage payment disputes and chargebacks.
      </p>

      {/* Dispute list */}
      <div id="disputes-list" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Dispute list
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/disputes" \\
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
  "disputes": [
    {
      "id": 123,
      "amount": 1000,
      "currency": "USD",
      "status": "pending|resolved|declined",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
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

def disputes(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/disputes' % (SANDBOX_URL), headers=headers)`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Retrieve a list of all disputes.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/disputes'
        </p>
      </div>

      {/* Create a dispute */}
      <div id="disputes-create" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create a dispute
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/disputes" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token": "payment_token",
        "description": "Dispute description",
        "document": "/path/to/receipt.pdf",
        "amount": 1000
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
  "result": 0,
  "status": 200
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

def payout(request):
    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token": "XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX",
        "description": "test description",
        "document": "/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png"
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/disputes' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "result": 0,
  "status": 200
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>
    </section>
  );
}