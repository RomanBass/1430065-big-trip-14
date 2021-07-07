import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import EventListView from './view/events-list.js';
import {generateTripPoint} from './mock/trip-point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {renderElement, RenderPosition} from './utils/render.js';
import TripPointView from './view/trip-point.js';
import EditFormView from './view/edit-form.js';

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

renderElement(menuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // отрисовки компонентов...
renderElement(tripElement, new InfoAndPriceView(getRoutePrice(tripPoints), getRouteDates(tripPoints), getRouteName(tripPoints)).getElement(), RenderPosition.AFTERBEGIN);
renderElement(filtersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new EventListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEventsElement.querySelector('.trip-events__list'); // переменная - контейнер для списка точек

renderElement(tripEventsList, new EditFormView().getElement(), RenderPosition.BEFOREEND); // отрисовка формы создания точки
renderElement(tripEventsList, new EditFormView(tripPoints[0]).getElement(), RenderPosition.BEFOREEND); // отрисовка формы редактирования точки

for (let i = 1; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
  renderElement(tripEventsList, new TripPointView(tripPoints[i]).getElement(), RenderPosition.BEFOREEND);
}

export {tripPoints};
