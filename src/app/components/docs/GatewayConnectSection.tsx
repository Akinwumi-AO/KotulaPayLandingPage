import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface GatewayConnectSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function GatewayConnectSection({ isDarkMode, selectedLanguage }: GatewayConnectSectionProps) {
  return (
    <section id="gateway-connect" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Gateway.Connect
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Integration guide for connecting external payment gateways to Kotulapay.
      </p>

      {/* H2H: Flow of Payments */}
      <div id="gateway-connect-h2h-flow" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          H2H: Flow of Payments
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Host-to-Host (H2H) integration allows direct server-to-server communication for payment processing without customer redirection.
        </p>

        <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment Flow Steps
        </h3>
        <ol className={`list-decimal list-inside space-y-3 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Merchant initiates payment request to Kotulapay API</li>
          <li>Kotulapay validates the request and forwards to connected gateway</li>
          <li>Gateway processes the payment and returns result</li>
          <li>Kotulapay sends callback notification to merchant</li>
          <li>Merchant confirms receipt and updates order status</li>
        </ol>
      </div>

      {/* H2H: Diagram of Payment Flow */}
      <div id="gateway-connect-h2h-diagram" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          H2H: Diagram of Payment Flow
        </h2>

        <div className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-[#161b22]' : 'border-gray-200 bg-gray-50'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} overflow-x-auto`}>
{`┌──────────┐         ┌──────────────┐         ┌──────────┐
│ Merchant │────1───>│  Kotulapay   │────2───>│ Gateway  │
└──────────┘         └──────────────┘         └──────────┘
     ^                      │                       │
     │                      │                       │
     └──────────4───────────┘                       │
                            │<──────────3───────────┘

1. Payment Request
2. Forward to Gateway
3. Payment Result
4. Callback Notification`}
          </pre>
        </div>
      </div>

      {/* H2H: Required Endpoints */}
      <div id="gateway-connect-h2h-endpoints" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          H2H: Required Endpoints
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Gateway providers must implement the following endpoints for H2H integration:
        </p>

        <ParamsTable
          headers={['Endpoint', 'Method', 'Description']}
          rows={[
            ['/payment/init', 'POST', 'Initialize a new payment'],
            ['/payment/status', 'GET', 'Check payment status'],
            ['/payment/refund', 'POST', 'Process a refund'],
            ['/payout/init', 'POST', 'Initialize a payout'],
            ['/payout/status', 'GET', 'Check payout status'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* H2H: Payment */}
      <div id="gateway-connect-h2h-payment" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          H2H: Payment
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request to Gateway
            </h3>
            <CodeBlock
              code={`curl "https://gateway.example.com/payment/init" \\
    -X POST \\
    -H "Authorization: Bearer gateway_api_key" \\
    -H "Content-Type: application/json" -d '{
        "merchant_id": "merchant_123",
        "amount": 10000,
        "currency": "USD",
        "order_id": "ORDER_456",
        "card": {
            "pan": "4111111111111111",
            "expires": "12/2025",
            "holder": "JOHN DOE",
            "cvv": "123"
        },
        "customer": {
            "email": "customer@example.com",
            "ip": "192.168.1.1"
        },
        "callback_url": "https://business.kotulapay.com/gateway/callback"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expected Response from Gateway
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transaction_id": "TXN_789",
  "status": "approved|declined|pending",
  "amount": 10000,
  "currency": "USD",
  "message": "Transaction approved",
  "redirect_url": null,
  "three_ds": {
    "required": false
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request to Gateway
            </h3>
            <CodeBlock
              code={`import requests
import json

def h2h_payment():
    GATEWAY_API_KEY = 'gateway_api_key'
    GATEWAY_URL = 'https://gateway.example.com'

    payload = {
        "merchant_id": "merchant_123",
        "amount": 10000,
        "currency": "USD",
        "order_id": "ORDER_456",
        "card": {
            "pan": "4111111111111111",
            "expires": "12/2025",
            "holder": "JOHN DOE",
            "cvv": "123"
        },
        "customer": {
            "email": "customer@example.com",
            "ip": "192.168.1.1"
        },
        "callback_url": "https://business.kotulapay.com/gateway/callback"
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (GATEWAY_API_KEY)
    }

    resp = requests.post('%s/payment/init' % (GATEWAY_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return resp_payload
    else:
        return {"error": "Request failed", "status_code": resp.status_code}`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expected Response from Gateway
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transaction_id": "TXN_789",
  "status": "approved|declined|pending",
  "amount": 10000,
  "currency": "USD",
  "message": "Transaction approved",
  "redirect_url": null,
  "three_ds": {
    "required": false
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <h3 className={`text-lg font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Request Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Type', 'Required', 'Description']}
          rows={[
            ['merchant_id', 'string', 'yes', 'Merchant identifier in gateway system'],
            ['amount', 'integer', 'yes', 'Amount in cents'],
            ['currency', 'string', 'yes', 'Currency code'],
            ['order_id', 'string', 'yes', 'Unique order identifier'],
            ['card', 'object', 'yes', 'Card details object'],
            ['customer', 'object', 'no', 'Customer information'],
            ['callback_url', 'string', 'yes', 'URL for status notifications'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* H2H: Payout */}
      <div id="gateway-connect-h2h-payout" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          H2H: Payout
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request to Gateway
            </h3>
            <CodeBlock
              code={`curl "https://gateway.example.com/payout/init" \\
    -X POST \\
    -H "Authorization: Bearer gateway_api_key" \\
    -H "Content-Type: application/json" -d '{
        "merchant_id": "merchant_123",
        "amount": 5000,
        "currency": "USD",
        "payout_id": "PAYOUT_789",
        "card": {
            "pan": "4111111111111111",
            "expires": "12/2025",
            "holder": "JOHN DOE"
        },
        "callback_url": "https://business.kotulapay.com/gateway/payout/callback"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expected Response from Gateway
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transaction_id": "PAYOUT_TXN_456",
  "status": "approved|declined|pending",
  "amount": 5000,
  "currency": "USD",
  "message": "Payout approved"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request to Gateway
            </h3>
            <CodeBlock
              code={`import requests
import json

def h2h_payout():
    GATEWAY_API_KEY = 'gateway_api_key'
    GATEWAY_URL = 'https://gateway.example.com'

    payload = {
        "merchant_id": "merchant_123",
        "amount": 5000,
        "currency": "USD",
        "payout_id": "PAYOUT_789",
        "card": {
            "pan": "4111111111111111",
            "expires": "12/2025",
            "holder": "JOHN DOE"
        },
        "callback_url": "https://business.kotulapay.com/gateway/payout/callback"
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (GATEWAY_API_KEY)
    }

    resp = requests.post('%s/payout/init' % (GATEWAY_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return resp_payload
    else:
        return {"error": "Request failed", "status_code": resp.status_code}`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expected Response from Gateway
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transaction_id": "PAYOUT_TXN_456",
  "status": "approved|declined|pending",
  "amount": 5000,
  "currency": "USD",
  "message": "Payout approved"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>

      {/* P2P: Flow of Payments */}
      <div id="gateway-connect-p2p-flow" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          P2P: Flow of Payments
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Peer-to-Peer integration enables direct card-to-card transfers and alternative payment methods.
        </p>

        <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          P2P Payment Flow
        </h3>
        <ol className={`list-decimal list-inside space-y-3 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Customer initiates P2P payment with source and destination details</li>
          <li>Kotulapay validates both parties and amount</li>
          <li>Payment is forwarded to P2P gateway</li>
          <li>Gateway processes the transfer</li>
          <li>Both parties receive confirmation</li>
        </ol>
      </div>

      {/* P2P: Diagram of Payment Flow */}
      <div id="gateway-connect-p2p-diagram" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          P2P: Diagram of Payment Flow
        </h2>

        <div className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-[#161b22]' : 'border-gray-200 bg-gray-50'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} overflow-x-auto`}>
{`┌──────────┐         ┌──────────────┐         ┌────────────┐
│  Sender  │────1───>│  Kotulapay   │────2───>│ P2P Gateway│
└──────────┘         └──────────────┘         └────────────┘
                            │                       │
                            │<──────────3───────────┘
                            │
     ┌──────────┐           │
     │ Receiver │<─────4────┘
     └──────────┘

1. P2P Payment Request
2. Forward to P2P Gateway
3. Transfer Confirmation
4. Notify Receiver`}
          </pre>
        </div>
      </div>

      {/* P2P: Required Endpoints */}
      <div id="gateway-connect-p2p-endpoints" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          P2P: Required Endpoints
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          P2P gateway providers must implement:
        </p>

        <ParamsTable
          headers={['Endpoint', 'Method', 'Description']}
          rows={[
            ['/p2p/transfer', 'POST', 'Initialize P2P transfer'],
            ['/p2p/status', 'GET', 'Check transfer status'],
            ['/p2p/validate', 'POST', 'Validate recipient details'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* P2P: Payment */}
      <div id="gateway-connect-p2p-payment" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          P2P: Payment
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://gateway.example.com/p2p/transfer" \\
    -X POST \\
    -H "Authorization: Bearer gateway_api_key" \\
    -H "Content-Type: application/json" -d '{
        "merchant_id": "merchant_123",
        "amount": 10000,
        "currency": "RUB",
        "transfer_id": "TRANSFER_456",
        "sender": {
            "card": "4111111111111111",
            "expires": "12/2025",
            "cvv": "123"
        },
        "recipient": {
            "card": "5555555555554444"
        },
        "callback_url": "https://business.kotulapay.com/p2p/callback"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transfer_id": "TRANSFER_456",
  "gateway_transaction_id": "P2P_TXN_789",
  "status": "approved|declined|pending",
  "amount": 10000,
  "currency": "RUB"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`import requests
import json

def p2p_transfer():
    GATEWAY_API_KEY = 'gateway_api_key'
    GATEWAY_URL = 'https://gateway.example.com'

    payload = {
        "merchant_id": "merchant_123",
        "amount": 10000,
        "currency": "RUB",
        "transfer_id": "TRANSFER_456",
        "sender": {
            "card": "4111111111111111",
            "expires": "12/2025",
            "cvv": "123"
        },
        "recipient": {
            "card": "5555555555554444"
        },
        "callback_url": "https://business.kotulapay.com/p2p/callback"
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (GATEWAY_API_KEY)
    }

    resp = requests.post('%s/p2p/transfer' % (GATEWAY_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return resp_payload
    else:
        return {"error": "Request failed", "status_code": resp.status_code}`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response
            </h3>
            <CodeBlock
              code={`{
  "success": true,
  "transfer_id": "TRANSFER_456",
  "gateway_transaction_id": "P2P_TXN_789",
  "status": "approved|declined|pending",
  "amount": 10000,
  "currency": "RUB"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>

      {/* Callbacks */}
      <div id="gateway-connect-callbacks" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Callbacks
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Gateways must send status updates to Kotulapay callback URLs when transaction status changes.
        </p>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Callback Request Format
            </h3>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/gateway/callback" \\
    -X POST \\
    -H "Content-Type: application/json" \\
    -H "X-Gateway-Signature: signature_hash" -d '{
        "transaction_id": "TXN_789",
        "order_id": "ORDER_456",
        "status": "approved",
        "amount": 10000,
        "currency": "USD",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "message": "Transaction completed successfully"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Callback Request Format
            </h3>
            <CodeBlock
              code={`import requests
import json
import hmac
import hashlib

def send_callback():
    CALLBACK_URL = 'https://business.kotulapay.com/gateway/callback'
    SECRET_KEY = 'your_shared_secret_key'

    payload = {
        "transaction_id": "TXN_789",
        "order_id": "ORDER_456",
        "status": "approved",
        "amount": 10000,
        "currency": "USD",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "message": "Transaction completed successfully"
    }

    # Generate HMAC signature
    payload_str = json.dumps(payload)
    signature = hmac.new(
        SECRET_KEY.encode('utf-8'),
        payload_str.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    headers = {
        'Content-Type': 'application/json',
        'X-Gateway-Signature': signature
    }

    resp = requests.post(CALLBACK_URL, json=payload, headers=headers)
    return resp.status_code`}
              language="python"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <h3 className={`text-lg font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Callback Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Type', 'Description']}
          rows={[
            ['transaction_id', 'string', 'Gateway transaction identifier'],
            ['order_id', 'string', 'Original order identifier'],
            ['status', 'string', 'Transaction status'],
            ['amount', 'integer', 'Amount in cents'],
            ['currency', 'string', 'Currency code'],
            ['timestamp', 'string', 'Event timestamp (ISO 8601)'],
            ['message', 'string', 'Status message or error description'],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-xl font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Security
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          All callbacks must include an <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-[#161b22]' : 'bg-gray-100'}`}>X-Gateway-Signature</code> header with HMAC-SHA256 signature of the request body using the shared secret key.
        </p>
      </div>

      {/* Status */}
      <div id="gateway-connect-status" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Status
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Reactivepay also has a transaction status polling functionality. The endpoint on the application side should respond to the <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-[#161b22]' : 'bg-gray-100'}`}>/status</code> path.
        </p>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request Body
            </h3>
            <CodeBlock
              code={`{
  "settings": {
    "bearer_token": "cd6fb795fd41348df8f0"
  },
  "payment": {
    "gateway_token": "H97UakuQMh17THitGy3Bzu9bX1YSfCEv"
  },
  "method_name": "status"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Request Fields
            </h3>
            <ParamsTable
              headers={['Field', 'Type', 'Description']}
              rows={[
                ['settings', 'Object', 'General gateway or environment settings'],
                ['settings.bearer_token', 'String', 'Authorization bearer token'],
                ['payment', 'Object', 'Payment-specific information'],
                ['payment.gateway_token', 'String', 'Unique identifier for the transaction'],
                ['method_name', 'String', 'Name of the method to be executed (e.g., \'status\')'],
              ]}
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response Body
            </h3>
            <CodeBlock
              code={`{
  "result": "OK",
  "status": "pending",
  "details": "Transaction is pending",
  "amount": 22200,
  "currency": "RUB",
  "logs": [...]
}`}
              language="json"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response Fields
            </h3>
            <ParamsTable
              headers={['Field', 'Type', 'Description']}
              rows={[
                ['result', 'String', 'Result status of the transaction (e.g. OK, ERROR)'],
                ['status', 'String', 'Current status of the transaction (e.g. pending, approved)'],
                ['details', 'String', 'Additional status details or message'],
                ['amount', 'Integer', 'Amount of the transaction in minor units'],
                ['currency', 'String', 'Currency of the transaction'],
                ['logs', 'Array', 'Logs of the transaction process'],
              ]}
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <h3 className={`text-xl font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Standard Transaction Statuses
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          The following statuses are used in Gateway.Connect:
        </p>

        <ParamsTable
          headers={['Status', 'Description', 'Final State']}
          rows={[
            ['pending', 'Transaction is being processed', 'No'],
            ['approved', 'Transaction completed successfully', 'Yes'],
            ['declined', 'Transaction was declined', 'Yes'],
            ['failed', 'Transaction failed due to error', 'Yes'],
            ['cancelled', 'Transaction was cancelled', 'Yes'],
            ['expired', 'Transaction expired (timeout)', 'Yes'],
            ['refunded', 'Transaction was refunded', 'Yes'],
            ['chargeback', 'Transaction disputed/chargeback initiated', 'Yes'],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-xl font-bold mt-8 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Status Transitions
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Valid status transition flow:
        </p>
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-[#161b22]' : 'border-gray-200 bg-gray-50'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
{`pending → approved
pending → declined
pending → failed
pending → expired
approved → refunded
approved → chargeback`}
          </pre>
        </div>
      </div>
    </section>
  );
}