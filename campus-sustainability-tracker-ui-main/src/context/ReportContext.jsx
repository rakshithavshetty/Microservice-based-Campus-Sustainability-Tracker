import { createContext, useContext, useState, useEffect } from 'react';
import * as reportApi from '../api/reportApi';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [carbonByDate, setCarbonByDate] = useState([]);
  const [carbonByMonth, setCarbonByMonth] = useState([]);
  const [waterConsumption, setWaterConsumption] = useState([]);
  const [energyConsumption, setEnergyConsumption] = useState([]);
  const [energyGenerated, setEnergyGenerated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const [carbonDate, carbonMonth, water, energyCons, energyGen] = await Promise.all([
        reportApi.fetchCarbonEmissionsByDate(),
        reportApi.fetchCarbonEmissionsByMonth(),
        reportApi.fetchWaterConsumption(),
        reportApi.fetchEnergyConsumption(),
        reportApi.fetchEnergyGenerated(),
      ]);
      setCarbonByDate(carbonDate);
      setCarbonByMonth(carbonMonth);
      setWaterConsumption(water);
      setEnergyConsumption(energyCons);
      setEnergyGenerated(energyGen);
    } catch (err) {
      setError(err.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  return (
    <ReportContext.Provider
      value={{
        carbonByDate,
        carbonByMonth,
        waterConsumption,
        energyConsumption,
        energyGenerated,
        loading,
        error,
        refetch: fetchAllReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);

export default ReportContext;
