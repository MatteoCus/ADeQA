// Function to generate random boolean values
const generateRandomBoolean = () => Math.random() < 0.5;

// Function to generate Gaussian-distributed values
const generateGaussianValue = (mean: number, stdDev: number) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdDev * z;
};

// Function to generate a single record
const generateRecord = () => {
  return {
    lung: parseFloat(generateGaussianValue(40, 1).toFixed(1)), // Adjust the standard deviation if needed
    larg: parseFloat(generateGaussianValue(20, 1).toFixed(1)),
    visivo: generateRandomBoolean(),
  };
};

// Function to generate 5000 records
function generateRecords() {
  const records = [];
  for (let i = 0; i < 5000; i++) {
    records.push(generateRecord());
  }
  return records;
};

// Example usage
export var length_data = generateRecords();
