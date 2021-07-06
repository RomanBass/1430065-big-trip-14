import SiteMenuView from './view/site-menu.js';
import {createInfoAndPriceTemplate} from './view/info-price.js';
import {createFiltersTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEventsList} from './view/events-list.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createTripPointTemplate} from './view/trip-point.js';
import {generateTripPoint} from './mock/trip-point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import { renderTemplate, renderElement, RenderPosition } from './utils/render.js';

const TRIP_POINT_COUNT = 20;
const tripPoints = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint); // массив точек маршрута

tripPoints.sort((a, b) => { // сортировка точек по dateFrom
  return (a.dateFrom - b.dateFrom);
});

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderElement(menuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // отрисовки..
renderTemplate(tripElement, createInfoAndPriceTemplate(getRoutePrice(tripPoints), getRouteDates(tripPoints), getRouteName(tripPoints)), 'afterbegin');
renderTemplate(filtersElement, createFiltersTemplate(), 'beforeend');
renderTemplate(tripEventsElement, createSortingTemplate(), 'beforeend');
renderTemplate(tripEventsElement, createEventsList(), 'beforeend');

const tripEventsList = tripEventsElement.querySelector('.trip-events__list'); // переменная - контейнер для списка точек

renderTemplate(tripEventsList, createEditFormTemplate(), 'beforeend'); // отрисовка формы создания точки
renderTemplate(tripEventsList, createEditFormTemplate(tripPoints[0]), 'beforeend'); // отрисовка формы редактирования точки

for (let i = 1; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
  renderTemplate(tripEventsList, createTripPointTemplate(tripPoints[i]), 'beforeend');
}

export {tripPoints};
