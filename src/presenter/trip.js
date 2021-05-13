import SortingView from '../view/sorting.js';
import EventsListView from '../view/events-list.js';
import EditFormView from '../view/edit-form.js';
import AddFormView from '../view/add-form.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortingComponent = new SortingView();
    this._eventsListComponent = new EventsListView();
    this._addFormComponent = new AddFormView();
    this._editFormComponent = new EditFormView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND); // отрисовка списка событий
    this._renderTrip();
  }

  _renderSort() {
    render(this._eventsListComponent, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderAddForm() {
    render(this._eventsListComponent, this._addFormComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._eventsListComponent);
    pointPresenter.init(tripPoint);
  }

  _renderPoints() {
    this._tripPoints.slice().forEach((point) => this._renderPoint(point));
  }

  _renderTrip() {
    this._renderSort();
    this._renderAddForm();
    this._renderPoints();
  }
}
