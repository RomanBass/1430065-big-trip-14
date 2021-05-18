import EditFormView from '../view/edit-form.js';
import TripPointView from '../view/trip-point.js';
import OptionView from '../view/option.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
//import {makeFavorite} from '../mock/trip-point.js';

export default class Point {
  constructor(pointsListContainer, changeData) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this._editFormComponent = null;

    this._handlePointToEditClick = this._handlePointToEditClick.bind(this); // привязка контекста
    this._handleEditToPointClick = this._handleEditToPointClick.bind(this); // привязка контекста
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this); // привязка контекста
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditFormComponent = this._editFormComponent;

    this._pointComponent = new TripPointView(point);
    this._editFormComponent = new EditFormView(point);

    this._pointComponent.setRollupButtonClickHandler(this._handlePointToEditClick);
    this._editFormComponent.setRollupButtonClickHandler(this._handleEditToPointClick);
    this._editFormComponent.setSubmitButtonClickHandler(this._handleEditToPointClick);
    this._pointComponent.setFavoriteButtonClickHandler(this._handleFavoriteButtonClick);

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointsListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsListContainer.getElement().contains(prevEditFormComponent.getElement())) {
      replace(this._editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editFormComponent);
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

  _handleFavoriteButtonClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {isFavorite: !this._point.isFavorite},
      ),
    );

    //console.log(makeFavorite(!this._point.isFavorite));
  }
}
