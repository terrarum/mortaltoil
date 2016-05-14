const WEEKS_IN_YEAR = 52,
  WEEK_SPACING = 1,
  WEEK_LIVED = '#000000',
  WEEK_LIVING = '#888888',
  WEEK_REMAINING = '#cccccc';

let ctx,
  years,
  rowsRemainder,
  weekWidth,
  weekHeight,
  weeksDrawn = 0,
  weekLiving = false;

const render = function init(canvas, weeksLived, weeksTotal) {
  ctx = canvas.getContext('2d');

  // Size the canvas.
  canvas.width = 600;
  canvas.height = 800;

  // Calculate correct number of rows.
  years = weeksTotal / WEEKS_IN_YEAR;
  rowsRemainder = weeksTotal % WEEKS_IN_YEAR;
  
  // Rounds rows up if life expectancy is not a whole number.
  years = Math.ceil(years);

  // Draw table.
  weekWidth = Math.floor(canvas.width / WEEKS_IN_YEAR - WEEK_SPACING);
  weekHeight = Math.floor(canvas.height / years - WEEK_SPACING);

  // Set default number of weeks to render per year.
  let weeks = WEEKS_IN_YEAR;

  // Draw squares.
  ctx.beginPath();
  ctx.fillStyle = WEEK_LIVED;
  for (let year = 0; year < years; year++) {
    
    // If the final year is not a full year, give it the correct number of weeks.
    if (year === years - 1) {
      if (rowsRemainder !== 0) {
        weeks = rowsRemainder;
      }
    }
    
    for (let week = 0; week < weeks; week++) {

      // If we've drawn the number of weeks that the user has lived, change the style.
      if (weeksDrawn > weeksLived) {
        if (!weekLiving) {
          ctx.fillStyle = WEEK_LIVING;
          weekLiving = true;
        }
        else {
          ctx.fillStyle = WEEK_REMAINING;
        }
      }

      // Draw a week.
      ctx.fillRect(
        ((weekWidth + WEEK_SPACING) * week) + WEEK_SPACING,
        ((weekHeight + WEEK_SPACING) * year) + WEEK_SPACING,
        weekWidth,
        weekHeight
      );
      weeksDrawn++;
    }
  }
  ctx.closePath();
};

export default {
  render
};