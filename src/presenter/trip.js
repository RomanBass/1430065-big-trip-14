import SortingView from './view/sorting.js'; // |---> относятся к презентеру маршрута
import PointView from './view/point';
import EditFormView from './view/edit-form.js';
import NoPointView from './view/no-point.js';
import EventsListView from './view/events-list.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition, replace /*remove*/} from './utils/render.js';


export default class Trip {
  constructor() {
    const routeSection = document.querySelector('.trip-events'); // секция маршрута, включая сортировку, точки, формы редактирования и добавления
    this._tripContainer = routeSection; // контейнер маршрута

    this._sortingComponent = new SortingView();
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();

  }

  init(points) {
    this._points = points.slice();

  }

  _renderSort() {

  }

  _renderPoint() {

  }

  _renderPoints() {

  }

  _renderNoPoints() {

  }

  _renderEventsList() {

  }

}
