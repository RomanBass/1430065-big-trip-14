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
  constuctor() {
    this._element = null;
  }

  getTemplate(price, date, name) {
    return createInfoAndPriceTemplate(price, date, name);
  }

  getElement(price, date, name) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(price, date, name));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
