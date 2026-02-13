import { useReportContext } from '../context/ReportContext';
import { useState, useEffect } from 'react';
import * as reportApi from '../api/reportApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const EnergyConsumptionChart = () => {
  const { energyConsumption, loading, error } = useReportContext();

  // ML insight state
  const [mlInsight, setMlInsight] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState(null);

  useEffect(() => {
    setMlLoading(true);
    setMlError(null);
    reportApi.fetchEnergyConsumptionTrend()
      .then(data => setMlInsight(data.statement))
      .catch(err => setMlError('Failed to load Predictive Analytics'))
      .finally(() => setMlLoading(false));
  }, []);

  // Group data by year
  const yearMap = {};
  energyConsumption.forEach((d) => {
    const [mm, yyyy] = d.month.split('-');
    if (!yearMap[yyyy]) yearMap[yyyy] = Array(12).fill(null);
    yearMap[yyyy][parseInt(mm, 10) - 1] = d.totalEnergy;
  });

  // For month selection section
  const monthOptions = energyConsumption.map(d => d.month);
  // Use a month picker input instead of dropdown
  const [selectedMonth, setSelectedMonth] = React.useState(monthOptions[0] || '');
  // Convert yyyy-mm for input value
  const minMonth = monthOptions.length ? monthOptions[0].split('-').reverse().join('-') : '';
  const maxMonth = monthOptions.length ? monthOptions[monthOptions.length-1].split('-').reverse().join('-') : '';
  // Convert selectedMonth to yyyy-mm for input
  const selectedMonthInput = selectedMonth ? selectedMonth.split('-').reverse().join('-') : '';
  const handleMonthChange = e => {
    // Convert yyyy-mm to mm-yyyy
    const [yyyy, mm] = e.target.value.split('-');
    setSelectedMonth(`${mm}-${yyyy}`);
  };
  const selectedData = energyConsumption.find(d => d.month === selectedMonth);

  const datasets = Object.keys(yearMap).sort().map((year, idx) => ({
    label: year,
    data: yearMap[year],
    backgroundColor: `hsl(${30 + idx * 60}, 70%, 60%)`,
  }));

  const chartData = {
    labels: monthNames,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Total Energy Consumption by Month (Segmented by Year)' },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        stacked: false,
        title: {
          display: true,
          text: 'kWh',
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Chart section */}
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
      {/* Predictive Analytics Subsection */}
      <div style={{
        margin: '24px 0 0 0',
        background: 'linear-gradient(90deg, #fffde7 60%, #ffe082 100%)',
        borderRadius: 14,
        padding: '1.2rem 2rem',
        boxShadow: '0 4px 16px rgba(255,193,7,0.15)',
        border: '2px solid #ffe082',
        width: '100%',
        maxWidth: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '1.1rem',
      }}>
        <span style={{
          fontWeight: 700,
          fontSize: '1.08rem',
          color: '#b28704',
          letterSpacing: '0.01em',
          marginRight: 16,
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* Predictive Analytics Icon: Full Robot with Body */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginRight:16}} xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="8" width="16" height="10" rx="4" fill="#fff" stroke="#222" strokeWidth="2"/>
            <circle cx="20" cy="13" r="1.5" fill="#222"/>
            <circle cx="28" cy="13" r="1.5" fill="#222"/>
            <rect x="23" y="4" width="2" height="6" rx="1" fill="#222"/>
            <circle cx="24" cy="4" r="1.2" fill="#222"/>
            <rect x="14" y="18" width="20" height="14" rx="6" fill="#fff" stroke="#222" strokeWidth="2.5"/>
            <rect x="8" y="22" width="4" height="10" rx="2" fill="#444"/>
            <rect x="36" y="22" width="4" height="10" rx="2" fill="#444"/>
            <rect x="18" y="34" width="3" height="7" rx="1.2" fill="#222"/>
            <rect x="27" y="34" width="3" height="7" rx="1.2" fill="#222"/>
            <rect x="21" y="23" width="6" height="5" rx="2" fill="#eee" stroke="#222" strokeWidth="1"/>
            <circle cx="24" cy="25.5" r="0.7" fill="#222"/>
            <circle cx="23" cy="27" r="0.5" fill="#bdbdbd"/>
            <circle cx="25" cy="27" r="0.5" fill="#bdbdbd"/>
          </svg>
          Predictive Analytics
        </span>
        <span style={{
          fontWeight: 500,
          fontSize: '1.08rem',
          color: '#b28704',
          fontFamily: 'Fira Mono, monospace',
          background: 'linear-gradient(90deg, #fffde7 60%, #ffe082 100%)',
          borderRadius: 6,
          padding: '0.5rem 1rem',
          boxShadow: '0 1px 4px rgba(255,193,7,0.10)',
        }}>
          {mlLoading ? 'Loading insight...' : mlError ? mlError : mlInsight}
        </span>
      </div>
      {/* Month selection and energy details section */}
      <div style={{
        marginTop: 24,
        background: 'linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)',
        borderRadius: 14,
        padding: '1.2rem 2rem',
        boxShadow: '0 4px 16px rgba(33,150,243,0.13)',
        border: '2px solid #90caf9',
        width: '100%',
        maxWidth: 'none',
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1.2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{marginRight:12}} xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="6" width="18" height="20" rx="3" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
            <rect x="11" y="10" width="10" height="2" rx="1" fill="#90caf9"/>
            <rect x="11" y="15" width="10" height="2" rx="1" fill="#90caf9"/>
            <rect x="11" y="20" width="7" height="2" rx="1" fill="#90caf9"/>
            <rect x="7" y="6" width="18" height="3" rx="1.5" fill="#bbdefb"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '1.08rem', color: '#1565c0', fontFamily: 'Fira Mono, monospace', letterSpacing: '0.01em' }}>
            Additional Insights
          </span>
        </div>
        <label style={{ fontWeight: 600, fontSize: '0.97rem', color: '#1976d2', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block', textAlign: 'left', letterSpacing: '0.01em' }}>
          <span style={{ marginRight: 12 }}>Select month to see energy consumed:</span>
          <input
            type="month"
            min={minMonth}
            max={maxMonth}
            value={selectedMonthInput}
            onChange={handleMonthChange}
            style={{
              marginLeft: 0,
              padding: '0.35rem 0.65rem',
              borderRadius: 6,
              border: '1px solid #90caf9',
              fontSize: '0.97rem',
              background: '#fff',
              color: '#1976d2',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(33,150,243,0.04)',
              transition: 'border 0.2s',
              fontFamily: 'Segoe UI, Arial, sans-serif',
            }}
          />
        </label>
        {selectedData && (
          <div style={{
            marginTop: 12,
            fontWeight: 500,
            fontSize: '0.97rem',
            color: '#0d47a1',
            letterSpacing: '0.01em',
            textAlign: 'left',
            width: '100%',
            background: 'none',
            borderRadius: 0,
            padding: 0,
            boxShadow: 'none',
            fontFamily: 'Segoe UI, Arial, sans-serif',
          }}>
            {(() => {
              const [mm, yyyy] = selectedData.month.split('-');
              const monthName = monthNames[parseInt(mm, 10) - 1];
              const fullMonth = new Date(Number(yyyy), parseInt(mm, 10) - 1).toLocaleString('default', { month: 'long' });
              return `In ${fullMonth} ${yyyy}, the energy consumption was ${selectedData.solarEnergy} kWh from Solar and ${selectedData.kebEnergy} kWh from Karnataka Electricity Board.`;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyConsumptionChart;
