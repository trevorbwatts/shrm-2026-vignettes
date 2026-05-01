import { useState, type ChangeEvent } from 'react';
import { PageHeaderV2, Tabs, Tab, Button, Pill, PillType } from '@bamboohr/fabric';
import { SetupStage } from './components/SetupStage';
import { InProgressStage } from './components/InProgressStage';
import { CalibrationStage } from './components/CalibrationStage';
import { CompensationStage } from './components/CompensationStage';
import { DashboardStage } from './components/DashboardStage';
import './PerformanceCycle.css';

type Stage = 'setup' | 'in-progress' | 'calibration' | 'compensation' | 'dashboard';

const stageMeta: Record<Stage, { title: string; primaryAction: string }> = {
  'setup': { title: 'Setup', primaryAction: 'Open to Managers' },
  'in-progress': { title: 'In progress', primaryAction: 'Send Reminder' },
  'calibration': { title: 'Calibration', primaryAction: 'Lock Calibration' },
  'compensation': { title: 'Compensation', primaryAction: 'Approve All' },
  'dashboard': { title: 'Dashboard', primaryAction: 'Export Summary' },
};

export default function PerformanceCycle() {
  const [activeStage, setActiveStage] = useState<Stage>('calibration');
  const meta = stageMeta[activeStage];

  return (
    <div className="pc-page">
      <PageHeaderV2
        title="Q2 2026 Performance Review Cycle"
        subtitle="Opened Apr 1 · Calibration this week · Closes May 30"
        primaryContent={
          <div className="pc-header-actions">
            <Pill muted type={PillType.Info}>47 employees</Pill>
            <Button variant="contained" color="primary">{meta.primaryAction}</Button>
          </div>
        }
      />

      <div className="pc-tabs">
        <Tabs
          value={activeStage}
          onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveStage(value as Stage)}
          mode="line"
        >
          <Tab value="setup" label="Setup" />
          <Tab value="in-progress" label="In Progress" />
          <Tab value="calibration" label="Calibration" />
          <Tab value="compensation" label="Compensation" />
          <Tab value="dashboard" label="Dashboard" />
        </Tabs>
      </div>

      <div className="pc-stage-content">
        {activeStage === 'setup' && <SetupStage />}
        {activeStage === 'in-progress' && <InProgressStage />}
        {activeStage === 'calibration' && <CalibrationStage />}
        {activeStage === 'compensation' && <CompensationStage />}
        {activeStage === 'dashboard' && <DashboardStage />}
      </div>
    </div>
  );
}
