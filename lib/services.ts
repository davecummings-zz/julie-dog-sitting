export interface Service {
  id: string
  name: string
  description: string
  basePrice: number // in cents
  variants?: {
    name: string
    priceModifier: number // in cents
  }[]
}

export const services: Service[] = [
  {
    id: 'boarding',
    name: 'Boarding in Julie\'s Home',
    description: 'Overnight stays with 24/7 care, walks, playtime, and snuggles',
    basePrice: 7500, // $75/night
    variants: [
      { name: 'Holiday Rate', priceModifier: 1500 }, // +$15
      { name: 'Additional Dog', priceModifier: 6000 }, // +$60
      { name: 'Puppy Rate', priceModifier: 500 }, // +$5
    ],
  },
  {
    id: 'drop-in',
    name: 'Drop-in Visits',
    description: '30-60 minute visits at your home with walks and attention',
    basePrice: 3000, // $30/visit
    variants: [
      { name: 'Holiday Rate', priceModifier: 1000 }, // +$10
      { name: 'Additional Dog', priceModifier: 2000 }, // +$20
      { name: 'Puppy Rate', priceModifier: 500 }, // +$5
    ],
  },
  {
    id: 'daycare',
    name: 'Doggy Day Care',
    description: 'Full day care at Julie\'s home with activities, food, and playtime',
    basePrice: 5000, // $50/day
    variants: [
      { name: 'Holiday Rate', priceModifier: 1000 }, // +$10
      { name: 'Additional Dog', priceModifier: 4000 }, // +$40
      { name: 'Puppy Rate', priceModifier: 1000 }, // +$10
    ],
  },
  {
    id: 'walking',
    name: 'Dog Walking',
    description: 'Fresh air walks in the neighborhood and nearby trails',
    basePrice: 3000, // $30/walk
    variants: [
      { name: 'Holiday Rate', priceModifier: 1000 }, // +$10
      { name: 'Additional Dog', priceModifier: 2000 }, // +$20
      { name: 'Puppy Rate', priceModifier: 500 }, // +$5
    ],
  },
]

