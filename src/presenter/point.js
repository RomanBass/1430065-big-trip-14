import PointView from '../view/point';
import EditFormView from '../view/edit-form.js';
import { render, RenderPosition, replace, remove } from '../utils/render';

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

    const prevPointComponent = this._pointComponent;
    const prevEditFormComponent = this._editFormComponent;

    this._pointComponent = new PointView(point);
    this._editFormComponent = new EditFormView(point);

    this._pointComponent.setPointRollupButtonClickHandler(this._handlePointToEditFormClick);
    this._editFormComponent.setEditFormRollupButtonClickHandler(this._handleEditFormToPointClick);
    this._editFormComponent.setEditFormSubmitButtonClickHandler(this._handleEditFormToPointClick);

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this._eventListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEditFormComponent.getElement())) {
      replace(this._editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editFormComponent);
  }

  _replacePointToForm() {
    replace(this._editFormComponent, this._pointComponent.getElement());
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
