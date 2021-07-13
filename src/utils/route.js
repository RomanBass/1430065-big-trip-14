const getRoutePrice = (points) => { // вернуть стоимость маршрута
  let routePrice = 0;
  points.forEach((point) => {
    routePrice += point.basePrice; // добавление стоимости поездки
    point.offers.forEach((offer) => { // добавление стоимости выбранных опций
      routePrice += offer.price;
    });
  });
  return routePrice;
};

const getRouteDates = (point) => { // вернуть время маршрута
  let routeDates = `${point[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${point[point.length - 1].dateTo.format('MMM DD')}`;
  if (point[0].dateFrom.format('MMM') == point[point.length - 1].dateTo.format('MMM')) {
    routeDates = `${point[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${point[point.length - 1].dateTo.format('DD')}`;
  }
  return routeDates;
};

const getRouteName = (point) => { // вернуть имя маршрута
  let routeName = `${point[0].destination.name} ... ${point[point.length - 1].destination.name}` ;
  if (point.length == 3) {
    routeName = `${point[0].destination.name} &mdash; ${point[1].destination.name}  &mdash; ${point[2].destination.name}`;
  } else if (point.length == 2) {
    routeName = `${point[0].destination.name} &mdash; ${point[1].destination.name}`;
  } else if (point.length == 1) {
    routeName = `${point[0].destination.name}`;
  }
  return routeName;
};


const getCitiesUniqueNames = (points) => { // выдаёт отсортированный массив уникальных названий городов из массива точек маршрута
  let citiesNames = new Set();
  points.forEach((point) => {
    citiesNames.add(point.destination.name);
  });
  citiesNames = Array.from(citiesNames).sort(); // преобразовывает сет в массив, чтобы отсортировать данные по алфавиту
  return citiesNames;
};

export {getRoutePrice, getRouteName, getRouteDates, getCitiesUniqueNames};
