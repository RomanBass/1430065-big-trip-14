import EditFormView from '../view/edit-form.js';
import TripPointView from '../view/trip-point.js';
import OptionView from '../view/option.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointsListContainer) {
    this._pointListContainer = pointsListContainer;

    this._pointComponent = null;
    this._editFormComponent = null;

    this._handlePointToEditClick = this._handlePointToEditClick.bind(this);
    this._handleEditToPointClick = this._handleEditToPointClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new TripPointView(point);
    this._editFormComponent = new EditFormView(point);

    this._pointComponent.setRollupButtonClickHandler(this._handlePointToEditClick);
    this._editFormComponent.setRollupButtonClickHandler(this._handleEditToPointClick);
    this._editFormComponent.setSubmitButtonClickHandler(this._handleEditToPointClick);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToEditor() { // заменяет элемент точки маршрута на форму редактирования
    replace(this._editFormComponent, this._pointComponent);
    // вставляет опции в форму редактирования...
    const optionsBlockInEditForm = this._editFormComponent.getElement().querySelector('.event__available-offers');
    optionsBlockInEditForm.innerHTML = '';
    this._point.offers.forEach((element) => {
      render(optionsBlockInEditForm, new OptionView(element).getElement(), RenderPosition.BEFOREEND);
    });
  }

  _replaceEditorToPoint() { // заменяет элемент формы редактирования на точку маршрута
    replace(this._pointComponent, this._editFormComponent);
  }

  _handlePointToEditClick() {
    this._replacePointToEditor();
  }

  _handleEditToPointClick() {
    this._replaceEditorToPoint();
  }
}
