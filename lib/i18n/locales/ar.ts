/*
 * AR copy for every namespace, keyed by the id each messages file
 * passes to defineMessages. This module is its own chunk: it is downloaded
 * only when a visitor is reading the site in this language (see ../load.ts),
 * so English visitors never pay for it.
 *
 * Each namespace is checked against its English source with `satisfies`:
 * keys may be missing (they fall back to English), but not misspelled.
 */
import type { Dict, PartialCopy } from "../types";
import type { aboutMessages } from "../messages/about";
import type { aboutApproachMessages } from "../messages/aboutApproach";
import type { aboutAwardsMessages } from "../messages/aboutAwards";
import type { aboutCareersMessages } from "../messages/aboutCareers";
import type { aboutHistoryMessages } from "../messages/aboutHistory";
import type { aboutReviewsMessages } from "../messages/aboutReviews";
import type { aboutValuesMessages } from "../messages/aboutValues";
import type { authMessages } from "../messages/auth";
import type { blogPostMessages } from "../messages/blogPost";
import type { blogsMessages } from "../messages/blogs";
import type { chatMessages } from "../messages/chat";
import type { commonMessages } from "../messages/common";
import type { contactMessages } from "../messages/contact";
import type { cvTeaserMessages } from "../messages/cvTeaser";
import type { cvBuilderMessages } from "../messages/cvBuilder";
import type { editorMessages } from "../messages/editor";
import type { editorUiMessages } from "../messages/editorUi";
import type { footerMessages } from "../messages/footer";
import type { homeMessages } from "../messages/home";
import type { kitMessages } from "../messages/kit";
import type { legalPrivacyMessages } from "../messages/legalPrivacy";
import type { legalPrivacyTermsMessages } from "../messages/legalPrivacyTerms";
import type { legalTermsMessages } from "../messages/legalTerms";
import type { navMessages } from "../messages/nav";
import type { notFoundMessages } from "../messages/notFound";
import type { pageMetaMessages } from "../messages/pageMeta";
import type { projectEditorMessages } from "../messages/projectEditor";
import type { realEstateMessages } from "../messages/realEstate";
import type { realEstateBlogsMessages } from "../messages/realEstateBlogs";
import type { realEstateFooterMessages } from "../messages/realEstateFooter";
import type { realEstateProjectDetailMessages } from "../messages/realEstateProjectDetail";
import type { realEstateProjectsMessages } from "../messages/realEstateProjects";
import type { realEstateWhatsAppMessages } from "../messages/realEstateWhatsApp";
import type { servicesIndexMessages } from "../messages/servicesIndex";
import type { servicesMessages } from "../messages/services";
import type { sitemapMessages } from "../messages/sitemap";
import type { teamMessages } from "../messages/team";
import type { websiteCostMessages } from "../messages/websiteCost";

const ns_about = {
    metaTitle: "Man Nahnu | Creative Surf",
    metaDescription:
      "Tarraf ala Creative Surf wa risalatina wa qiyamina wal-fariq Al-Mawhub khalf wakalatina Al-Ibdaiyya.",
    hero: {
      title: "An Creative Surf",
      subtitle: "Nahnu fariq min Al-Mubdiin Al-Shaghufin naltazim bi-musaadat Al-Alamat ala ihdath athar fi qitaatiha",
    },
    story: {
      title: "Qissatuna",
      p1:
        "Tassasat Creative Surf bi-risala basita: khalq tajarib alama asila tulamis Al-Jumhur wa tuhaqqiq nataij haqiqiyya.",
      p2:
        "Ma bada bi-fariq min thalathat ashkhas asbaha tajammuan mutanawwian min Al-Istratijiyyin wal-musammimin wal-mutawwirin wa suna Al-Muhtawa, yajmauhum shaghaf wahid bil-tamayyuz Al-Ibdai.",
      p3:
        "Al-Yawm, nafkhar bil-amal ma alamat min mukhtalaf Al-Qitaat, min Al-Sharikat Al-Nashia ila Al-Muassasat Al-Kabira, li-nusaidaha ala Al-Tanaqqul fi mashhad raqmi daim Al-Taghayyur wal-tawasul ma jumhuriha bi-turuq asila.",
      imageAlt: "Fariq Creative Surf",
    },
    values: {
      title: "Qiyamuna",
      items: [
        { title: "Al-Ibda", description: "Nataamal ma kull tahaddin bi-tafkir jadid wa hulul mubtakara." },
        { title: "Al-Taawun", description: "Nu'min bi-anna afdal Al-Amal yansha indama tajtami wijhat nazar mutanawwia." },
        { title: "Al-Tamayyuz", description: "Nulzim anfusana bi-aala Al-Mayair fi kull ma naqum bihi." },
        { title: "Al-Asala", description: "Nuqaddir Al-Sidq wal-shafafiyya fi jami alaqatina." },
        { title: "Al-Numuww", description: "Naltazim bil-taallum wal-tahsin Al-Mustamirr." },
        { title: "Al-Athar", description: "Naqis najahana bil-nataij allati nuqaddimuha li-umalaina." },
      ],
    },
    cta: {
      title: "Falnabni maan shayan raian",
      body: "Mustaidd li-naql alamatik ila Al-Mustawa Al-Tali? Yusidduna an nasma an mashrouak.",
      button: "Tawasal Maana",
    },
  } satisfies PartialCopy<typeof aboutMessages.en>;

const ns_aboutApproach = {
    metaTitle: "Manhajuna | Creative Surf",
    metaDescription:
      "Iktashif Al-Manhajiyya Al-Mujarraba allati tastakhdimuha Creative Surf li-taqdim nataij qabila lil-qiyas: Al-Iktishaf wal-istratijiyya wal-tanfidh wal-tahsin Al-Mustamirr.",
    hero: {
      title: "Manhajuna",
      subtitle: "Kayfa nuhaqqiq nataij istithnaiyya abr manhajiyyatina Al-Mujarraba",
    },
    philosophy: {
      title: "Falsafatuna",
      intro:
        "Fi Creative Surf, numin bi-manhaj mabni ala Al-Bayanat wa murakkaz ala Al-Amil yuhaqqiq nataij qabila lil-qiyas. Tajma manhajiyyatuna bayn Al-Tafkir Al-Istratiji wal-tamayyuz Al-Ibdai wal-khibra Al-Tiqniyya.",
      cards: [
        {
          title: "Tarkiz Istratiji",
          body: "Nabda bi-fahm ahdafik Al-Tijariyya wa jumhurik Al-Mustahdaf li-bina istratijiyyat tatawaam ma tumuhatik.",
        },
        {
          title: "Qararat Mabniyya ala Al-Bayanat",
          body: "Nuwazzif Al-Tahlilat wa abhath Al-Suq li-tawjih istratijiyyatina wa tahsin Al-Ada bi-shakl mustamirr.",
        },
        {
          title: "Ibtikar Ibdai",
          body: "Najma bayn Al-Ibda wal-tiknulujiya li-tatwir hulul mubtakara tusaid alamatik ala Al-Tamayyuz fi suq muzdahim.",
        },
      ],
    },
    process: {
      title: "Amaliyyatuna",
      intro: "Manhaj manhaji yadman jawda wa nataij thabita",
      expectLabel: "Ma yumkinuk tawaqquuh:",
      steps: [
        {
          title: "Al-Iktishaf wal-Tahlil",
          body: "Nabda bi-fahm amalik wa ahdafik wa jumhurik wa biatik Al-Tanafusiyya. Yujri fariquna abhathan wa tahlilat muammaqa li-tahdid Al-Furas wal-tahaddiyat.",
          points: ["Tahlil shamil lil-amal", "Taqyim Al-Mashhad Al-Tanafusi", "Bahth Al-Jumhur Al-Mustahdaf"],
        },
        {
          title: "Wad Al-Istratijiyya",
          body: "Bina ala natajina, natur istratijiyya mukhassasa tatawaam ma ahdafik Al-Tijariyya. Nuhaddid muashirat ada wadiha wa nada kharitat tariq lil-tanfidh.",
          points: ["Khitta istratijiyya mukhassasa", "Muashirat ada wa mayair najah wadiha", "Tawzi Al-Mawarid wal-jadwal Al-Zamani"],
        },
        {
          title: "Al-Tanfidh",
          body: "Yunaffidh fariquna Al-Khabir Al-Istratijiyya bi-diqqa wa ihtimam bil-tafasil, mustakhdiman ahdath Al-Adawat wal-tiknulujiyat li-taqdim nataij aliyat Al-Jawda.",
          points: ["Tanfidh ala yad mutakhassisin", "Tahdithat dawriyya an Al-Taqaddum", "Daman Al-Jawda fi kull khatwa"],
        },
        {
          title: "Al-Qiyas wal-Tahsin",
          body: "Nuraqib Al-Ada bi-istimrar wa nuhallil Al-Nataij wa nujri tahsinat mabniyya ala Al-Bayanat li-tahsin Al-Makhrajat wa tadif Al-Aid.",
          points: ["Taqarir ada shamila", "Tawsiyat tahsin mabniyya ala Al-Bayanat", "Dawrat tahsin mustamirra"],
        },
      ],
    },
    methodology: {
      title: "Manhajiyyatuna",
      intro: "Al-Mabadi Al-Asasiyya allati tuwajjih amalana wa tadman nataij istithnaiyya",
      cards: [
        {
          title: "Sharaka ma Al-Amil",
          body: "Nara anfusana imtidadan li-fariqik, namal maan li-tahqiq ahdafik. Tawasuluna Al-Shaffaf wa tahdithatuna Al-Dawriyya tadman baqaak ala ittila wa musharaka daiman.",
        },
        {
          title: "Tanfidh Muren",
          body: "Yutih lana manhajuna Al-Muren Al-Takayyuf Al-Sari ma taghayyurat Al-Suq wa ihtiyajat Al-Amal. Nukarrir bi-sura, wa nakhtabir bi-istimrar, wa nuhassin li-aqsa athar.",
        },
        {
          title: "Murakkaz ala Al-Nataij",
          body: "Nahnu mahwusun bi-taqdim nataij qabila lil-qiyas tuathir ala arbahik. Kull istratijiyya wa kull taktik masmum bi-ahdaf wa muashirat ada wadiha.",
        },
        {
          title: "Ibtikar Mustamirr",
          body: "Nabqa fi Al-Muqaddima min ittijahat Al-Qita wa tiknulujiyatih li-nuqaddim hulul mubtakara tamnah amalak mizat tanafusiyya fil-suq.",
        },
      ],
    },
    caseStudies: {
      title: "Manhajuna ala Ard Al-Waqi",
      intro: "Shahid Al-Nataij Al-Istithnaiyya allati haqqaqatha manhajiyyatuna li-umalaina",
      readMore: "Iqra Dirasat Al-Hala",
      items: [
        {
          category: "Al-Tijara Al-Iliktruniyya",
          title: "Numuww 300% fil-iradat",
          body: "Kayfa saadna alamat tijara iliktruniyya ala mudaafat iradatiha thalath marrat abr Al-Taswiq Al-Raqmi Al-Istratiji.",
          imageAlt: "Dirasat hala: numuww Al-Tijara Al-Iliktruniyya",
        },
        {
          category: "B2B",
          title: "Mudaafat Al-Umala 10 marrat",
          body: "Kayfa saada manhajuna sharikat B2B ala mudaafat umalaiha Al-Muahhalin 10 marrat fi 6 ashhur.",
          imageAlt: "Dirasat hala: jalb umala B2B",
        },
        {
          category: "Tahwil Al-Alama",
          title: "Iadat Itlaq Alama Najiha",
          body: "Kayfa saadna alama ariqa ala Al-Tahawwul Al-Raqmi wal-istihwadh ala shariha suqiyya jadida.",
          imageAlt: "Dirasat hala: tahwil Al-Alama",
        },
      ],
    },
    cta: {
      title: "Mustaidd li-tajribat manhajina?",
      body: "Falnatahaddath an kayfiyyat musaadat manhajiyyatina Al-Mujarraba li-amalik ala tahqiq nataij istithnaiyya.",
      contact: "Ittasil Bina",
      proposal: "Uhsul ala Ard",
    },
  } satisfies PartialCopy<typeof aboutApproachMessages.en>;

const ns_aboutAwards = {
    metaTitle: "Al-Jawaiz wal-Taqdir",
    metaDescription:
      "Istakshif Al-Jawaiz wa taqdir Al-Qita allati hasalat alayha Creative Surf li-tamayyuziha fil-taswiq Al-Raqmi wa tasmim Al-Wib wa ridha Al-Umala.",
    breadcrumbCurrent: "Al-Jawaiz",
    hero: {
      title: "Al-Jawaiz wal-Taqdir",
      subtitle:
        "Nafkhar bi-nayl Al-Taqdir ala iltizamina bil-tamayyuz wal-ibtikar wa najah Al-Umala fi qita Al-Taswiq Al-Raqmi.",
      imageAlt: "Jawaiz wa taqdir Creative Surf",
    },
    timelineTitle: "Sijill Jawaizina",
    years: [
      {
        awards: [
          { name: "Jaizat Al-Tamayyuz fil-Taswiq Al-Raqmi", organization: "Digital Innovation Awards", description: "Taqdiran lil-ada Al-Mutamayyiz wal-ibtikar fi hamalat Al-Taswiq Al-Raqmi." },
          { name: "Afdal Wakalat SEO", organization: "Marketing Excellence Awards", description: "Taqdiran lil-nataij Al-Istithnaiyya wal-istratijiyyat Al-Mubtakara fi tahsin muharrikat Al-Bahth." },
          { name: "Ahad Afdal 10 Sharikat Tasmim Wib", organization: "Design Industry Association", description: "Ikhtirat ka-ihda afdal sharikat tasmim Al-Wib lil-tamayyuz Al-Ibdai wa ridha Al-Umala." },
        ],
      },
      {
        awards: [
          { name: "Afdal Makan lil-Amal", organization: "Employer Excellence Awards", description: "Taqdiran li-thaqafat Amal mutamayyiza wa ridha Al-Muwazzafin wa furas Al-Numuww." },
          { name: "Al-Ibtikar fi Taswiq Wasail Al-Tawasul", organization: "Social Media Marketing Association", description: "Taqdiran li-hamalat tawasul ijtimai raida haqqaqat nataij istithnaiyya lil-umala." },
          { name: "Wakala Sada Najma", organization: "Marketing Industry Network", description: "Ikhtirat ka-ihda asra Al-Wakalat numuwwan wa akthariha wadan fil-qita." },
        ],
      },
      {
        awards: [
          { name: "Al-Tamayyuz fi Ridha Al-Umala", organization: "Customer Experience Awards", description: "Taqdiran lil-hifaz ala aala mustawayat ridha Al-Umala wa jawdat Al-Khidma." },
          { name: "Afdal Hamlat Taswiq Muhtawa", organization: "Content Marketing Institute", description: "Taqdiran li-istratijiyyat muhtawa mubtakara zadat Al-Tafaul wal-tahwilat bi-shakl kabir." },
        ],
      },
      {
        awards: [
          { name: "Al-Wakala Al-Raqmiyya Al-Sada li-Am", organization: "Digital Business Awards", description: "Ikhtirat ka-akthar Al-Wakalat Al-Jadida wadan ma numuww wa nataij umala istithnaiyya." },
        ],
      },
    ],
    certificationsTitle: "Shahadat Al-Qita",
    certifications: [
      { name: "Google Partner", description: "Sharik Google mutamad ma takhassusat fil-bahth wal-ard wal-ilanat Al-Marii." },
      { name: "Meta Business Partner", description: "Sharik Meta Business mutamad bi-khibra fi ilanat Facebook wa Instagram." },
      { name: "HubSpot Solutions Partner", description: "Sharik HubSpot Solutions mutamad bi-khibra fil-taswiq Al-Jadhib wa tatbiq anzimat CRM." },
      { name: "Shopify Partner", description: "Sharik Shopify mutamad mutakhassis fi tatwir wa tahsin mawaqi Al-Tijara Al-Iliktruniyya." },
    ],
    featured: {
      title: "Murashshah li-Jaizat Al-Wakala Al-Raqmiyya li-Am",
      body: "Nafkhar bi-tarshihina li-jaizat Al-Wakala Al-Raqmiyya li-Am Al-Marmuqa fi hafl Digital Excellence Awards 2024. Yubriz hadha Al-Taqdir tafani fariqina fi taqdim nataij istithnaiyya li-umalaina wa daf hudud Al-Ibtikar fil-taswiq Al-Raqmi.",
      event: "Digital Excellence Awards 2024",
      imageAlt: "Hafl jaizat Al-Wakala Al-Raqmiyya li-Am",
    },
    stories: {
      title: "Qisas Najah Umala Haiza ala Jawaiz",
      viewCaseStudy: "Ard Dirasat Al-Hala",
      items: [
        { badge: "Afdal Hamlat Tijara Iliktruniyya", client: "StyleHouse Boutique", body: "Zadat istratijiyyatuna Al-Haiza ala jaiza Al-Mabiat ala Al-Intirnit bi-nisbat 78% wa wassaat qaidat umalaihim ila thalathat aswaq jadida.", imageAlt: "Qissat najah tijara iliktruniyya" },
        { badge: "Afdal Hamlat SEO", client: "TechVision Inc.", body: "Saadat istratijiyyat Al-SEO ladayna TechVision ala tahqiq ziyada 150% fil-zayarat Al-Tabiiyya wa 200% fil-umala Al-Muahhalin.", imageAlt: "Qissat najah SEO" },
        { badge: "Afdal Hamlat Wasail Tawasul", client: "Innovate Solutions", body: "Saadat hamlatuna Al-Ijtimaiyya Al-Mubtakara hadhihi Al-Sharika Al-Nashia ala tahqiq numuww 120% fil-mutabiin wa taamin tamwil Al-Silsila A.", imageAlt: "Qissat najah wasail Al-Tawasul" },
      ],
    },
    cta: {
      title: "Mustaidd lil-amal ma wakala haiza ala jawaiz?",
      body: "Tasharak ma Creative Surf wa ish Al-Farq alladhi yumkin an yuhdithah Al-Taswiq Al-Raqmi Al-Mutamayyiz li-amalik.",
      button: "Ittasil Bina Al-Yawm",
    },
  } satisfies PartialCopy<typeof aboutAwardsMessages.en>;

