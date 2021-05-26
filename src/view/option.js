import AbstractView from './abstract.js';

const createOptionTemplate = (tripPoint, isChecked) => {
  const {title, price} = tripPoint;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked}>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

export default class Option extends AbstractView{
  constructor(tripPoint, isChecked) {
    super();
    this._tripPoint = tripPoint;
    this._isChecked = isChecked;
  }

  getTemplate() {
    return createOptionTemplate(this._tripPoint, this._isChecked);
  }
}
