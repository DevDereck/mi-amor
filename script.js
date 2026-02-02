const startDate = new Date('2024-11-28T00:00:00');

function computeDuration(from, to){
  // compute years, months, days, hours, minutes, seconds using UTC to avoid timezone/DST issues
  let years = to.getUTCFullYear() - from.getUTCFullYear();
  let months = to.getUTCMonth() - from.getUTCMonth();
  let days = to.getUTCDate() - from.getUTCDate();
  let hours = to.getUTCHours() - from.getUTCHours();
  let minutes = to.getUTCMinutes() - from.getUTCMinutes();
  let seconds = to.getUTCSeconds() - from.getUTCSeconds();

  if(seconds < 0){ seconds += 60; minutes -= 1; }
  if(minutes < 0){ minutes += 60; hours -= 1; }
  if(hours < 0){ hours += 24; days -= 1; }
  if(days < 0){
    // borrow days from previous month (in UTC)
    const prevMonthDays = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0)).getUTCDate();
    days += prevMonthDays; months -= 1;
  }
  if(months < 0){ months += 12; years -= 1; }

  return {years, months, days, hours, minutes, seconds};
}

function updateCounter(){
  const now = new Date();
  const d = computeDuration(startDate, now);
  const el = document.getElementById('counter');
  function plural(n, singular, pluralForm){
    return `${n} ${n === 1 ? singular : pluralForm}`;
  }

  function formatMonthsDays(obj){
    const totalMonths = (obj.years || 0) * 12 + (obj.months || 0);
    const monthsLabel = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
    const days = obj.days || 0;
    const daysLabel = `${days} ${days === 1 ? 'día' : 'días'}`;
    return `${monthsLabel} · ${daysLabel}`;
  }

  // ...resto del código...
}
