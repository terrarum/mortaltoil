require('./main.scss');

import tableRenderer from './modules/tableRenderer';

const WEEKS_IN_YEAR = 52,
  MS_IN_WEEK = 604800000;

let form = document.querySelector('.js-form'),
  inputDay = document.querySelector('.js-day'),
  inputMonth = document.querySelector('.js-month'),
  inputYear = document.querySelector('.js-year'),
  inputExpectancy = document.querySelector('.js-expectancy'),
  canvas = document.querySelector('.js-canvas'),
  pageDetails = document.querySelector('.js-details'),
  pageResult = document.querySelector('.js-result'),
  day,
  month,
  year,
  expectancyYears,
  expectancyWeeks,
  weeksLived,
  dateStart,
  dateCurrent,
  dateDiff;

const getValues = function getValues() {
  day = inputDay.value;
  month = inputMonth.value;
  year = inputYear.value;
  expectancyYears = inputExpectancy.value
};

const weeksSinceDate = function weeksSinceDate(year, month, day) {
  dateStart = new Date(year + '-' + month + '-' + day);
  dateCurrent = new Date();
  dateDiff = dateCurrent - dateStart;
  return dateDiff / MS_IN_WEEK;
};

const buildTable = function buildTable() {
  // Number of weeks in lifespan.
  expectancyWeeks = expectancyYears * WEEKS_IN_YEAR;

  // Number of weeks since birth.
  weeksLived = weeksSinceDate(year, month, day);

  tableRenderer.render(canvas, weeksLived, expectancyWeeks);
  pageDetails.classList.remove('is-active');
  pageResult.classList.add('is-active');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getValues();
  buildTable();
});

// For testing
form.dispatchEvent(new Event('submit'));