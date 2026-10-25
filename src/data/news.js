/**
 * Parish News & Announcements Data
 * =================================
 * News and announcements with full English and Amharic localizations.
 */

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1548407260-da850faa41e8?w=800';

export const news = [
  {
    id: 'sample-news-1',
    title: 'Solemn Feast Day Celebration and Divine Liturgy',
    titleAmharic: 'የታላቁ ዓመታዊ የንግሥ በዓልና የቅዱስ ቅዳሴ ጥሪ',
    excerpt: 'Join our parish community this coming Sunday for a solemn feast day commemoration, special choir hymns, and fellowship reception.',
    excerptAmharic: 'የፊታችን እሁድ በሚከበረው ታላቅ የንግሥ በዓል፣ ልዩ ያሬዳዊ የሰንበት ት/ቤት ዝማሬ እና የመንፈሳዊ ማዕድ ላይ አብረውን እንዲሳተፉ በደስታ ተጋብዘዋል።',
    content: 'We invite all parishioners, families, and honored guests to gather for our upcoming feast day celebration. The morning begins with solemn Matins prayers followed by the Divine Liturgy (Holy Qurbana) officiated by the parish clergy. Following the liturgical service, our Sunday School choir will present sacred Ge\'ez and Amharic hymns (Mezmur), culminating in an agape fellowship gathering in the parish hall. All community members are encouraged to attend and share in the spiritual blessings of this revered occasion.',
    contentAmharic: 'የደብራችን ምዕመናን፣ ምዕመናት፣ ወጣቶችና መላው የክርስቲያን ወገኖች በመጪው የንግሥ በዓል ላይ እንዲሳተፉ ጥሪያችንን እናቀርባለን። መርሃ ግብሩ በማለዳው የኪዳንና የማኅሌት ጸሎት ተጀምሮ በካህናቱ ቡራኬ በታላቁ ቅዱስ ቅዳሴ ይቀጥላል። ከቅዳሴው ፍጻሜ በኋላ የሰንበት ትምህርት ቤት ወጣቶች ያሬዳዊ ዝማሬዎችን ያቀርባሉ፤ በመቀጠልም የጋራ የመንፈሳዊ ፍቅር ማዕድ (አጋፔ) በደብሩ አዳራሽ ይደረጋል። ሁላችሁም በበረከቱ ተሳታፊ እንድትሆኑ እናሳስባለን።',
    date: '2025-05-18T08:00:00.000Z',
    category: 'Event',
    categoryAmharic: 'ክብረ በዓል',
    image: PLACEHOLDER_IMAGE,
    featured: true,
  },
  {
    id: 'sample-news-2',
    title: 'Community Prayer Service and Fasting Season Preparation',
    titleAmharic: 'የጋራ የጾምና የጸሎት ጉባኤ እንዲሁም የንስሐ መርሃ ግብር',
    excerpt: 'The parish council announces extended evening prayer schedules and spiritual counseling opportunities throughout the fasting period.',
    excerptAmharic: 'በቅዱስ ጾም ወቅት የተዘጋጀ የተራዘመ የምሽት የዋዜማ ጸሎትና የካህናት የንስሐ አባቶች ምክር አገልግሎት መርሃ ግብር ይፋ ተደረገ።',
    content: 'In preparation for the sacred fasting period, our church leadership has established an updated evening prayer and meditation schedule. Daily Wazema prayers will be held every evening, followed by short homilies on repentance, prayer life, and traditional spiritual discipline. Priests will be available before and after the services for confession (Niseha) and spiritual guidance. Parishioners are encouraged to embrace this season with sincere hearts and loving charity.',
    contentAmharic: 'የደብራችን ሰበካ ጉባኤ ለተቀደሰው የጾም ወቅት የተሟላ የጸሎት መርሃ ግብር አዘጋጅቷል። በየቀኑ ምሽት የዋዜማ ጸሎት የሚካሄድ ሲሆን ስለ ንስሐ፣ ስለ ጸሎትና ስለ መንፈሳዊ ተጋድሎ አጫጭር ትምህርቶች ይሰጣሉ። ካህናት አባቶች ከጸሎት በፊትና በኋላ ለንስሐ አባትነትና ለምክር ዝግጁ ሆነው ይጠብቃሉ። ምዕመናን ይህንን የተቀደሰ ወቅት በጾም፣ በጸሎትና በምጽዋት እንዲያሳልፉ እናሳስባለን።',
    date: '2025-05-12T17:30:00.000Z',
    category: 'Announcement',
    categoryAmharic: 'ማስታወቂያ',
    image: PLACEHOLDER_IMAGE,
    featured: false,
  },
  {
    id: 'sample-news-3',
    title: 'Sunday School and Youth Ministry Enrollment Now Open',
    titleAmharic: 'የሰንበት ትምህርት ቤትና የወጣቶች ክፍል ምዝገባ ተጀመረ',
    excerpt: 'Enrollment is open for the upcoming term of Orthodox Christian instruction, hymnography (Zema), and biblical studies for youth.',
    excerptAmharic: 'ለአዲሱ የትምህርት ዘመን የሕፃናትና የወጣቶች የኦርቶዶክስ ተዋሕዶ እምነት፣ ያሬዳዊ ዜማና የመጽሐፍ ቅዱስ ትምህርት ምዝገባ ተጀመረ።',
    content: 'The Parish Sunday School department invites families to enroll children and youth for the upcoming instructional term. The curriculum covers Ethiopian Orthodox Christian dogma, Holy Scripture, Church history, traditional hymnography (Zema), and moral values. Classes are structured for multiple age groups, from early childhood to young adults. Registrations can be completed after Sunday Liturgy with the education committee or online through the church administrative office.',
    contentAmharic: 'የደብራችን ሰንበት ትምህርት ቤት ለቀጣዩ የትምህርት ዘመን ምዝገባ መጀመሩን ያበስራል። ትምህርቱ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ትምህርተ ሃይማኖት፣ መጽሐፍ ቅዱስ፣ የቤተ ክርስቲያን ታሪክ፣ ያሬዳዊ ዜማና ክርስቲያናዊ ሥነ ምግባርን ያካትታል። ትምህርቱ ከሕፃናት እስከ ወጣቶች በዕድሜ እርከን ተከፍሎ ይሰጣል። ምዝገባውን ከእሁድ ቅዳሴ በኋላ በሰንበት ት/ቤት ጽሕፈት ቤት መፈጸም ይቻላል።',
    date: '2025-05-05T10:00:00.000Z',
    category: 'Community',
    categoryAmharic: 'ማኅበረሰብ',
    image: PLACEHOLDER_IMAGE,
    featured: false,
  },
  {
    id: 'sample-news-4',
    title: 'Spiritual Reflection on Christian Charity and Benevolence',
    titleAmharic: 'ስለ ክርስቲያናዊ ምጽዋትና የበጎ አድራጎት መንፈሳዊ አስተምህሮ',
    excerpt: 'A reminder of our shared Christian calling to extend compassionate support, visitation, and benevolence to those in need.',
    excerptAmharic: 'አቅመ ደካሞችን፣ ሕሙማንንና የተቸገሩትን በመርዳት ወንጌልን በተግባር እንድንገልጽ የቀረበ የወርሃዊ በጎ አድራጎት ማሳሰቢያ።',
    content: 'As members of the One, Holy, Catholic, and Apostolic Church, we are called to embody the living love of Christ through active works of compassion and charity. The parish benevolence committee shares this month\'s reflection emphasizing the spiritual importance of almsgiving and visiting the elderly and sick. Parish members interested in contributing food, supplies, or volunteer time to support local outreach initiatives are warmly invited to contact the committee.',
    contentAmharic: 'የአንዲት ቅድስት ቤተ ክርስቲያን አካላት እንደመሆናችን መጠን የክርስቶስን ፍቅር በጎ አድራጎትና ምጽዋትን በተግባር በማዋል የመግለጽ ኃላፊነት አለብን። የደብሩ የበጎ አድራጎት ክፍል አረጋውያንንና ሕሙማንን መጎብኘት እንዲሁም የተቸገሩ ወገኖችን መርዳት መንፈሳዊ ጥቅሙ የጎላ መሆኑን ያስገነዝባል። በምግብ፣ በቁሳቁስና በጉልበት ለመደገፍ የምትፈልጉ ምዕመናን ክፍሉን እንድታነጋግሩ ጥሪያችንን እናቀርባለን።',
    date: '2025-04-28T14:00:00.000Z',
    category: 'Spiritual',
    categoryAmharic: 'መንፈሳዊ',
    image: PLACEHOLDER_IMAGE,
    featured: false,
  },
];

export default news;
