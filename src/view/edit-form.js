import {possibleOffers} from '../mock/point.js';
import {points} from '../main.js';
import {getCitiesUniqueNames} from '../utils/route.js';
import { BlankPoint } from '../utils/const.js';
import AbstractView from './abstract.js';

const createDataListTemplate = (cityName) => { //возвращает образец ДОМ элемента в datalist наименований городов
  return `<option value="${cityName}"></option>`;
};

const createOptionTemplate = (offer, isChecked) => { //возвращает образец ДОМ элемента опции
  const {title, price} = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked}>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

const createPhotoTemplate = (picture) => { //возвращает образец ДОМ элемента фотографии
  return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
};

const createEditFormTemplate = (point) => {
  const {destination, basePrice, type, dateFrom, dateTo, offers} = point;
  const {description, name, pictures} = destination;

  const getDatalistContentTemplate = (points) => {
    let dataListContentTemplate = '';
    getCitiesUniqueNames(points).forEach((city) => {
      dataListContentTemplate += createDataListTemplate(city);
    });
    return dataListContentTemplate;
  };

  let isOffer = ''; // переменная скрывает блок с опциями, если опции отсутствуют для этой точки
  if (possibleOffers[type].length == 0){
    isOffer = 'visually-hidden';
  }

  const getOptionsTemplate = (possibleOffers) =>  { //возвращает ДОМ элемент возможных опции для точки типа type
    let OptionsTemplate = '';
    possibleOffers[type].forEach((option) => {
      let isChecked = '';
      offers.forEach((offer) => { //чекает те опции, которые имеются в моках точки
        if (option.title === offer.title) {
          isChecked = 'checked';
        }
      });
      OptionsTemplate += createOptionTemplate(option, isChecked);
    });
    return OptionsTemplate;
  };

  const getPhotosTemplate = (pictures) => { //возвращает дом элемент с фотографиями
    let PhotoTemplate = '';
    pictures.forEach((picture) => {
      PhotoTemplate += createPhotoTemplate(picture);
    });
    return PhotoTemplate;
  };

  let isPicture = ''; //переменная скрывает блок фотографий со скролом, если фотографии отсутствуют в данных точки
  if (pictures.length == 0) {
    isPicture = 'visually-hidden';
  }

  let isDestinationInfo = ''; //переменная скрывает блок информации о пункте назначения, если для него отсутствует описание и фотографии
  if (pictures.length == 0 && description == '') {
    isDestinationInfo = 'visually-hidden';
  }

  const isEditForm = { // переменная для определения названия кнопки ресет и нужна ли стрелка закрытия формы
    ROLLUP_BUTTON_CLASS: 'event__rollup-btn',
    RESET_BUTTON_NAME: 'Delete',
    ADD_FORM_CLASS: '',
  };

  if (point.id == BlankPoint.id) { // удаляет стрелку и переименовывает кнопку ресет, если это форма добавления
    isEditForm.ROLLUP_BUTTON_CLASS = 'visually-hidden';
    isEditForm.RESET_BUTTON_NAME = 'Cancel';
    isEditForm.ADD_FORM_CLASS = 'visually-hidden';
  }

  return `<li class="trip-events__item ${isEditForm.ADD_FORM_CLASS}">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">${getDatalistContentTemplate(points)}</datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('DD')}/${dateFrom.format('MM')}/${dateFrom.format('YY')} ${dateFrom.format('HH')}:${dateFrom.format('mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('DD')}/${dateTo.format('MM')}/${dateTo.format('YY')} ${dateTo.format('HH')}:${dateTo.format('mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isEditForm.RESET_BUTTON_NAME}</button>
      <button class="${isEditForm.ROLLUP_BUTTON_CLASS}" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${isOffer}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${getOptionsTemplate(possibleOffers)}</div>
      </section>
      <section class="event__section  event__section--destination ${isDestinationInfo}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container  ${isPicture}">
          <div class="event__photos-tape">${getPhotosTemplate(pictures)}</div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class EditForm extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editFormRollupButtonClickHandler = this._editFormRollupButtonClickHandler.bind(this);
    this._editFormSubmitButtonClickHandler = this._editFormSubmitButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createEditFormTemplate(this._point);
  }

  _editFormRollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormRollupButtonClick();
  }

  setEditFormRollupButtonClickHandler(callback) {
    this._callback.editFormRollupButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editFormRollupButtonClickHandler);
  }

  _editFormSubmitButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormSubmitButtonClick(this._point);
  }

  setEditFormSubmitButtonClickHandler(callback) {
    this._callback.editFormSubmitButtonClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._editFormSubmitButtonClickHandler);
  }
}
