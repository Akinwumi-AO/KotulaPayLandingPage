import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface RefundSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function RefundSection({ isDarkMode, selectedLanguage }: RefundSectionProps) {
  return (
    <section id="refund" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Refunds
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Kotulapay refunds processing REST API.
      </p>

      {/* Create refund */}
      <div id="refund-create" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create refund
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/refunds" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product",
        "amount": 100
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
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token": request.POST['token payment'],
        "amount": 100
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/refunds' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Create refunds by providing a payment token.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/refunds'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['token', 'yes', 'Payment token.'],
            ['amount', 'no', 'Refund amount in cents.'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}