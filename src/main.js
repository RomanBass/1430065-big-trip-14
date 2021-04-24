import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import EventsListView from './view/events-list.js';
import EditFormView from './view/edit-form.js';
import TripPointView from './view/trip-point.js';
import AddFormView from './view/add-form.js';
import OptionView from './view/option.js';
import {generateTripPoint} from './mock/trip-point.js';
import {renderElement, RenderPosition, getRoutePrice, getRouteDates, getRouteName} from './utils.js';

const TRIP_POINT_COUNT = 15;

const tripPoints = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint); // массив точек маршрута

tripPoints.sort((a, b) => { // сортировка по dateFrom
  return (a.dateFrom - b.dateFrom);
});

// крупные блоки
const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

// контейнеры...
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

// отрисовки
renderElement(menuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripElement, new InfoAndPriceView().getElement(getRoutePrice(tripPoints), getRouteDates(tripPoints), getRouteName(tripPoints)), RenderPosition.AFTERBEGIN);
renderElement(filtersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new EventsListView().getElement(), RenderPosition.BEFOREEND);

// контейнеры отрисованные в коде выше
const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

// отрисовки внутри срендерЁнных контейнеров
renderElement(tripEventsList, new EditFormView().getElement(tripPoints[0]), RenderPosition.AFTERBEGIN); // отрисовка формы редактирования точки
renderElement(tripEventsList, new AddFormView().getElement(), RenderPosition.BEFOREEND); // отрисовка формы создания точки

for (let i = 1; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
  renderElement(tripEventsList, new TripPointView().getElement(tripPoints[i]), RenderPosition.BEFOREEND);
  //const optionsElement = tripEventsList.querySelector('.trip-events__item:last-child .event__selected-offers');
  //render(optionsElement, createOptionTemplate(), 'beforeend'); // отрисовка опций
  //console.log(optionsElement);
}

//отрисовка опций в форме редактирования
const optionsBlockInEditForm = tripEventsElement.querySelector('.event__available-offers');
optionsBlockInEditForm.innerHTML = '';
for (let i = 0; i < tripPoints[0].offers.length; i++) {
  renderElement(optionsBlockInEditForm, new OptionView().getElement(tripPoints[0].offers[i]), RenderPosition.BEFOREEND);
}
