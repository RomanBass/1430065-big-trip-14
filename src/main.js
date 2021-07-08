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

const renderPoint = (tripEventsList, point) => {
  const pointComponent = new PointView(point);
  const editFormComponent = new EditFormView(point);

  const replacePointToForm = () => {
    tripEventsList.replaceChild(editFormComponent.getElement(), pointComponent.getElement());
  };

  const replaceEditFormToPoint = () => {
    tripEventsList.replaceChild(pointComponent.getElement(), editFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => { // клик по стрелке закрывает точку маршрута и открывает форму редактирования
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => { // клик по стрелке закрывает форму редактирования и открывает точку маршрута
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.getElement().querySelector('form').addEventListener('submit', (evt) => { // клик по кнопке Save закрывает форму редактирования и открывает точку маршрута
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render (tripEventsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 1; i < POINTS_COUNT; i++) { // отрисовка точек маршрута
  renderPoint(tripEventsList, points[i]);
}

export {points};
