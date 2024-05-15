const _ = require('lodash');
const fs = require('fs');
const ULID = require('ulidx').monotonicFactory;

const amountPosts = 500000;
const data = [];

const starWarsQuotes = [
  'The dark side of the Force is a pathway to many abilities some consider to be unnatural.',
  'I have waited a long time for this moment, my little green friend. At last, the Jedi are no more.',
  'You were the chosen one! It was said that you would destroy the Sith, not join them!',
  'You were my brother, Anakin. I loved you.',
  "I sense great fear in you, Skywalker. You have hate. You have anger. But you don't use them.",
  'You have allowed this dark lord to twist your mind until now... until now you have become the very thing you swore to destroy.',
  'Execute Order 66.',
  "I am becoming more powerful than any Jedi has ever dreamed of, and I'm doing it for you. To protect you.",
  'This is how liberty dies... with thunderous applause.',
  'So this is how liberty dies. With thunderous applause.',
  "I will do whatever you ask. Just help me save Padmé's life. I can't live without her.",
  'The Republic will be reorganized into the first Galactic Empire! For a safe and secure society!',
  'I will not let this Republic that has stood for a thousand years be split in two. My negotiations will not fail.',
  'Not if anything to say about it, I have!',
  "If you're not with me, then you're my enemy.",
  'Only a Sith deals in absolutes. I will do what I must.',
  'You underestimate my power!',
  "It's over, Anakin! I have the high ground.",
  'You turned her against me!',
  'You have done that yourself.',
  'Liar!',
  "The Jedi turned against me. Don't you turn against me!",
  'From my point of view, the Jedi are evil.',
  'Well then you are lost!',
  'I have failed you, Anakin. I have failed you.',
  'You will try.',
  "Don't make me kill you.",
  'Twisted by the dark side, young Skywalker has become. The boy you trained, gone he is... consumed by Darth Vader.',
  "Anakin, you're breaking my heart! You're going down a path I can't follow!",
  'Your new Empire? My allegiance is to the Republic, to democracy!',
];

for (let x = 0; x < amountPosts; x++) {
  data.push({
    replies: 0,
    id: ULID(150000 + x + Math.floor(Math.random() * amountPosts) + 1),
    creator: {
      id: '245807989095758678',
      username: 'allphii_🔺',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/5490210f-3ab3-4f5a-ab51-d6c00c2d16b5',
    },
    text: _.sample(starWarsQuotes),
    mediaUrl: `https://source.unsplash.com/random/?landscape&${Math.floor(Math.random() * amountPosts) + 1}`,
    mediaType: 'image/jpeg',
    likes: 34,
    likedBySelf: false,
  });
}

fs.writeFileSync(`dataset.json`, JSON.stringify(data, null, 2));
