import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import EventsListView from './view/events-list.js';
import EditFormView from './view/edit-form.js';
import TripPointView from './view/trip-point.js';
//import AddFormView from './view/add-form.js';
import OptionView from './view/option.js';
import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition, getRoutePrice, getRouteDates, getRouteName} from './utils.js';

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
render(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = new EventsListView();
render(tripEventsElement, tripEventsListElement.getElement(), RenderPosition.BEFOREEND); // отрисовывает контейнер для списка событий
//render(tripEventsListElement.getElement(), new AddFormView().getElement(), RenderPosition.BEFOREEND); // отрисовка формы создания точки


// for (let i = 0; i < TRIP_POINT_COUNT; i++) { // отрисовка точек маршрута
//   render(tripEventsListElement.getElement(), new TripPointView(tripPoints[i]).getElement(), RenderPosition.BEFOREEND);

//   // отрисовки внутри контейнера - списка событий
//   render(tripEventsListElement.getElement(), new EditFormView(tripPoints[i]).getElement(), RenderPosition.BEFOREEND); // отрисовка формы редактирования точки
//   //отрисовка опций в форме редактирования
//   const optionsBlockInEditForm = tripEventsElement.querySelector('.trip-events__item:last-child .event__available-offers');
//   optionsBlockInEditForm.innerHTML = '';
//   for (let j = 0; j < tripPoints[i].offers.length; j++) {
//     render(optionsBlockInEditForm, new OptionView(tripPoints[i].offers[j]).getElement(), RenderPosition.BEFOREEND);
//   }

// }

const renderTripPoint = (tripPointsListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripEditComponent = new EditFormView(tripPoint);

  render(tripPointsListElement, tripPointComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripPointsListElement, tripEditComponent.getElement(), RenderPosition.BEFOREEND);

  const optionsBlockInEditForm = tripEventsElement.querySelector('.trip-events__item:last-child .event__available-offers');
  optionsBlockInEditForm.innerHTML = '';
  for (let j = 0; j < tripPoint.offers.length; j++) {
    render(optionsBlockInEditForm, new OptionView(tripPoint.offers[j]).getElement(), RenderPosition.BEFOREEND);
  }

};

renderTripPoint(tripEventsListElement.getElement(), tripPoints[0]);


// // отрисовки внутри контейнера - списка событий
// render(tripEventsListElement.getElement(), new EditFormView(tripPoints[0]).getElement(), RenderPosition.AFTERBEGIN); // отрисовка формы редактирования точки
// //отрисовка опций в форме редактирования
// const optionsBlockInEditForm = tripEventsElement.querySelector('.event__available-offers');
// optionsBlockInEditForm.innerHTML = '';
// for (let j = 0; j < tripPoints[0].offers.length; j++) {
//   render(optionsBlockInEditForm, new OptionView(tripPoints[0].offers[j]).getElement(), RenderPosition.BEFOREEND);
// }

//const optionsElement = tripEventsListElement.querySelector('.trip-events__item:last-child .event__selected-offers');
//render(optionsElement, createOptionTemplate(), 'beforeend'); // отрисовка опций
//console.log(optionsElement);
