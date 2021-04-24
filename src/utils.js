export const getRandomInteger = (a = 0, b = 1) => {
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

// export const renderTemplate = (container, template, place) => { // отрисовывает элементы в контейнеры с учётом расположения
//   container.insertAdjacentHTML(place, template);
// };

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRoutePrice = (array) => { // вернуть стоимость маршрута
  let routePrice = 0;
  array.forEach((element) => {
    routePrice += element.basePrice;
  });
  return routePrice;
};

export const getRouteDates = (array) => { // вернуть время маршрута
  let routeDates = `${array[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${array[array.length - 1].dateTo.format('MMM DD')}`;
  if (array[0].dateFrom.format('MMM') == array[array.length - 1].dateTo.format('MMM')) {
    routeDates = `${array[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${array[array.length - 1].dateTo.format('DD')}`;
  }
  return routeDates;
};

export const getRouteName = (array) => { // вернуть имя маршрута
  let routeName = `${array[0].destination.name} &mdash; ... &mdash; ${array[array.length - 1].destination.name}` ;
  if (array.length == 3) {
    routeName = `${array[0].destination.name} &mdash; ${array[1].destination.name}  &mdash; ${array[2].destination.name}`;
  } else if (array.length == 2) {
    routeName = `${array[0].destination.name} &mdash; ${array[1].destination.name}`;
  } else if (array.length == 1) {
    routeName = `${array[0].destination.name}`;
  }
  return routeName;
};
