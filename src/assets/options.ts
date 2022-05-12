import Mock from 'mockjs'

export const ageMinList: number[] = [13, 18, 21, 25, 32, 50]
export const ageMaxList: Array<number | string> = [24, 34, 49, 54, 'And up']

export const languages: string[] = [
  'Albanian (sq)', 'Arabix (ar)', 'Basque (eu)', 'Bengali (bn)', 'Bulgarian (bg)', 'Catalan (ca)',
  'Chinese (zh)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Dutch (nl)', 'English (en)',
  'Farsi (fa)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'German (de)', 'Greek (el)',
  'Gujarati (gu)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Indonesian (id)', 'Irish (ga)',
  'Italian (it)', 'Japanese (ja)', 'Kannada (kn)', 'Korean (ko)', 'Latvian (lv)', 'Malay (ms)',
  'Marathi (mr)', 'Norwegian (no)', 'Norwegian Bokmål (nb)', 'Polish (pl)', 'Portuguese (pt)', 'Romanian (ro)',
  'Russian (ru)', 'Serbian (sr)', 'Slovak (sk)', 'Spanish (es)', 'Swedish (sv)', 'Tamil (ta)',
  'Thai (th)', 'Turkish (tr)', 'Ukrainian (uk)', 'Urdu (ur)', 'Vietnamese (vi)'
]

export const ioses: string[] = [
  '15.0', '14.7', '14.6', '14.5', '14.4', '14.3', '14.0',
  '13.7', '13.6', '13.5', '13.4', '13.3', '13.2', '13.1', '13.0',
  '12.5', '12.4', '12.3', '12.2', '12.1', '12.0',
  '11.4', '11.3', '11.2', '11.1', '11.0',
  '10.3', '10.2', '10.1', '10.0', '9.3', '9.2', '9.1', '9.0',
  '8.4', '8.3', '8.2', '8.1', '8.0',
  '7.1', '7.0', '6.1', '6.0'
]
export const androids: string[] = [
  '12.0', '11.0', '10', 'Pie', 'Oreo', 'Nougat', 'Marshmallow', 'Lollipop', 'Kit Kat',
  'Jelly Bean', 'Ice Cream', 'Honeycomb', 'Gingerbread', 'Froyo', 'Eclair', 'Donut', 'Cupcake'
]
export const mobiles: string[] = ['KaiOS']

export const models = [{
  label: 'Alcatel',
  value: 'alcatel',
  children: [{ label: 'Alcatel OneTouch Idol 3', value: 'alcatel_idol3' }]
}, {
  label: 'Amazon',
  value: 'amazon',
  children: [
    { label: 'Amazon Kindle Fire', value: 'amazon_kindle_fire' },
    { label: 'Amazon Kindle Fire 10"', value: 'amazon_kindle_fire10' },
    { label: 'Amazon Kindle Fire HD 7"', value: 'amazon_kindle_fireHD7' },
    { label: 'Amazon Kindle Fire HD 8.9', value: 'amazon_kindle_fireHD8.9' },
  ]
}] // 数据不全

export const carriers = [{
  label: 'AE - United Arab Emirates',
  value: 'ae',
  children: [
    { label: 'du', value: 'ae_du' },
    { label: 'Etisalat (AE)', value: 'ae_etisalat' }
  ]
}, {
  label: 'AR - Argentina',
  value: 'ar',
  children: [
    { label: 'Claro (AR)', value: 'ar_claro' },
    { label: 'Globalstar (AR)', value: 'ar_globalstar' },
    { label: 'Movistar (AR)', value: 'ar_movistar' },
    { label: 'Nextel (AR)', value: 'ar_nextel' },
    { label: 'Personal', value: 'ar_personal' },
    { label: 'PORT-HABLE', value: 'ar_pore-hable' },
  ]
}] // 数据不全

const data = Mock.mock({
  'followers|10-50': [{
    nickname: '@name',
    id: '@word',
    avatar: '@image',
    certify: '@boolean'
  }]
})
export const followers = data.followers

export const interests = [{
  label: 'Automotive',
  value: 'automotive',
  children: [
    { label: 'Automotive — Automotive news and general info', value: 'automotive-news-and-general-info' },
    { label: 'Automotive — Car culture', value: 'automotive-car-culture' },
    { label: 'Automotive — Convertibles', value: 'automotive-convertibles' },
    { label: 'Automotive — Hybrid and electric vehicles', value: 'automotive-hybrid-and-electric-vehicles' },
    { label: 'Automotive — Luxury', value: 'automotive-luxury' },
    { label: 'Automotive — Minivans', value: 'automotive-minivans' },
    { label: 'Automotive — Motorcycles', value: 'automotive-motorcycles' },
    { label: 'Automotive — Offroad vehicles', value: 'automotive-offroad-vehicles' },
    { label: 'Automotive — Performance vehicles', value: 'automotive-performance-vehicles' },
    { label: 'Automotive — Sedans', value: 'automotive-sedans' },
    { label: 'Automotive — SUVs', value: 'automotive-suvs' },
    { label: 'Automotive — Trucks', value: 'automotive-trucks' },
    { label: 'Automotive — Vintage cars', value: 'automotive-vintage cars' }
  ]
}, {
  label: 'Beauty',
  value: 'beauty',
  children: [
    { label: 'Beauty - Body art', value: 'beauty-body-art' },
    { label: 'Beauty - Face care', value: 'beauty-face-care' },
    { label: 'Beauty - General info', value: 'beauty-general-info' },
    { label: 'Beauty - Hair care', value: 'beauty-hair-care' },
    { label: 'Beauty - Make-up and cosmetics', value: 'beauty-make-up-and-cosmetics' },
    { label: 'Beauty - Perfumes and fragrances', value: 'beauty-perfumes-and-fragrances' },
    { label: 'Beauty - Shaving and grooming', value: 'beauty-shaving-and-grooming' },
    { label: 'Beauty - Skin care', value: 'beauty-skin-care' },
    { label: 'Beauty - Spa and medical spa', value: 'beauty-spa-and-medical-spa' },
    { label: 'Beauty - Tanning and sun care', value: 'beauty-tanning-and-sun-care' },
  ]
}] // 数据不全