const ns_aboutCareers = {
    metaTitle: "Furas al-Amal",
    metaDescription:
      "Istakshif furas Al-Amal Al-Mumayyaza fi Creative Surf. Indamm ila fariqina min khubara Al-Taswiq Al-Raqmi wa sahim fi sunn mustaqbal Al-Ibtikar Al-Raqmi.",
    breadcrumbCurrent: "Al-Wazaif",
    hero: {
      title: "Indamm ila Fariqina",
      p1: "Fi Creative Surf, nabni fariqan min Al-Mihaniyyin Al-Shaghufin wal-mubdiin wal-mubtakirin Al-Multazimin bi-taqdim nataij istithnaiyya li-umalaina.",
      p2: "Idha kunta tabhath an bi'at amal dinamikiyya tuqaddar fiha afkaruk wa yumkin li-masiratik an tazdahir, yusidduna an nasma minka.",
      cta: "Ard Al-Wazaif Al-Mutaha",
      imageAlt: "Taawun fariq Creative Surf",
    },
    culture: {
      title: "Thaqafatuna",
      imageAlt: "Thaqafat sharikat Creative Surf",
      subtitle: "Ma alladhi yumayyizuna",
      p1: "Fi Creative Surf, numin bi-anna afradana hum asasuna Al-Akbar. Banayna thaqafa tuqaddir Al-Ibda wal-taawun wal-taallum Al-Mustamirr. Naltazim bi-khalq bi'a shamila yurahhab fiha bi-wijhat Al-Nazar Al-Mutanawwia wa yuhtafal biha.",
      p2: "Nushajji afrad fariqina ala Al-Tafkir kharij Al-Sunduq wa tahammul masuliyyat amalihim wal-musahama fi numuww Al-Sharika wa najahiha. Numin bil-hifaz ala tawazun sihi bayn Al-Amal wal-haya wa tawfir Al-Dam wal-mawarid allati yahtajuha fariquna lil-izdihar.",
      note: "Indamm ila fariq yuqaddir mandhurak wa mawahibak Al-Farida",
    },
    benefits: {
      title: "Al-Mazaya wal-Imtiyazat",
      items: [
        { title: "Taghtiya Sihhiyya Shamila", description: "Taghtiya tibbiyya wa asnan wa nazar lak wa li-mualik, ma musahamat min Al-Sharika fil-aqsat." },
        { title: "Tartibat Amal Marina", description: "Khiyarat amal hajin wa saat marina wa siyasat ijazat sakhiyya li-musaadatik ala Al-Hifaz ala tawazun bayn Al-Amal wal-haya." },
        { title: "Tatwir Mihani", description: "Tadrib mustamirr wa hudur muatamarat wa dam Al-Shahadat wa tawid Al-Rusum Al-Talimiyya." },
        { title: "Thaqafat Taawuniyya", description: "Iamal ma fariq mutanawwi min Al-Khubara fi bi'a daima tuqaddir Al-Ibda wal-ibtikar." },
      ],
      extraTitle: "Imtiyazat Idafiyya",
      extras: [
        "Khittat taqaud ma musahamat min Al-Sharika",
        "Ijazat abawiyya madfua",
        "Barnamaj Al-Afiya",
        "Faaliyyat tarahha Al-Sharika",
        "Khiyarat Al-Amal an bud",
        "Mizaniyya lil-tatwir Al-Mihani",
      ],
    },
    testimonials: {
      title: "Tarraf ala Fariqina",
      items: [
        { position: "Akhissai SEO Awwal", years: "4 sanawat fi Creative Surf", quote: "Kana Al-Amal fi Creative Surf abraz mahatta fi masirati Al-Mihaniyya. Sahamat Al-Bi'a Al-Taawuniyya wal-mashari Al-Mutahaddiya wa furas Al-Numuww fi tatwiri mihaniyyan wa shakhsiyyan." },
        { position: "Mutawwirat Wib", years: "sanatan fi Creative Surf", quote: "Uhibb thaqafat Creative Surf. Nushajja ala tajribat tiknulujiyat wa manahij jadida, wa hunaka tarkiz haqiqi ala Al-Taallum Al-Mustamirr wal-tatwir Al-Mihani." },
        { position: "Mudir Taswiq Al-Muhtawa", years: "3 sanawat fi Creative Surf", quote: "Al-Tawazun bayn Al-Amal wal-haya fi Creative Surf la yubara. Tutih li Al-Tartibat Al-Marina an akun muntijan ma Al-Hifaz ala waqt li-hayati Al-Shakhsiyya wa usrati." },
      ],
    },
    openings: {
      title: "Al-Wazaif Al-Mutaha",
      requirementsLabel: "Al-Mutatallabat:",
      apply: "Qaddim Al-An",
      jobs: [
        {
          title: "Akhissai SEO Awwal",
          department: "Al-Taswiq Al-Raqmi",
          location: "San Francisco, CA (hajin)",
          type: "Dawam kamil",
          description: "Nabhath an akhissai SEO dhi khibra li-tatwir wa tanfidh istratijiyyat SEO shamila li-umalaina fi mukhtalaf Al-Qitaat.",
          requirements: [
            "Khibra 5 sanawat fa-akthar fil-SEO",
            "Maharat tahliliyya qawiyya wa khibra bi-adawat Al-SEO",
            "Marifa bil-SEO Al-Tiqni wal-tahsin Al-Dakhili wa bina Al-Rawabit",
            "Khibra bi-Google Analytics wa Google Search Console",
            "Maharat mumtaza fil-tawasul wa idarat Al-Umala",
          ],
        },
        {
          title: "Mutawwir Wib",
          department: "Tajribat Al-Mustakhdim wal-Tafaul",
          location: "An bud",
          type: "Dawam kamil",
          description: "Indamm ila fariq Al-Tatwir li-insha mawaqi wa tatbiqat wib mutajawiba wa sahlat Al-Istikhdam li-umalaina bi-ahdath Al-Tiknulujiyat.",
          requirements: [
            "Khibra 3 sanawat fa-akthar fi tatwir Al-Wib",
            "Itqan HTML wa CSS wa JavaScript wa React",
            "Khibra bi-Next.js wa ghayriha min Al-Atur Al-Haditha",
            "Fahm mabadi tasmim tajribat wa wajihat Al-Mustakhdim",
            "Maharat qawiyya fi hall Al-Mushkilat wa ihtimam bil-tafasil",
          ],
        },
        {
          title: "Mudir Wasail Al-Tawasul Al-Ijtimai",
          department: "Taswiq Al-Muhtawa",
          location: "San Francisco, CA (hajin)",
          type: "Dawam kamil",
          description: "Nabhath an mudir wasail tawasul mubdi wa istratiji li-tatwir wa tanfidh hamalat ijtimaiyya li-qaidat umalaina Al-Mutanawwia.",
          requirements: [
            "Khibra 3 sanawat fa-akthar fi idarat wasail Al-Tawasul",
            "Khibra bil-ilanat Al-Ijtimaiyya wal-tahlilat",
            "Maharat qawiyya fi insha Al-Muhtawa wal-kitaba Al-Ilaniyya",
            "Marifa bi-ittijahat wasail Al-Tawasul wa afdal Al-Mumarasat",
            "Maharat mumtaza fil-tanzim wa idarat Al-Waqt",
          ],
        },
        {
          title: "Mutadarrib Taswiq Raqmi",
          department: "Al-Taswiq Al-Raqmi",
          location: "San Francisco, CA (bil-hudur)",
          type: "Tadrib (3-6 ashhur)",
          description: "Ihsal ala khibra amaliyya fil-taswiq Al-Raqmi bil-amal ila janib fariqina min Al-Khubara ala mashari umala haqiqiyya.",
          requirements: [
            "Dirasa haliyya fil-taswiq aw Al-Ittisal aw majal dhi sila",
            "Fahm asasi li-mafahim Al-Taswiq Al-Raqmi",
            "Maharat qawiyya fil-tawasul Al-Kitabi wal-shafahi",
            "Raghba fil-taallum wal-numuww fi majal Al-Taswiq Al-Raqmi",
            "Itqan Microsoft Office wa Google Workspace",
          ],
        },
      ],
    },
    process: {
      title: "Amaliyyat Al-Taqdim Ladayna",
      steps: [
        { title: "Al-Taqdim", description: "Qaddim siratak Al-Dhatiyya wa khitab Al-Taghtiya abr nizam Al-Taqdim Al-Iliktruni." },
        { title: "Al-Muqabala Al-Ula", description: "Muqabala hatifiyya aw marii ma fariq Al-Mawarid Al-Bashariyya li-munaqashat khibratik wa ahdafik." },
        { title: "Taqyim Al-Maharat", description: "Ikmal taqyim maharat aw mashrou dhi sila bil-wazifa allati tataqaddam laha." },
        { title: "Al-Muqabala Al-Nihaiyya", description: "Iltaqi bil-fariq alladhi sa-tamal maah li-daman Al-Mulaama lil-tarafayn." },
      ],
    },
    cta: {
      title: "Lam tajid Al-Wazifa Al-Munasiba?",
      body: "Nabhath daiman an mawahib li-tandamm ila fariqina. Arsil lana siratak Al-Dhatiyya wa sa-nadauka fil-ihtibar lil-furas Al-Mustaqbaliyya.",
      button: "Arsil Siratak Al-Dhatiyya",
    },
  } satisfies PartialCopy<typeof aboutCareersMessages.en>;

const ns_aboutHistory = {
    metaTitle: "Tarikhuna",
    metaDescription:
      "Tarraf ala masirat CreativeSurf wa mahattatiha min Al-Tasis hatta an asbahat wakalat taswiq raqmi raida.",
    breadcrumbCurrent: "Tarikh CreativeSurf",
    hero: {
      title: "Masiratuna",
      subtitle:
        "Min fariq saghir min Al-Musawwiqin Al-Shaghufin ila wakalat taswiq raqmi raida — iktashif qissat CreativeSurf.",
      imageAlt: "Tarikh CreativeSurf",
    },
    timelineTitle: "Khatt Zamanina",
    timeline: [
      {
        title: "Al-Bidaya",
        body: "Tassasat CreativeSurf ala yad fariq saghir min khubara Al-Taswiq Al-Raqmi bi-ruya li-musaadat Al-Sharikat ala Al-Tanaqqul fil-mashhad Al-Raqmi Al-Muaqqad. Bi-khamsat afrad faqat fi maktab saghir, badana bi-taqdim khadamat Al-SEO wa taswiq Al-Muhtawa lil-sharikat Al-Mahalliyya.",
        imageAlt: "Fariq tasis CreativeSurf",
      },
      {
        title: "Tawassu wa Ibtikar",
        body: "Raghma Al-Tahaddiyat Al-Alamiyya, kana am 2020 am numuww li-CreativeSurf. Wassana khadamatina li-tashmal tasmim Al-Wib wa taswiq wasail Al-Tawasul. Tadaafa fariquna wa intaqalna ila maktab akbar.",
        imageAlt: "Numuww CreativeSurf",
      },
      {
        title: "Taqdir Al-Qita",
        body: "Huziya iltizamuna bil-tamayyuz bil-taqdir indama fuzna bi-awwal jawaizina fil-qita an hamalat taswiq raqmi mutamayyiza. Atlaqna mansat Al-Tahlilat Al-Khassa bina, mimma saada umalaana ala fahm adaihim Al-Taswiqi bi-umq akbar.",
        imageAlt: "Jawaiz CreativeSurf",
      },
      {
        title: "Tawassu Watani",
        body: "Wassaat CreativeSurf nitaqaha ala Al-Mustawa Al-Watani bi-fath makatib fi thalath mudun kubra. Atlaqna akadimiyyat Al-Taswiq Al-Raqmi li-tawfir tadrib wa mawarid tusaid Al-Sharikat wal-mihaniyyin.",
        imageAlt: "Al-Tawassu Al-Watani li-CreativeSurf",
      },
      {
        title: "Numuww Duwali",
        body: "Khatawna khutawatina Al-Ula nahwa Al-Aswaq Al-Duwaliyya bi-iqamat sharakat ma wakalat fi Uruba wa Asiya. Nama fariquna li-yatajawaz 100 khabir, wa qaddamna hulul taswiq mutaqaddima taamal bil-dhaka Al-Istinai.",
        imageAlt: "Al-Numuww Al-Duwali li-CreativeSurf",
      },
      {
        title: "Ibtikar wa Ruya Mustaqbaliyya",
        body: "Al-Yawm, tawasil CreativeSurf Al-Ibtikar wal-riyada fi majal Al-Taswiq Al-Raqmi. Atlaqna mubadaratana lil-istidama, multazimin bi-taqlil atharina Al-Biii wa musaadat umalaina ala tabanni mumarasat taswiq mustadama. Ma Al-Tarkiz ala Al-Tiknulujiyat Al-Nashia ka-l-dhaka Al-Istinai wal-mitafirs, nuhayyi umalaana li-mustaqbal Al-Taswiq Al-Raqmi.",
        imageAlt: "CreativeSurf Al-Yawm",
      },
    ],
    valuesTitle: "Qiyamuna Al-Rasikha",
    values: [
      {
        title: "Al-Ibtikar",
        body: "Mundhu Al-Yawm Al-Awwal, naltazim bil-baqa fi Al-Muqaddima min ittijahat wa tiknulujiyat Al-Taswiq Al-Raqmi. Wa la yazal ruh Al-Ibtikar hadha yadfauna lil-amam.",
      },
      {
        title: "Najah Al-Umala",
        body: "Zalla najah umalaina daiman miyarana Al-Awwal lil-injaz. Nafkhar bi-annana saadna miat Al-Sharikat ala Al-Numuww wal-izdihar fil-alam Al-Raqmi.",
      },
      {
        title: "Al-Mujtama",
        body: "Numin bi-rad Al-Jamil lil-mujtamaat allati nakhdimuha. Ala madar tarikhina, hafazna ala iltizam bil-musharaka Al-Mujtamaiyya wal-masuliyya Al-Ijtimaiyya.",
      },
    ],
    cta: {
      title: "Kun Juzan min Mustaqbalina",
      body: "Indamm ilayna wa nahnu naktub Al-Fusul Al-Qadima min qissat CreativeSurf. Sawa ka-amil aw sharik aw udw fil-fariq, hunaka makan lak fi masiratina.",
      contact: "Ittasil Bina",
      join: "Indamm ila Fariqina",
    },
  } satisfies PartialCopy<typeof aboutHistoryMessages.en>;

const ns_aboutReviews = {
    metaTitle: "Ara wa Shahadat Al-Umala",
    metaDescription:
      "Ittali ala ma yaquluh umalauna an Al-Amal ma Creative Surf. Iqra shahadat wa ara Al-Sharikat allati saadnaha ala Al-Najah.",
    breadcrumbCurrent: "Al-Ara",
    hero: {
      title: "Ara wa Shahadat Al-Umala",
      subtitle: "La tathiq bi-kalamina wahdahu. Ittali ala ma yaquluh umalauna an Al-Amal ma Creative Surf.",
      outOfFive: "{rating} min 5",
      basedOn: "Bina ala {count} ara umala",
    },
    reviews: [
      { position: "Mudirat Al-Taswiq", date: "15 Maris 2025", text: "Al-Amal ma Creative Surf ghayyara huduruna Al-Raqmi tamaman. Haqqaqa manhajuhum Al-Istratiji li-tahaddiyatina Al-Taswiqiyya nataij malmusa khilal thalathat ashhur faqat. Irtafaat muaddalat Al-Tahwil bi-nisbat 45% wa tadaafa tafaul wasail Al-Tawasul." },
      { position: "Al-Rais Al-Tanfidhi", date: "3 Fibrayir 2025", text: "Ka-muassis sharika nashia, kuntu bi-haja ila wakala tudir jami jawanib Al-Taswiq bayna atarakkaz ana ala tatwir Al-Muntaj. Faqat Creative Surf tawaqquati fi kull shay. Sammamu hawiyyat alamatina wa banaw mawqiana wa nafadhu hamlat itlaq adakhalatna ila kubra Al-Manshurat Al-Mutakhassisa. Sahama amaluhum mubasharatan fi najah jawlat tamwilina." },
      { position: "Mudirat Al-Tijara Al-Iliktruniyya", date: "22 Yanayir 2025", text: "Irtafaat mabiatuna ala Al-Intirnit bi-nisbat 78% mundhu bidayat Al-Amal ma Creative Surf. Fahmuhum li-ittijahat Al-Tijara Al-Iliktruniyya wa suluk Al-Mustahlik istithnai. Kanat suwar Al-Muntajat wa hamalat wasail Al-Tawasul allati anshauha li-itlaq majmuatina Al-Mawsimiyya rai'a wa faala lil-ghaya. Hum daiman yasbiquna bi-afkar mubtakara." },
      { position: "Mudir Al-Amaliyyat", date: "10 Disambir 2024", text: "Fi qita B2B mithl qitaina, kana ijad wakala tafham daqaiq suqina amran saban hatta wajadna Creative Surf. Aadu bina istratijiyyat jalb Al-Umala wa anshau muhtawa yulamis umalaana Al-Mustahdafin faalan. Manhajuhum Al-Mabni ala Al-Bayanat wa taqariruhum Al-Dawriyya tajal aid Al-Istithmar wadihan." },
      { position: "Mudirat Al-Taswiq", date: "5 Nufambir 2024", text: "Kanat khibrat Creative Surf fil-SEO dhat qima kubra li-sharikatina. Khilal sittat ashhur min tatbiq tawsiyatihim, irtafaat zayaratuna Al-Tabiiyya bi-nisbat 120% wa shahadna tahassunan malhuzan fi tartibina ala Al-Kalimat Al-Miftahiyya Al-Raisiyya. Fariquhum sari Al-Istijaba wa mutamakkin wa muhtamm sidqan bi-najahina." },
      { position: "Al-Muassis", date: "18 Uktubar 2024", text: "Ka-sahib amal saghir, kuntu mutaraddidan fil-istithmar bil-taswiq Al-Raqmi, lakin Creative Surf jaalat Al-Amaliyya muyassara wa fi mutanawal Al-Yad. Akhadhu Al-Waqt li-fahm ihtiyajat amali Al-Farida wa anshau istratijiyya mukhassasa saadatni ala Al-Wusul ila umala judud wa tanmiyat amali. Lamsatuhum Al-Shakhsiyya wa ihtimamuhum bil-tafasil yumayyizuhum." },
    ],
    recognition: {
      title: "Taqdir Al-Qita",
      items: [
        { name: "Al-Tamayyuz Al-Taswiqi", event: "Digital Innovation Awards 2024", imageAlt: "Jaizat Al-Tamayyuz fil-Taswiq Al-Raqmi" },
        { name: "Afdal Wakalat SEO", event: "Digital Marketing Awards 2023", imageAlt: "Afdal wakalat SEO" },
        { name: "Afdal Sharikat Tasmim Wib", event: "Creative Excellence Awards 2023", imageAlt: "Afdal sharikat tasmim wib" },
        { name: "Afdal Makan lil-Amal", event: "Employer Excellence Awards 2022", imageAlt: "Afdal makan lil-amal" },
      ],
    },
    platforms: {
      title: "Jiduna ala Manassat Al-Taqyim",
      summary: "{rating} min 5 bina ala {count} taqyim",
      readOn: "Iqra ara {platform}",
    },
    cta: {
      title: "Mustaidd li-tahqiq nataij mumathila?",
      body: "Indamm ila qaimat umalaina Al-Radin Al-Mutanamiya wa shahid kayfa yumkin li-Creative Surf tahwil hudurik Al-Raqmi.",
      button: "Ittasil Bina Al-Yawm",
    },
  } satisfies PartialCopy<typeof aboutReviewsMessages.en>;

const ns_aboutValues = {
    metaTitle: "Qiyamuna Al-Asasiyya",
    metaDescription: "Iktashif Al-Qiyam Al-Asasiyya allati tuwajjih thaqafat Creative Surf wa qararatiha wa alaqatiha bil-umala.",
    breadcrumbCurrent: "Qiyamuna",
    hero: {
      title: "Qiyamuna Al-Asasiyya",
      p1:
        "Fi Creative Surf, qiyamuna akthar min mujarrad kalimat ala Al-Hait. Innaha tuwajjih qararatina wa tasugh thaqafatana wa tuhaddid kayfa namal ma umalaina wa ma badina Al-Bad.",
      p2: "Kanat hadhihi Al-Mabadi fi qalb sharikatina mundhu Al-Yawm Al-Awwal wa la tazal tudfa najahana wa numuwwana.",
      imageAlt: "Al-Qiyam Al-Asasiyya li-Creative Surf",
    },
    principlesTitle: "Al-Mabadi allati Tuwajjihuna",
    values: [
      { title: "Najah Al-Umala", description: "Naqis najahana bil-nataij allati nuhaqqiquha li-umalaina. Numuwwuk huwa hadafuna Al-Awwal wa asas kull ma naqum bihi." },
      { title: "Al-Taawun", description: "Nu'min bi-quwwat Al-Amal Al-Jamai, dakhiliyyan wa ma umalaina. Bil-amal maan nuhaqqiq nataij akbar mimma yumkin li-ayy minna wahdah." },
      { title: "Al-Ibtikar", description: "Nabqa fi Al-Muqaddima min ittijahat wa tiknulujiyat Al-Taswiq Al-Raqmi li-nuqaddim hulul mutaqaddima tamnah umalaana mizat tanafusiyya." },
      { title: "Al-Tamayyuz", description: "Naltazim bi-taqdim jawda istithnaiyya fi kull ma naqum bihi, min wad Al-Istratijiyya ila Al-Tanfidh wal-taqarir." },
      { title: "Al-Nazaha", description: "Namal bi-sidq wa shafafiyya wa akhlaqiyyat mihaniyya. Naf al Al-Sawab li-umalaina hatta law lam yakun Al-Tariq Al-Ashal." },
      { title: "Al-Masuliyya", description: "Nudrik masuliyyatana tijaha mujtamaina wal-bia. Nasa li-ihdath athar ijabi abr mumarasat mustadama wa musharaka mujtamaiyya." },
    ],
    inAction: {
      title: "Qiyamuna ala Ard Al-Waqi",
      imageAlt: "Qiyam Creative Surf ala ard Al-Waqi",
      subtitle: "Kayfa naish qiyamana kull yawm",
      body:
        "Qiyamuna laysat mujarrad tasrihat tumuh — bal tanakis fi amalina wa qararatina Al-Yawmiyya. Min tariqat tanzim furaqina ila kayfiyyat tanawulina li-tahaddiyat Al-Umala, qiyamuna mutajassida fi kull ma nafaluh.",
      points: [
        "Nahtafil bi-intisarat umalaina ka-annaha najahatuna",
        "Nastathmir fil-taallum wal-tatwir Al-Mustamirr",
        "Nuqaddim taqarir shaffafa wa mulahazat sadiqa",
        "Nadam Al-Mubadarat Al-Mujtamaiyya wal-mumarasat Al-Mustadama",
      ],
    },
    community: {
      title: "Mubadaratuna Al-Mujtamaiyya",
      items: [
        { title: "Mubadarat Talimiyya", description: "Nataawan ma Al-Madaris wal-jamiat Al-Mahalliyya li-tawfir talim fil-taswiq Al-Raqmi wa furas tadrib lil-tullab." },
        { title: "Juhud Biiyya", description: "Tashmal mubadaratuna lil-istidama taqlil basmatina Al-Karbuniyya wa tatbiq amaliyyat bi-la waraq wa tanzim hamalat tanzif mujtamaiyya." },
        { title: "Dam Al-Munazzamat Ghayr Al-Ribhiyya", description: "Nuqaddim khadamat taswiq raqmi majjaniyya li-munazzamat ghayr ribhiyya mukhtara kull am li-musaadatiha ala tadif atharaha." },
      ],
    },
    cta: {
      title: "Tusharikuna Qiyamana?",
      body: "Idha kanat qiyamuna tulamisuk, yusidduna an nastakshif kayfa yumkinuna Al-Amal maan — ka-amil aw sharik aw udw fil-fariq.",
      contact: "Ittasil Bina",
      join: "Indamm ila Fariqina",
    },
  } satisfies PartialCopy<typeof aboutValuesMessages.en>;

