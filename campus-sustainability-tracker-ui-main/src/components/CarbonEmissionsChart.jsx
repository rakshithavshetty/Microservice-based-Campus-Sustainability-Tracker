import { useReportContext } from '../context/ReportContext';
import { useState, useEffect } from 'react';
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
import * as reportApi from '../api/reportApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CarbonEmissionsChart = () => {
  const { carbonByMonth, carbonByDate, loading, error } = useReportContext();
  const [selectedDate, setSelectedDate] = useState('');

  // ML insight state
  const [mlInsight, setMlInsight] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState(null);

  useEffect(() => {
    setMlLoading(true);
    setMlError(null);
    reportApi.fetchCarbonEmissionTrend()
      .then(data => setMlInsight(data.statement))
      .catch(err => setMlError('Failed to load ML insight'))
      .finally(() => setMlLoading(false));
  }, []);

  // Find min and max date in YYYY-MM-DD format
  const dateStrings = carbonByDate.map(d => {
    const [day, month, year] = d.date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  });
  // Only allow selection of dates that exist in carbonByDate
  const availableDatesSet = new Set(dateStrings);
  const minDate = dateStrings.length ? dateStrings[0] : '';
  const maxDate = dateStrings.length ? dateStrings[dateStrings.length - 1] : '';

  // Find value for selected date
  let selectedValue = null;
  if (selectedDate) {
    const [year, month, day] = selectedDate.split('-');
    // API date is MM-DD-YYYY
    const apiDate = `${month.padStart(2, '0')}-${day.padStart(2, '0')}-${year}`;
    const match = carbonByDate.find(d => d.date === apiDate);
    selectedValue = match ? match.noOfVehicles : null;
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Group data by year
  const yearMap = {};
  carbonByMonth.forEach((d) => {
    const [mm, yyyy] = d.month.split('-');
    if (!yearMap[yyyy]) yearMap[yyyy] = Array(12).fill(null);
    yearMap[yyyy][parseInt(mm, 10) - 1] = Number(d.totalVehicles);
  });

  const datasets = Object.keys(yearMap).sort().map((year, idx) => ({
    label: year,
    data: yearMap[year],
    backgroundColor: `hsl(${120 + idx * 60}, 50%, 50%)`,
  }));

  const chartData = {
    labels: monthNames,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Number of Vehicles by Month (Segmented by Year)' },
    },
    scales: {
      x: {
        stacked: false, // Use grouped bars
      },
      y: {
        beginAtZero: true,
        stacked: false, // Use grouped bars
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
      {/* Date picker and result section */}
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
        <div style={{ width: '100%' }}>
          <label style={{ fontWeight: 600, fontSize: '0.97rem', color: '#1976d2', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block', textAlign: 'left', letterSpacing: '0.01em' }}>
            <span style={{ marginRight: 12 }}>Select a date to see number of vehicles:</span>
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
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
          {selectedDate && (
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
              {selectedValue !== null
                ? (() => {
                    const [year, month, day] = selectedDate.split('-');
                    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
                    const dayNum = dateObj.getDate();
                    const monthName = dateObj.toLocaleString('default', { month: 'long' });
                    const yearNum = dateObj.getFullYear();
                    // Suffix for day
                    const getDaySuffix = d => {
                      if (d > 3 && d < 21) return 'th';
                      switch (d % 10) {
                        case 1: return 'st';
                        case 2: return 'nd';
                        case 3: return 'rd';
                        default: return 'th';
                      }
                    };
                    const suffix = getDaySuffix(dayNum);
                    return `Number of vehicles on ${dayNum}${suffix} ${monthName} ${yearNum} is ${selectedValue}.`;
                  })()
                : 'No data for selected date.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionsChart;
