import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface PayoutsSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function PayoutsSection({ isDarkMode, selectedLanguage }: PayoutsSectionProps) {
  return (
    <section id="payouts" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Payouts
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Kotulapay payouts processing REST API.
      </p>

      {/* Make a payout */}
      <div id="payouts-make" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Make a payout
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "product": "Payouts",
        "amount": 1000,
        "currency": "USD",
        "card": {
            "pan": "4111111111111111",
            "expires": "01/2025",
            "holder": "cardholder name"
        },
        "callbackUrl": "https://example.com/callback",
        "extraReturnParam": "param"
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
  "token": "[payout token]",
  "payout": {
    "amount": "1000",
    "currency": "USD",
    "status": "pending|approved|declined"
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
        "amount": 10000,
        "currency": "EUR",
        "orderNumber": "10001",
        "card": {
            "pan": "4276111152393643",
            "expires": "08/2022"
        },
        "customer": {
            "first_name": "Mike",
            "last_name": "Green",
            "email": "test@kotulapay.com",
            "address": "test test",
            "ip": "1.1.1.1"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

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
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize payouts - to begin making payouts, you must first call using the following script.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/payouts'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['product', 'yes', 'Product name (Service description).', 'minLength: 5, maxLength: 255'],
            ['amount', 'yes', 'Payout amount in cents (1000)', 'minLength: 1, maxLength: 32'],
            ['currency', 'yes', 'Currency code (EUR, USD, etc).', 'minLength: 3, maxLength: 3'],
            ['card', 'yes', 'Card object for payout.', ''],
            ['callbackUrl', 'no', 'The server URL a merchant will be notified about a payout finalisation', 'Valid URI format'],
            ['extraReturnParam', 'no', 'Extra return parameters', 'minLength: 1, maxLength: 1024'],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Card Object Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['pan', 'yes', 'Card number (PAN)', 'Valid card number (16-19 digits)'],
            ['expires', 'yes', 'Card expiration date. Format: mm/yyyy', 'mm/yyyy format'],
            ['holder', 'yes', 'Cardholder name', 'minLength: 5, maxLength: 50'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Providers */}
      <div id="payouts-providers" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Providers
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          In case multiple payout providers are enabled for a merchant account, the payout response will include available providers.
        </p>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
  "success": true | false,
  "errors": [],
  "token": "[payout token]",
  "providers": [
    {
      "name": "provider_1",
      "status": "available"
    },
    {
      "name": "provider_2",
      "status": "available"
    }
  ],
  "payout": {
    "amount": "1000",
    "currency": "USD",
    "status": "pending"
  }
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