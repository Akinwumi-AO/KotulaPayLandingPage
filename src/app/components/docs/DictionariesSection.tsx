import { ParamsTable } from './ParamsTable';

interface DictionariesSectionProps {
  isDarkMode: boolean;
}

export function DictionariesSection({ isDarkMode }: DictionariesSectionProps) {
  return (
    <section id="dictionaries" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Dictionaries
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Reference information for errors, payment states, and error codes.
      </p>

      {/* Errors */}
      <div id="dictionaries-errors" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Errors
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Kotulapay uses conventional HTTP response codes to indicate the success or failure of an API request.
        </p>

        <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          HTTP Status Codes
        </h3>
        <ParamsTable
          headers={['Code', 'Status', 'Description']}
          rows={[
            ['200', 'OK', 'Everything worked as expected'],
            ['400', 'Bad Request', 'The request was unacceptable, often due to missing parameters'],
            ['401', 'Unauthorized', 'No valid API key provided'],
            ['402', 'Request Failed', 'The parameters were valid but the request failed'],
            ['403', 'Forbidden', 'The API key doesn\'t have permissions to perform the request'],
            ['404', 'Not Found', 'The requested resource doesn\'t exist'],
            ['409', 'Conflict', 'The request conflicts with another request'],
            ['429', 'Too Many Requests', 'Too many requests hit the API too quickly'],
            ['500', 'Server Error', 'Something went wrong on Kotulapay\'s end'],
            ['502', 'Bad Gateway', 'The server was unable to process the request'],
            ['503', 'Service Unavailable', 'The server is temporarily unavailable'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Payment states */}
      <div id="dictionaries-payment-states" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment states
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          The following table describes all possible payment statuses:
        </p>

        <ParamsTable
          headers={['Status', 'Description']}
          rows={[
            ['init', 'Payment has been initialized but not processed yet'],
            ['pending', 'Payment is being processed'],
            ['approved', 'Payment has been successfully completed'],
            ['declined', 'Payment was declined by the payment processor or bank'],
            ['expired', 'Payment request has expired (not completed within the allowed time)'],
            ['refunded', 'Payment has been refunded to the customer'],
            ['partially_refunded', 'Payment has been partially refunded'],
            ['chargeback', 'Payment is under dispute/chargeback'],
            ['cancelled', 'Payment was cancelled by the merchant or customer'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Kinds of errors */}
      <div id="dictionaries-kinds-of-errors" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Kinds of errors
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Different types of errors that can occur during API requests:
        </p>

        <ParamsTable
          headers={['Error Type', 'Description']}
          rows={[
            ['validation_error', 'Invalid parameters were supplied to the API'],
            ['authentication_error', 'Failure to properly authenticate in the request'],
            ['authorization_error', 'The API key lacks the necessary permissions'],
            ['card_error', 'Card-related errors (declined, insufficient funds, etc.)'],
            ['processing_error', 'An error occurred while processing the payment'],
            ['rate_limit_error', 'Too many requests were made in a short time'],
            ['network_error', 'Network communication error'],
            ['api_error', 'Internal server error'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Codes of errors */}
      <div id="dictionaries-codes-of-errors" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Codes of errors
        </h2>

        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Specific error codes returned in the API response:
        </p>

        <ParamsTable
          headers={['Error Code', 'Description', 'Resolution']}
          rows={[
            ['invalid_request', 'The request is invalid or malformed', 'Check the request parameters and format'],
            ['invalid_api_key', 'The API key is invalid or expired', 'Verify your API key is correct and active'],
            ['invalid_amount', 'The amount is invalid (negative, zero, or too large)', 'Use a valid positive amount'],
            ['invalid_currency', 'The currency code is not supported', 'Use a supported currency code (USD, EUR, etc.)'],
            ['invalid_card', 'The card number is invalid', 'Check the card number format'],
            ['card_declined', 'The card was declined', 'Ask the customer to use another card'],
            ['insufficient_funds', 'The card has insufficient funds', 'Ask the customer to use another payment method'],
            ['expired_card', 'The card has expired', 'Ask the customer to use a valid card'],
            ['incorrect_cvc', 'The CVC/CVV is incorrect', 'Ask the customer to verify their card details'],
            ['processing_error', 'An error occurred while processing', 'Retry the request or contact support'],
            ['rate_limit_exceeded', 'Too many requests', 'Slow down the request rate'],
            ['payment_not_found', 'The payment token was not found', 'Verify the payment token is correct'],
            ['payment_already_processed', 'The payment has already been processed', 'Check the payment status'],
            ['duplicate_request', 'Duplicate request detected', 'Use a unique request identifier'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}
