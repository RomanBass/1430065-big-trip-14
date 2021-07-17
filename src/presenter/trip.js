import SortingView from '../view/sorting.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortingComponent = new SortingView();
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();
    this._pointPresenters = {};

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

    if (points.length == 0) { // если точек нет, то отображается заглушка
      this._renderNoPoints();
    } else {
      this._renderSort();
      this._renderEventsList();
      this._renderPoints();
    }
  }

  _clearPointsList() { // удаляет все точки
    Object
      .values(this._pointPresenters)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }

  _handlePointChange(updatedPoint) { // изменяет данные точки
    this._points = updateItem(this._points, updatedPoint); // заменяет в моках точек объект с данными у изменённой точки
    this._pointPresenters[updatedPoint.id].init(updatedPoint); // инициализирует презентер точки с обновлёнными данными
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListComponent);
    pointPresenter.init(point);
    this._pointPresenters[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

}
