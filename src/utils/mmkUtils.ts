/**
 * Convert MMK amount to cents (1 MMK = 100 cents)
 */
// export function amountToCents(amount: number | string): number {
//   return Math.round(Number(amount) * 100);
// }
// Convert MMK to cents (for saving)
export function amountToCents(amount: number | string): bigint {
  return BigInt(Number(amount) * 100);
}

/**
 * Convert cents to သိန်း format (e.g., "1 Lakhs" or "၁ သိန်း")
 */
export function centsToLakh(cents: number, locale: 'en' | 'mm' = 'en'): string {
  const mmk = cents / 100;
  const lakh = mmk / 100000;

  if (locale === 'mm') {
    // Convert number to Burmese digits
    const burmeseDigits = lakh
      .toLocaleString('my', {
        maximumFractionDigits: lakh < 1 ? 2 : 0,
      })
      .replace(/[0-9]/g, (d) => '၀၁၂၃၄၅၆၇၈၉'[parseInt(d)]);
    return `${burmeseDigits} သိန်း`;
  }

  return `${lakh.toLocaleString('en-US', {
    maximumFractionDigits: lakh < 1 ? 2 : 0,
  })} Lakhs`;
}

/**
 * Convert cents to MMK string format (e.g., "MMK 10,000")
 */
export function centsToMMK(cents: number, locale: 'en' | 'mm' = 'en'): string {
  const mmk = cents / 100;
  return mmk.toLocaleString(locale === 'mm' ? 'my' : 'en-US', {
    currency: 'MMK',
    minimumFractionDigits: 0,
    style: 'currency',
  });
}

/**
 * Convert cents to MMK number format only (e.g., "10,000")
 */
export function centsToMMKFormatOnly(
  cents: number,
  locale: 'en' | 'mm' = 'en'
): string {
  const mmk = cents / 100;
  return mmk.toLocaleString(locale === 'mm' ? 'my' : 'en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

/**
 * Convert cents back to MMK number
 */
// export function centsToNumber(cents: number): number {
//   return cents / 100;
// }
// Convert cents to MMK (for response)
export function centsToNumber(cents: bigint | number): number {
  return Number(cents) / 100;
}

/**
 * Convert သိန်း (lakh) to cents
 * Example: ၁ သိန်း (100,000 MMK) → 10,000,000 cents
 */
export function lakhToCents(lakh: number | string): number {
  return Math.round(Number(lakh) * 100000 * 100); // lakh × 100,000 MMK × 100
}

// const mmk = 100000;
// const cents = amountToCents(mmk); // → 10000000
// console.log("Cents:", cents); // 10,000,000

// console.log("MMK (en):", centsToMMK(cents));        // MMK 100,000
// console.log("MMK (mm):", centsToMMK(cents, "mm"));  // MMK ၁၀၀,၀၀၀

// console.log("Lakh (en):", centsToLakh(cents));         // 1 Lakhs
// console.log("Lakh (mm):", centsToLakh(cents, "mm"));   // ၁ သိန်း

// console.log("Format only (mm):", centsToMMKFormatOnly(cents, "mm")); // ၁၀၀,၀၀၀

// const lakhToSave = ၁၀; // 10 Lakhs
// console.log("10 သိန်း to cents:", lakhToCents(lakhToSave)); // 1,000,000,000

