import googleSearch from './websearch';

const googleDatabase = [
  'cats.com',
  'souprecipes.com',
  'flowers.com',
  'animals.com',
  'catpictures.com',
  'myfavouritecats.com',
  'myfavouritecats2.com',
];

test('test web search', () => {
  expect(googleSearch('cat', googleDatabase)).toEqual([
    'cats.com',
    'catpictures.com',
    'myfavouritecats.com',
  ]);
});
