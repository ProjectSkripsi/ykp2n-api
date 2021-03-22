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
    temp = 'Putaw (Opioid)';
  } else if (code === 2) {
    temp = 'Sabu (Amfetamin)';
  } else if (code === 3) {
    temp = 'Ganja (Halusinogen)';
  } else if (code === 4) {
    temp = 'Alkohol (Depression)';
  } else if (code === 0) {
    temp = 'Tidak terdeteksi sebagai pengguna narkoba dan alkohol';
  }
  return temp;
};

module.exports = {
  learningConcept,
  convert,
  getClassification,
};
