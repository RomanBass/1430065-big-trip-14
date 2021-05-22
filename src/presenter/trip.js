import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import EditFormView from '../view/edit-form.js';
import AddFormView from '../view/add-form.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor() {
    const routeSection = document.querySelector('.trip-events'); // секция маршрута, включая сортировку, точки, формы редактирования и добавления
    this._pointPresenter = {}; // объявление объекта презенторов точек

    this._tripContainer = routeSection; // контейнер маршрута
    this._sortingComponent = new SortingView(); // сортировка
    this._pointsListComponent = new PointsListView(); // список точек
    this._addFormComponent = new AddFormView(); // форма добавления
    this._editFormComponent = new EditFormView(); // форма редактирования

    this._handlePointChange = this._handlePointChange.bind(this); // привязка контекста к this
    this._handleModeChange = this._handleModeChange.bind(this); // привязка контекста к this
  }

  init(tripPoints) { // инициализация методов...
    this._tripPoints = tripPoints.slice(); // для клонирования массива, т.к. копирование происходит по ссылке
    this._renderSort(); // отрисовка элемента сортировки
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND); // отрисовка списка точек
    this._renderTrip(); // отрисовка маршрута - точек и формы добавления
  }

  _clearPointsList() { // удаление всех точек
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handlePointChange(updatePoint) { // обработчик изменение данных точки
    this._tripPoints = updateItem(this._tripPoints, updatePoint); // функция замены элемента в массиве
    this._pointPresenter[updatePoint.id].init(updatePoint); // функция инициализации массива с обновлённым элементом
  }

  _handleModeChange() { // закрывает лишние формы редактирования оставляя открытой не более одной
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() { // отрисовка элемента сортировки
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderAddForm() { // отрисовка формы добавления точки
    render(this._pointsListComponent, this._addFormComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(tripPoint) { // отрисовка точки
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _renderPoints() { // отрисовка точек
    this._tripPoints.slice().forEach((point) => this._renderPoint(point));
  }

  _renderTrip() { // отрисовка маршрута
  // this._renderAddForm();
    this._renderPoints();
  }

}
