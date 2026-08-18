const DIGITS = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín"
];

const SCALE_UNITS = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

function readTwoDigits(value: number, full: boolean): string {
  const tens = Math.floor(value / 10);
  const unit = value % 10;

  if (tens === 0) {
    if (unit === 0) {
      return "";
    }
    return full ? `lẻ ${DIGITS[unit]}` : DIGITS[unit];
  }

  if (tens === 1) {
    if (unit === 0) {
      return "mười";
    }
    if (unit === 5) {
      return "mười lăm";
    }
    return `mười ${DIGITS[unit]}`;
  }

  let result = `${DIGITS[tens]} mươi`;
  if (unit === 0) {
    return result;
  }
  if (unit === 1) {
    return `${result} mốt`;
  }
  if (unit === 4) {
    return `${result} tư`;
  }
  if (unit === 5) {
    return `${result} lăm`;
  }
  result = `${result} ${DIGITS[unit]}`;
  return result;
}

function readThreeDigits(value: number, full: boolean): string {
  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;

  if (hundreds === 0) {
    return readTwoDigits(remainder, full);
  }

  const prefix = `${DIGITS[hundreds]} trăm`;
  if (remainder === 0) {
    return prefix;
  }
  return `${prefix} ${readTwoDigits(remainder, true)}`;
}

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function numberToVietnameseWords(value: number): string {
  const rounded = Math.round(value);
  if (!Number.isFinite(rounded) || rounded < 0) {
    return "";
  }

  if (rounded === 0) {
    return "";
  }

  const groups: number[] = [];
  let remaining = rounded;
  while (remaining > 0) {
    groups.push(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i -= 1) {
    const groupValue = groups[i];
    if (groupValue === 0) {
      continue;
    }

    const hasHigherNonZeroGroup = i < groups.length - 1;
    const groupText = readThreeDigits(groupValue, hasHigherNonZeroGroup);
    const scale = SCALE_UNITS[i] ?? "";
    parts.push(normalize(`${groupText} ${scale}`));
  }

  const sentence = normalize(parts.join(" "));
  const capitalized = `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;
  return `${capitalized} đồng`;
}
