import SortingView from '../view/sorting.js'; // |---> относятся к презентеру маршрута
import PointView from '../view/point';
import EditFormView from '../view/edit-form.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import {render, RenderPosition, replace /*remove*/} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortingComponent = new SortingView();
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();
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

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const editFormComponent = new EditFormView(point);

    const replacePointToForm = () => {
      replace(editFormComponent, pointComponent);
    };

    const replaceEditFormToPoint = () => {
      replace(pointComponent, editFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setPointRollupButtonClickHandler(() => { // клик по стрелке закрывает точку маршрута и открывает форму редактирования
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setEditFormRollupButtonClickHandler(() => { // клик по стрелке закрывает форму редактирования и открывает точку маршрута
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setEditFormSubmitButtonClickHandler((evt) => { // клик по кнопке Save закрывает форму редактирования и открывает точку маршрута
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._eventsListComponent, pointComponent, RenderPosition.BEFOREEND);
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
