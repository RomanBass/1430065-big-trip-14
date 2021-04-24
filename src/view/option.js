import {createElement} from '../utils.js';

const createOptionTemplate = (tripPoint) => {
  const {title, price} = tripPoint;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

export default class Option {
  constuctor() {
    this._element = null;
  }

  getTemplate(tripPoint) {
    return createOptionTemplate(tripPoint);
  }

  getElement(tripPoint) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(tripPoint));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