const ns_auth = {
    brand: "Creative Surf",

    loginTitle: "Ahlan bik min jadid",
    loginSubtitle: "Sajjil al-dukhul ila hisabik fi Creative Surf",
    identifier: "Al-Barid Al-Iliktruni",
    identifierPlaceholder: "anta@mithal.com",
    password: "Kalimat Al-Murur",
    passwordPlaceholder: "Adkhil kalimat Al-Murur",
    signIn: "Tasjil Al-Dukhul",
    signingIn: "Jari Tasjil Al-Dukhul…",
    invalidCredentials: "Bayanat dukhul ghayr sahiha",
    noAccount: "Jadid fi Creative Surf?",
    createOne: "Anshi hisaban",

    registerTitle: "Anshi hisabak",
    registerSubtitle: "Sanursil laka ramzan ala baridik lil-ta'akkud min hawiyatik",
    name: "Al-Ism Al-Kamil",
    namePlaceholder: "Ismuk",
    email: "Al-Barid Al-Iliktruni",
    emailPlaceholder: "anta@mithal.com",
    choosePassword: "Kalimat Al-Murur",
    choosePasswordPlaceholder: "8 ahruf ala al-aqall",
    passwordHint: "Istakhdim 8 ahruf ala al-aqall ma harf wa raqm.",
    createAccount: "Insha' Al-Hisab",
    creatingAccount: "Jari irsal al-ramz…",
    haveAccount: "Ladayka hisab bil-fi'l?",
    signInLink: "Tasjil Al-Dukhul",

    otpTitle: "Tafaqqad baridak",
    otpSubtitle: "Arsalna ramzan min 6 arqam ila {email}. Yantahi khilal 10 daqa'iq.",
    otpLabel: "Ramz Al-Tahaqquq",
    verify: "Tahaqqaq wa tabi'",
    verifying: "Jari Al-Tahaqquq…",
    resend: "I'adat irsal al-ramz",
    resendIn: "I'adat al-irsal ba'd {seconds} thaniya",
    resent: "Tamma irsal ramz jadid.",
    changeEmail: "Istakhdim baridan akhar",

    googleContinue: "Tabi' ma Google",
    orDivider: "aw",

    dashboard: "Lawhat Al-Tahakkum",
    profileDetails: "Tafasil Al-Milaff",
    displayName: "Al-Ism Al-Muaraad",
    edit: "Tadil",
    save: "Hifz",
    saving: "Jari Al-Hifz…",
    cancel: "Ilgha",
    nameUpdated: "Tamma tahdith al-ism.",
    usersTitle: "Al-Mustakhdimun",
    administrators: "Al-Mudara",
    members: "Al-Adaa",
    noMembers: "La yujad adaa baad",
    joined: "Indamma fi",
    lastSeen: "Akhir zuhur",
    never: "Abadan",
    signInMethod: "Tariqat Al-Dukhul",
    methodPassword: "Kalimat Al-Murur",
    methodGoogle: "Google",
    methodBoth: "Kalimat Al-Murur + Google",
    accountTitle: "Hisabuk",
    accountGreeting: "Marhaban {name}",
    accountEmail: "Al-Barid Al-Iliktruni",
    accountRole: "Naw' Al-Hisab",
    roleAdmin: "Mudir",
    roleUser: "Udw",
    memberSince: "Udw mundhu",
    profileOverview: "Nazra Amma",
    profileAbout: "Nubdha",
    savedCvsTitle: "Al-Sira Al-Mahfuza",
    allCvsTitle: "Kull Al-Sira Al-Dhatiyya",
    statCvs: "Sira Dhatiyya",
    statPeople: "Ashkhas",
    cvsEmptyMember: "Lam tunshi sira dhatiyya baad.",
    cvsEmptyAdmin: "Lam yunshi ahad ayy sira dhatiyya baad.",
    createFirstCv: "Anshi awwal sira laka",
    downloadPdf: "Tahmil PDF",
    viewCv: "Muayana",
    closePreview: "Ighlaq Al-Muayana",
    openCv: "Fath",
    openCvCopy: "Ta'dil nuskha",
    deleteCv: "Hadhf",
    deleteCvConfirm: "Hadhf hadhihi Al-Sira Al-Mahfuza? La yumkin Al-Tarajju.",
    peopleTitle: "Al-Ashkhas",
    peopleSubtitle: "Kull man ladayhi hisab ala Al-Mawqi.",
    makeAdmin: "Tayin ka-Mudir",
    makeMember: "Tahwil ila Udw",
    roleChangeConfirm: "Taghyir {name} ila {role}?",
    deleteUser: "Hadhf Al-Hisab",
    deleteUserConfirm: "Hadhf {name}? Sayutam hadhf hisabihi wa siyarihi al-dhatiyya nihaiyyan. La yumkin al-taraju.",
    youBadge: "Anta",
    tabPeople: "Al-Mustakhdimun",
    tabCvs: "Kull Al-Siyar",
    tabChats: "Muhadathat AI",
    chatsTitle: "Muhadathat Al-Musaid",
    chatsSubtitle: "Ma salahu al-zuwwar min musaid al-mawqi.",
    statChats: "Muhadathat",
    chatsEmpty: "Lam yastakhdim ahad al-musaid baad.",
    chatsLoadFailed: "Taadhdhara tahmil al-muhadathat.",
    chatVisitor: "Zair",
    chatSignedIn: "Musajjal Al-Dukhul",
    chatAnonymous: "Zair Majhul",
    chatTurns: "{count} rasail",
    chatStartedOn: "Badaat fi",
    chatOpen: "Qira Al-Muhadatha",
    chatCollapse: "Ikhfa Al-Muhadatha",
    chatDelete: "Hadhf Al-Muhadatha",
    chatDeleteConfirm: "Hadhf hadhihi al-muhadatha? La yumkin al-taraju an dhalik.",
    userSearch: "Bahth an Mustakhdimin",
    userNoMatches: "La yujad mustakhdimun yutabiqun hadha al-bahth.",
    chatSearch: "Bahth fi Al-Muhadathat",
    chatNoMatches: "La tujad muhadathat tutabiq hadha al-bahth.",
    accountSignedInWith: "Tamma al-dukhul bi-wasitat",
    adminPanel: "Idhhab ila mudawwanat al-idara",
    signOut: "Tasjil Al-Khuruj",
    signingOut: "Jari Tasjil Al-Khuruj…",

    errorGoogleUnavailable: "Tasjil al-dukhul bi-Google ghayr mu'add ba'd.",
    errorGoogleDenied: "Tamma ilgha' tasjil al-dukhul bi-Google.",
    errorGoogleState: "Intaha salahiyat rabit al-dukhul. Hawil marra ukhra.",
    errorGoogleUnverified: "Hisab Google hadha la yahtawi ala barid muwaththaq.",
    errorGoogleFailed: "Fashila tasjil al-dukhul bi-Google. Hawil marra ukhra.",
    genericError: "Hadatha khata ma. Hawil marra ukhra.",
    footer: "Creative Surf",
  } satisfies PartialCopy<typeof authMessages.en>;

const ns_blogPost = {
    notFound: "Al-Maqal ghayr mawjud",
    backToBlogs: "← Al-Awda lil-Mudawwana",
    backToBlogsShort: "Al-Awda lil-Mudawwana",
    back: "Ruju",
    backToAll: "Al-Awda li-jami Al-Maqalat",
    edit: "Tahrir",
    delete: "Hadhf",
    confirmDelete: "Hadhf hadha Al-Maqal? La yumkin Al-Tarajju an dhalik.",
    writtenBy: "Kutiba bi-wasitat",
    share: "Musharaka",
    keyTakeaways: "Al-Nuqat Al-Raisiyya",
    seo: {
      inboundReal: "Dhu sila fi Creative Surf Al-Aqarat",
      inbound: "Dhu sila fi Creative Surf",
      outbound: "Masadir Kharijiyya",
    },
  } satisfies PartialCopy<typeof blogPostMessages.en>;

const ns_blogs = {
    eyebrow: "Creative Surf · Al-Mudawwana",
    title: "Ruan wa Afkar",
    subtitle:
      "Ara khubara hawl Al-Taswiq Al-Raqmi wa tasmim tajribat Al-Mustakhdim wal-SEO wa istratijiyyat Al-Alama — mubasharatan min fariq Creative Surf.",
    categoryAll: "Al-Kull",
    newPost: "Maqal Jadid",
    logout: "Tasjil Al-Khuruj",
    emptyTitle: "La tujad maqalat baad",
    emptyAdmin: "Anshi awwal maqal lak lil-bidaya.",
    emptyPublic: "Ud qariban li-ruan min fariq Creative Surf.",
    writeFirst: "Uktub Awwal Maqal",
    edit: "Tahrir",
    delete: "Hadhf",
    confirmDelete: 'Hadhf \"{title}\"? La yumkin Al-Tarajju an dhalik.',
    read: "Iqra →",
    brand: "Creative Surf",
    like: "Ijab",
    comment: "Taliq",
    share: "Musharaka",
    likesCount: "{count} Ijabat",
    likeCountOne: "Ijaba wahida",
    commentsCount: "{count} Taliqat",
    commentCountOne: "Taliq wahid",
    sharesCount: "{count} Musharakat",
    shareCountOne: "Musharaka wahida",
    viewsCount: "{count} Mushahadat",
    viewCountOne: "Mushahada wahida",
    shareInstagram: "Naskh Al-Rabit li-Instagram",
    copyLink: "Naskh Al-Rabit",
    copy: "Naskh",
    copied: "Tamma Al-Naskh",
    close: "Ighlaq",
    commentsTitle: "Al-Taliqat",
    noComments: "La tujad taliqat baad — kun awwal man yusharik rayah.",
    yourName: "Ismuk",
    writeComment: "Uktub taliqan…",
    postComment: "Nashr",
    posting: "Jari Al-Nashr…",
    commentFailed: "Taaddhara nashr taliqak. Yurja Al-Muhawala marratan ukhra.",
    signInToComment: "Sajjil dukhulak lil-musharaka fi Al-Niqash.",
    signInToCommentAction: "Tasjil Al-Dukhul",
    createAccountAction: "Insha hisab majjani",
    commentingAs: "Tuliq bi-sifatik {name}",
    deleteComment: "Hadhf Al-Taliq",
    confirmDeleteComment: "Hadhf hadha Al-Taliq? La yumkin Al-Tarajju.",
    deleteCommentFailed: "Taaddhara hadhf Al-Taliq. Yurja Al-Muhawala marratan ukhra.",
    editComment: "Tadil",
    saveComment: "Hifz",
    cancelEdit: "Ilgha",
    editedLabel: "muaddal",
    editCommentFailed: "Taaddhara hifz Al-Tadilat. Yurja Al-Muhawala marratan ukhra.",
    composerPrompt: "Bima tufakkir?",
    categoriesTitle: "Al-Tadfiq",
    loadMore: "Tahmil maqalat ukhra",
    allCaughtUp: "Laqad ittalata ala kull shay",
    readFullPost: "Iqra Al-Maqal kamilan",
    viewAllComments: "Ard kull Al-Taliqat ({count})",
    hideComments: "Ikhfa Al-Taliqat",
    timeJustNow: "Al-An",
    timeMinutes: "{count} daqiqa",
    timeHours: "{count} saa",
    timeDays: "{count} yawm",
    timeWeeks: "{count} usbu",
    trendingTitle: "Al-Rai",
    postsLabel: "Maqalat",
    topicsLabel: "Mawduat",
    loginToPost: "Sajjil Al-Dukhul lil-Nashr",
  } satisfies PartialCopy<typeof blogsMessages.en>;

const ns_chat = {
    open: "Dardish Maana",
    close: "Ighlaq Al-Dardasha",
    bubble: "Isal Surf!",
    title: "Isal Surf",
    subtitle: "Musaid Creative Surf",
    greeting:
      "Marhaban — ana Surf, al-musaid huna. Isalni an ma taqum bihi Creative Surf, aw ay shay an al-SEO wal-ilanat wal-muhtawa wal-tahwil.",
    disclaimer: "Musaid dhaki. Qad yukhti — tahaqqaq min ay shay muhim maa al-fariq.",
    placeholder: "Iktub sualak…",
    send: "Irsal",
    stop: "Iqaf",
    thinking: "Jari Al-Tafkir…",
    clear: "Dardasha Jadida",
    error: "Hadatha khata ma. Yurja Al-Muhawala marra ukhra.",
    suggestions: [
      "Madha taqum bihi Creative Surf?",
      "Kayfa azid al-ziyarat al-udwiya?",
      "Hal tusaidun fi Google Ads?",
      "Kayfa attasil bikum?",
    ],
  } satisfies PartialCopy<typeof chatMessages.en>;

const ns_common = {
    cta: {
      getStarted: "Ibda Al-An",
      startProject: "Ibda Mashrou",
      contactUs: "Ittasil Bina",
      talkToUs: "Tahaddath Ilayna",
      learnMore: "Iarif Al-Mazid",
      readMore: "Iqra Al-Mazid",
      seeMore: "Shahid Al-Mazid",
      viewAll: "Ard Al-Kull",
      getProposal: "Uhsul ala Ard",
      getQuote: "Uhsul ala Tasir Majjani",
      bookCall: "Ihjiz Mukalama",
      requestAudit: "Utlub Tadqiq Majjani",
      exploreServices: "Istakshif Al-Khadamat",
      backHome: "Al-Awda lil-Raisiyya",
      goBack: "Ruju",
      submit: "Irsal",
      send: "Irsal",
      cancel: "Ilgha",
      save: "Hifz",
      close: "Ighlaq",
      next: "Al-Tali",
      previous: "Al-Sabiq",
    },
    labels: {
      loading: "Jari Al-Tahmil…",
      error: "Hadatha Khata Ma",
      retry: "Hawil Marra Ukhra",
      required: "Matlub",
      optional: "Ikhtiyari",
      search: "Bahth",
      readingTime: "{minutes} daqiqa qiraa",
      published: "Nushira",
      updated: "Tuhaddith",
      by: "bi-qalam",
      all: "Al-Kull",
      language: "Al-Lugha",
      chooseLanguage: "Ikhtar Al-Lugha",
      menu: "Al-Qaima",
      toggleMenu: "Fath Al-Qaima",
    },
    breadcrumb: {
      home: "Al-Raisiyya",
      about: "Man Nahnu",
      services: "Al-Khadamat",
      blogs: "Al-Mudawwana",
      seoLeadGen: "Tahsin Al-Bahth wa Jalb Al-Umala",
      organicSearch: "Al-Bahth Al-Tabii",
      digitalAdvertising: "Al-Ilan Al-Raqmi",
      ecommerce: "Al-Tijara Al-Iliktruniyya",
      digitalMarketing: "Al-Taswiq Al-Raqmi",
      digitalIntelligence: "Al-Dhaka Al-Raqmi",
      uxInteractive: "Tajribat Al-Mustakhdim wal-Tafaul",
      design: "Al-Tasmim",
      realEstate: "Al-Aqarat",
      projects: "Al-Mashari",
    },
  } satisfies PartialCopy<typeof commonMessages.en>;

const ns_contact = {
    metaTitle: "Ittasil Bina | Creative Surf",
    metaDescription: "Tawasal ma Creative Surf li-istikshaf istratijiyya mukhasasa li-wasa'il al-tawasul al-ijtimai.",
    headerLine1: "Hal anta muhtam bil-taawun ma Creative Surf؟ Da'na nuhassin alamatal al-tijariyya ma'an!",
    headerLine2: "Tawasal ma'ana al-yawm li-istikshaf istratijiyya mukhasasa li-wasa'il al-tawasul al-ijtimai.",
    form: {
      name: "Al-Ism",
      firstName: "Al-Ism Al-Awwal",
      lastName: "Ism Al-A'ila",
      required: "(matlub)",
      company: "Ism Al-Sharika (in wujid)",
      email: "Al-Barid Al-Iliktruni",
      socialUrl: "Rabit Wasa'il Al-Tawasul Al-Ijtimai",
      socialPlaceholder: "http://",
      servicesTitle: "Ma hiya al-khadamat allati tahtamm biha?",
      serviceOptions: [
        "Idarat Wasa'il Al-Tawasul Al-Ijtimai",
        "Tadaqiq Wasa'il Al-Tawasul Al-Ijtimai",
        "Insha' Al-Muhtawa",
        "Idarat Pinterest",
        "La ara ma abgath anhu, hal yumkinuna al-muhadatha?",
      ],
      comments: "Mulahezat idafiyya an ma tabhath anhu (al-jadwal al-zamani, al-mutatallabat, al-mizaniyya, elkh)",
      howDidYouHear: "Kayfa samia't anna?",
      submit: "IRSAL",
      submitting: "JARI AL-IRSAL...",
      errorGeneric: "Yurja ikmal jami' al-huqul al-matluba.",
      errorNetwork: "Khata fi al-shabaka. Yurja al-muhawala marra ukhra.",
      successTitle: "Shukran lak!",
      successBody: "Sa-nuwari'u al-radd alayk fi aqrab waqt.",
      sendAnother: "Irsal risala ukhra",
    },
    kicker: "Tawasal Maana",
    errorServices: "Yurja ikhtiyar khidma wahida ala Al-Aqall.",
    badges: [
      "Radd khilal 24 saa",
      "Khususiyya mahmiyya 100%",
      "Akthar min 150 alama tasarat"
    ],
    cards: {
      whatsappTitle: "Muhadatha istratijiyya ala WhatsApp",
      whatsappBody: "Tahtaj ijaba fawriyya? Tahaddath mubasharatan maa qadat hamalatina ala WhatsApp.",
      whatsappCta: "Tahaddath ala WhatsApp",
      emailTitle: "Al-Barid Al-Mubashir",
      emailBody: "Arsil talabat Al-Urud wal-mulakhkhasat Al-Mufassala aw istifsarat Al-Taawun mubasharatan ila fariqina.",
      emailCopy: "Nasakh Al-Barid Al-Iliktruni",
      emailCopied: "Tamma Al-Naskh!",
      hqTitle: "Maqarr Al-Wakala",
      hqLocation: "Dhaka, Bangladesh",
      hqHours: "Al-Ithnayn–Al-Juma: 9 sabahan – 6 masaan (GMT+6)",
      hqAvailable: "Mutahun li-mashari jadida"
    },
    faqKicker: "Ladayk asila?",
    faqTitle: "Al-Asila",
    faqAccent: "Al-Shaia.",
    faq: [
      {
        q: "Ma madda radd Creative Surf ala talabi?",
        a: "Nurajiu kull talab bi-inaya wa nuid Al-Tawasul khilal 24 saat amal maa khitta istishariyya ula masmuma li-alamatik."
      },
      {
        q: "Madha yashmal tadqiq wasail Al-Tawasul?",
        a: "Yuhallil tadqiquna ada hisabatik wa tafaul jumhurik wa hawiyyatak Al-Basariyya wa jawdat muhtawak wa mawqiak amam Al-Munafisin, maa khutuwat numuw amaliyya."
      },
      {
        q: "Hal yumkinukum tasmim baqa tunasib mizaniyyati wa ahdafi?",
        a: "Naam! Nukhassis kull ittifaq hasab qanawatik wa watirat Al-Nashr wa idarat mizaniyyat Al-Ilanat wa jadwal Al-Numuw Al-Matlub."
      },
      {
        q: "Hal tudirun Al-Muhtawa Al-Adawi wal-hamalat Al-Madfua maan?",
        a: "Al-Istratijiyya Al-Raqmiyya Al-Shamila hiya takhassusuna: najma bayn muhtawa adawi qawi wa hamalat madfua tarkiz ala Al-Aid."
      },
      {
        q: "Kayfa yatimm Al-Bad bad Al-Ittifaq ala Al-Shiraka?",
        a: "Bad talabik nurattib mukalama tamhidiyya qasira, thumma nuqaddim ardan mukhassasan, wa nattafiq ala Al-Usul Al-Asasiyya, wa nabda Al-Tanfidh khilal 5–7 ayyam amal."
      }
    ],
  } satisfies PartialCopy<typeof contactMessages.en>;

