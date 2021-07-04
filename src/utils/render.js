export const getCitiesUniqueNames = (tripPoints) => { // выдаёт отсортированный массив уникальных названий городов из массива точек маршрута
  let citiesNames = new Set();
  tripPoints.forEach((point) => {
    citiesNames.add(point.destination.name);
  });
  citiesNames = Array.from(citiesNames).sort(); // преобразовывает сет в массив, чтобы отсортировать данные по алфавиту
  return citiesNames;
};
