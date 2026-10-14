import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// ── البيانات الأولية لمنصة صالوني (الكويت — للمرحلة الأولى) ──────────────
const INITIAL_SALONS = [
  {
    id: 'salon-laleh',
    name: { ar: 'لاليه بيوتي لاونج', en: 'Laleh Beauty Lounge' },
    tagline: { ar: 'أناقة كويتية بلمسة فرنسية فاخرة', en: 'Kuwaiti elegance with a luxury French touch' },
    governorate: { ar: 'العاصمة', en: 'Al Asimah' },
    area: { ar: 'بنيد القار', en: 'Bneid Al-Gar' },
    address: {
      governorate: { ar: 'العاصمة', en: 'Al Asimah' },
      area: { ar: 'بنيد القار', en: 'Bneid Al-Gar' },
      block: '1',
      street: { ar: 'شارع الخليج العربي', en: 'Arabian Gulf St' },
      avenue: '3',
      building: { ar: 'برج لاليه، الدور 2', en: 'Laleh Tower, Floor 2' }
    },
    rating: 4.9,
    reviewsCount: 318,
    priceTier: '$$$',
    verified: true,
    ladiesOnlyBadge: { ar: 'خصوصية تامة للسيدات ١٠٠٪', en: '100% Ladies Only Privacy' },
    workingHours: {
      sunThu: '10:00 - 21:00',
      fri: '13:00 - 22:00',
      sat: '10:00 - 22:00',
      weekendNote: { ar: 'عطلة نهاية الأسبوع (الجمعة والسبت): ساعات ممتدة', en: 'Weekend (Fri & Sat): Extended hours' }
    },
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      {
        id: 'g1',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'تسريحة ويفي ملكي ومكياج ناعم', en: 'Royal wavy hair & soft glam makeup' },
        blurFaceDefault: true
      },
      {
        id: 'g2',
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'فن الأظافر الوردي الفرنسي', en: 'Blush French nail art' },
        blurFaceDefault: false
      },
      {
        id: 'g3',
        url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'مكياج سهرة فاخر', en: 'Luxury evening glam' },
        blurFaceDefault: true
      }
    ],
    categories: ['hair', 'nails', 'makeup', 'facial'],
    services: [
      {
        id: 'srv-1',
        category: 'hair',
        name: { ar: 'سشوار وويفي ملكي مع سيروم الحرير', en: 'Royal Blowout & Silk Waves' },
        description: { ar: 'تصفيف احترافي بلمعة الحرير وثبات يدوم طوال السهرة', en: 'Professional silk-shine styling with all-evening hold' },
        durationMin: 60,
        priceKwd: 18.500
      },
      {
        id: 'srv-2',
        category: 'hair',
        name: { ar: 'علاج الكافيار والذهب لترميم الشعر', en: 'Caviar & Rose-Gold Hair Ritual' },
        description: { ar: 'جلسة تغذية عميقة للشعر المجهد والمصبوغ', en: 'Deep nourishing treatment for colored and stressed hair' },
        durationMin: 90,
        priceKwd: 35.000
      },
      {
        id: 'srv-3',
        category: 'nails',
        name: { ar: 'سبا منيكير وبديكير بالورد الدمشقي', en: 'Damask Rose Spa Manicure & Pedicure' },
        description: { ar: 'عناية متكاملة للأظافر مع تقشير بالورد وماسك البارافين الدافئ', en: 'Complete nail care with rose scrub and warm paraffin mask' },
        durationMin: 75,
        priceKwd: 16.000
      },
      {
        id: 'srv-4',
        category: 'makeup',
        name: { ar: 'مكياج سهرة ناعم (سوفير غلام)', en: 'Soft Glam Evening Makeup' },
        description: { ar: 'مكياج راقٍ يبرز ملامحكِ الطبيعية مع رموش حريرية', en: 'Refined glam highlighting your features with silk lashes' },
        durationMin: 60,
        priceKwd: 45.000
      },
      {
        id: 'srv-5',
        category: 'facial',
        name: { ar: 'فيشل النضارة الزجاجية الهيدرافيشل', en: 'Glass-Skin HydraFacial Glow' },
        description: { ar: 'تنظيف عميق وترطيب مكثف لإشراقة فورية قبل المناسبات', en: 'Deep cleansing and intense hydration for instant pre-event glow' },
        durationMin: 60,
        priceKwd: 42.000
      }
    ],
    staff: [
      {
        id: 'st-1',
        name: { ar: 'أمل العتيبي', en: 'Amal Al-Otaibi' },
        role: { ar: 'خبيرة شعر وتصفيف', en: 'Master Hair Stylist' },
        rating: 4.95,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        blurFace: false
      },
      {
        id: 'st-2',
        name: { ar: 'نورة الصباح', en: 'Noura Al-Sabah' },
        role: { ar: 'خبيرة مكياج سينمائي', en: 'Luxury Makeup Artist' },
        rating: 5.0,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        blurFace: true
      },
      {
        id: 'st-3',
        name: { ar: 'إيلينا كوزلوفا', en: 'Elena Kozlova' },
        role: { ar: 'أخصائية أظافر وسبا', en: 'Nail & Spa Specialist' },
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        blurFace: false
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: { ar: 'دانة م.', en: 'Dana M.' },
        date: '2026-10-10',
        rating: 5,
        service: { ar: 'سشوار وويفي ملكي', en: 'Royal Blowout & Silk Waves' },
        comment: { ar: 'المكان قمة في الرقي والخصوصية، شغل أمل بالويفي خيال وثبت معاي طول العرس!', en: 'Super classy and private! Amal did an amazing job with my waves, lasted all night.' }
      },
      {
        id: 'rev-2',
        author: { ar: 'شهد الكندري', en: 'Shahad Al-Kandari' },
        date: '2026-10-06',
        rating: 5,
        service: { ar: 'سبا منيكير وبديكير', en: 'Damask Rose Spa Mani-Pedi' },
        comment: { ar: 'أحلى بديكير جربته بالكويت، نظافة وتعقيم وريحة الورد ترد الروح.', en: 'Best pedicure in Kuwait! Impeccable hygiene and heavenly rose scent.' }
      }
    ]
  },
  {
    id: 'salon-velvet',
    name: { ar: 'فيلفت روز سبا آند بيوتي', en: 'Velvet Rose Spa & Beauty' },
    tagline: { ar: 'واحتكِ الهادئة للعناية بالأظافر والبشرة والشعر', en: 'Your serene sanctuary for nails, skin & hair care' },
    governorate: { ar: 'حولي', en: 'Hawalli' },
    area: { ar: 'الجابرية', en: 'Al-Jabriya' },
    address: {
      governorate: { ar: 'حولي', en: 'Hawalli' },
      area: { ar: 'الجابرية', en: 'Al-Jabriya' },
      block: '1A',
      street: { ar: 'شارع 105', en: 'Street 105' },
      avenue: '4',
      building: { ar: 'فيلا 18، الدور الأول', en: 'Villa 18, 1st Floor' }
    },
    rating: 4.8,
    reviewsCount: 245,
    priceTier: '$$',
    verified: true,
    ladiesOnlyBadge: { ar: 'طاقم نسائي متكامل وخصوصية تامة', en: 'All-Female Staff & Full Privacy' },
    workingHours: {
      sunThu: '09:30 - 21:30',
      fri: '12:00 - 22:00',
      sat: '10:00 - 22:00',
      weekendNote: { ar: 'مفتوح طوال عطلة الجمعة والسبت', en: 'Open all Friday & Saturday weekend' }
    },
    coverImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      {
        id: 'vg1',
        url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'جل بولش بألوان النود الوردية', en: 'Blush nude BIAB gel nails' },
        blurFaceDefault: false
      },
      {
        id: 'vg2',
        url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'جلسة فيشل الكولاجين الوردي', en: 'Rose collagen facial ritual' },
        blurFaceDefault: true
      }
    ],
    categories: ['nails', 'facial', 'hair', 'lashes'],
    services: [
      {
        id: 'vs-1',
        category: 'nails',
        name: { ar: 'تركيب جل BIAB مقوي للأظافر الطبيعية', en: 'BIAB Builder Gel Overlay' },
        description: { ar: 'طبقة حماية وتقوية للأظافر بألوان النود والوردي الناعم', en: 'Strengthening builder gel in soft blush and nude tones' },
        durationMin: 75,
        priceKwd: 22.000
      },
      {
        id: 'vs-2',
        category: 'lashes',
        name: { ar: 'رفع وتقويس الرموش وتوريد الحواجب', en: 'Korean Lash Lift & Brow Lamination' },
        description: { ar: 'رموش مرفوعة بجمال طبيعي مع ترتيب وتغذية الحواجب بالكيراتين', en: 'Natural lifted lashes with keratin brow lamination' },
        durationMin: 60,
        priceKwd: 24.500
      },
      {
        id: 'vs-3',
        category: 'hair',
        name: { ar: 'قص أطراف احترافي + سشوار فوليوم', en: 'Precision Trim & Volume Blowout' },
        description: { ar: 'قص صحي يجدد حيوية الشعر مع سشوار كثيف وناعم', en: 'Healthy trim with bouncy volume blowout' },
        durationMin: 60,
        priceKwd: 15.000
      },
      {
        id: 'vs-4',
        category: 'facial',
        name: { ar: 'مساج الوجه التايلندي ورفع الملامح', en: 'Sculpting Kobido Facial Massage' },
        description: { ar: 'تنشيط الدورة الدموية وشد طبيعي للبشرة بزيوت الورد العضوية', en: 'Natural sculpting facial massage with organic rose oils' },
        durationMin: 50,
        priceKwd: 28.000
      }
    ],
    staff: [
      {
        id: 'vst-1',
        name: { ar: 'مريم الخالد', en: 'Mariam Al-Khaled' },
        role: { ar: 'أخصائية رموش وحواجب', en: 'Lash & Brow Artist' },
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
        blurFace: true
      },
      {
        id: 'vst-2',
        name: { ar: 'صوفيا تشين', en: 'Sophia Chen' },
        role: { ar: 'خبيرة أظافر BIAB', en: 'Senior BIAB Nail Tech' },
        rating: 4.85,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        blurFace: false
      }
    ],
    reviews: [
      {
        id: 'vrev-1',
        author: { ar: 'لولوة الرشيد', en: 'Lulwa Al-Rasheed' },
        date: '2026-10-11',
        rating: 5,
        service: { ar: 'تركيب جل BIAB', en: 'BIAB Builder Gel' },
        comment: { ar: 'شغل صوفيا بالأظافر مرتب حيل وما يتقشر أبد، أنصحكم فيها بنات.', en: 'Sophia is incredible with BIAB, super neat and lasts 4 weeks!' }
      }
    ]
  },
  {
    id: 'salon-noor-bridal',
    name: { ar: 'دار نور للعرائس والتجميل', en: 'Dar Noor Bridal & Couture Beauty' },
    tagline: { ar: 'إطلالة ملكية تليق بليلة عمركِ وتألقكِ', en: 'Regal beauty crafted for your unforgettable moments' },
    governorate: { ar: 'العاصمة', en: 'Al Asimah' },
    area: { ar: 'السرة', en: 'Al-Surra' },
    address: {
      governorate: { ar: 'العاصمة', en: 'Al Asimah' },
      area: { ar: 'السرة', en: 'Al-Surra' },
      block: '4',
      street: { ar: 'شارع طارق بن زياد', en: 'Tariq Bin Ziyad St' },
      avenue: '2',
      building: { ar: 'قصر نور للتجميل، مبنى 9', en: 'Noor Beauty Villa 9' }
    },
    rating: 4.95,
    reviewsCount: 412,
    priceTier: '$$$$',
    verified: true,
    ladiesOnlyBadge: { ar: 'أجنحة VIP خاصة للمحجبات والعرائس', en: 'Private VIP Suites for Hijabis & Brides' },
    workingHours: {
      sunThu: '11:00 - 21:00',
      fri: '12:00 - 22:30',
      sat: '11:00 - 22:30',
      weekendNote: { ar: 'حجوزات نهاية الأسبوع متاحة مع أجنحة خاصة', en: 'Weekend VIP suites available Fri & Sat' }
    },
    coverImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      {
        id: 'ng1',
        url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'مكياج ملكي دافئ مع تسريحة مرفوعة', en: 'Warm regal glam & bridal updo' },
        blurFaceDefault: true
      },
      {
        id: 'ng2',
        url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'تفاصيل تسريحة اللؤلؤ والورد', en: 'Pearl & rose hair artistry' },
        blurFaceDefault: true
      }
    ],
    categories: ['makeup', 'hair', 'facial', 'nails'],
    services: [
      {
        id: 'ns-1',
        category: 'makeup',
        name: { ar: 'مكياج وتصفيف شعر VIP للمناسبات الخاصة', en: 'VIP Couture Makeup & Hair Combo' },
        description: { ar: 'باقة متكاملة تشمل مكياج سهرة فاخر وتسريحة شعر حسب اختياركِ في جناح خاص', en: 'Full luxury evening makeup and custom hairstyling in a private suite' },
        durationMin: 120,
        priceKwd: 85.000
      },
      {
        id: 'ns-2',
        category: 'hair',
        name: { ar: 'صبغة بالياج فرنسي + تريتمنت أولابليكس', en: 'French Balayage & Olaplex Gloss' },
        description: { ar: 'تفتيح ناعم ومتدرج بدون سحب لون قاسي مع حماية كاملة للشعر', en: 'Seamless dimensional balayage with full Olaplex bond protection' },
        durationMin: 150,
        priceKwd: 68.000
      },
      {
        id: 'ns-3',
        category: 'facial',
        name: { ar: 'جلسة الذهب عيار 24 لإشراقة فورية', en: '24K Gold Radiance Facial' },
        description: { ar: 'تجهيز البشرة قبل المكياج بأوراق الذهب وحمض الهيالورونيك', en: 'Pre-event skin prep with 24K gold leaf and hyaluronic infusion' },
        durationMin: 60,
        priceKwd: 50.000
      }
    ],
    staff: [
      {
        id: 'nst-1',
        name: { ar: 'نور المضف', en: 'Noor Al-Mudhaf' },
        role: { ar: 'خبيرة مكياج عرائس وسهرات', en: 'Celebrity & Bridal MUA' },
        rating: 5.0,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        blurFace: true
      },
      {
        id: 'nst-2',
        name: { ar: 'غادة العلي', en: 'Ghada Al-Ali' },
        role: { ar: 'ماستر تسريحات وصبغات', en: 'Master Colorist & Updo Stylist' },
        rating: 4.95,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        blurFace: true
      }
    ],
    reviews: [
      {
        id: 'nrev-1',
        author: { ar: 'فاطمة الغانم', en: 'Fatima Al-Ghanim' },
        date: '2026-10-09',
        rating: 5,
        service: { ar: 'مكياج وتصفيف شعر VIP', en: 'VIP Couture Makeup & Hair' },
        comment: { ar: 'الجناح الخاص للمحجبات قمة بالراحة، ومكياج نور ناعم وفخم بنفس الوقت الكل سألني عنه!', en: 'The private suite for hijabis is so comfortable, and Noor’s makeup was flawless!' }
      }
    ]
  },
  {
    id: 'salon-camellia',
    name: { ar: 'كاميليا نيل آند هير بار', en: 'Camellia Nail & Hair Bar' },
    tagline: { ar: 'دلّلي نفسكِ بأسرع وأجمل خدمات الشعر والأظافر', en: 'Pamper yourself with express luxury hair & nail care' },
    governorate: { ar: 'مبارك الكبير', en: 'Mubarak Al-Kabeer' },
    area: { ar: 'صباح السالم', en: 'Sabah Al-Salem' },
    address: {
      governorate: { ar: 'مبارك الكبير', en: 'Mubarak Al-Kabeer' },
      area: { ar: 'صباح السالم', en: 'Sabah Al-Salem' },
      block: '2',
      street: { ar: 'شارع 202', en: 'Street 202' },
      avenue: '1',
      building: { ar: 'ذا هب بلازا، الدور 1', en: 'The Hub Plaza, Floor 1' }
    },
    rating: 4.85,
    reviewsCount: 189,
    priceTier: '$$',
    verified: true,
    ladiesOnlyBadge: { ar: 'للسيدات فقط • أجواء مبهجة', en: 'Ladies Only • Chic Lounge' },
    workingHours: {
      sunThu: '10:00 - 22:00',
      fri: '13:00 - 22:30',
      sat: '10:00 - 22:30',
      weekendNote: { ar: 'مفتوح الجمعة والسبت حتى 10:30 مساءً', en: 'Open Fri & Sat until 10:30 PM' }
    },
    coverImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      {
        id: 'cg1',
        url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=700&q=80',
        caption: { ar: 'ديزاين أظافر كروم لؤلؤي', en: 'Glazed pearl chrome nails' },
        blurFaceDefault: false
      }
    ],
    categories: ['nails', 'hair', 'lashes'],
    services: [
      {
        id: 'cs-1',
        category: 'nails',
        name: { ar: 'منيكير روسي + جل كروم لؤلؤي', en: 'Russian Manicure & Glazed Pearl Chrome' },
        description: { ar: 'تنظيف دقيق للجلد المحيط بالأظافر مع لمعة اللؤلؤ الراقية', en: 'Precision cuticle work with glazed pearl chrome finish' },
        durationMin: 70,
        priceKwd: 19.500
      },
      {
        id: 'cs-2',
        category: 'hair',
        name: { ar: 'سبا فروة الرأس الياباني (هيد سبا)', en: 'Japanese Waterfall Head Spa' },
        description: { ar: 'جلسة استرخاء وتنظيف عميق لفروة الرأس بالبخار والأعشاب الطبيعية', en: 'Deep relaxing scalp detox with herbal steam waterfall' },
        durationMin: 75,
        priceKwd: 32.000
      }
    ],
    staff: [
      {
        id: 'cst-1',
        name: { ar: 'ياسمين الفيلكاوي', en: 'Yasmin Al-Failakawi' },
        role: { ar: 'أخصائية هيد سبا وشعر', en: 'Head Spa & Hair Specialist' },
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        blurFace: false
      }
    ],
    reviews: [
      {
        id: 'crev-1',
        author: { ar: 'مها ب.', en: 'Maha B.' },
        date: '2026-10-12',
        rating: 5,
        service: { ar: 'سبا فروة الرأس الياباني', en: 'Japanese Waterfall Head Spa' },
        comment: { ar: 'تجربة الهيد سبا خيالية! طلعت من الصالون وأنا مرتاحة وشعري يلمع.', en: 'The Japanese Head Spa is out of this world! So relaxing and my hair shines.' }
      }
    ]
  }
];

