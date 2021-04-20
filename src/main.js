import {createSiteMenuTemplate} from './view/site-menu.js';
import {createInfoAndPriceTemplate} from './view/info-price.js';
import {createFiltersTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEventsList} from './view/events-list.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createTripPointTemplate} from './view/trip-point.js';
import {createAddFormTemplate} from './view/add-form.js';
//import {createSelectedOptionTemplate} from './view/selected-option.js';
import {createOptionTemplate} from './view/option.js';
import {generateTripPoint} from './mock/trip-point.js';

const TRIP_POINT_COUNT = 15;

const tripPoints = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint); // массив точек маршрута

tripPoints.sort((a, b) => { // сортировка по dateFrom
  return (a.dateFrom - b.dateFrom);
});

const render = (container, template, place) => { // отрисовывает элементы в контейнеры с учётом расположения
  container.insertAdjacentHTML(place, template);
};

const getRoutePrice = (array) => { // вернуть стоимость маршрута
  let routePrice = 0;
  array.forEach((element) => {
    routePrice += element.basePrice;
  });
  return routePrice;
};

const getRouteDates = (array) => { // вернуть время маршрута
  let routeDates = `${array[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${array[array.length - 1].dateTo.format('MMM DD')}`;
  if (array[0].dateFrom.format('MMM') == array[array.length - 1].dateTo.format('MMM')) {
    routeDates = `${array[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${array[array.length - 1].dateTo.format('DD')}`;
  }
  return routeDates;
};

const getRouteName = (array) => { // вернуть имя маршрута
  let routeName = `${array[0].destination.name} ... ${array[array.length - 1].destination.name}` ;
  if (array.length == 3) {
    routeName = `${array[0].destination.name} &mdash; ${array[1].destination.name}  &mdash; ${array[2].destination.name}`;
  } else if (array.length == 2) {
    routeName = `${array[0].destination.name} &mdash; ${array[1].destination.name}`;
  } else if (array.length == 1) {
    routeName = `${array[0].destination.name}`;
  }
  return routeName;
};

// крупные блоки
const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

// контейнеры...
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

// отрисовки
render(menuElement, createSiteMenuTemplate(), 'beforeend');
render(tripElement, createInfoAndPriceTemplate(getRoutePrice(tripPoints), getRouteDates(tripPoints), getRouteName(tripPoints)), 'afterbegin');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortingTemplate(), 'beforeend');
render(tripEventsElement, createEventsList(), 'beforeend');

// контейнеры отрисованные в коде выше
const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

// отрисовки внутри срендерЁнных контейнеров
render(tripEventsList, createEditFormTemplate(tripPoints[0]), 'afterbegin'); // отрисовка формы редактирования точки
render(tripEventsList, createAddFormTemplate(), 'beforeend'); // отрисовка формы создания точки

for (let i = 1; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
  render(tripEventsList, createTripPointTemplate(tripPoints[i]), 'beforeend');
  //const optionsElement = tripEventsList.querySelector('.trip-events__item:last-child .event__selected-offers');
  //render(optionsElement, createOptionTemplate(), 'beforeend'); // отрисовка опций
  //console.log(optionsElement);
}

//отрисовка опций в форме редактирования
const optionsBlockInEditForm = tripEventsElement.querySelector('.event__available-offers');
optionsBlockInEditForm.innerHTML = '';
for (let i = 0; i < tripPoints[0].offers.length; i++) {
  render(optionsBlockInEditForm, createOptionTemplate(tripPoints[0].offers[i]), 'beforeend');
}
