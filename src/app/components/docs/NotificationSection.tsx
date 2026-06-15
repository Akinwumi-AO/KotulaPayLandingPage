import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface NotificationSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function NotificationSection({ isDarkMode, selectedLanguage }: NotificationSectionProps) {
  return (
    <section id="notification" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Notification
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Webhook notifications for payment events.
      </p>

      {/* Receive Notifications */}
      <div id="notification-receive" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Receive Notifications
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Notifications with the payment or payout status are sent to your callback URL using POST methods. In case payment or payout status changed (pending/approved/declined) -- notification type is sent accordingly.
        </p>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`# Notification payload sent to your callback URL
{
  "token": "payment token",
  "type": "payment type: payment | payout",
  "status": "payment status: pending | approved | declined",
  "extraReturnParam": "extra params",
  "orderNumber": "merchant order number",
  "walletToken": "payer's Kotulapay wallet unique identifier",
  "recurringToken": "payer's previously initialized recurring token",
  "sanitizedMask": "payer's sanitized card, if it was provided",
  "amount": "payment amount in cents",
  "currency": "payment currency",
  "gatewayAmount": "exchanged amount in cents",
  "gatewayCurrency": "exchanged currency"
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound

@csrf_exempt
def notifyme(request):
    req_o = json.loads(request.read())
    return HttpResponse('Status is:%s' % (req_o['status']))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notification Payload
            </h3>
            <CodeBlock
              code={`{
  "token": "payment token",
  "type": "payment type: payment | payout",
  "status": "payment status: pending | approved | declined ",
  "extraReturnParam": "extra params",
  "orderNumber": "merchant order number",
  "walletToken": "payer's Kotulapay wallet unique identifier, only for reactivepay payments",
  "recurringToken": "payer's previously initialized recurring token, for making recurrent payment repeatedly",
  "sanitizedMask": "payer's sanitized card, if it was provided",
  "amount": "payment amount in cents",
  "currency": "payment currency",
  "gatewayAmount": "exchanged amount in cents",
  "gatewayCurrency": "exchanged currency"
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