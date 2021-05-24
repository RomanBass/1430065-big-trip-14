import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition} from './utils/render.js';
import {getRoutePrice, getRouteDates, getRouteName} from './utils/route.js';
import TripPresenter from './presenter/trip';

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
render(menuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripElement, new InfoAndPriceView(getRoutePrice(tripPoints), getRouteDates(tripPoints), getRouteName(tripPoints)).getElement(), RenderPosition.AFTERBEGIN);
render(filtersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(tripPoints);

export {tripPoints};
