import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import EventListView from './view/events-list.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition} from './utils/render.js';
import PointView from './view/point';
import EditFormView from './view/edit-form.js';

const POINTS_COUNT = 20;
const points = new Array(POINTS_COUNT).fill().map(generatePoint); // массив точек маршрута

points.sort((a, b) => { // сортировка точек по dateFrom
  return (a.dateFrom - b.dateFrom);
});

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(menuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // отрисовки компонентов...
render(tripElement, new InfoAndPriceView(getRoutePrice(points), getRouteDates(points), getRouteName(points)).getElement(), RenderPosition.AFTERBEGIN);
render(filtersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEventsElement.querySelector('.trip-events__list'); // переменная - контейнер для списка точек

const renderPoint = (tripEventsList, Point) => {
  const pointComponent = new PointView(Point);
  const editFormComponent = new EditFormView(Point);
  render (tripEventsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 1; i < POINTS_COUNT; i++) { // отрисовка точек маршрута
  renderPoint(tripEventsList, points[i]);
}

export {points};
