export const getChartDataJobTitles = (rows) => rows.reduce((acc, item) => {
  const existingItem = acc.find(entry => entry.name === item.jobTitle);
  if (existingItem) {
    existingItem.value += 1;
  } else {
    acc.push({ name: item.jobTitle, value: 1 });
  }
  return acc;
}, []);

export const getChartDataGender = (rows) => ([
  { name: 'Gender', male: rows.filter(el => el.gender === 'Male').length, female: rows.filter(el => el.gender === 'Female').length },
]);