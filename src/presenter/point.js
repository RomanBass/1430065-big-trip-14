import PointView from '../view/point';
import EditFormView from '../view/edit-form.js';
import { render, RenderPosition, replace } from '../utils/render';

export default class Point {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;
    this._pointComponent = null;
    this._editFormComponent = null;

    this._handlePointToEditFormClick = this._handlePointToEditFormClick.bind(this);
    this._handleEditFormToPointClick = this._handleEditFormToPointClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._editFormComponent = new EditFormView(point);

    this._pointComponent.setPointRollupButtonClickHandler(this._handlePointToEditFormClick);
    this._editFormComponent.setEditFormRollupButtonClickHandler(this._handleEditFormToPointClick);
    this._editFormComponent.setEditFormSubmitButtonClickHandler(this._handleEditFormToPointClick);

    render(this._eventListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._editFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handlePointToEditFormClick() { // клик по стрелке закрывает точку маршрута и открывает форму редактирования
    this._replacePointToForm();
  }

  _handleEditFormToPointClick() { // клик по стрелке закрывает форму редактирования и открывает точку маршрута
    this._replaceEditFormToPoint();
  }

}
