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
import {render, RenderPosition, replace} from './utils/render.js';
import {getRoutePrice, getRouteDates, getRouteName} from './utils/route.js';

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

const tripEventsListElement = new EventsListView(); // элемент контейнера для списка событий
render(tripEventsElement, tripEventsListElement.getElement(), RenderPosition.BEFOREEND); // отрисовывает контейнер для списка событий
render(tripEventsListElement.getElement(), new AddFormView().getElement(), RenderPosition.BEFOREEND); // отрисовка формы создания точки

const renderTripPoint = (tripPointsListElement, tripPoint) => { // отрисовывает точки и формы редактирования
  const tripPointComponent = new TripPointView(tripPoint);
  const tripEditComponent = new EditFormView(tripPoint);

  const replacePointToEditor = () => { // заменяет элемент точки маршрута на форму редактирования
    replace(tripEditComponent, tripPointComponent);
    // вставляет опции в форму редактирования...
    const optionsBlockInEditForm = tripEditComponent.getElement().querySelector('.event__available-offers');
    optionsBlockInEditForm.innerHTML = '';

    tripPoint.offers.forEach((element) => {
      render(optionsBlockInEditForm, new OptionView(element).getElement(), RenderPosition.BEFOREEND);
    });

  };

  const replaceEditorToPoint = () => { // заменяет элемент формы редактирования на точку маршрута
    replace(tripPointComponent, tripEditComponent);
  };

  tripPointComponent.setRollupButtonClickHandler(() => { // клик по стрелке закрывает точку маршрута и открывает форму редактирования
    replacePointToEditor();
  });

  tripEditComponent.setRollupButtonClickHandler(() => { // клик по стрелке закрывает форму редактирования и открывает точку маршрута
    replaceEditorToPoint();
  });

  tripEditComponent.setSubmitButtonClickHandler(() => { // клик по кнопке Save закрывает форму редактирования и открывает точку маршрута
    replaceEditorToPoint();
  });

  render(tripPointsListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND); // отрисовывает элементы

};

tripPoints.forEach((element) => {
  renderTripPoint(tripEventsListElement.getElement(), element);
});
