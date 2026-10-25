/**
 * Worship & Prayer Services Schedule
 * ==================================
 * Liturgical services with full English and Amharic localizations.
 */

export const services = [
  {
    id: 'divine-liturgy',
    name: 'Divine Liturgy (Qeddase)',
    nameAmharic: 'ቅዱስ ቅዳሴ',
    day: 'Sunday & Feast Days',
    dayAmharic: 'እሁድና የበዓላት ቀናት',
    time: '6:00 AM - 10:00 AM',
    timeAmharic: 'ከጧቱ 12:00 - 4:00',
    description: 'The central Eucharistic worship service of the Ethiopian Orthodox Tewahedo Church, featuring canonical prayers, holy scripture readings, sacred Zema hymns, and the Holy Communion (Qurbana).',
    descriptionAmharic: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ማዕከላዊ የቁርባን አምልኮት፤ ቀኖናዊ ጸሎቶች፣ የቅዱሳት መጻሕፍት ንባባት፣ ያሬዳዊ ዜማዎችና ምዕመናን የክርስቶስን ቅዱስ ሥጋና ክቡር ደም የሚቀበሉበት የተቀደሰ አገልግሎት።',
    icon: 'Church',
  },
  {
    id: 'evening-prayer',
    name: 'Evening Prayer (Wazema & Seataat)',
    nameAmharic: 'የማታ ጸሎት (ዋዜማና ሰዓታት)',
    day: 'Daily',
    dayAmharic: 'በየቀኑ',
    time: '6:00 PM - 7:00 PM',
    timeAmharic: 'ከምሽቱ 12:00 - 1:00',
    description: 'Peaceful twilight devotional prayer gathering (Wazema / Seataat) offering gratitude for the blessings of the day and seeking divine protection and peace for the night.',
    descriptionAmharic: 'ስለ ቀኑ ሰላምና በረከት ለእግዚአብሔር ምስጋና የሚቀርብበትና የምሽት ሰላምና ጥበቃ የሚለመንበት የዋዜማና የሰዓታት የጋራ ጸሎት።',
    icon: 'Moon',
  },
  {
    id: 'sunday-school',
    name: 'Sunday School & Youth Ministry',
    nameAmharic: 'ሰንበት ትምህርት ቤትና የወጣቶች ጉባኤ',
    day: 'Sunday',
    dayAmharic: 'እሁድ',
    time: '10:30 AM - 12:30 PM',
    timeAmharic: 'ከቀኑ 4:30 - 6:30',
    description: 'Orthodox Christian education for youth, children, and adults, including biblical studies, Church history, spiritual hymns (Zema), and moral guidance.',
    descriptionAmharic: 'የመጽሐፍ ቅዱስ ጥናት፣ የቤተ ክርስቲያን ታሪክ፣ ያሬዳዊ ዜማና ዝማሬ እንዲሁም መንፈሳዊና ሥነ ምግባራዊ መመሪያ ለሕፃናት፣ ለወጣቶችና ለአዋቂዎች የሚሰጥበት ጉባኤ።',
    icon: 'BookOpen',
  },
  {
    id: 'morning-prayer',
    name: 'Morning Prayer (Kidan & Mahlet)',
    nameAmharic: 'የማለዳ ጸሎት (ኪዳንና ማኅሌት)',
    day: 'Daily',
    dayAmharic: 'በየቀኑ',
    time: '5:00 AM - 6:30 AM',
    timeAmharic: 'ከጧቱ 11:00 - 12:30',
    description: 'Canonical dawn prayer (Kidan / Mahlet) to begin each day in devout contemplation, spiritual renewal, and praise to the Holy Trinity.',
    descriptionAmharic: 'ቀኑን በመንፈሳዊ ንቃት፣ በተመስጦና ለቅድስት ሥላሴ በሚቀርብ ምስጋና ለመጀመር የሚደረግ የማለዳ የኪዳንና የማኅሌት ቀኖናዊ ጸሎት።',
    icon: 'Sun',
  },
  {
    id: 'fasting-period-services',
    name: 'Fasting Period Liturgies',
    nameAmharic: 'የአጽዋማት ልዩ ጸሎትና ቅዳሴ',
    day: 'During Canonical Fasts',
    dayAmharic: 'በአጽዋማት ወቅት',
    time: '12:00 PM - 3:00 PM',
    timeAmharic: 'ከቀኑ 6:00 - 9:00',
    description: 'Special mid-day Liturgies, canonical prayers of repentance, and spiritual homilies held during Great Lent (Abiy Tsom) and other canonical fasting seasons.',
    descriptionAmharic: 'በዓቢይ ጾምና በሌሎች አጽዋማት ወቅት የሚከናወኑ ልዩ የምስጋናና የንስሐ ጸሎቶች፣ የቀትር ቅዳሴዎችና የመንፈሳዊ ምክር ትምህርቶች።',
    icon: 'Heart',
  },
  {
    id: 'feast-day-celebrations',
    name: 'Annual Feast Day Celebrations',
    nameAmharic: 'ዓመታዊ የንግሥ በዓላት ክብረ በዓል',
    day: 'On Designated Feast Days',
    dayAmharic: 'በተዘከሩ የበዓላት ቀናት',
    time: 'As Announced',
    timeAmharic: 'በማስታወቂያ በሚገለጸው መሠረት',
    description: 'Solemn festival celebrations commemorating major annual and monthly holy days of Our Lord, Saint Mary (Mariam), Holy Angels, and revered Saints.',
    descriptionAmharic: 'የጌታችን፣ የእመቤታችን የቅድስት ድንግል ማርያም፣ የቅዱሳን መላእክትና የጻድቃን ሰማዕታት ወርሃዊና ዓመታዊ በዓላት በታላቅ መንፈሳዊ ድምቀት የሚከበሩባቸው ክብረ በዓላት።',
    icon: 'Star',
  },
];

export default services;
