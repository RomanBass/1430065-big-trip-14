import AbstractView from './abstract.js';

const createOptionTemplate = (tripPoint) => {
  const {title, price} = tripPoint;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

export default class Option extends AbstractView{
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;
  }

  getTemplate() {
    return createOptionTemplate(this._tripPoint);
  }
}