const ns_cvTeaser = {
    hero: {
      title: "Usnaʿ Siratak Al-Thatiya",
      titleHighlight: "fi 60 thaniya",
      subtitle: "Alsiq mulahazatik Al-Aridha wa-Ilan Al-Wazifa. Satahsul ala Sira Dhatiyya jahiza lil-Muwazzifin mabniyya faqat ala ma faaltahu haqqan — bi-darajat mutabaqa ma dhalika Al-Ilan, wa laka ka-PDF majjani.",
      ctaPrimary: "Anshi Siratee",
      trust: ["La shay makhtalaq","PDF majjani, bidun rusum tasdir","Amud wahid mutawafiq ma Al-Farz"],
    },
  } satisfies PartialCopy<typeof cvTeaserMessages.en>;

const ns_cvBuilder = {
    metaTitle: "Munshi Al-Sira Al-Dhatiyya bil-Zaka Al-Istinai — Majjani | Creative Surf",
    metaDescription:
      "Hawwil mulahazatik ila Sira Dhatiyya jahiza lil-Muwazzifin. Alsiq ilan Al-Wazifa, shahid ayy Al-Mutatallabat ghattaytaha, wa hammil PDF majjani mutawafiq ma anzimat Al-Farz. La nakhtali arbab amal aw tawarikh aw arqam.",
    hero: {
      ...ns_cvTeaser.hero,
      badge: "Majjani · Bidun Tasjil",
      ctaSecondary: "Shahid Namudhaj Sira",
    },
    stats: [
      { value: "~60s", label: "Min mulahazat basita ila PDF jahiz" },
      { value: "0", label: "Hawajiz dafi bainaka wa bayn Al-Tahmil" },
      { value: "6", label: "Lughat yumkin kitabat Siratik biha" },
    ],
    import: {
      title: "Ladayka Sira Thatiya?",
      subtitle:
        "Irfaʿ milaf PDF aw Word (.docx) li-tara darajat ATS fawran. Sanamlaʾ Al-Namudhaj aydan, fa-yakun Al-Tahsin bi-naqra wahida.",
      button: "Irfaʿ Al-Sira",
      reading: "Jari qiraʾat siratak…",
      success: "Siratak fi Al-Muʿayana maʿa darajat ATS, wa tamma malʾ Al-Namudhaj. Ansiʾ li-tahsul ʿala nuskha muhassana.",
      failed: "Lam natamakkan min qiraʾat hadhihi Al-Sira. Jarrib milafan akhar aw imlaʾ Al-Namudhaj yadawiyan.",
    },
    guestNotice: {
      title: "Anta tunshi bidun hisab",
      subtitle: "Anshi wa hammil Siratik Al-Dhatiyya bidun tasjil dukhul — lan tartabit bi-ayy hisab, fa-lan tastati'a fathaha lahiqan. Al-hisab al-majjani yubqi Siratik fi makan wahid.",
      login: "Tasjil Al-Dukhul",
      register: "Insha hisab majjani",
    },
    builder: {
      eyebrow: "Al-Munshi",
      title: "Thalath khutuwat,",
      highlight: "sira wahida jahiza",
      description:
        "Imla ma tatadhakkaruhu. Al-Mulahazat Al-Khama hiya Al-Maqsud — tahwiluha ila lughat Sira Dhatiyya huwa amaluna nahnu.",
    },
    sections: {
      basics: "Manlumat Anka",
      basicsHint: "Ismuka, Al-Wazifa Al-Mustahdafa, wa kayfa yasil ilayka Al-Muwazzif.",
      background: "Khalfiyyatuka",
      backgroundHint: "Al-Jumal Al-Naqisa wal-Akhta Al-Imlaiyya la tudirr. Al-Tafsil ahamm min Al-Sayagha.",
      tailoring: "Al-Hadaf wal-Uslub",
      tailoringHint: "Alsiq Al-Ilan huna li-fath darajat Al-Mutabaqa.",
      links: "Rawabit (ikhtiyari)",
      photo: "Sura (ikhtiyari)",
      photoAdd: "Arfa sura",
      photoChange: "Ghayyir As-Sura",
      photoRemove: "Ihdhif",
      photoReading: "Jari At-Tahdir…",
      photoFailed: "Ta'adhdhara qira'at hadhihi As-Sura. Jarrib milaffan akhar.",
      photoTooLarge: "Hadhihi As-Sura kabira jiddan. Jarrib suratan asghar.",
      photoHint:
        "As-Sura mutawaqqaa fi As-Sira fi mu'zam Uruba wa Asiya wa Amrika Al-Latiniya, lakinnaha tustab'ad qabla an yaraha insan fi Britaniya wa Amrika wa Kanada. Utruk hadha Al-Haql farighan idha kunta tuqaddim hunak.",
      languages: "Al-Lughat (ikhtiyari)",
      languageName: "Al-Lugha",
      languageLevel: "Al-Mustawa",
      languageAdd: "Adif lughatan ukhra",
      languageRemove: "Ihdhif hadhihi Al-Lugha",
      languagePlaceholder: "Al-Arabiya",
      languagesHint:
        "Mustawak yazhar fi As-Sira kama haddadtahu huna bi-l-dabt — la narfa'uhu abadan li-yunasib Al-I'lan.",
      linkLabel: "Rabit",
      linkType: "Naw'",
      linkAdd: "Adif rabitan akhar",
      linkRemove: "Ihdhif hadha Al-Rabit",
      linksHint:
        "Alsiq ayy rabit — LinkedIn aw GitHub aw mawqiaka Al-Shakhsi. Ikhtar nawahu min Al-Qaima Al-Mujawira. Rabit “Ukhra” yusamma fi As-Sira bi-ism Al-Mawqi Al-Ladhi yushir ilayh, fa-alsiq Al-Unwan Al-Kamil la Al-Ism Al-Mustaar faqat.",
    },
    fields: {
      fullName: { label: "Al-Ism Al-Kamil", placeholder: "Alex Morgan" },
      jobTitle: { label: "Al-Wazifa Al-Mustahdafa aw Al-Musamma Al-Hali", placeholder: "Muhandis Frontend Awwal" },
      email: { label: "Al-Barid Al-Iliktruni", placeholder: "alex@example.com" },
      phone: { label: "Raqm Al-Hatif", placeholder: "+971 50 123 4567" },
      location: { label: "Al-Mawqi", placeholder: "Dubai, Al-Imarat" },
      yearsExperience: { label: "Sanawat Al-Khibra", placeholder: "6" },
      workHistory: {
        label: "Al-Khibra Al-Amaliyya",
        placeholder:
          "Muhandis Frontend fi Northwind, 2021-Al-An. Aadtu bina safhat Al-Dafi, wa qallaltu waqt Al-Tahmil bil-nisf, wa darrabtu muhandisayn.\n\nMutawwir Mubtadi fi Belltower, 2019-2021. Bina lawhat tahakkum dakhiliyya bi-React.",
        hint: "Al-Mulahazat Al-Basita takfi — wazifa wahida li-kull faqra, ma Al-Tawarikh in wujidat.",
      },
      education: {
        label: "Al-Talim",
        placeholder: "Bakalurius Ulum Al-Hasib, Jamiat Al-Qahira, 2015-2019",
      },
      skills: {
        label: "Al-Maharat",
        placeholder: "React, TypeScript, Node.js, Figma, qiyadat Al-Fariq, Al-Tawasul",
      },
      targetJob: {
        label: "Wasf Al-Wazifa Al-Mustahdafa",
        placeholder: "Alsiq ilan Al-Wazifa Al-Ladhi tuqaddim laha…",
        hint: "Ikhtiyari, lakin huna tuzhir Al-Adat qimataha: alsiq Al-Ilan wa sanuqayyim Siratak muqabilahu.",
      },
      tone: { label: "Al-Uslub" },
      language: { label: "Lughat Al-Sira Al-Dhatiyya" },
      effort: { label: "Al-Juhd" },
    },
    languageLevels: {
      native: "Lugha Umm",
      fluent: "Talaqa",
      professional: "Mihani",
      intermediate: "Mutawassit",
      basic: "Mubtadi",
    },
    linkTypes: {
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio",
      other: "Ukhra",
    },
    linkPlaceholders: {
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      portfolio: "alexmorgan.dev",
      scholar: "scholar.google.com/citations?user=…",
      orcid: "orcid.org/0000-0002-1825-0097",
      behance: "behance.net/alexmorgan",
      researchgate: "researchgate.net/profile/Alex-Morgan",
      kaggle: "kaggle.com/alexmorgan",
      leetcode: "leetcode.com/u/alexmorgan",
      medium: "medium.com/@alexmorgan",
      other: "dribbble.com/alexmorgan",
    },
    efforts: {
      high: "Ali",
      low: "Munkhafid",
    },
    tones: {
      professional: "Ihtirafi",
      concise: "Mukhtasar",
      impact: "Murakkiz ala Al-Nataij",
    },
    actions: {
      generate: "Anshi Siratee Al-Dhatiyya",
      generating: "Jari kitabat Siratik…",
      regenerate: "Iadat Al-Insha",
      download: "Tahmil PDF",
      view: "Muayana",
      startOver: "Masah Al-Namudhaj",
    },
    wizard: {
      label: "Al-Khutuwat",
      stepOf: "Al-Khutwa {current} min {total}",
      back: "Rujue",
      next: "Al-Tali",
      nextTo: "Al-Tali: {step}",
      filled: "Muktamal",
      add: "Idafa",
      jump: "Intaqil ila Al-Khutwa {n}: {step}",
      short: { basics: "Anka", profiles: "Al-Rawabit", experience: "Al-Khibra", education: "Al-Talim", target: "Al-Hadaf" },
      profiles: "Al-Rawabit wal-Lughat",
      profilesHint: "Ayna yumkin lil-Muwazzif ruyat amalika, wal-Lughat allati tamal biha. Kilahuma ikhtiyari.",
      experience: "Al-Khibra",
      experienceHint: "Kull wazifa turidha fi Al-Safha. Al-Jumal Al-Naqisa wal-Akhta la tudirr — Al-Tafsil ahamm min Al-Sayagha.",
      education: "Al-Talim wal-Maharat",
      educationHint: "Al-Shahadat wal-Dawrat, thumma Al-Adawat wa nuqat Al-Quwwa allati taqbal an tukhtabar fiha.",
      ready: "Jahiz mata shita",
      readyHint: "Kull ma tabaqqa ikhtiyari. Anshi Al-Ana, aw adif Al-Ilan awwalan li-sira adaqq wa darajat mutabaqa.",
    },
    progress: {
      label: "Mustawa Al-Tafsil",
      hint: "Kullama zadta mimma tuqaddimuhu, qalla ma nadtarr ila hadhfihi.",
    },
    saved: {
      title: "Siratuka Al-Mahfuza",
      subtitle: "Kull sira tunshiuha tabqa huna, li-tahtafiz bi-nuskha li-kull tallab.",
      empty: "La shay mahfuz badu — sa-tazhar siratuka Al-Ula huna.",
      load: "Fath",
      remove: "Hadhf",
      confirm: "Hadhf hadhihi Al-Sira Al-Mahfuza? La yumkin Al-Tarajju.",
    },
    preview: {
      title: "Muaayana",
      placeholderTitle: "Satakharu Siratuka Al-Dhatiyya huna",
      placeholderSubtitle: "Imla bayanatik ala Al-Yasar wa iqnad ala Anshi Siratee.",
      loading: "Jari isdad Siratik. Yastaghriq adatan 5-15 thaniya.",
      downloadHint: "Ikhtar « Hifz bi-sighat PDF » fi nafidhat Al-Tiba. Al-Nass yabqa qabilan lil-tahdid.",
    },
    ats: {
      title: "Jahiziyyat ATS",
      caption: "{passed} min {total} min Al-Fuhusat najahat",
      tiers: { strong: "Jahiz li-ATS", good: "Qarib jiddan", weak: "Tahtaj amalan" },
      tierHints: {
        strong: "Nizam Al-Tawzif yaqdir an yaqra kull juz min hadhihi Al-Sira. La shay huna yuakhkhiruka.",
        good:
          "Maqrua, lakin Al-Nuqat adnah hiya haythu tafqid Al-Sira darajat bi-hudu. Asleh ma tastati thumma aid Al-Insha.",
        weak:
          "Nizam tatabbu Al-Mutaqaddimin sayajid sububa fi qiraat hadha. Raji Al-Ikhfaqat adnah — muzamuha yuhall bi-idafat tafasil ila mulahazatik.",
      },
      note:
        "Hadha yuqayyim Al-Asasiyyat allati yaqrauha nizam Al-Tawzif awwalan: Al-Bunya wal-Tawarikh wal-Arqam wa Al-Bayanat. Huwa sual mukhtalif an Mutabaqat Al-Ilan, wa qad tanjah Al-Sira fi wahid wa takhfaq fi Al-Akhar.",
      checks: {
        contact: {
          label: "Bayanat Al-Ittisal kamila",
          fix: "Adif raqm hatifik wa mawqiaka — Al-Muhallil yabhath an kilayhima fi Al-Tarwisa.",
        },
        profileLinks: {
          label: "Rabt malaff wahid ala Al-Aqall",
          fix:
            "Adif rabt LinkedIn aw Al-Muallaf aw GitHub aalah. Muzam Al-Muwazzifin yaftahun wahidan qabl Al-Ittisal.",
        },
        headline: {
          label: "Unwan qasir wa muhaddad",
          fix:
            "Al-Unwan naqis aw tawil jiddan lil-qiraa Al-Sariaa. Wazifa mustahdafa adaqq fi Al-Namudhaj tahull hadha.",
        },
        summary: {
          label: "Al-Mulakhkhas bil-tul Al-Munasib",
          fix: "Istahdif 25 ila 130 kalima. Al-Aqsar la yaqul shayan, wal-Atwal yutakhatta.",
        },
        experienceDepth: {
          label: "Kull wazifa mufassala kifaya",
          fix:
            "Badu Al-Wazaif tahmil aqall min thalath nuqat. Adif Al-Mazid amma faaltahu huna fi khibratik.",
        },
        dates: {
          label: "Kull wazifa muarrakha",
          fix:
            "Al-Wazifa bila tawarikh la yastati Al-Muhallil tahdid mawqiiha. Adif Al-Sanawat ila khibratik.",
        },
        metrics: {
          label: "Al-Injazat qabila lil-qiyas",
          fix:
            "Nuqat qalila jiddan tahtawi ala raqm. Adif ahjam Al-Firaq aw Al-Nisab aw Al-Mizaniyyat aw Al-Mudad allati tatadhakkaruha haqqan.",
        },
        bulletLength: {
          label: "Al-Nuqat bi-tul maqru",
          fix: "Iddat nuqat qasira jiddan aw tawila jiddan. Min sitt ila thalathin kalima huwa Al-Afdal.",
        },
        skills: {
          label: "Al-Maharat murattaba wa muhaddada",
          fix: "Udhkur maharat akthar, wa bi-adad yakfi li-majmuatayn ala Al-Aqall.",
        },
        firstPerson: {
          label: "Maktuba bidun « ana » wa « li »",
          fix: "Al-Sira tuktab bi-sighat Al-Mutakallim Al-Dimniyya. Iadat Al-Insha adatan tuhill hadha.",
        },
        length: {
          label: "Al-Tul Al-Ijmali sahih",
          fix: "Istahdif hawali 300 ila 850 kalima. Adif tafasil in kanat qalila, wa ikhtasir in talat.",
        },
      },
    },
    match: {
      title: "Mutabaqat Al-Ilan",
      lockedTitle: "Darajat Al-Mutabaqa mughlaqa",
      lockedBody:
        "Alsiq ilan Al-Wazifa fi « Al-Hadaf wal-Uslub » wa sanuqayyim hadhihi Al-Sira muqabil ma yatlubuhu sahib Al-Amal filan.",
      ungradedTitle: "Lam yatimm Al-Taqyim hadhihi Al-Marra",
      ungradedBody:
        "Lam nastati taqyim hadhihi Al-Sira muqabil Al-Ilan Al-An. Iadat Al-Insha tahull Al-Mushkila adatan — wa darajat la nastati Al-Difa anha aswa min ghayabiha.",
      caption: "{matched} min {total} min Al-Mustalahat Al-Raisiyya fi Al-Ilan mawjuda fi Siratik",
      tiers: {
        strong: "Mutabaqa qawiyya",
        good: "Mutabaqa maqbula",
        weak: "Tahtaj amalan",
      },
      tierHints: {
        strong: "Hadhihi Al-Sira tatakallam lughat Al-Ilan. Hammilha wa arsilha.",
        good: "Qarib. Idha kan ayy mimma yali yakhussuka haqqan, adifhu ila mulahazatik thumma aid Al-Insha.",
        weak: "Al-Ilan yatlub ashya la tadhkuruha mulahazatuka. Adif ma faaltahu haqqan thumma aid Al-Insha.",
      },
      matchedLabel: "Mughatta",
      missingLabel: "Ghayr mughatta badu",
      honestNote:
        "Lan nudifaha niyabatan anka. Ma laysa fi mulahazatik la yadkhul Siratak — wa hadha huwa Al-Maqsud kulluhu.",
    },
    errors: {
      required: "Al-Raja idkhal Al-Ism wal-Wazifa Al-Mustahdafa wal-Barid Al-Iliktruni.",
      email: "Al-Raja idkhal barid iliktruni sahih.",
      background: "Al-Raja idafat Al-Khibra aw Al-Talim aw Al-Maharat ala Al-Aqall.",
      generic: "Hadatha khata ma. Al-Raja Al-Muhawala marra ukhra.",
    },
    cv: {
      summary: "Al-Milaff Al-Shakhsi",
      experience: "Al-Khibra",
      education: "Al-Talim",
      skills: "Al-Maharat",
      projects: "Al-Mashari",
      certifications: "Al-Shahadat",
      languages: "Al-Lughat",
    },
    tips: {
      title: "Li-natija afdal",
      items: [
        "Adif Al-Arqam matta amkan: hajm Al-Fariq, Al-Mizaniyyat, Al-Nisab Al-Miawiyya, Al-Muddat.",
        "Uktub faqra li-kull wazifa ma Al-Tawarikh li-takun Al-Jadwala sahiha.",
        "Alsiq ilan Al-Wazifa li-tabda Al-Sira bima yatlubuhu sahib Al-Amal.",
        "La nakhtali arbab amal aw tawarikh aw nataij — kullama zadat manlumatuka, qawiyat Al-Sira.",
      ],
    },
    why: {
      eyebrow: "Limadha hadhihi",
      title: "Adawat kathira taktub laka sira.",
      highlight: "Qalil jiddan minha yubqiha sadiqa.",
      description:
        "Bananaha lil-lahza Al-Lati tali Al-Tahmil — hina yatlub minka Al-Muwazzif an tatahaddath an Al-Sira Al-Lati arsaltaha.",
      cards: [
        {
          title: "La yakhtali masirak Al-Mihani",
          body:
            "Muzam anzimat Al-Zaka Al-Istinai satamnahuka bi-suhula zyada 47% lam tuhaqqiqha abadan. Nizamuna yastakhdim ma katabtahu faqat: la arbab amal aw tawarikh aw shahadat aw arqam makhtalaqa. Kull satr yumkinuka Al-Difa anhu fi Al-Muqabala.",
        },
        {
          title: "Yaktub Al-Wathiqa, la Al-Jumal faqat",
          body:
            "Musaadidat Al-Kitaba tuhassin nassan katabtahu bil-fil. Yabqa alayka bina Al-Haykal wa ikhtiyar Al-Aqsam wa taqrir ma yastahiqq Al-Dhikr. Hadha bil-dabt ma naqumu bihi: mulahazat khama tadkhul, wa sira murattaba takhruj.",
        },
        {
          title: "Yujib ala Al-Ilan Al-Ladhi amamak",
          body:
            "Alsiq wasf Al-Wazifa wa sa-yuad tartib Al-Sira wa sayaghatuha hawlahu. Thumma nuqayyim Al-Natija wa nusammi Al-Mutatallabat Al-Lati lam tughattiha badu — fa-tarifuha qabl Al-Muwazzif.",
        },
        {
          title: "Al-PDF majjani, wa nassuhu haqiqi",
          body:
            "La rusum tasdir wa la alama mayiyya wa la « taraqqa lil-tahmil ». Yutba ka-nass shuai qabil lil-tahdid, fi amud wahid bidun jadawil aw sanadiq nass — wa hiya ma yuksir adatan anzimat tatabbu Al-Mutaqaddimin.",
        },
        {
          title: "Sitt lughat, masira wahida",
          body:
            "Uktub nafs Al-Sira bil-Ingliziyya aw Al-Faransiyya aw Al-Almaniyya aw Al-Isbaniyya aw Al-Arabiyya aw Al-Bangaliyya, bi-sarf Al-Nazar an lughat Al-Mawqi. Mufid hina tuqaddim fi Uruba wal-Khalij wa Janub Asiya ma.",
        },
        {
          title: "Hunak bashar haqiqiyyun khalfahu",
          body:
            "Nahnu wakala amila, laysa ishtirakan majhulan. Siratuka tabqa fi hisabik, nuskha li-kull tallab, wa fariq haqiqi yujib ala namudhaj Al-Tawasul.",
        },
      ],
    },
    honesty: {
      eyebrow: "Al-Farq fi mithal wahid",
      title: "Mulahaza khama tadkhul.",
      highlight: "Sira sadiqa takhruj.",
      description:
        "Nafs Al-Jumla, muamala bi-thalath turuq. Hadha huwa Al-Hujja Al-Kamila li-istikhdam hadhihi Al-Adat badalan min munaqasha amma.",
      typedLabel: "Ma katabtahu filan",
      typedBody: "Amiltu ala safhat Al-Dafi fi Northwind, jaaltuha asra, wa saadtu muhandisayn mubtadiayn.",
      genericLabel: "Ma tamil Al-Zaka Al-Istinai Al-Amm ila kitabatihi",
      genericBody:
        "Haqqaqtu zyada 47% fi tahwil safhat Al-Dafi wa qudtu fariqan min 8 muhandisin, mimma darr 2 malyun dular iradat sanawiyya idafiyya.",
      genericNote: "Arqam lam tutiha lahu abadan. Sa-tusal anha.",
      oursLabel: "Ma naktubuhu nahnu",
      oursBody:
        "Aadtu bina safhat Al-Dafi fi Northwind, mimma qallala waqt Al-Tahmil wa sahhala masar Al-Shira. Darrabtu muhandisayn mubtadiayn hatta awwal isdarayn lahuma fi Al-Intaj.",
      oursNote: "Sayagha adaqq, wa nafs Al-Haqaiq. La shay huna yumkin an yuqiaka fi harij.",
    },
    compare: {
      eyebrow: "Muqarana sadiqa",
      title: "Ayna nusnif —",
      highlight: "wa ayna lasna",
      description:
        "Musaadidat Al-Kitaba wal-munaqashat Al-Amma adawat jayyida. Innaha faqat laysat munshiat sira dhatiyya. Wa hadha huwa Al-Farq, bi-wuduh.",
      feature: "Ma tahtajuhu",
      columns: {
        us: "Creative Surf",
        assistant: "Musaadidat Al-Kitaba",
        chatbot: "Munaqashat Al-Zaka Al-Amma",
        sites: "Mawaqi Al-Sira Al-Mutada",
      },
      rows: [
        {
          label: "Yuhawwil Al-Mulahazat Al-Khama ila sira jahiza",
          us: "Naam",
          assistant: "La — yusahhih nassaka",
          chatbot: "In ahsanta Al-Talab",
          sites: "Anta taktub kull satr",
        },
        {
          label: "Yumniuka wathiqa munassaqa jahiza lil-tiba",
          us: "Naam",
          assistant: "La",
          chatbot: "Nass tunassiquhu binafsik",
          sites: "Naam",
        },
        {
          label: "Yuid kitabat Al-Sira hawl ilan muhaddad",
          us: "Naam",
          assistant: "La",
          chatbot: "Faqat idha talabta, fi kull marra",
          sites: "Nadiran",
        },
        {
          label: "Yuqayyim Siratak muqabil dhalika Al-Ilan",
          us: "Naam, ma tasmiyat Al-Thaghrat",
          assistant: "La",
          chatbot: "La",
          sites: "Adatan idafa madfua",
        },
        {
          label: "Yarfud ikhtilaq Al-Arqam wa arbab Al-Amal",
          us: "Bil-tasmim",
          assistant: "La yaktub niyabatan ank",
          chatbot: "Yakhtali bi-hurriyya",
          sites: "Hasab Al-Muharrik",
        },
        {
          label: "Tahmil Al-PDF",
          us: "Majjani",
          assistant: "Ghayr mutabiq",
          chatbot: "Ghayr mutabiq",
          sites: "Ghaliban madfu",
        },
        {
          label: "Sira maktuba bi-sitt lughat",
          us: "Naam",
          assistant: "Al-Ingliziyya awwalan",
          chatbot: "Naam",
          sites: "Wahida adatan",
        },
        {
          label: "Yahfaz nuskha li-kull tallab",
          us: "Naam",
          assistant: "La",
          chatbot: "La",
          sites: "Fi Al-Khutat Al-Madfua",
        },
      ],
      note:
        "Insafan lahum: Grammarly mumtaz fi iltiqat Al-Jumla Al-Mutaathira, wa sanumarrir sira abrahu bi-suhula bad dhalika. Innahu faqat la yuhawil bina Al-Wathiqa, wa lan yukhbirak abadan bima talabahu Al-Ilan.",
    },
    how: {
      eyebrow: "Kayfa yamal",
      title: "Khams daqaiq min Al-Kitaba,",
      highlight: "wal-baqi alayna",
      description: "La ikhtiyar qawalib, wa la sahb wa iflat, wa la muassid min ithnata ashara khatwa.",
      steps: [
        {
          title: "Uktub ma tatadhakkaruhu",
          body:
            "Faqra li-kull wazifa, ma Al-Tawarikh in wujidat. Al-Akhta Al-Imlaiyya la tuhimm. Hadha huwa Al-Juz Al-Wahid Al-Ladhi alayka, wa yastaghriq khams daqaiq.",
        },
        {
          title: "Alsiq Al-Ilan",
          body:
            "Ikhtiyari, lakinnahu haythu tuzhir Al-Adat qimataha. Yuad tartib Al-Sira wa sayaghatuha hawl ma yatlubuhu sahib Al-Amal filan.",
        },
        {
          title: "Sudd Al-Thaghrat thumma hammil",
          body:
            "Nusammi Al-Mutatallabat Al-Lati lam tughattiha Siratuka. Adif ma yakhussuka haqqan, aid Al-Insha, wa ahfaz Al-PDF mubasharatan min mutasaffihik.",
        },
      ],
    },
    faq: {
      eyebrow: "Ijabat mubashara",
      title: "Asila",
      highlight: "tastahiqq Al-Su-al",
      items: [
        {
          q: "Hal huwa majjani filan?",
          a: "Naam. Tahtaj hisaban majjaniyyan li-tuhfaz siratuka wa tastati Al-Awda ilaiha, lakin la tujad khutta madfua bainaka wa bayn Al-PDF, wa la alama mayiyya ala Al-Tahmil.",
        },
        {
          q: "Bima yakhtalif hadha an tallab sira min munaqasha amma?",
          a: "Amran. Al-Munaqasha tuatika nassan fi nafidha yabqa alayka tansiquhu, wa takhtali arqaman li-tabdu mutamayyizan. Huna tahsul ala wathiqa jahiza lil-tiba, muqayyada bil-haqaiq Al-Lati qaddamtaha.",
        },
        {
          q: "Ala yakfi Grammarly?",
          a: "Grammarly yafhas Al-Kitaba. La yuqarrir ma yantami ila Al-Sira, wa la yurattib wazaifak, wa la yukayyifuka ma ilan, wa la yuqayyimuka muqabilahu, wa la yumniuka PDF. Istakhdimhu badana in aradta — Al-Ithnan la yatanafasan filan.",
        },
        {
          q: "Hal satamurr Al-Sira abr anzimat tatabbu Al-Mutaqaddimin?",
          a: "Al-PDF tansiq bi-amud wahid min nass haqiqi qabil lil-tahdid — bidun jadawil aw amida aw suwar aw sanadiq nass, wa hiya ma yuksir Al-Muhallilat adatan. Alsiq Al-Ilan aydan wa sanurika Al-Mustalahat Al-Lati ma tazal naqisa.",
        },
        {
          q: "Hal yumkinuni tadiluha lahiqan?",
          a: "Naam. Addil mulahazatik wa aid Al-Insha kama tasha, aw hammil Al-PDF wa iftahhu fi ayy muharrir. Kull sira tunsha tuhfaz fi hisabik.",
        },
        {
          q: "Madha yahduth li-ma aktubuhu?",
          a: "Mulahazatuka wa siratuka Al-Jahiza tuhfaz fi hisabik li-tastati fathaha lahiqan, wa yumkinuka hadhfuha min Al-Munshi fi ayy waqt. Tursal ila muzawwid zaka istinai li-kitabat Siratik faqat.",
        },
      ],
    },
    finalCta: {
      title: "Khams daqaiq min Al-Mulahazat,",
      highlight: "wa sira yumkinuka Al-Difa anha",
      description:
        "Sa-tughadir ma PDF yumkinuka irsaluhu Al-Yawm — wa laysa fihi shay tatamanna alla yasalaka anhu Al-Muwazzif.",
      primary: "Anshi Siratee",
      secondary: "Tahaddath ma shakhs haqiqi",
    },
  } satisfies PartialCopy<typeof cvBuilderMessages.en>;




