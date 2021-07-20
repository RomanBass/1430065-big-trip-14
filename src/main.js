import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import { sortByDateFrom, sortByPrice, sortByDuration } from './utils/route.js';

const POINTS_COUNT = 20;
const points = new Array(POINTS_COUNT).fill().map(generatePoint); // массив точек маршрута

points.sort(sortByDateFrom);

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(menuElement, new SiteMenuView(), RenderPosition.BEFOREEND); // отрисовки компонентов...
render(filtersElement, new FilterView(), RenderPosition.BEFOREEND);

if (points.length !== 0) { // элемент с информацией отрисовывается, только если в данных нет ни одной точки
  render(tripElement, new InfoAndPriceView(getRoutePrice(points), getRouteDates(points), getRouteName(points)), RenderPosition.AFTERBEGIN);
}

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(points);

export {points};


const sort = document.querySelector('.trip-sort');
sort.addEventListener('change', (evt) => {
  console.log(evt.target.value);
});
