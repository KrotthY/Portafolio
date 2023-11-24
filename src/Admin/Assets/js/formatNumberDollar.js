function formatNumberWithDollar(value) {

  if (!value) {
    return '$0';
  }
  value = value.toString();
  const numericValue = value.replace(/\$|\.|,/g, '');
  const formattedValue = new Intl.NumberFormat().format(numericValue);
  return `$${formattedValue}`;
}

export default formatNumberWithDollar;