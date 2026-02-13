const BASE_URL = 'http://localhost:8080/report';

export const fetchCarbonEmissionsByDate = async () => {
  const res = await fetch(`${BASE_URL}/carbon-emissions/by-date`);
  const data = await res.json();
  // Sort by date ascending (format: DD-MM-YYYY)
  data.sort((a, b) => {
    const [da, ma, ya] = a.date.split('-').map(Number);
    const [db, mb, yb] = b.date.split('-').map(Number);
    return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
  });
  return data;
};

export const fetchCarbonEmissionsByMonth = async () => {
  const res = await fetch(`${BASE_URL}/carbon-emissions/by-month`);
  const data = await res.json();
  // Sort by month ascending (format: MM-YYYY)
  data.sort((a, b) => {
    const [ma, ya] = a.month.split('-').map(Number);
    const [mb, yb] = b.month.split('-').map(Number);
    return new Date(ya, ma - 1) - new Date(yb, mb - 1);
  });
  return data;
};

export const fetchWaterConsumption = async () => {
  const res = await fetch(`${BASE_URL}/water-consumption`);
  const data = await res.json();
  // Sort by month ascending (format: MM-YYYY)
  data.sort((a, b) => {
    const [ma, ya] = a.month.split('-').map(Number);
    const [mb, yb] = b.month.split('-').map(Number);
    return new Date(ya, ma - 1) - new Date(yb, mb - 1);
  });
  return data;
};

export const fetchEnergyConsumption = async () => {
  const res = await fetch(`${BASE_URL}/energy-consumption`);
  const data = await res.json();
  // Sort by month ascending (format: MM-YYYY)
  data.sort((a, b) => {
    const [ma, ya] = a.month.split('-').map(Number);
    const [mb, yb] = b.month.split('-').map(Number);
    return new Date(ya, ma - 1) - new Date(yb, mb - 1);
  });
  return data;
};

export const fetchEnergyGenerated = async () => {
  const res = await fetch(`${BASE_URL}/energy-generated`);
  const data = await res.json();
  // Sort by month ascending (format: MM-YYYY)
  data.sort((a, b) => {
    const [ma, ya] = a.month.split('-').map(Number);
    const [mb, yb] = b.month.split('-').map(Number);
    return new Date(ya, ma - 1) - new Date(yb, mb - 1);
  });
  return data;
};


// ML Trend APIs
export const fetchCarbonEmissionTrend = async () => {
  const res = await fetch('http://localhost:8080/ml/carbon-emission/trend');
  const data = await res.json();
  return data;
};

export const fetchWaterConsumptionTrend = async () => {
  const res = await fetch('http://localhost:8080/ml/water-consumption/trend');
  const data = await res.json();
  return data;
};

export const fetchEnergyConsumptionTrend = async () => {
  const res = await fetch('http://localhost:8080/ml/energy-consumption/trend');
  const data = await res.json();
  return data;
};

export const fetchEnergyGeneratedTrend = async () => {
  const res = await fetch('http://localhost:8080/ml/energy-generated/trend');
  const data = await res.json();
  return data;
};