export const reviews = [
  {
    id: 1,
    name: 'Tim M.',
    service: 'Boarding',
    date: 'Jan 28, 2026',
    text: 'Julie was great. She sent pictures everyday. Julie could not be more accommodating.',
    rating: 5,
    approved: true,
  },
  {
    id: 2,
    name: 'Heather B.',
    service: 'Boarding',
    date: 'Dec 14, 2025',
    text: 'Julie and her family were so great with my dog. They went above and beyond to make his stay special, and even stocked up on some of his favorite treats! I got photos and updates of both adventures and down time throughout his stay, and when we picked him up he was so calm and happy. We are beyond thrilled with his experience and will definitely be booking with Julie again!',
    rating: 5,
    approved: true,
  },
  {
    id: 3,
    name: 'Amy L.',
    service: 'Boarding',
    date: 'Oct 27, 2025',
    text: 'Ollie loved spending the day with Julie and her family! Julie sent updates and photos to us throughout Ollie\'s stay. We wouldn\'t hesitate to use her again!',
    rating: 5,
    approved: true,
  },
  {
    id: 4,
    name: 'Amanda F.',
    service: 'Boarding',
    date: 'Oct 07, 2025',
    text: 'Murphy, our 8 month old french bulldog puppy, has the absolute best time with Julie and family! He never wants to leave. While this hurts our feelings, we are very happy to know that he loves the time he spends "on vacation". We are so excited to have found this great family to help us when we have to be away from our boy.',
    rating: 5,
    approved: true,
  },
  {
    id: 5,
    name: 'Amanda F.',
    service: 'Boarding',
    date: 'Sep 18, 2025',
    text: 'Murphy had such a great time with Julie and family. They kept us well informed throughout the stay and sent lots of great pictures to let me know he was having fun. They took him on walks and played ball with him. We will definitely be calling on them again in the future!',
    rating: 5,
    approved: true,
  },
  {
    id: 6,
    name: 'Caitlin H.',
    service: 'Doggy Day Care',
    date: 'May 30, 2025',
    text: 'Absolutely amazing experience! Toby had such a great time and was so well cared for! Would highly recommend and would not hesitate to use again! Julie really made me feel like Toby was part of her family and we are so grateful!',
    rating: 5,
    approved: true,
  },
  {
    id: 7,
    name: 'Lee Z.',
    service: 'Boarding',
    date: 'Apr 16, 2025',
    text: 'This was our first long term boarding with Julie S. and it could not have gone better. Julie and her family were so attentive and loving towards Benji. The daily reports and pictures were very reassuring. There\'s nothing more welcome than feeling like your pet is in good hands while you\'re away.',
    rating: 5,
    approved: true,
  },
  {
    id: 8,
    name: 'Matthew G.',
    service: 'Doggy Day Care',
    date: 'Jan 16, 2025',
    text: 'Julie is one of our go to sitters. Rosie loves her and her family.',
    rating: 5,
    approved: true,
  },
  {
    id: 9,
    name: 'Lorna M.',
    service: 'Boarding',
    date: 'Nov 30, 2024',
    text: 'Julie took great care of Daisy for us while we went away on a trip over Thanksgiving. She kept us updated daily with photos and how she was doing. We would highly recommend Julie. She cared for Daisy exceptionally well 🙂',
    rating: 5,
    approved: true,
  },
  {
    id: 10,
    name: 'Matthew G.',
    service: 'Doggy Day Care',
    date: 'Nov 20, 2024',
    text: 'Rosie did great',
    rating: 5,
    approved: true,
  },
  {
    id: 11,
    name: 'Stephanie A.',
    service: 'Doggy Day Care',
    date: 'Jun 16, 2024',
    text: 'Julie and her family have been taking amazing care of Luca a few days a week for me while I adjust to a new work schedule. They really love him and treat him like their own. I love seeing pictures from their outings and walks! Luca is always excited to see them when I drop him off! As a new puppy mom I was nervous to leave him with anyone but Julie and her family made me feel so at ease. Would 10/10 recommend their services!',
    rating: 5,
    approved: true,
  },
  {
    id: 12,
    name: 'Amy B.',
    service: 'Boarding',
    date: 'Apr 12, 2024',
    text: 'Excellent family - excellent stay. Could not have been more comfortable leaving our dog with this lovely family....',
    rating: 5,
    approved: true,
  },
  {
    id: 13,
    name: 'Colleen O.',
    service: 'Boarding',
    date: 'Apr 03, 2023',
    text: 'The best pet sitters around! This wonderful family took care of our puppy while we were on vacation. They kept our super energetic pup happy with lots of playtime and walks. From all the sweet pictures we received throughout the week we could tell our pup was well-cared for and well-loved. They even offer pick up and drop off to make things that much more stress-free. We\'re so grateful for their care and the peace of mind we had leaving our rambunctious puppy behind. It\'s a relief to know who we\'re going to call next time we need someone take care of our pets while we\'re away. They\'re really the best!',
    rating: 5,
    approved: true,
  },
  {
    id: 14,
    name: 'Morgan N.',
    service: 'Boarding',
    date: 'Feb 07, 2023',
    text: 'We had to go away for a weekend and needed somebody that we could trust with our dog. When we talked to Julie about taking care of her we knew that our dog would be in good hands. She such a good dog sitter that our dog (who is very attached to us) didn\'t even want to leave. I would definitely recommend Julie to anybody looking for a trustworthy dog sitter.',
    rating: 5,
    approved: true,
  },
  {
    id: 15,
    name: 'Karren C.',
    service: 'Boarding',
    date: 'Nov 14, 2022',
    text: 'Julie loves all kinds of animals. She has taken care of my parakeet many times. My parakeet enjoys being with her and her family. She is well taken care of, and she misses them when I bring her home, I recommend her to care of your animal. You will not be sorry.',
    rating: 5,
    approved: true,
  },
  {
    id: 16,
    name: 'Beth B.',
    service: 'Boarding',
    date: 'Nov 12, 2022',
    text: 'I can\'t say enough good about her. Trustworthy. Reliable. Dependable. Caring. She was very loving to our Great Dane. Highly recommend. I would absolutely hire her for all services again.',
    rating: 5,
    approved: true,
  },
  {
    id: 17,
    name: 'Submitted Review',
    service: 'Pending Approval',
    date: 'Pending',
    text: 'Pending owner approval',
    rating: 0,
    approved: false,
  },
]