const ns_editor = {
    editPost: "Tahrir Al-Maqal",
    newPost: "Maqal Jadid",
    preview: "Muayana",
    editorMode: "Al-Muharrir",
    untitled: "Maqal bi-la unwan",
    noContent: "*La yujad muhtawa baad…*",
    titlePlaceholder: "Unwan Al-Maqal…",
    excerptLabel: "Al-Muqtataf / Al-Mulakhkhas",
    excerptPlaceholder: "Mulakhkhas qasir lil-maqal yazhar fi qawaim Al-Mudawwana…",
    contentLabel: "Al-Muhtawa",
    contentPlaceholder:
      "Ibda bil-kitaba — istakhdim shrit Al-Adawat lil-anawin wal-khatt Al-Arid wal-mail wal-qawaim wal-suwar…",
    categoryLabel: "Al-Fia",
    coverImageLabel: "Surat Al-Ghilaf",
    tagsLabel: "Al-Wusum",
    tagPlaceholder: "Aktub wasman thumma Enter",
    authorsLabel: "Kutiba bi-wasitat",
    authorPlaceholder: "Aktub isman thumma Enter",
    tipsTitle: "Nasaih Al-Muharrir",
    tips: [
      "Istakhdim qaimat Al-Anmat lil-anawin — tazhar bi-hajmiha Al-Kamil athna Al-Kitaba.",
      "Haddid Al-Nass thumma inqur B aw I aw Al-Tastir li-tansiqih.",
      "Inqur ala ayqunat Al-Sura li-raf Al-Suwar — tazhar dimn Al-Maqal mubasharatan.",
      "Istakhdim Al-Muayana fil-ras li-ruyat Al-Shakl Al-Nihai lil-nashr.",
    ],
    saving: "Jari Al-Hifz…",
    updatePost: "Tahdith Al-Maqal",
    publishPost: "Nashr Al-Maqal",
    errors: {
      titleRequired: "Al-Unwan matlub.",
      slugRequired: "Al-Rabt Al-Mukhtasar matlub.",
      contentRequired: "Al-Muhtawa matlub.",
      saveFailed: "Fashila Al-Hifz. Hawil marra ukhra.",
      network: "Khata fi Al-Shabaka. Hawil marra ukhra.",
    },
  } satisfies PartialCopy<typeof editorMessages.en>;

const ns_editorUi = {
    seo: {
      metaDescriptionLabel: "Al-Wasf Al-Taarifi",
      metaPlaceholder: "Mulakhkhas mujaz li-natai'j bahth Google (yufaddal 150–160 harfan)…",
      fallbackHint: "Yustakhdam Al-Muqtataf idha turika farighan",
      characters: "{count} harfan",
      idealLength: "Al-Tul Al-Mithali",
      considerShortening: "Yufaddal Al-Ikhtisar",
      inboundTitle: "Rawabit Dakhiliyya",
      outboundTitle: "Rawabit Kharijiyya",
      inboundHint:
        "Rawabit dakhiliyya ila mawqiak. Istakhdim Al-Rabt Al-Kamil (https://…). Al-Unwan wal-rabt kilahuma matlub.",
      outboundHint: "Rawabit kharijiyya ila masadir mawthuqa. Al-Unwan wal-rabt kilahuma matlub.",
      removeLink: "Izalat Al-Rabt",
    },
    takeaways: {
      label: "Al-Nuqat Al-Raisiyya",
      hint: "Bid nuqat qasira tulakhkhis Al-Maqal. Tuard fi bitaqa bariza fawq Al-Muhtawa.",
      placeholder: "mathalan: Taghtiyat Al-Lughat wahdaha la takfi li-dhaka istinai wain thaqafiyyan.",
      itemLabel: "Al-Nuqta {number}",
      add: "Idafat nuqta",
      remove: "Izalat Al-Nuqta",
      moveUp: "Tahrik lil-ala",
      moveDown: "Tahrik lil-asfal",
      count: "{count} / {max}",
    },
    upload: {
      urlPlaceholder: "https://…",
      uploading: "Jari Al-Raf…",
      prompt: "Inqur aw asqit sura li-rafiha",
      addPhoto: "Idafat Sura",
      chooseImage: "Al-Raja ikhtiyar milaff sura.",
      chooseImagesOnly: "Al-Raja ikhtiyar milaffat suwar faqat.",
      failed: "Fashila Al-Raf. Jarrib milaffan akhar.",
      couldNotRead: "Taadhdhara qiraat Al-Milaff",
      couldNotLoad: "Taadhdhara tahmil Al-Sura",
    },
    toolbar: {
      placeholder: "Ibda bi-kitabat maqalik…",
      normalText: "Nass adi",
      bold: "Arid",
      italic: "Mail",
      underline: "Tastir",
      bulletList: "Qaima nuqtiyya",
      numberedList: "Qaima raqmiyya",
      quote: "Iqtibas",
      insertLink: "Idraj rabt",
      linkPrompt: "Rabt Al-URL",
      insertImage: "Idraj sura",
      divider: "Fasil",
      undo: "Tarajju",
      redo: "Iadat Al-Tanfidh",
    },
  } satisfies PartialCopy<typeof editorUiMessages.en>;

const ns_footer = {
    badge: "Falnatahaddath",
    headlineLine1: "Falnabni shayan",
    headlineAccent: "istithnaiyyan.",
    blurb: "Nadmij Al-Ibda wal-Istratijiyya wal-Tiknulujiya li-nasna mustaqbal alamatik.",
    cta: "Ibda Mashrou",
    exploreTitle: "Istakshif",
    contactTitle: "Tawasal Maana",
    whatsapp: "Dardish ala WhatsApp",
    links: {
      home: "Al-Raisiyya",
      services: "Al-Khadamat",
      blogs: "Al-Mudawwana",
      about: "Man Nahnu",
      contact: "Ittasil Bina",
    },
    location: "Dhaka, Bangladesh",
    rights: "© {year} Creative Surf. Jami Al-Huquq Mahfuza.",
    terms: "Shurut Al-Istikhdam",
    privacy: "Siyasat Al-Khusousiyya",
    craftedPre: "Suniat bi-taqat",
    craftedAccent: "al-shafaq",
    craftedPost: "",
    logoAlt: "Creative Surf",
  } satisfies PartialCopy<typeof footerMessages.en>;

const ns_home = {
    hero: {
      eyebrow: "Creative Surf · Wakala Raqmiyya",
      headlineLine1: "Hawwil",
      headlineLine2: "hudurak Al-Raqmi.",
      subtitle:
        "Nusaid Al-Sharikat ala bina alamat raqmiyya qawiyya min khilal Al-Tasmim Al-Istratiji wa taswiq Al-Ada wa nataij qabila lil-qiyas.",
      ctaPrimary: "Ibda Mashrou",
      ctaSecondary: "Shahid Khadamatina",
      stats: {
        projects: "Mashari Munjaza",
        retention: "Wafa Al-Umala",
      },
      panel: {
        title: "Ada Al-Hamalat",
        subtitle: "Akhir 6 shuhur",
        roas: "ROAS",
        leads: "Umala Muhtamalun",
        ctr: "CTR",
      },
      chipRating: "Taqyim Al-Umala",
      chipAwardTitle: "Hasila ala Jawaiz",
      chipAwardSub: "Fariq Ibdai",
    },

    services: {
      badge: "Khibratuna",
      headingLine1: "Ma naqum bihi",
      headingAccent: "bi-shakl istithnai.",
    },

    realEstate: {
      badge: "Taswiq Aqari",
      headingLine1: "Mashrouk yastahiqq",
      headingAccent: "al-jumhur Al-Sahih.",
      subline: "Daana nusaiduhu ala Al-Wusul ila fiatih.",
      bodyStart: "Tawasal ma mushtarin wa mustathmirin wa shuraka aradin muwaththaqin.",
      bodyStrong: "La mudiat lil-waqt",
      bodyEnd: "— faqat umala jaddun mustaiddun lil-tanfidh.",
      pills: ["Bashundhara R/A", "Mashari Sakaniyya", "Shuraka Aradi"],
      stats: {
        projects: "Mashari Tumawwiqat",
        leads: "Umala Muwaththaqun",
        quality: "Mutawassit Jawdat Al-Umala",
      },
      cta: "Istakshif Al-Taswiq Al-Aqari",
      images: {
        alt1: "Springfield – Bashundhara R/A",
        caption1: "Bashundhara R/A",
        alt2: "Masahat rahba masmuma bi-itqan",
        caption2: "2200 qadam murabba · 18 Katha",
        alt3: "Mashrou Qaim – Springfield",
        caption3: "Mashrou Qaim",
      },
      floatingTitle: "Jumhur Mutakhassis",
      floatingSub: "Mushtaru wa mustathmiru Al-Aqarat",
    },

    reviews: {
      badge: "Shahadat Al-Umala",
      headingLine1: "La tathiq bi-kalamina",
      headingAccent: "wahdahu.",
      items: [
        {
          position: "Mudirat Al-Taswiq",
          text:
            "Al-Amal ma Creative Surf ghayyara huduruna Al-Raqmi tamaman. Irtafaat muaddalat Al-Tahwil ladayna bi-nisbat 45% fi thalathat ashhur faqat.",
        },
        {
          position: "Al-Ra'is Al-Tanfidhi",
          text:
            "Sammamu hawiyyat alamatina wa banaw mawqiana wa nafadhu hamla adakhalatna ila kubra Al-Manshurat.",
        },
        {
          position: "Mudirat Al-Tijara Al-Iliktruniyya",
          text:
            "Irtafaat mabiatuna ala Al-Intirnit bi-nisbat 78% mundhu bidayat Al-Amal maahum. Kanat hamlat Al-Itlaq Al-Mawsimiyya rai'a bi-haqq.",
        },
      ],
    },

    trustedBy: {
      badge: "Umalauna",
      headingStart: "Mahall thiqat Al-Furaq",
      headingAccent: "al-mustashrifa lil-mustaqbal",
      headingEnd: "",
      subtitle: "Alamat ikhtarat Creative Surf li-tanmiyat huduriha",
    },
  } satisfies PartialCopy<typeof homeMessages.en>;

const ns_kit = {
    areasKicker: "Ma Nughattih",
    areasTitle: "Kull zawiya,",
    areasAccent: "maghtatta.",
    featuredKicker: "Mumayyaz",
    highlightsKicker: "Limadha yuhimm",
    explore: "Istakshif",
    learnMore: "Iktashif Al-Mazid",
  } satisfies PartialCopy<typeof kitMessages.en>;

