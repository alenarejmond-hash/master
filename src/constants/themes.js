export const THEMES_V1 = {
  appBg: "bg-[#FAF7F2]", appTextMain: "text-[#2B231F]", appTextSub: "text-[#6E6359]", headerBg: "bg-transparent",
  avatarBorder: "border-[#EADBCE]", glow: "bg-[#C5A059]/10", cardBg: "bg-[#FFFFFF]", cardBorder: "border-[#EADBCE]/80",
  cardTextMain: "text-[#2B231F]", cardTextSub: "text-[#6E6359]", btnPrimary: "bg-[#2C2420] text-[#FAF8F5] shadow-[#2C2420]/20",
  accentText: "text-[#9E7A3E]", accentBg: "bg-[#C5A059]/10", badgeBg: "bg-[#F0EAE1]", badgeText: "text-[#2B231F]",
  statusBadgeBg: "bg-[#C5A059]/15", statusBadgeText: "text-[#9E7A3E]", tabActive: "bg-[#2C2420] text-[#FAF8F5]",
  tabInactive: "bg-[#FFFFFF] text-[#6E6359] border-[#EADBCE]/80", btnSecondary: "bg-[#FAF7F2] text-[#2B231F] hover:bg-[#F0EAE1]",
  iconWrapper: "bg-[#F0EAE1] text-[#9E7A3E]", policyBg: "bg-[#FFFFFF]", bullet: "bg-[#C5A059]", footerBg: "bg-[#FAF7F2]",
  footerBorder: "border-[#EADBCE]/80", modalBg: "bg-[#FAF7F2]", grabber: "bg-[#EADBCE]", inputBg: "bg-[#FFFFFF] focus-within:bg-[#FAF7F2]",
  inputBorder: "border-[#EADBCE] focus-within:border-[#C5A059]", inputFocusRing: "focus-within:ring-[#C5A059]/30",
  inputText: "text-[#2B231F]", successIcon: "text-[#C5A059]", successBg: "bg-[#C5A059]/15", statusDotBg: "bg-emerald-500",
  cardShadow: "shadow-[0_4px_24px_-8px_rgba(44,36,32,0.06)]", pillBg: "bg-black/5", skeletonBg: "bg-black/5",
};

export const THEMES_V2 = {
  appBg: "bg-[#F5F2EB]", appTextMain: "text-[#1E1C1A]", appTextSub: "text-[#6B635B]", headerBg: "bg-transparent",
  avatarBorder: "border-[#E2DDD3]", glow: "bg-[#E2DDD3]/40", cardBg: "bg-[#FCFAF7]", cardBorder: "border-[#E5DFD5]",
  cardTextMain: "text-[#1E1C1A]", cardTextSub: "text-[#6B635B]", btnPrimary: "bg-[#1E1C1A] text-[#FAF8F5] shadow-[#1E1C1A]/15",
  accentText: "text-[#1E1C1A]", accentBg: "bg-[#EAE4D9]", badgeBg: "bg-[#EAE4D9]", badgeText: "text-[#1E1C1A]",
  statusBadgeBg: "bg-[#EAE4D9]", statusBadgeText: "text-[#1E1C1A]", tabActive: "bg-[#1E1C1A] text-[#FAF8F5]",
  tabInactive: "bg-[#FCFAF7] text-[#6B635B] border-[#E5DFD5]", btnSecondary: "bg-[#F5F2EB] text-[#1E1C1A] hover:bg-[#EAE4D9]",
  iconWrapper: "bg-[#EAE4D9] text-[#1E1C1A]", policyBg: "bg-[#FCFAF7]", bullet: "bg-[#1E1C1A]", footerBg: "bg-[#F5F2EB]",
  footerBorder: "border-[#E5DFD5]", modalBg: "bg-[#F5F2EB]", grabber: "bg-[#D8D0C5]", inputBg: "bg-[#FCFAF7] focus-within:bg-[#F5F2EB]",
  inputBorder: "border-[#E5DFD5] focus-within:border-[#1E1C1A]", inputFocusRing: "focus-within:ring-[#1E1C1A]/20",
  inputText: "text-[#1E1C1A]", successIcon: "text-emerald-700", successBg: "bg-emerald-50", statusDotBg: "bg-emerald-600",
  cardShadow: "shadow-[0_2px_15px_-4px_rgba(30,28,26,0.05)]", pillBg: "bg-[#EAE4D9]", skeletonBg: "bg-black/5",
};

export const THEMES = {
  obsidian: THEMES_V1,
  carbon: THEMES_V2
};

export const THEME_OPTIONS = [
  { id: 'obsidian', color: '#FAF7F2', border: '#C5A059' },
  { id: 'carbon', color: '#F5F2EB', border: '#1E1C1A' }
];
