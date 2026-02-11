exports.getPreviousDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};


const normalizeDateWithOffset = (date = new Date(), days = 0) => {
  const d = new Date(date);   // clone
  d.setHours(0, 0, 0, 0);     // normalize first
  d.setDate(d.getDate() - days); // subtract days
  return d;
};


exports.getAllDates = (days) => {
  const today = new Date();
  let dates = []
  
  for (let index = days -1 ; index >= 0 ; index--) {
    date = this.getPreviousDate(index);
    dates.push(normalizeDateWithOffset(date , 0).toISOString().split("T")[0]);
    
  }

  return dates
}