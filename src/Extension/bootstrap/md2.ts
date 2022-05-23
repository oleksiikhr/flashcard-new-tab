// class Card {
//   public repetitions = 0;
//   public interval = 1;
//   public easiness = 2.5;
// }
//
// const card = new Card();
// const quality = 5;
// myFunc(card, quality);
// myFunc(card, quality);
// myFunc(card, 1);
// myFunc(card, quality);
// myFunc(card, quality);
//
// function myFunc(card: Card, quality: number) {
//   let repetitions = card.repetitions;
//   let easiness = card.easiness;
//   let interval = card.interval;
//
//   easiness = Math.max(1.3, easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02));
//
//   if (quality < 3) {
//     repetitions = 0;
//   } else {
//     repetitions++
//   }
//
//   if (repetitions <= 1) {
//     interval = 1;
//   } else if (repetitions === 2) {
//     interval = 6;
//   } else {
//     interval = Math.round(60 * interval * easiness);
//   }
//
//   console.log('easiness', easiness);
//   console.log('repetitions', repetitions);
//   console.log('interval', interval);
//
//   const milliseconds = 60 * 60 * 24 * 1000;
//   console.log('now', new Date());
//   console.log('next', new Date(Date.now() + (milliseconds*interval)));
//
//   card.interval = interval;
//   card.repetitions = repetitions;
//   card.easiness = easiness;
//   console.log('')
// }
