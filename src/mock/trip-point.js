import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';

const cities = ['London', 'Paris', 'Beijing', 'Tokyo', 'Melbourne'];
const types = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const photoDescriptions = ['Beautiful Mountain Sea', 'Island archipelago', 'River Delta', 'Desert Storm', 'Snow Mountains'];

const OfferTitles = {
  taxi: ['Taxi-Option-1', 'Taxi-Option-2', 'Taxi-Option-3', 'Taxi-Option-4', 'Taxi-Option-5'],
  bus: ['Bus-Option-1', 'Bus-Option-2', 'Bus-Option-3', 'Bus-Option-4', 'Bus-Option-5'],
  train: ['Train-Option-1', 'Train-Option-2', 'Train-Option-3', 'Train-Option-4', 'Train-Option-5'],
  ship: ['Ship-Option-1', 'Ship-Option-2', 'Ship-Option-3', 'Ship-Option-4', 'Ship-Option-5'],
  transport: ['Transport-Option-1', 'Transport-Option-2', 'Transport-Option-3', 'Transport-Option-4', 'Transport-Option-5'],
  drive: ['Drive-Option-1', 'Drive-Option-2', 'Drive-Option-3', 'Drive-Option-4', 'Drive-Option-5'],
  flight: ['Flight-Option-1', 'Flight-Option-2', 'Flight-Option-3', 'Flight-Option-4', 'Flight-Option-5'],
  'check-in': ['CheckIn-Option-1', 'CheckIn-Option-2', 'CheckIn-Option-3', 'CheckIn-Option-4', 'CheckIn-Option-5'],
  sightseeing: ['Sightseeng-Option-1', 'Sightseeng-Option-2', 'Sightseeng-Option-3', 'Sightseeng-Option-4', 'Sightseeng-Option-5'],
  restaurant: ['Restaurant-Option-1', 'Restaurant-Option-2', 'Restaurant-Option-3', 'Restaurant-Option-4', 'Restaurant-Option-5'],
};

const getPossibleOffers = (Titles) => { // формирует массив объектов возможных опций на основе объекта заголовков опций и массива типов точек
  Titles = JSON.parse(JSON.stringify(Titles));
  for (const key in Titles) {
    Titles[key].forEach((element) => {
      Titles[key][Titles[key].indexOf(element)] = {title: Titles[key][Titles[key].indexOf(element)], price: getRandomInteger(50, 100)};
    });
  }

  return Titles;
};

export const possibleOffers = (getPossibleOffers(OfferTitles));
console.log(possibleOffers);

const descriptionSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finiSightseeng eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam fauciSightseeng, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapiSightseeng.',
  'In rutrum ac purus sit amet tempus.'];

const getPictures = () => { // создание массива объектов фотографий с описаниями
  const pictures = [];
  let descriptions = photoDescriptions;
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const descriptionValue = descriptions[getRandomInteger(0, descriptions.length - 1)];
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10000)}`,
      description: descriptionValue,
    };
    pictures.push(picture);
    descriptions = descriptions.filter((element) => {
      return element !== descriptionValue;
    });
  }
  return pictures;
};

const getOffers = (type) => { // создание массива объектов опций
  const offers = [];
  let titles = OfferTitles[type];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const titleValue = titles[getRandomInteger(0, titles.length - 1)];
    const offer = {
      title: titleValue,
      price: getRandomInteger(50, 100),
    };
    offers.push(offer);
    titles = titles.filter((element) => {
      return element !== titleValue;
    });
  }
  return offers;
};

const getDescription = () => { // создание описания соединением случайно выбираемых предложений из их массива
  let description = '';
  let sentances = descriptionSentences;
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    const descriptionValue = sentances[getRandomInteger(sentances.length - 1)];
    description += i == 0 ? descriptionValue
      : ' ' + descriptionValue;
    sentances = sentances.filter((element) => {
      return element !== descriptionValue;
    });
  }
  return description;
};

export const makeFavorite = (isFavorite) => { // добавляется к точке идентификатор "избранная", делая звёздочку жёлтой
  return isFavorite === true ? 'active' : '';
};

export const generateTripPoint = () => {
  const startDate = dayjs().add(getRandomInteger(0, 10), 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute');
  const finishDate = startDate.add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute');
  const getType = () => {
    return types[getRandomInteger(0, types.length - 1)];
  };
  const TYPE = getType();

  return {
    basePrice: getRandomInteger(100, 200),
    dateFrom: startDate,
    dateTo: finishDate,
    destination: {
      description: getDescription(),
      name: cities[getRandomInteger(0, cities.length - 1)],
      pictures: getPictures(),
    },
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getOffers(TYPE),
    type: TYPE,
  };
};


// const getPossibleOffers = (Titles, types) => { // формирует массив объектов возможных опций на основе объекта заголовков опций и массива типов точек
//   Titles = JSON.parse(JSON.stringify(Titles));
//   for (const key in Titles) {
//     Titles[key].forEach((element) => {
//       Titles[key][Titles[key].indexOf(element)] = {title: Titles[key][Titles[key].indexOf(element)], price: getRandomInteger(50, 100)};
//     });
//   }

//   const possibleOffers = [];
//   let offer = {};

//   types.forEach((element) => {
//     offer = JSON.parse(JSON.stringify(offer));
//     offer['type'] = element;
//     offer['offers'] = Titles[element];
//     possibleOffers.push(offer);
//   });

//   return possibleOffers;
// };
