export const formatDate = (isoString?: string): string => {
  if (!isoString) return '';
  const idx = isoString.indexOf('T');
  return idx > 0 ? isoString.slice(0, idx) : isoString.slice(0, 10);
};