const bookingsStore = [
  {
    id: 'BK-90421',
    salonId: 'salon-laleh',
    salonName: { ar: 'لاليه بيوتي لاونج', en: 'Laleh Beauty Lounge' },
    area: { ar: 'بنيد القار', en: 'Bneid Al-Gar' },
    services: [
      { id: 'srv-1', name: { ar: 'سشوار وويفي ملكي مع سيروم الحرير', en: 'Royal Blowout & Silk Waves' }, priceKwd: 18.500, durationMin: 60 }
    ],
    staffName: { ar: 'أمل العتيبي', en: 'Amal Al-Otaibi' },
    date: '2026-10-16',
    timeSlot: '17:30',
    paymentMethod: 'knet',
    totalKwd: 18.500,
    status: 'confirmed',
    customerPhone: '+965 9912 3456',
    customerName: 'سارة الصباح',
    shareWithFamily: true,
    createdAt: '2026-10-14T14:00:00Z'
  }
];

// ── مسارات الـ API ────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'salooni-kw',
    phase: 1,
    timezone: 'Asia/Kuwait',
    currency: 'KWD',
    timestamp: Date.now()
  });
});

app.get('/api/salons', (_req, res) => {
  res.json({ salons: INITIAL_SALONS });
});

app.get('/api/salons/:id', (req, res) => {
  const salon = INITIAL_SALONS.find((s) => s.id === req.params.id);
  if (!salon) return res.status(404).json({ error: 'Salon not found' });
  res.json({ salon });
});

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body || {};
  const cleaned = String(phone || '').replace(/\D/g, '');
  if (cleaned.length < 8) {
    return res.status(400).json({ ok: false, error: 'Invalid Kuwait phone number (+965XXXXXXXX)' });
  }
  res.json({
    ok: true,
    phone: `+965 ${cleaned.slice(-8, -4)} ${cleaned.slice(-4)}`,
    demoOtp: '4829',
    expiresInSec: 120
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, name } = req.body || {};
  if (!otp || String(otp).trim().length < 4) {
    return res.status(400).json({ ok: false, error: 'Invalid OTP code' });
  }
  const cleaned = String(phone || '99123456').replace(/\D/g, '').slice(-8);
  res.json({
    ok: true,
    user: {
      id: 'usr-' + cleaned,
      name: name || 'سارة الصباح',
      phone: `+965 ${cleaned.slice(0, 4)} ${cleaned.slice(4)}`,
      role: 'customer'
    }
  });
});