const ns_legalPrivacy = {
    metaTitle: "Siyasat Al-Khusousiyya",
    metaDescription: "Siyasat Al-Khusousiyya Al-Khassa bi-mawqi wa khadamat Creative Surf.",
    breadcrumbCurrent: "Siyasat Al-Khusousiyya",
    title: "Siyasat Al-Khusousiyya",
    lastUpdated: "Akhir tahdith: Yunyu 2026",
    sections: [
      {
        heading: "1. Muqaddima",
        blocks: [
          { type: "p", text: "Tahtarim Creative Surf (Al-Sharika aw nahnu) khusousiyyatak wa taltazim bi-himayat maalumatik Al-Shakhsiyya. Tashrah hadhihi Al-Siyasa kayfa najma wa nastakhdim wa nufsih wa nahmi Al-Maalumat inda ziyaratik li-mawqiina aw istikhdamik li-khadamatina aw tawasulik maana." },
          { type: "p", text: "Bi-istikhdamik li-mawqiina wa khadamatina, fa-innaka tuwafiq ala jam wa istikhdam Al-Maalumat wafqan li-hadhihi Al-Siyasa." },
        ],
      },
      {
        heading: "2. Al-Maalumat allati Najmauha",
        blocks: [
          { type: "strong", text: "Al-Maalumat Al-Shakhsiyya" },
          { type: "p", text: "Qad najma Al-Maalumat allati tuqaddimuha tawan, wa tashmal:" },
          { type: "ul", items: ["Al-Ism Al-Kamil", "Al-Barid Al-Iliktruni", "Raqm Al-Hatif", "Ism Al-Sharika", "Mawqi Al-Amal", "Al-Ahdaf Al-Taswiqiyya wa mutatallabat Al-Mashrou", "Maalumat Al-Fawtara"] },
          { type: "strong", text: "Al-Maalumat Al-Mujmaa Tilqaiyyan" },
          { type: "p", text: "Ind ziyaratik li-mawqiina, qad najma tilqaiyyan:" },
          { type: "ul", items: ["Unwan IP", "Naw Al-Mutasaffih", "Maalumat Al-Jihaz", "Al-Safahat Al-Mazura", "Al-Mawqi Al-Muhil", "Muddat Al-Jalsa", "Bayanat Al-Tahlilat"] },
          { type: "strong", text: "Muhadathat Musaid Al-Dardasha" },
          { type: "p", text: "Ind istikhdamik li-musaid al-dardasha ala mawqiina, nahtafiz bil-muhadatha kamila — rasailak wa rudud al-musaid — maa al-safha allati badat minha, wa lughatik, wa muarrif majhul lil-mutasaffih. Idha kunta musajjal al-dukhul, turbat al-muhadatha bi-hisabik. Yuhtafaz bi-hadhihi al-sijillat li-ajal ghayr musamma wa yumkin li-mudirina qiraatuha; kama tursal rasailak ila muzawwidi al-dhaka al-istinai ladayna li-tawlid al-radd. Yurja adam musharakat kalimat al-murur aw bayanat al-daf aw ay maalumat hassasa fi al-dardasha. Yumkinuka talab hadhf muhadathatik fi ay waqt abr bayanat al-ittisal adnah." },
        ],
      },
      {
        heading: "3. Kayfa Nastakhdim Maalumatik",
        blocks: [
          { type: "p", text: "Nastakhdim Al-Maalumat Al-Mujmaa li:" },
          { type: "ul", items: ["Taqdim Al-Khadamat Al-Taswiqiyya", "Al-Radd ala Al-Istifsarat", "Jadwalat Al-Istisharat", "Muaalajat Al-Madfuat", "Tahsin mawqiina wa khadamatina", "Irsal tahdithat Al-Khadama", "Taqdim Al-Taqarir wa ruan Al-Hamalat", "Al-Iltizam bil-mutatallabat Al-Qanuniyya", "Man Al-Ihtiyal wa isaat Al-Istikhdam"] },
        ],
      },
      {
        heading: "4. Al-Murasalat Al-Taswiqiyya",
        blocks: [
          { type: "p", text: "Qad nursil rasail tarwijiyya wa nasharat ikhbariyya wa tahdithat khadamat. Yumkinuka ilgha Al-Ishtirak fi ayy waqt bi-istikhdam rabt ilgha Al-Ishtirak Al-Mawjud fi rasailina." },
        ],
      },
      {
        heading: "5. Khadamat Al-Atraf Al-Thalitha",
        blocks: [
          { type: "p", text: "Qad nastakhdim muzawwidi khadamat min atraf thalitha, minhum:" },
          { type: "ul", items: ["Meta (Facebook wa Instagram)", "Google", "TikTok", "LinkedIn", "Manassat Al-Tahlilat", "Anzimat CRM", "Muaalij Al-Madfuat", "Muzawwidu Al-Taswiq bil-barid Al-Iliktruni"] },
          { type: "p", text: "Ladayy hadhihi Al-Jihat siyasat wa mumarasat khusousiyya khassa biha." },
        ],
      },
      {
        heading: "6. Musharakat Al-Bayanat",
        blocks: [
          { type: "p", text: "Nahnu la nabi Al-Maalumat Al-Shakhsiyya." },
          { type: "p", text: "Qad nusharik Al-Maalumat ma:" },
          { type: "ul", items: ["Muzawwidi Al-Khadamat alladhina yusaidun fi amaliyyatina", "Al-Manassat Al-Ilaniyya ind idarat Al-Hamalat", "Al-Sultat Al-Qanuniyya ind iqtida Al-Qanun", "Al-Khulafa fi halat Al-Indimaj aw Al-Istihwadh aw Al-Bay"] },
        ],
      },
      {
        heading: "7. Aman Al-Bayanat",
        blocks: [
          { type: "p", text: "Nunaffidh dawabit idariyya wa tiqniyya wa tanzimiyya maqula masmuma li-himayat Al-Maalumat Al-Shakhsiyya. Ma dhalika, la yumkin daman anna ayy nizam naql aw takhzin abr Al-Intirnit amin bi-nisbat 100%." },
        ],
      },
      {
        heading: "8. Muddat Al-Ihtifaz bil-Bayanat",
        blocks: [
          { type: "p", text: "Nahtafiz bil-maalumat faqat lil-mudda Al-Lazima li-taqdim Al-Khadamat wal-iltizam bil-mutatallabat Al-Qanuniyya wa hall Al-Nizaat wa infadh Al-Ittifaqiyyat." },
        ],
      },
      {
        heading: "9. Huquqak",
        blocks: [
          { type: "p", text: "Hasab makan iqamatik, qad tatamatta bi-huquq fi:" },
          { type: "ul", items: ["Al-Wusul ila bayanatik Al-Shakhsiyya", "Tashih Al-Maalumat ghayr Al-Daqiqa", "Talab hadhf Al-Bayanat", "Taqyid Al-Muaalaja", "Al-Itirad ala Al-Muaalaja", "Talab naql Al-Bayanat"] },
          { type: "p", text: "Li-mumarasat hadhihi Al-Huquq, ittasil bina bi-istikhdam Al-Maalumat Al-Mawjuda adnah." },
        ],
      },
      {
        heading: "10. Milaffat Tarif Al-Irtibat",
        blocks: [
          { type: "p", text: "Qad yastakhdim mawqiina milaffat tarif Al-Irtibat wa tiknulujiyat mumathila li-tahsin tajribat Al-Mustakhdim wa tahlil Al-Zayarat wa dam Al-Juhud Al-Ilaniyya." },
          { type: "p", text: "Yumkinuk Al-Tahakkum fi milaffat tarif Al-Irtibat min khilal idadat mutasaffihik." },
        ],
      },
      {
        heading: "11. Khusousiyyat Al-Atfal",
        blocks: [
          { type: "p", text: "Khadamatuna ghayr muwajjaha lil-afrad dun sinn 18 aman. Nahnu la najma an ilm maalumat shakhsiyya min Al-Qasirin." },
        ],
      },
      {
        heading: "12. Naql Al-Bayanat Duwaliyyan",
        blocks: [
          { type: "p", text: "Qad tunqal maalumatik wa tuaalaj fi buldan ghayr baladik. Bi-istikhdamik li-khadamatina, fa-innaka tuwafiq ala hadhihi Al-Tahwilat." },
        ],
      },
      {
        heading: "13. Taghyirat ala hadhihi Al-Siyasa",
        blocks: [
          { type: "p", text: "Qad nuhaddith siyasat Al-Khusousiyya hadhihi bi-shakl dawri. Tusbih Al-Tahdithat sariyat Al-Mafual fawr nashriha ala hadhihi Al-Safha." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyMessages.en>;

const ns_legalPrivacyTerms = {
    metaTitle: "Al-Khusousiyya wa Shurut Al-Istikhdam",
    metaDescription: "Siyasat Al-Khusousiyya wa shurut Al-Istikhdam li-khadamat wakalat Creative Surf lil-taswiq.",
    breadcrumbCurrent: "Al-Khusousiyya wa Shurut Al-Istikhdam",
    title: "Siyasat Al-Khusousiyya wa Shurut Al-Istikhdam",
    lastUpdated: "Akhir tahdith: 12 Maris 2025",
    sections: [
      {
        heading: "1. Muqaddima",
        blocks: [
          { type: "p", text: "Marhaban bik fi Creative Surf (nahnu). Naltazim bi-himayat khusousiyyatik wa tawfir tajriba amina ala Al-Intirnit. Tashrah hadhihi Al-Siyasa kayfa najma wa nastakhdim wa nufsih wa nahmi maalumatik ind ziyaratik li-mawqiina aw istikhdamik li-khadamatina." },
          { type: "p", text: "Bi-wusulik ila khadamatina aw istikhdamiha, fa-innaka tuwafiq ala hadhihi Al-Siyasa wa ala shurut Al-Istikhdam. Idha lam tuwafiq ala siyasatina wa mumarasatina, fal-la tastakhdim khadamatina." },
        ],
      },
      {
        heading: "2. Al-Maalumat allati Najmauha",
        blocks: [
          { type: "h3", text: "2.1 Al-Maalumat Al-Shakhsiyya" },
          { type: "p", text: "Qad najma Al-Maalumat Al-Shakhsiyya allati tuqaddimuha lana tawan indama:" },
          { type: "ul", items: ["Tusajjil hisaban", "Tashtarik fi nasharatina Al-Ikhbariyya", "Tatlub ardan aw istishara", "Tamla namudhaj ittisal", "Tusharik fi istitlaat aw musabaqat", "Tatawasal maana ala wasail Al-Tawasul"] },
          { type: "p", text: "Qad tashmal hadhihi Al-Maalumat ismak wa baridak Al-Iliktruni wa raqm hatifak wa ism sharikatik wa musammak Al-Wazifi wa ayy maalumat ukhra takhtar taqdimaha." },
          { type: "h3", text: "2.2 Al-Maalumat Al-Mujmaa Tilqaiyyan" },
          { type: "p", text: "Ind ziyaratik li-mawqiina, qad najma tilqaiyyan maalumat muayyana an jihazik wa anmat istikhdamik, wa tashmal:" },
          { type: "ul", items: ["Unwan IP", "Naw wa isdar Al-Mutasaffih", "Nizam Al-Tashghil", "Al-Mawqi Al-Muhil", "Al-Safahat allati tushahiduha", "Waqt wa tarikh ziyaratik", "Al-Waqt Al-Munfaq ala Al-Safahat", "Ihsaiyyat ukhra"] },
        ],
      },
      {
        heading: "3. Kayfa Nastakhdim Maalumatik",
        blocks: [
          { type: "p", text: "Qad nastakhdim Al-Maalumat allati najmauha li-aghrad mutaaddida, minha:" },
          { type: "ul", items: ["Taqdim khadamatina wa siyanatiha wa tahsiniha", "Muaalajat Al-Muamalat wa irsal Al-Maalumat Al-Muttasila biha", "Irsal maalumat idariyya mithl Al-Tahdithat wa tanbihat Al-Aman wa rasail Al-Dam", "Al-Radd ala taliqatik wa asilatik wa talabatik", "Taqdim muhtawa wa tawsiyat mukhassasa", "Muraqabat wa tahlil Al-Ittijahat wal-istikhdam wal-anshita", "Iktishaf Al-Mushkilat Al-Tiqniyya wa maniha wa muaalajatiha", "Al-Himaya min Al-Anshita Al-Darra aw ghayr Al-Qanuniyya"] },
        ],
      },
      {
        heading: "4. Milaffat Tarif Al-Irtibat wal-Tiknulujiyat Al-Mumathila",
        blocks: [
          { type: "p", text: "Nastakhdim milaffat tarif Al-Irtibat wa tiknulujiyat tatabbu mumathila li-tatabbu Al-Nashat ala mawqiina wal-ihtifaz bi-maalumat muayyana. Milaffat tarif Al-Irtibat hiya milaffat tahtawi ala qadr saghir min Al-Bayanat qad tashmal muarrifan farid maghfulan." },
          { type: "p", text: "Yumkinuk tawjih mutasaffihik li-rafd jami milaffat tarif Al-Irtibat aw lil-tanbih ind irsaliha. Ma dhalika, idha lam taqbal milaffat tarif Al-Irtibat, fa-qad la tatamakkan min istikhdam badd ajza khidmatina." },
          { type: "p", text: "Nastakhdim Al-Anwa Al-Taliya min milaffat tarif Al-Irtibat:" },
          { type: "ul", items: ["Milaffat asasiyya: lazima li-tashghil mawqiina", "Milaffat tahliliyya / ada: tutih lana Al-Taarruf ala Al-Zuwwar wa addihim wa marifat kayfiyyat tanaqqulihim fi mawqiina", "Milaffat wazifiyya: tutih lana takhsis Al-Muhtawa", "Milaffat istihdaf: tusajjil ziyaratak li-mawqiina wal-safahat allati tazuruha wal-rawabit allati tattabiuha"] },
        ],
      },
      {
        heading: "5. Musharakat Al-Bayanat wal-Ifsah anha",
        blocks: [
          { type: "p", text: "Qad nusharik maalumatik fil-halat Al-Taliya:" },
          { type: "ul", items: ["Ma muzawwidi Al-Khadamat: qad nusharik maalumatik ma bai wa muzawwidi khadamat wa muqawilin aw wukala min atraf thalitha yuaddun khadamat lana.", "Al-Tahwilat Al-Tijariyya: qad nusharik aw nunqil maalumatik fi siyaq aw athna mufawadat ayy indimaj aw bay li-usul Al-Sharika aw tamwil aw istihwadh.", "Bi-muwafaqatik: qad nufsih an maalumatik li-ayy gharad akhar bi-muwafaqatik.", "Al-Mutatallabat Al-Qanuniyya: qad nufsih an maalumatik idha kana Al-Qanun yaqtadi dhalika aw istijabatan li-talabat mashrua min Al-Sultat Al-Amma."] },
        ],
      },
      {
        heading: "6. Aman Al-Bayanat",
        blocks: [
          { type: "p", text: "Nunaffidh tadabir tiqniyya wa tanzimiyya munasiba li-himayat aman maalumatik Al-Shakhsiyya. Ma dhalika, yurja Al-Ilm bi-anna la tariqat naql abr Al-Intirnit aw takhzin iliktruni amina bi-nisbat 100%, wa la yumkinuna daman Al-Aman Al-Mutlaq." },
        ],
      },
      {
        heading: "7. Huquqak fi Himayat Al-Bayanat",
        blocks: [
          { type: "p", text: "Hasab makan iqamatik, qad tatamatta bi-huquq muayyana fima yataallaq bi-maalumatik Al-Shakhsiyya, mithl:" },
          { type: "ul", items: ["Haqq Al-Wusul ila maalumatik Al-Shakhsiyya", "Haqq tashih Al-Maalumat ghayr Al-Daqiqa", "Haqq talab hadhf maalumatik", "Haqq taqyid muaalajat maalumatik", "Haqq naql Al-Bayanat", "Haqq Al-Itirad ala Al-Muaalaja"] },
          { type: "p", text: "Li-mumarasat hadhihi Al-Huquq, yurja Al-Ittisal bina bi-istikhdam Al-Maalumat Al-Waridatt fi qism Ittasil Bina." },
        ],
      },
      {
        heading: "Shurut Al-Istikhdam",
        blocks: [
          { type: "h3", text: "1. Qubul Al-Shurut" },
          { type: "p", text: "Bi-wusulik ila mawqiina wa khadamatina aw istikhdamiha, fa-innaka tuwafiq ala Al-Iltizam bi-shurut Al-Istikhdam hadhihi wa jami Al-Qawanin wal-lawaih Al-Sariya. Idha lam tuwafiq ala ayy min hadhihi Al-Shurut, fa-yuhzar alayk istikhdam khadamatina aw Al-Wusul ilayha." },
          { type: "h3", text: "2. Rukhsat Al-Istikhdam" },
          { type: "p", text: "Yusmah laka bi-tahmil nuskha wahida muaqqata min mawadd mawqi Creative Surf lil-mushahada Al-Shakhsiyya ghayr Al-Tijariyya Al-Muaqqata faqat. Hadhihi rukhsa wa laysat naql milkiyya, wa bi-mujibiha la yajuz laka:" },
          { type: "ul", items: ["Taadil Al-Mawadd aw nuskhuha", "Istikhdam Al-Mawadd li-ayy gharad tijari aw li-ayy ard amm", "Muhawalat fakk aw hindasat aks ayy barmajiyyat mawjuda ala mawqi Creative Surf", "Izalat ayy ishaarat huquq nashr aw milkiyya min Al-Mawadd", "Naql Al-Mawadd ila shakhs akhar aw naskhuha ala ayy khadim akhar"] },
          { type: "p", text: "Tantahi hadhihi Al-Rukhsa tilqaiyyan idha khalafta ayyan min hadhihi Al-Quyud, wa yajuz li-Creative Surf inhauha fi ayy waqt." },
          { type: "h3", text: "3. Ikhla Al-Masuliyya" },
          { type: "p", text: "Tuqaddam mawadd mawqi Creative Surf ka-ma hiya. La tuqaddim Creative Surf ayy damanat, sarihatan kanat am dimniyya, wa tukhli masuliyyataha wa tanfi jami Al-Damanat Al-Ukhra bi-ma fi dhalika, dun hasr, Al-Damanat Al-Dimniyya lil-qabiliyya lil-tasawuq aw Al-Mulaama li-gharad muayyan aw adam intihak Al-Milkiyya Al-Fikriyya aw ghayriha min Al-Huquq." },
          { type: "p", text: "Alawatan ala dhalik, la tadman Creative Surf wa la tuqaddim ayy iqrarat bi-shan diqqat aw natai'j aw mawthuqiyyat istikhdam Al-Mawadd Al-Mawjuda ala mawqiiha aw ayy mawaqi murtabita bih." },
          { type: "h3", text: "4. Al-Quyud" },
          { type: "p", text: "La tatahammal Creative Surf aw muzawwiduha bi-ayy hal Al-Masuliyya an ayy adrar (bi-ma fi dhalika, dun hasr, adrar fuqdan Al-Bayanat aw Al-Arbah aw bi-sabab tawaqquf Al-Amal) nashia an istikhdam aw adam Al-Qudra ala istikhdam mawadd mawqi Creative Surf, hatta law tamma ikhtar Creative Surf aw mumaththil muakhkhal min qibaliha shafahiyyan aw kitabatan bi-ihtimaliyyat wuqu mithl hadha Al-Darar." },
          { type: "h3", text: "5. Diqqat Al-Mawadd" },
          { type: "p", text: "Qad tahtawi Al-Mawadd Al-Zahira ala mawqi Creative Surf ala akhta tiqniyya aw matbaiyya aw futughrafiyya. La tadman Creative Surf anna ayyan min Al-Mawadd ala mawqiiha daqiqa aw kamila aw muhaddatha. Wa yajuz li-Creative Surf ijra taghyirat ala Al-Mawadd fi ayy waqt dun ishar." },
          { type: "h3", text: "6. Al-Rawabit" },
          { type: "p", text: "Lam turaji Creative Surf jami Al-Mawaqi Al-Murtabita bi-mawqiiha wa hiya ghayr masula an muhtawa ayy mawqi murtabit. La yani idraj ayy rabt taid Creative Surf lil-mawqi. Wa yakun istikhdam ayy mawqi murtabit ala masuliyyat Al-Mustakhdim Al-Khassa." },
          { type: "h3", text: "7. Al-Taadilat" },
          { type: "p", text: "Yajuz li-Creative Surf muraajaat shurut Al-Istikhdam hadhihi li-mawqiiha fi ayy waqt dun ishar. Bi-istikhdamik li-hadha Al-Mawqi, fa-innaka tuwafiq ala Al-Iltizam bil-isdar Al-Sari an-dhak min shurut Al-Istikhdam." },
          { type: "h3", text: "8. Al-Qanun Al-Hakim" },
          { type: "p", text: "Takhda hadhihi Al-Shurut wal-ahkam li-qawanin Al-Wilayat Al-Muttahida wa tufassar wafqan laha, wa anta takhda bi-shakl niha'i lil-ikhtisas Al-Qada'i Al-Hasri lil-mahakim fi dhalika Al-Makan." },
        ],
      },
      {
        heading: "Ittasil Bina",
        blocks: [
          { type: "p", text: "Idha kanat ladayk ayy asila hawl siyasat Al-Khusousiyya hadhihi aw shurut Al-Istikhdam, yurja Al-Ittisal bina ala:" },
          { type: "ul", items: ["Creative Surf", "Dhaka, Bangladesh", "Al-Barid Al-Iliktruni: creativesurfcs@gmail.com", "Al-Hatif: +880 1988-467099"] },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyTermsMessages.en>;

const ns_legalTerms = {
    metaTitle: "Shurut Al-Istikhdam",
    metaDescription: "Shurut istikhdam mawqi wa khadamat Creative Surf.",
    breadcrumbCurrent: "Shurut Al-Istikhdam",
    title: "Shurut Al-Istikhdam",
    lastUpdated: "Akhir tahdith: Yunyu 2026",
    sections: [
      {
        heading: "1. Al-Ittifaqiyya",
        blocks: [
          { type: "p", text: "Tunazzim hadhihi Al-Shurut (Al-Shurut) wusulak ila mawqi wa khadamat Creative Surf wa istikhdamak laha." },
          { type: "p", text: "Bi-wusulik ila mawqiina aw istianatik bi-khadamatina, fa-innaka tuwafiq ala Al-Iltizam bi-hadhihi Al-Shurut." },
        ],
      },
      {
        heading: "2. Al-Khadamat",
        blocks: [
          { type: "p", text: "Tuqaddim Creative Surf khadamat Al-Taswiq Al-Raqmi wal-istishara, wa tashmal ala sabil Al-Mithal la Al-Hasr:" },
          { type: "ul", items: ["Ilanat Meta", "Ilanat Google", "Ilanat TikTok", "Jalb Al-Umala", "Khadamat SEO", "Idarat wasail Al-Tawasul", "Al-Istishara Al-Taswiqiyya", "Tahsin Al-Tahwil"] },
          { type: "p", text: "Yajuz taadil Al-Khadamat aw tawsiuha aw waqfuha wafqan li-taqdirina." },
        ],
      },
      {
        heading: "3. Masuliyyat Al-Amil",
        blocks: [
          { type: "p", text: "Yuwafiq Al-Umala ala:" },
          { type: "ul", items: ["Taqdim maalumat daqiqa", "Tawfir Al-Wusul Al-Lazim lil-hisabat", "Al-Radd ala Al-Talabat fi Al-Waqt Al-Munasib", "Al-Ihtifaz bi-milkiyyat Al-Hisabat Al-Ilaniyya ma lam yuttafaq ala khilaf dhalik", "Al-Iltizam bi-siyasat Al-Manassat wal-qawanin Al-Sariya"] },
        ],
      },
      {
        heading: "4. Al-Rusum wal-Madfuat",
        blocks: [
          { type: "p", text: "Jami Al-Rusum muhaddada fi ittifaqiyyat Al-Khidma aw Al-Uruud aw Al-Fawatir." },
          { type: "strong", text: "Al-Madfuat:" },
          { type: "ul", items: ["Mustahaqqa wafqan lil-jadwal Al-Muttafaq alayh", "Qad takun ghayr qabila lil-istirdad ma lam yudhkar khilaf dhalik", "La tashmal Al-Infaq Al-Ilani ma lam yudhkar dhalika sarahatan"] },
          { type: "p", text: "Qad yuaddi Al-Taakhkhur fil-daf ila taliq Al-Khadamat." },
        ],
      },
      {
        heading: "5. Al-Manassat Al-Ilaniyya",
        blocks: [
          { type: "p", text: "Yatawaqqaf ada Al-Hamalat ala awamil adida kharija an saytaratina, minha:" },
          { type: "ul", items: ["Zuruf Al-Suq", "Al-Munafasa", "Khawarizmiyyat Al-Manassat", "Mulaamat Al-Muntaj lil-suq", "Jawdat ard Al-Amil"] },
          { type: "p", text: "La nadman natai'j muhaddada min hayth Al-Iradat aw Al-Umala aw Al-Mabiat aw ROAS aw Al-Tartib aw Al-Natai'j Al-Ilaniyya." },
        ],
      },
      {
        heading: "6. Al-Milkiyya Al-Fikriyya",
        blocks: [
          { type: "p", text: "Jami Al-Muhtawa wal-hawiyya wal-shiarat wa mawadd Al-Mawqi wal-utur wal-manhajiyyat Al-Khassa tabqa milkan li-Creative Surf ma lam yuttafaq kitabatan ala khilaf dhalik." },
          { type: "p", text: "Yahtafiz Al-Umala bi-milkiyyat alamatihim Al-Tijariyya wa muhtawahum wa usulihim Al-Tijariyya." },
        ],
      },
      {
        heading: "7. Al-Sirriyya",
        blocks: [
          { type: "p", text: "Yuwafiq Al-Tarafan ala Al-Hifaz ala sirriyyat Al-Maalumat wa adam Al-Ifsah anha li-atraf thalitha dun muwafaqa, illa hayth yaqtadi Al-Qanun dhalik." },
        ],
      },
      {
        heading: "8. Hudud Al-Masuliyya",
        blocks: [
          { type: "p", text: "Ila aqsa hadd yasmah bihi Al-Qanun:" },
          { type: "p", text: "La tatahammal Creative Surf Al-Masuliyya an Al-Adrar ghayr Al-Mubashira aw Al-Aradiyya aw Al-Khassa aw Al-Tabaiyya aw Al-Iqabiyya, bi-ma fi dhalika fuqdan Al-Arbah aw Al-Iradat aw tawaqquf Al-Amal aw fuqdan Al-Bayanat." },
          { type: "p", text: "La tatajawaz masuliyyatuna Al-Ijmaliyya Al-Mablagh Al-Madfu min Al-Amil khilal Al-Thalathat ashhur Al-Sabiqa lil-mutalaba." },
        ],
      },
      {
        heading: "9. Adam Wujud Damanat",
        blocks: [
          { type: "p", text: "Yanwi Al-Taswiq wal-ilan ala mukhatara." },
          { type: "p", text: "Wa raghma sayina li-tahsin Al-Ada wa tahqiq natai'j ijabiyya, fa-innana la nadman:" },
          { type: "ul", items: ["Ahjam muhaddada min Al-Umala", "Ahdaf iradat", "Tartib fi natai'j Al-Bahth", "Muaddalat tahwil", "Muwafaqat ala Al-Ilanat", "Istiqrar Al-Hisabat ala Al-Manassat"] },
        ],
      },
      {
        heading: "10. Al-Inha",
        blocks: [
          { type: "p", text: "Yajuz li-ayy min Al-Tarafayn inha Al-Khadamat wafqan li-shurut ittifaqiyyat Al-Khidma Al-Sariya." },
          { type: "strong", text: "Ind Al-Inha:" },
          { type: "ul", items: ["Tabqa Al-Rusum Al-Mustahaqqa wajibat Al-Daf", "Qad yulgha Al-Wusul ila Al-Mawarid Al-Khassa", "Tatawaqqaf khadamat idarat Al-Hamalat"] },
        ],
      },
      {
        heading: "11. Manassat Al-Atraf Al-Thalitha",
        blocks: [
          { type: "p", text: "Yuqirr Al-Umala bi-anna Al-Khadamat qad tashmal manassat atraf thalitha mithl Meta wa Google wa TikTok wa LinkedIn wa ghayriha min Al-Muzawwidin." },
          { type: "strong", text: "Creative Surf ghayr masula an:" },
          { type: "ul", items: ["Inqita Al-Manassat", "Taliq Al-Hisabat", "Taghyirat Al-Siyasat", "Al-Quyud Al-Mafruda min Al-Manassat"] },
        ],
      },
      {
        heading: "12. Al-Taawid",
        blocks: [
          { type: "p", text: "Yuwafiq Al-Umala ala taawid Creative Surf wa ibqaiha bi-manan an Al-Mutalabat wal-adrar wal-masuliyyat wal-nafaqat Al-Nashia an muntajatihim aw khadamatihim aw muhtawahum Al-Ilani aw mukhalafatihim lil-qanun." },
        ],
      },
      {
        heading: "13. Al-Qanun Al-Hakim",
        blocks: [
          { type: "p", text: "Takhda hadhihi Al-Shurut li-qawanin Injiltra wa Wilz wa tufassar wafqan laha." },
        ],
      },
      {
        heading: "14. Taghyirat ala Al-Shurut",
        blocks: [
          { type: "p", text: "Nahtafiz bi-haqq taadil hadhihi Al-Shurut fi ayy waqt. Yuadd istimrar istikhdamik li-mawqiina aw khadamatina qubulan lil-shurut Al-Muhaddatha." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalTermsMessages.en>;


const ns_nav = {
    links: {
      home: "Al-Raisiyya",
      projects: "Al-Mashari",
      blogs: "Al-Mudawwana",
      cvBuilder: "Munshi Al-Sira",
      team: "Al-Fariq",
      services: "Al-Khadamat",
      about: "Man Nahnu",
      contact: "Ittasil Bina",
    },
    sections: {
      marketing: "Al-Taswiq",
      realEstate: "Al-Aqarat",
    },
    cta: "Ibda Al-An",
    startProject: "Ibda Mashrou",
    openMenu: "Qaima",
    closeMenu: "Ighlaq al-qaima",
    mainNav: "Raeesiya",
    login: "Tasjil Al-Dukhul",
    register: "Insha Hisab",
    account: "Hisabi",
    profile: "Al-Milaff Al-Shakhsi",
    logout: "Tasjil Al-Khuruj",
    loggingOut: "Jari Tasjil Al-Khuruj…",
    accountMenu: "Qaimat Al-Hisab",
    logoAlt: "Shiar Creative Surf",
    toggleMenu: "Fath Al-Qaima",
    lightMode: "Fatih",
    darkMode: "Dakin",
  } satisfies PartialCopy<typeof navMessages.en>;

const ns_notFound = {
    metaTitle: "404 - Al-Safha ghayr mawjuda",
    metaDescription: "Al-Safha allati tabhath anha ghayr mawjuda aw tamma naqluha.",
    heading: "Al-Safha ghayr mawjuda",
    body: "Ups! Al-Safha allati tabhath anha ghayr mawjuda aw tamma naqluha.",
    cta: "Al-Awda lil-Raisiyya",
  } satisfies PartialCopy<typeof notFoundMessages.en>;

const ns_pageMeta = {
    account: {
      title: "Hisabi | Creative Surf",
      description: "Adir hisabak fi Creative Surf wa siyarak al-dhatiya wa muhadathatak.",
    },
    newPost: {
      title: "Maqal jadid | Creative Surf",
      description: "Uktub maqalan jadidan.",
    },
    editPost: {
      title: "Ta'dil al-maqal | Creative Surf",
      description: "'Addil maqalan.",
    },
    newRealEstatePost: {
      title: "Maqal jadid | Creative Surf Real Estate",
      description: "Uktub maqalan 'aqariyan jadidan.",
    },
    editRealEstatePost: {
      title: "Ta'dil al-maqal | Creative Surf Real Estate",
      description: "'Addil maqalan 'aqariyan.",
    },
    home: {
      title: "Creative Surf | Wakalat al-taswiq al-raqami",
      description:
        "Creative Surf wakala lil-taswiq al-raqami mutakhassisa fi al-SEO wa tasmim al-mawaqi' wal-muhtawa wa wasa'il al-tawasul li-zyadat iradat al-sharikat.",
    },
    login: {
      title: "Tasjil al-dukhul | Creative Surf",
      description: "Sajjil al-dukhul ila hisabak fi Creative Surf.",
    },
    register: {
      title: "Insha' hisab | Creative Surf",
      description: "Ansha' hisaban majjaniyan fi Creative Surf li-hifz siyarak al-dhatiya wa muhadathatak wa aktar.",
    },
    realEstate: {
      title: "Taswiq 'aqari fi Dhaka | Creative Surf Real Estate",
      description:
        "Al-minassa al-raqamiya fi Dhaka allati tarbut mutawwiri al-'aqarat bil-mushtarin wal-mustathmirin wa shuraka' al-aradi.",
    },
    realEstateProjects: {
      title: "Mashari' 'aqariya fi Dhaka | Creative Surf Real Estate",
      description: "Tasaffah al-mashari' al-'aqariya al-sakaniya wal-tijariya al-jariya wal-qadima fi Dhaka.",
    },
    realEstateProject: {
      title: "Tafasil al-mashru' | Creative Surf Real Estate",
      description: "Tafasil al-ard wal-wihdat wal-mabna li-hadha al-mashru' al-'aqari fi Dhaka.",
    },
    newProject: {
      title: "Mashru' jadid | Creative Surf Real Estate",
      description: "Adif mashru'an 'aqariyan jadidan.",
    },
    editProject: {
      title: "Ta'dil al-mashru' | Creative Surf Real Estate",
      description: "'Addil mashru'an 'aqariyan.",
    },
  } satisfies PartialCopy<typeof pageMetaMessages.en>;

const ns_projectEditor = {
    editProject: "Tahrir Al-Mashrou",
    newProject: "Mashrou Jadid",
    namePlaceholder: "Ism Al-Mashrou…",
    subtitleLabel: "Al-Unwan Al-Farii / Al-Mujamma",
    subtitlePlaceholder: "mathalan JOLSHIRI ABASHON",
    plotDetailsLabel: "Tafasil Al-Ard",
    specs: {
      plotNo: "Raqm Al-Qita",
      roadNo: "Raqm Al-Tariq",
      sector: "Al-Qita",
      plotSize: "Misahat Al-Ard",
      numberOfUnits: "Adad Al-Wahdat",
      buildingDetails: "Tafasil Al-Mabna",
      flatSize: "Misahat Al-Shaqqa",
    },
    featuresDescriptionLabel: "Wasf Al-Mumayyazat",
    featuresDescriptionPlaceholder: "Sif Al-Mumayyazat Al-Raisiyya lil-mashrou…",
    rooftopFeatures: "Mumayyazat Al-Sath",
    groundFloorFeatures: "Mumayyazat Al-Dawr Al-Ardi",
    availableFlats: "Shuqaq Mutaha",
    featurePlaceholder: "Adif mumayyaza thumma idghat Enter…",
    statusLabel: "Al-Hala",
    coverImageLabel: "Surat Al-Ghilaf",
    additionalImages: "Suwar Idafiyya",
    mapLabel: "Mawqi Google Maps",
    mapPlaceholder: "Alsiq rabt Al-Tadmin aw rabt Al-Musharaka min Google Maps…",
    mapHintStart: "Alsiq ",
    mapHintStrong: "rabt Al-Tadmin",
    mapHintEnd: "min Google Maps (Musharaka ← Tadmin kharita ← insakh rabt src) aw rabt Google Maps adi.",
    saving: "Jari Al-Hifz…",
    updateProject: "Tahdith Al-Mashrou",
    addProject: "Idafat Al-Mashrou",
    errors: {
      nameRequired: "Ism Al-Mashrou matlub.",
      loadFailed: "Fashila tahmil Al-Mashrou.",
      network: "Khata fi Al-Shabaka. Hawil marra ukhra.",
    },
  } satisfies PartialCopy<typeof projectEditorMessages.en>;

const ns_realEstate = {
    hero: {
      tag: "Creative Surf · Al-Aqarat",
      headline: ["Ibni Al-Mashrou.", "Danaa nusaiduhu", "ala an yuktashaf."],
      subtitle:
        "Al-Mansa Al-Raqmiyya Al-Mutakhassisa fi Dhaka allati tarbut mutawwiri Al-Aqarat bi-mushtarin muahhalin wa mustathmirin wa shuraka aradin.",
      pills: ["Sajjil mashrouak", "Isil ila Al-Mushtarin", "Ubrim Al-Safaqat"],
      ctaPrimary: "Sajjil Al-Yawm",
      ctaSecondary: "Iarif Al-Mazid",
    },
    about: {
      badge: "Man Nahnu",
      headingStart: "Nabni mustaqbal",
      headingAccent: "aqarat Dhaka",
      headingEnd: ".",
      imageAlt: "Man Nahnu",
      viewProjects: "Ard Al-Mashari",
      tabBackground: "Al-Khalfiyya",
      tabMessage: "Risalatuna",
      brandName: "Creative Surf Al-Aqarat",
      introRest:
        "hiya mansa raqmiyya sariat Al-Numuww mukhassasa li-rabt mutawwiri Dhaka bi-mushtarin wa mustathmirin muahhalin fi jami anwa Al-Aqarat.",
      body:
        "Yadmij fariquna khibrat Al-Taswiq Al-Raqmi ma marifa amiqa bi-suq Al-Aqarat fi Bangladesh — min iad Al-Ilanat wa idarat Al-Hamalat ila bina Al-Hudur Al-Raqmi alladhi yajlib istifsarat haqiqiyya. Nahnu multazimun bil-jawda wal-shafafiyya wal-nataij Al-Qabila lil-qiyas.",
      goals: [
        {
          name: "Manzuma Raqmiyya",
          desc: "Bina mansa mukhassasa tutih li-mutawwiri Dhaka ard mashariihim Al-Sakaniyya wal-tijariyya ala nitaq wasi.",
        },
        {
          name: "Zuhur Aqsa",
          desc: "Tawzif Al-SEO wa wasail Al-Tawasul wal-ilanat Al-Adaiyya li-tahqiq aqsa zuhur li-kull aqar madruj.",
        },
        {
          name: "Wusul Muahhal",
          desc: "Rabt Al-Mutawwirin wa furas Al-Aradi bil-mushtarin Al-Munasibin abr istihdaf dhaki lil-jumhur.",
        },
      ],
      visionQuote:
        "An nusbih Al-Bawwaba Al-Raqmiyya Al-Akthar mawthuqiyya fi Bangladesh li-iktishaf Al-Aqarat — bi-jal Al-Muamalat Al-Aqariyya shaffafa wa muyassara wa mulhima lil-mutawwirin wal-mushtarin ala hadd sawa.",
      visionLabel: "Al-Ru'ya wal-Risala",
    },
    objectives: {
      badge: "Ahdafuna",
      headingStart: "Ma nasa",
      headingAccent: "li-tahqiqih",
      intro: "Arbaat arkan lil-tamayyuz tuhaqqiq nataij raqmiyya li-shurakaina Al-Mutawwirin fi jami anha Bangladesh.",
      items: [
        {
          title: "Manzuma Raqmiyya",
          body: "Bina mansa mukhassasa tutih li-mutawwiri Dhaka ard mashariihim Al-Sakaniyya wal-tijariyya ala nitaq wasi.",
        },
        {
          title: "Zuhur Aqsa",
          body: "Tawzif Al-SEO wa wasail Al-Tawasul wal-ilanat Al-Adaiyya li-tahqiq aqsa zuhur li-kull aqar madruj.",
        },
        {
          title: "Wusul Muahhal",
          body: "Rabt Al-Mutawwirin wa furas Al-Aradi bil-mushtarin Al-Munasibin abr istihdaf dhaki lil-jumhur.",
        },
        {
          title: "Aid Qabil lil-Qiyas",
          body: "Al-Hifaz ala aala mustawayat Al-Ibda wal-shafafiyya wal-nataij li-kull sharik.",
        },
      ],
    },
    featured: {
      tag: "Amal Mukhtara",
      headingStart: "Mashari",
      headingAccent: "tuarrifuna",
      viewAll: "Ard jami Al-Mashari",
    },
    process: {
      badge: "Al-Amaliyya",
      intro: "Min Al-Bidaya hatta Al-Bay Al-Kamil, fi arba khatawat madrusa.",
      steps: [
        {
          title: "Iktishaf",
          body: "Sharikna tafasil mashrouak — Al-Mawqi wal-wahdat wal-jumhur Al-Mustahdaf. Nuhallil talab Al-Suq wa nuhaddid Al-Tamawdu Al-Raqmi Al-Farid li-aqarik.",
        },
        {
          title: "Tasmim",
          body: "Nabni mawaqi mughra mukhassasa muhassana lil-SEO wa nasugh hamalat ilaniyya mumayyaza tunasib mashrouak.",
        },
        {
          title: "Nashr",
          body: "Nutliq hamalat mustahdafa aliyat Al-Ada abr qanawat Al-Bahth wal-tawasul li-jadhb istifsarat mushtarin muahhalin.",
        },
        {
          title: "Taslim",
          body: "Nunaqqil Al-Umala Al-Muahhalin mubasharatan ila fariq mabiatik, ma tatabbu Al-Tahwilat wal-tahsin hatta bay jami Al-Wahdat.",
        },
      ],
    },
    testimonials: {
      tag: "Aswat Al-Shuraka",
      headingStart: "Mahall thiqat afdal",
      headingAccent: "mutawwiri Dhaka",
      items: [
        {
          quote:
            "Hawwalat Creative Surf ilanatina ila tadaffuq mustaqirr min Al-Mushtarin Al-Muahhalin. Ghattat Al-Hamalat taklifataha khilal Al-Shahr Al-Awwal.",
          role: "Al-Mudir Al-Idari",
        },
        {
          quote:
            "Taswir ihtirafi wa mawqi mukhassas wa tahlilat haqiqiyya — akhiran sharik yafham Al-Taswiq wal-aqarat maan.",
          role: "Ra'isat Al-Mabiat",
        },
        {
          quote:
            "Kana mashrouna ala Al-Hawa khilal 48 saa wa tamma bayuh bil-kamil qabl Al-Mawid. Al-Shafafiyya wal-taqarir la mathil laha fi Dhaka.",
          role: "Ra'is Majlis Al-Idara",
        },
      ],
    },
  } satisfies PartialCopy<typeof realEstateMessages.en>;

const ns_realEstateBlogs = {
    eyebrow: "Creative Surf · Al-Aqarat",
    title: "Ruan wa Afkar",
    subtitle:
      "Ittijahat Al-Suq wa adillat Al-Shira wa ruan istithmariyya hawl aqarat Dhaka — mubasharatan min fariq Creative Surf.",
    categoryAll: "Al-Kull",
    newPost: "Maqal Jadid",
    logout: "Tasjil Al-Khuruj",
    emptyTitle: "La tujad maqalat baad",
    emptyAdmin: "Anshi awwal maqal lak lil-bidaya.",
    emptyPublic: "Ud qariban li-ruan min fariq Creative Surf.",
    writeFirst: "Uktub Awwal Maqal",
    edit: "Tahrir",
    delete: "Hadhf",
    confirmDelete: 'Hadhf \"{title}\"? La yumkin Al-Tarajju an dhalik.',
    read: "Iqra →",
    brand: "Creative Surf",
  } satisfies PartialCopy<typeof realEstateBlogsMessages.en>;

const ns_realEstateFooter = {
    cta: {
      badge: "Li-Mushtari Al-Manazil",
      heading: "Ijad manzilik Al-Qadim fi Dhaka.",
      body:
        "Tasaffah mashari sakaniyya muwaththaqa fi jami anha Dhaka — min Al-Shuqaq Al-Fakhira ila Al-Wahdat Al-Iqtisadiyya — wa jid Al-Manzil Al-Amthal lak wa li-usratik.",
      primary: "Ard Al-Shuqaq Al-Mutaha",
      secondary: "Ihjiz Ziyara Maydaniyya",
    },
    brand: {
      line1: "Al-Aqarat.",
      line2: "Bi-Ru'ya Jadida.",
      blurb:
        "Nasna tajarib raqmiyya mumayyaza li-mutawwiri Al-Aqarat — min ard Al-Mashari bi-shakl ghamir ila taswiq yuharrik Al-Suq.",
      cta: "Ibda Mashrou",
    },
    exploreTitle: "Istakshif",
    contactTitle: "Tawasal Maana",
    whatsapp: "Dardish ala WhatsApp",
    links: {
      home: "Al-Raisiyya",
      projects: "Al-Mashari",
      blogs: "Al-Mudawwana",
      contact: "Ittasil Bina",
    },
    location: "Dhaka, Bangladesh",
    skylineAlt: "Ufuq madinat Dhaka",
    rights: "© {year} Creative Surf. Jami Al-Huquq Mahfuza.",
    terms: "Shurut Al-Istikhdam",
    privacy: "Siyasat Al-Khusousiyya",
    craftedPre: "Suniat bi-taqat",
    craftedAccent: "al-shafaq",
    craftedPost: "",
  } satisfies PartialCopy<typeof realEstateFooterMessages.en>;

const ns_realEstateProjectDetail = {
    notFound: "Al-Mashrou ghayr mawjud",
    backToProjects: "← Al-Awda lil-Mashari",
    allProjects: "Jami Al-Mashari",
    edit: "Tahrir",
    delete: "Hadhf",
    deleting: "Jari Al-Hadhf…",
    confirmDelete: 'Hadhf \"{name}\"? La yumkin Al-Tarajju an dhalik.',
    detailsTitle: "Tafasil Al-Mashrou",
    specs: {
      plotNo: "Raqm Al-Qita",
      roadNo: "Raqm Al-Tariq",
      sector: "Al-Qita",
      plotSize: "Misahat Al-Ard",
      numberOfUnits: "Adad Al-Wahdat",
      buildingDetails: "Tafasil Al-Mabna",
      flatSize: "Misahat Al-Shaqqa",
    },
    location: {
      title: "Al-Mawqi",
      overviewNote: "— nazra amma ala Dhaka",
      viewOnMaps: "Ard ala Google Maps",
      mapTitleFallback: "Dhaka, Bangladesh",
      mapTitle: "Mawqi {name}",
      tapToOpen: "Idghat lil-fath fi Google Maps",
      openInMaps: "Iftah fi Maps →",
    },
    availableFlats: "Shuqaq Mutaha",
    rooftopFeatures: "Mumayyazat Al-Sath",
    groundFloorFeatures: "Mumayyazat Al-Dawr Al-Ardi",
    gallery: "Muarad Al-Suwar",
    blogs: {
      eyebrow: "Ruan Aqariyya",
      title: "Ahdath Al-Maqalat wal-Nasaih",
      viewAll: "Ard Jami Al-Maqalat →",
      read: "Iqra →",
    },
    lightbox: {
      close: "Ighlaq",
      previous: "Al-Sura Al-Sabiqa",
      next: "Al-Sura Al-Taliya",
    },
  } satisfies PartialCopy<typeof realEstateProjectDetailMessages.en>;

const ns_realEstateProjects = {
    list: {
      eyebrow: "Creative Surf · Al-Aqarat",
      title: "Mashariuna",
      subtitle: "Mashari sakaniyya mumayyaza fi Dhaka — mabniyya bi-jawda wa masmuma lil-haya.",
      statusAll: "Al-Kull",
      newProject: "Mashrou Jadid",
      logout: "Tasjil Al-Khuruj",
      emptyTitle: "La tujad mashari baad",
      emptyAdmin: "Adif awwal mashrou aqari lak lil-bidaya.",
      emptyPublic: "Sa-tazhar Al-Mashari huna qariban.",
      addFirst: "Adif Awwal Mashrou",
      edit: "Tahrir",
      delete: "Hadhf",
      confirmDelete: 'Hadhf \"{name}\"? La yumkin Al-Tarajju an dhalik.',
    },
  } satisfies PartialCopy<typeof realEstateProjectsMessages.en>;

const ns_realEstateWhatsApp = {
    floating: "Dardish ala WhatsApp",
    prefill: {
      general: "Marhaban Creative Surf, awadd maarifat al-mazid an mashariakum al-aqariyya.",
      project: "Marhaban Creative Surf, ana muhtam bi {name}. Hal yumkinukum irsal tafasil akthar? {url}",
    },
  } satisfies PartialCopy<typeof realEstateWhatsAppMessages.en>;





const ns_servicesIndex = {
    offerSubtitle: "Ikhtar khidma wahida aw ijma baynaha — kull taawun yusamam hawl Al-Natija Allati tahtajuha.",
    viewAll: "Ard kull Al-Khadamat",
    items: [
      {
        "title": "Istratijiyyat Al-Alama",
        "description": "Natur istratijiyyat alama shamila tuhaddid mawqiak Al-Farid fil-suq wa tarbutak bi-jumhurik Al-Mustahdaf.",
        "tags": [
          "Al-Tamawdu",
          "Al-Hawiyya",
          "Al-Rasail"
        ]
      },
      {
        "title": "Tasmim wa Tatwir Al-Wib",
        "description": "Mawaqi mukhassasa tajma bayn Al-Masahid Al-Khallaba wal-ada Al-Salis li-khalq tajarib raqmiyya la tunsa.",
        "tags": [
          "UX / UI",
          "Next.js",
          "Al-Tijara Al-Iliktruniyya"
        ]
      },
      {
        "title": "Al-Taswiq Al-Raqmi",
        "description": "Hamalat taswiq mabniyya ala Al-Bayanat abr qanawat mutaaddida li-ziyadat zuhurik wa tahqiq Al-Tahwilat.",
        "tags": [
          "Al-Ilan Al-Madfu",
          "Al-Barid",
          "Al-Tahlilat"
        ]
      },
      {
        "title": "Insha Al-Muhtawa",
        "description": "Muhtawa jadhdhab yarwi qissatak wa yulamis jumhurak abr jami Al-Manassat.",
        "tags": [
          "Al-Kitaba",
          "Al-Fidyu",
          "Al-Taswir"
        ]
      },
      {
        "title": "Idarat Wasail Al-Tawasul",
        "description": "Hudur ijtimai istratiji yabni mujtamaan wa yuazziz sawt alamatik.",
        "tags": [
          "Al-Mujtama",
          "Al-Jadawil",
          "Al-Mubdiun"
        ]
      },
      {
        "title": "Tahsin Muharrikat Al-Bahth",
        "description": "Tahsin tiqni wa muhtawi li-tahsin tartibik fi natai'j Al-Bahth wa jalb zayarat tabiiyya.",
        "tags": [
          "Tiqni",
          "Dakhil Al-Safha",
          "Mahalli"
        ]
      }
    ],
  } satisfies PartialCopy<typeof servicesIndexMessages.en>;

const ns_services = {
    ...ns_servicesIndex,
    metaTitle: "Khadamatuna | Creative Surf",
    metaDescription:
      "Istakshif majmuatana Al-Shamila min khadamat Al-Ibda wal-taswiq Al-Raqmi Al-Masmuma li-tazi alamatik.",
    hero: {
      kicker: "Khadamatuna",
      title: "Kull ma tahtajuhu alamatuk",
      titleAccent: "lil-numuw, fi fariq wahid.",
      subtitle: "Hulul ibdaiyya shamila masmuma li-tazi alamatik wa tahqiq ahdafik Al-Tijariyya",
      ctaPrimary: "Ibda mashruak",
      ctaSecondary: "Istakshif Al-Khadamat",
    },
    offerKicker: "Ma Nuqaddimuh",
    offerTitle: "Sitt takhassusat,",
    offerAccent: "fariq mutakamil wahid.",
    explore: "Istakshif",
    processKicker: "Kayfa Namal",
    processTitle: "Amaliyya wadiha,",
    processAccent: "min awwal mukalama ila Al-Numuw.",
    processSubtitle: "Khams marahil wa fariq mas'ul wahid — li-taraf daiman ma Allathi yahduth taliyan.",
    process: [
      { step: "Al-Iktishaf", description: "Nabda bi-fahm amalak wa ahdafak wa jumhurak Al-Mustahdaf li-bina asas istratiji matin." },
      { step: "Al-Istratijiyya", description: "Bina ala natajina, natur istratijiyya mukhassasa tatawaam ma ahdafik wa mawqiik fil-suq." },
      { step: "Al-Ibda", description: "Yuhyi fariquna Al-Ibdai Al-Istratijiyya min khilal tasmim wa muhtawa muqni." },
      { step: "Al-Tanfidh", description: "Nunaffidh Al-Khitta bi-diqqa abr jami Al-Qanawat wal-manassat dhat Al-Sila." },
      { step: "Al-Tahsin", description: "Abr Al-Muraqaba wal-tahlil Al-Mustamirr, nusaqqil manhajana li-tadif Al-Nataij." },
    ],
    whyKicker: "Limadha Creative Surf",
    whyTitle: "Mabni lil-nataij,",
    whyAccent: "la lil-mukhrajat faqat.",
    why: [
      { title: "Al-Istratijiyya awwalan", description: "Kull amal yartabit bi-hadaf tijari yuttafaq alayh qabl Al-Bad." },
      { title: "Muqas bil-bayanat", description: "Taqarir wadiha an ma yanjah, li-takun Al-Qararat mabniyya ala Al-Arqam la Al-Ara." },
      { title: "Fariq wahid min Al-Bidaya ila Al-Nihaya", description: "Istratijiyyun wa musammimun wa mutawwirun wa musawwiqun tahta saqf wahid — la shay yadi bayn Al-Wakalat." },
      { title: "Shiraka shaffafa", description: "Jadawil zamaniyya wadiha wa tawsiyat sadiqa wa fariq yumkinuk Al-Wusul ilayh fian." },
    ],
    faqKicker: "Al-Asila Al-Shaia",
    faqTitle: "Asilatuk,",
    faqAccent: "wa ajwibatuna.",
    faq: [
      { q: "Hal yajib an ashtarik fi kull Al-Khadamat?", a: "La. Yumkinuk Al-Bad bi-khidma wahida wa idafat Al-Mazid maa numuwwik. Kathir min Al-Umala yabdaun bi-mashru wahid thumma yatawassaun bad ruyat Al-Nataij." },
      { q: "Kam yastaghriq Al-Mashru Al-Muttad?", a: "Yatawaqqaf ala Al-Nitaq. Qad tastaghriq hamla murakkaza aw tajdid lil-alama bid asabi; amma Al-Mawqi Al-Kamil aw Al-Barnamaj Al-Taswiqi Al-Mustamirr fa-yukhattat ala marahil bi-maalim wadiha." },
      { q: "Kayfa taqisun Al-Najah?", a: "Nattafiq fil-bidaya ala Al-Maayir Allati tuhimmuk — Al-Umala Al-Muhtamalin, Al-Mabiat, Al-Tartib, Al-Tafaul — wa nuqaddim taqarir dawriyya anha." },
      { q: "Hal yumkinukum Al-Amal maa fariqina Al-Dakhili?", a: "Bi-tabi. Yumkinuna tawalli Al-Mashru kamilan, aw Al-Indimam ila fariqik Al-Hali li-sadd thaghrat muhadda." },
    ],
    cta: {
      kicker: "Falnatahaddath",
      title: "Mustaidd li-tahwil",
      titleAccent: "alamatik?",
      body: "Falnataawan li-khalq shay istithnai yuhaqqiq nataij haqiqiyya li-amalik.",
      button: "Tawasal Maana",
    },
  } satisfies PartialCopy<typeof servicesMessages.en>;

const ns_sitemap = {
    metaTitle: "Kharitat Al-Mawqi",
    metaDescription: "Tasaffah jami safahat mawqi Creative Surf.",
    breadcrumbCurrent: "Kharitat Al-Mawqi",
    title: "Kharitat Al-Mawqi",
    mainPages: "Al-Safahat Al-Raisiyya",
  } satisfies PartialCopy<typeof sitemapMessages.en>;

const ns_team = {
    metaTitle: "Fariquna | Creative Surf",
    metaDescription:
      "Taarraf ala al-ashkhas khalfa Creative Surf — al-fariq alladhi yabni al-istratijiyya wal-muntajat wal-qisas.",
    hero: {
      eyebrow: "Man Nahnu",
      title: "Taarraf ala Al-Fariq",
      subtitle:
        "Fariq saghir bi-athar kabir — istratijiyya wa barmaja wa tasmim wa kitaba tahta saqf wahid.",
    },
    roles: {
      marketingLead: "Masul Al-Taswiq Al-Raqmi",
      webDeveloper: "Mutawwir Web",
      contentStrategist: "Istratiji Al-Muhtawa",
      visualiser: "Musammim Basari Awwal | Muharrir",
    },
    bios: {
      marketingLead:
        "Yaqud hamalatina wa numuwwana wa yatawalla al-umala wal-sharakat.",
      webDeveloper:
        "Yabni wa yaduim minassat Creative Surf min al-wajiha ila al-bunya al-tahtiyya.",
      contentStrategist:
        "Yukhattit lil-kalimat khalfa hamalatina wa mudawwanatina wa sawt al-alama.",
      visualiser:
        "Yuhawwil al-afkar ila suwar — tasmim wa haraka wa muntaj yajma al-kull.",
      editor:
        "Yasugh muhtawana al-mari wal-basari min awwal fikra hatta al-muntaj al-nihai.",
    },
    cta: {
      title: "Turid Al-Amal Maana?",
      body: "Yusidduna daiman an nasma an mashari wa afkar jadida.",
      button: "Tawasal Maana",
    },
  } satisfies PartialCopy<typeof teamMessages.en>;

const ns_websiteCost = {
    metaTitle: "Kam yajib an yukallif Al-Mawqi Al-Iliktruni?",
    metaDescription:
      "Tarraf ala takalif tatwir Al-Mawaqi wal-awamil allati tuathir ala Al-Tasir hasab naw Al-Mawqi.",
    breadcrumb: {
      pricingGuides: "Adillat Al-Asaar",
      current: "Taklifat Al-Mawqi",
    },
    title: "Kam yajib an yukallif Al-Mawqi Al-Iliktruni?",
    subtitle:
      "Fahm takalif tatwir Al-Mawaqi wal-awamil allati tuathir ala Al-Tasir hasab naw Al-Mawqi.",
    factorsTitle: "Awamil taklifat Al-Mawqi",
    factorsBody:
      "Takhtalif taklifat Al-Mawqi bi-shakl kabir hasab iddat awamil. Fahmuha yusaiduk ala wad mizaniyya waqiiyya li-mashrouk.",
    typeTitle: "Naw Al-Mawqi",
    typeIntro: "Li-anwa Al-Mawaqi Al-Mukhtalifa mustawayat taqid mukhtalifa wa bil-tali takalif mukhtalifa:",
    tiers: [
      { label: "Mawqi tarifi basit:", range: "5,000$ - 10,000$" },
      { label: "Mawqi sharika saghira:", range: "10,000$ - 25,000$" },
      { label: "Mawqi tijara iliktruniyya:", range: "25,000$ - 50,000$ wa akthar" },
      { label: "Tatbiq wib mukhassas:", range: "50,000$ - 250,000$ wa akthar" },
    ],
    cta: {
      title: "Mustaidd lil-bidaya?",
      body: "Ittasil bina Al-Yawm lil-husul ala ard sir mukhassas li-mashrou mawqiik.",
      button: "Uhsul ala Tasir Majjani",
    },
  } satisfies PartialCopy<typeof websiteCostMessages.en>;

const dicts = {
  "about": ns_about,
  "aboutApproach": ns_aboutApproach,
  "aboutAwards": ns_aboutAwards,
  "aboutCareers": ns_aboutCareers,
  "aboutHistory": ns_aboutHistory,
  "aboutReviews": ns_aboutReviews,
  "aboutValues": ns_aboutValues,
  "auth": ns_auth,
  "blogPost": ns_blogPost,
  "blogs": ns_blogs,
  "chat": ns_chat,
  "common": ns_common,
  "contact": ns_contact,
  "cvTeaser": ns_cvTeaser,
  "cvBuilder": ns_cvBuilder,
  "editor": ns_editor,
  "editorUi": ns_editorUi,
  "footer": ns_footer,
  "home": ns_home,
  "kit": ns_kit,
  "legalPrivacy": ns_legalPrivacy,
  "legalPrivacyTerms": ns_legalPrivacyTerms,
  "legalTerms": ns_legalTerms,
  "nav": ns_nav,
  "notFound": ns_notFound,
  "pageMeta": ns_pageMeta,
  "projectEditor": ns_projectEditor,
  "realEstate": ns_realEstate,
  "realEstateBlogs": ns_realEstateBlogs,
  "realEstateFooter": ns_realEstateFooter,
  "realEstateProjectDetail": ns_realEstateProjectDetail,
  "realEstateProjects": ns_realEstateProjects,
  "realEstateWhatsApp": ns_realEstateWhatsApp,
  "servicesIndex": ns_servicesIndex,
  "services": ns_services,
  "sitemap": ns_sitemap,
  "team": ns_team,
  "websiteCost": ns_websiteCost,
} as unknown as Record<string, Dict>;

export default dicts;
