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
