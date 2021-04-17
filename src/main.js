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

const TripPoints = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);
// console.log(TripPoints);

const render = (container, template, place) => { // отрисовывает элементы в контейнеры с учётом расположения
  container.insertAdjacentHTML(place, template);
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
render(tripElement, createInfoAndPriceTemplate(), 'afterbegin');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortingTemplate(), 'beforeend');
render(tripEventsElement, createEventsList(), 'beforeend');

// контейнеры отрисованные в коде выше
const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

// отрисовки внутри срендерЁнных контейнеров
render(tripEventsList, createEditFormTemplate(TripPoints[0]), 'afterbegin'); // отрисовка формы редактирования точки
render(tripEventsList, createAddFormTemplate(), 'beforeend'); // отрисовка формы создания точки

for (let i = 1; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
  render(tripEventsList, createTripPointTemplate(TripPoints[i]), 'beforeend');
  //const optionsElement = tripEventsList.querySelector('.trip-events__item:last-child .event__selected-offers');
  //render(optionsElement, createOptionTemplate(), 'beforeend'); // отрисовка опций
  //console.log(optionsElement);
}

//отрисовка опций в форме редактирования
const optionsBlockInEditForm = tripEventsElement.querySelector('.event__available-offers');
optionsBlockInEditForm.innerHTML = '';
for (let i = 0; i < TripPoints[0].offers.length; i++) {
  render(optionsBlockInEditForm, createOptionTemplate(TripPoints[0].offers[i]), 'beforeend');
}
