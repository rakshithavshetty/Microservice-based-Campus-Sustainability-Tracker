import { useState } from 'react';
import CarbonEmissionsChart from '../components/CarbonEmissionsChart';
import WaterConsumptionChart from '../components/WaterConsumptionChart';
import EnergyConsumptionChart from '../components/EnergyConsumptionChart';
import EnergyGeneratedChart from '../components/EnergyGeneratedChart';
import styles from '../styles/Reports.module.css';

const TABS = [
  { key: 'carbon-emissions', label: 'Carbon Emissions' },
  { key: 'water-consumption', label: 'Water Consumption' },
  { key: 'energy-consumption', label: 'Energy Consumption' },
  { key: 'energy-generation', label: 'Energy Generation' },
];

function Reports() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'carbon-emissions':
        return (
          <div>
            <h2>Carbon Emissions Report</h2>
            <CarbonEmissionsChart />
          </div>
        );
      case 'water-consumption':
        return (
          <div>
            <h2>Water Consumption Report</h2>
            <WaterConsumptionChart />
          </div>
        );
      case 'energy-consumption':
        return (
          <div>
            <h2>Energy Consumption Report</h2>
            <EnergyConsumptionChart />
          </div>
        );
      case 'energy-generation':
        return (
          <div>
            <h2>Energy Generation Report</h2>
            <EnergyGeneratedChart />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h2 className={styles.reportsTitle}>
        <span
          role="img"
          aria-label="bar chart"
          style={{ marginRight: '0.5rem' }}
        >
          &#128202;
        </span>
        Reports
      </h2>
      <div className={styles.tabsBar}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={
              activeTab === tab.key
                ? `${styles.tabBtn} ${styles.active}`
                : styles.tabBtn
            }
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </>
  );
}

export default Reports;
