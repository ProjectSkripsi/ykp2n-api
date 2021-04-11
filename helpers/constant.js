const learningConcept = (type) => {
  var temp = 0;
  if (type === 'Tekstual') {
    temp = 50;
  } else {
    temp = 100;
  }
  return temp;
};

const convert = (type) => {
  var temp = 0;
  if (type === 'Kurang') {
    temp = 50;
  } else if (type === 'Cukup') {
    temp = 100;
  } else {
    temp = 0;
  }
  return temp;
};

const getClassification = (code) => {
  let temp = '';
  if (code === 1) {
    temp = 'Positif Pengguna Narkoba Jenis Putaw (Opioid)';
  } else if (code === 2) {
    temp = 'Positif Pengguna Narkoba Jenis Sabu (Amfetamin)';
  } else if (code === 3) {
    temp = 'Positif Pengguna Narkoba Jenis Ganja (Halusinogen)';
  } else if (code === 4) {
    temp = 'Positif Alkohollic';
  } else if (code === 0) {
    temp = 'Negatif';
  }
  return temp;
};

module.exports = {
  learningConcept,
  convert,
  getClassification,
};
