
/**
 * Reusable SectionHeading Component
 * 
 * Props:
 * - label: Optional uppercase gold badge/label above the main heading
 * - title: Main section heading (h2)
 * - subtitle: Optional explanatory paragraph below heading
 * - align: 'center' (default) or 'left'
 * - className: Additional CSS classes for the container
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isLeft = align === 'left';

  return (
    <div
      className={`w-full mb-10 md:mb-12 ${
        isLeft ? 'text-left' : 'text-center mx-auto max-w-3xl'
      } ${className}`}
    >
      {/* Optional small label text */}
      {label && (
        <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-gold font-body mb-2">
          {label}
        </span>
      )}

      {/* Main heading */}
      {title && (
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {/* Gold decorative divider */}
      <div
        className={`h-1 w-16 bg-gold rounded-full mt-4 mb-3 ${
          isLeft ? '' : 'mx-auto'
        }`}
        aria-hidden="true"
      />

      {/* Optional subtitle paragraph */}
      {subtitle && (
        <p
          className={`text-charcoal/80 text-base md:text-lg leading-relaxed mt-2 ${
            isLeft ? 'max-w-2xl' : 'max-w-2xl mx-auto'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