app.get('/api/bookings', (_req, res) => {
  res.json({ bookings: bookingsStore });
});

app.post('/api/bookings', (req, res) => {
  const body = req.body || {};
  const booking = {
    id: 'BK-' + Math.floor(10000 + Math.random() * 89999),
    salonId: body.salonId,
    salonName: body.salonName || { ar: 'صالون صالوني', en: 'Salooni Partner' },
    area: body.area || { ar: 'الكويت', en: 'Kuwait' },
    services: Array.isArray(body.services) ? body.services : [],
    staffName: body.staffName || { ar: 'أي خبيرة متاحة', en: 'Any Available Specialist' },
    date: body.date || '2026-10-16',
    timeSlot: body.timeSlot || '16:00',
    paymentMethod: body.paymentMethod || 'knet',
    totalKwd: Number(body.totalKwd || 0),
    status: 'confirmed',
    customerPhone: body.customerPhone || '+965 9912 3456',
    customerName: body.customerName || 'ضيفة صالوني',
    shareWithFamily: Boolean(body.shareWithFamily),
    familyPhone: body.familyPhone || '',
    notes: body.notes || '',
    createdAt: new Date().toISOString()
  };
  bookingsStore.unshift(booking);
  res.status(201).json({ ok: true, booking });
});

// ── خدمة بناء الويب الثابت (نفس أصل الخادم، بلا CORS، مع دعم PWA) ────────
const WEB_DIR = process.env.WEB_DIST_DIR || path.resolve(process.cwd(), 'web');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

if (fs.existsSync(PUBLIC_DIR)) {
  app.use(
    express.static(PUBLIC_DIR, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.webmanifest')) {
          res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
        }
        if (filePath.endsWith('sw.js')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    })
  );
}

if (fs.existsSync(path.join(WEB_DIR, 'index.html'))) {
  app.use(
    express.static(WEB_DIR, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
        if (filePath.endsWith('.webmanifest')) {
          res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
        }
      }
    })
  );

  // بديل SPA: أي مسار غير /api يُخدَم بـ web/index.html
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api')) return next();
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(WEB_DIR, 'index.html'));
  });
}

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[salooni-kw] server & web listening on http://0.0.0.0:${PORT}`);
});
