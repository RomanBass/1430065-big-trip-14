import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import EditFormView from '../view/edit-form.js';
import AddFormView from '../view/add-form.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor() {
    const routeSection = document.querySelector('.trip-events');
    this._pointPresenter = {};

    this._tripContainer = routeSection;
    this._sortingComponent = new SortingView();
    this._pointsListComponent = new PointsListView();
    this._addFormComponent = new AddFormView();
    this._editFormComponent = new EditFormView();

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderSort();
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND); // отрисовка списка точек
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderAddForm() {
    render(this._pointsListComponent, this._addFormComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.slice().forEach((point) => this._renderPoint(point));
  }

  _renderTrip() {
    this._renderAddForm();
    this._renderPoints();
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handlePointChange(updatePoint) {
    this._tripPoints = updateItem(this._tripPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }
}
