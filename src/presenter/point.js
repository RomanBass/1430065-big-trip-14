import EditFormView from '../view/edit-form.js';
import TripPointView from '../view/trip-point.js';
import OptionView from '../view/option.js';
import {render, RenderPosition, replace, remove, createElement, getCitiesUniqueNames} from '../utils/render.js';
import {tripPoints} from '../main.js';
import {possibleOffers} from '../mock/trip-point.js';

const Mode = { // флаг режима отображения точки
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point { // класс точки
  constructor(pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode; //метод изменения режима карточки: дефолт или редактирование

    this._pointComponent = null;
    this._editFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointToEditClick = this._handlePointToEditClick.bind(this); // привязка контекста к this
    this._handleEditToPointClick = this._handleEditToPointClick.bind(this); // привязка контекста к this
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this); // привязка контекста к this
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditFormComponent = this._editFormComponent;

    this._pointComponent = new TripPointView(point);
    //this._editFormComponent = new EditFormView(point);

    this._pointComponent.setRollupButtonClickHandler(this._handlePointToEditClick);
    this._pointComponent.setFavoriteButtonClickHandler(this._handleFavoriteButtonClick);

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditorToPoint();
    }
  }

  _replacePointToEditor() { // заменяет элемент точки маршрута на форму редактирования
    replace(this._editFormComponent, this._pointComponent);

    const dataList = this._editFormComponent.getDataListBlock(); // код для генерации элементов datalist...
    const citiesNames = getCitiesUniqueNames(tripPoints);
    citiesNames.forEach((cityName) => {
      render(dataList, createElement(`<option value="${cityName}"></option>`), RenderPosition.BEFOREEND);
    });

    const optionsBlock = this._editFormComponent.getOptionsBlock(); // код для генерации опций...
    possibleOffers[this._point.type].forEach((element) => { // отрисовка всех доступных опций

      let isChecked = ''; // добавление атрибута чекет выбранным опциям...
      this._point.offers.forEach((offer) => {
        if (element.title === offer.title) {
          isChecked = 'checked';
        }
      });

      render(optionsBlock, new OptionView(element, isChecked).getElement(), RenderPosition.BEFOREEND);
    });

    const picturesContainer = this._editFormComponent.getPhotosBlock(); // код для генерации картинок...

    if (this._point.destination.pictures.length == 0) { // убирает горизонтальный скролл, если у точки нет картинок
      picturesContainer.parentNode.classList.add('visually-hidden');
    }

    this._point.destination.pictures.forEach((element) => {
      render(picturesContainer, createElement(`<img class="event__photo" src="${element.src}" alt="${element.description}">`), RenderPosition.BEFOREEND);
    });  // ...код для генерации картинок

    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditorToPoint() { // заменяет элемент формы редактирования на точку маршрута
    replace(this._pointComponent, this._editFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _handlePointToEditClick() {
    this._editFormComponent = new EditFormView(this._point); // обновляется форма редактирования, чтобы не дублировались картинки, опции и datalist при неоднократном открытии/закрытии
    this._editFormComponent.setRollupButtonClickHandler(this._handleEditToPointClick); // добавляется обработчик в новую форму редактирования
    this._editFormComponent.setSubmitButtonClickHandler(this._handleEditToPointClick); // добавляется обработчик в новую форму редактирования
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
  }
}
