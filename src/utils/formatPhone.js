export const formatPhone = (val) => {
  let v = val.replace(/\D/g, '');
  if (!v) return '';
  if (v.startsWith('7')) {
    let res = '7';
    if (v.length > 1) res += ` (${v.substring(1, 4)}`;
    if (v.length > 4) res += `) ${v.substring(4, 7)}`;
    if (v.length > 7) res += `-${v.substring(7, 9)}`;
    if (v.length > 9) res += `-${v.substring(9, 11)}`;
    return res;
  }
  if (v.startsWith('374')) {
    let res = '374';
    if (v.length > 3) res += ` (${v.substring(3, 5)}`;
    if (v.length > 5) res += `) ${v.substring(5, 11)}`;
    return res;
  }
  if (v.length <= 2) return v;
  if (v.startsWith('3') || v.startsWith('4') || v.startsWith('8') || v.startsWith('9')) {
     let res = v.substring(0, 2);
     if (v.length > 2) res += ` (${v.substring(2, 5)}`;
     if (v.length > 5) res += `) ${v.substring(5, 8)}`;
     if (v.length > 8) res += `-${v.substring(8, 14)}`;
     return res;
  }
  let res = v.substring(0, 3);
  if (v.length > 3) res += ` (${v.substring(3, 6)}`;
  if (v.length > 6) res += `) ${v.substring(6, 10)}`;
  if (v.length > 10) res += `-${v.substring(10, 15)}`;
  return res;
};
