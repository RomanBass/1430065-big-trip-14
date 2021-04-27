import {createElement} from '../utils.js';

const createInfoAndPriceTemplate = (price, date, name) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${name}</h1>
    <p class="trip-info__dates">${date}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>
</section>`;
};

export default class InfoAndPrice {
  constructor(price, date, name) {
    this._price = price;
    this._date = date;
    this._name = name;
    this._element = null;
  }

  getTemplate() {
    return createInfoAndPriceTemplate(this._price, this._date, this._name);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
