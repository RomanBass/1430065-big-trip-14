export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getCitiesUniqueNames = (points) => { // выдаёт отсортированный массив уникальных названий городов из массива точек маршрута
  let citiesNames = new Set();
  points.forEach((point) => {
    citiesNames.add(point.destination.name);
  });
  citiesNames = Array.from(citiesNames).sort(); // преобразовывает сет в массив, чтобы отсортировать данные по алфавиту
  return citiesNames;
};
