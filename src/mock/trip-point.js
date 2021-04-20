import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDuration = (startDate, finishDate) => { // преобразование длительности путешествия из миллисекунд в человеческий формат
  const DurationInSeconds = (finishDate - startDate) / 1000;

  let daysNumber = Math.trunc(DurationInSeconds / 86400);
  let hoursNumber = Math.trunc(DurationInSeconds / 3600) - daysNumber * 24;
  let minutesNumber = Math.round(DurationInSeconds / 60) - hoursNumber * 60 - daysNumber * 1440;

  daysNumber = daysNumber > 9 ? daysNumber : `0${daysNumber}`;
  hoursNumber = hoursNumber > 9 ? hoursNumber : `0${hoursNumber}`;
  minutesNumber = minutesNumber > 9 ? minutesNumber : `0${minutesNumber}`;

  let duration = `${daysNumber}D ${hoursNumber}H ${minutesNumber}M`;
  duration = daysNumber == 0 ? `${hoursNumber}H ${minutesNumber}M` : duration;
  if (daysNumber == 0 && hoursNumber == 0) {
    duration =  `${minutesNumber}M`;
  }
  return duration;
};

const cities = ['London', 'Paris', 'Beijing', 'Tokyo', 'Melbourne'];
const types = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const photoDescriptions = ['Beautiful Mountain Sea', 'Island archipelago', 'River Delta', 'Desert Storm', 'Snow Mountains'];
const offerTitles = ['Choose meal', 'Choose Upgrade to comfort class', 'Order Uber', 'Personal guide', 'Swiss Table'];
const descriptionSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
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

const getOffers = () => { // создание массива объектов опций
  const offers = [];
  let titles = offerTitles;
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const titleValue = titles[getRandomInteger(0, titles.length - 1)];
    const offer = {
      title: titleValue,
      price: getRandomInteger(50, 200),
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

  return {
    basePrice: getRandomInteger(100, 200),
    dateFrom: startDate,
    dateTo: finishDate,
    destination: {
      description: getDescription(),
      name: cities[getRandomInteger(0, cities.length - 1)],
      pictures: getPictures(),
    },
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getOffers(),
    type: types[getRandomInteger(0, types.length - 1)],
  };
};

// console.log(generateTripPoint());
