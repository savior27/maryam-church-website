import { Copy, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import churchConfig from '../data/churchConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { useCopyToClipboard } from '../hooks';
import { isPlaceholder } from '../utils';

/**
 * DonationCard Component
 * 
 * Elegant card displaying official church banking details with 
 * 1-click copy capability and full multi-language translations.
 */
export default function DonationCard() {
  const { t, currentLanguage } = useLanguage();
  const donation = churchConfig.donation || {};
  const { copied, copy } = useCopyToClipboard();

  const isAccountPlaceholder = isPlaceholder(donation.accountNumber);
  const isCardConfigured = Boolean(donation.isConfigured && !isAccountPlaceholder);

  const handleCopy = () => {
    if (!isCardConfigured || !donation.accountNumber) return;
    copy(donation.accountNumber);
  };

  const localizedChurchName =
    currentLanguage === 'am'
      ? churchConfig.churchNameAmharic || churchConfig.churchName
      : churchConfig.churchName;

  const bankDetails = [
    {
      label: t('donation.bankName') || 'Bank Name',
      value: donation.bankName || (currentLanguage === 'am' ? 'የኢትዮጵያ ንግድ ባንክ' : 'Commercial Bank of Ethiopia'),
    },
    {
      label: t('donation.accountHolder') || 'Account Holder',
      value: donation.accountHolder || localizedChurchName,
    },
    {
      label: t('donation.accountNumber') || 'Account Number',
      value: donation.accountNumber || (currentLanguage === 'am' ? 'የሂሳብ ቁጥሩ በመዘመን ላይ ነው' : 'Pending Configuration'),
      isAccount: true,
    },
    {
      label: t('donation.branchName') || 'Branch',
      value: donation.branchName || donation.branch || (currentLanguage === 'am' ? 'ዋናው ቅርንጫፍ' : 'Main Branch'),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 border-t-4 border-t-gold max-w-2xl mx-auto">
      {/* Header section with icon */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
          <Building2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold font-body">
            {t('donation.directTransfer') || 'Direct Bank Transfer'}
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
            {t('donation.churchAccountDetails') || 'Church Account Details'}
          </h3>
        </div>
      </div>

      {/* Bank Details Rows */}
      <div className="space-y-4 mb-8">
        {bankDetails.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-50 last:border-b-0 gap-1 sm:gap-4"
          >
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">
              {item.label}
            </span>
            <span
              className={`text-base sm:text-lg font-semibold text-charcoal ${
                item.isAccount ? 'font-mono text-burgundy tracking-wide' : ''
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}

        <div className="pt-2 text-xs text-charcoal/70 bg-ivory p-3 rounded-lg border border-gray-100">
          {t('donation.paymentRef') || donation.paymentReference || 'Please use your full name as payment reference.'}
        </div>
      </div>

      {/* Copy Account Number Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!isCardConfigured}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-md ${
            isCardConfigured
              ? 'bg-burgundy hover:bg-burgundy-light text-white cursor-pointer active:scale-[0.99] hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          {copied ? (
            <>
              <CheckCircle className="w-5 h-5 text-gold" aria-hidden="true" />
              <span>{t('donation.copiedBtn') || 'Copied!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-gold" aria-hidden="true" />
              <span>
                {isCardConfigured
                  ? t('donation.copyBtn') || 'Copy Account Number'
                  : currentLanguage === 'am'
                  ? 'የሂሳብ ቁጥር (በዝግጅት ላይ)'
                  : 'Account Number (Pending)'}
              </span>
            </>
          )}
        </button>

        {!isCardConfigured && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-charcoal/60 text-center">
            <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
            <span>
              {t('donation.notConfigured') ||
                'Official bank account details will be updated shortly.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { DonationCard };
