import { useState, type ChangeEvent } from 'react';
import { PageHeaderV2, Tabs, Tab, Button, Pill, PillType } from '@bamboohr/fabric';
import { SetupStage } from './components/SetupStage';
import { ActiveStage } from './components/ActiveStage';
import { Final48Stage } from './components/Final48Stage';
import { ClosedStage } from './components/ClosedStage';
import { cycleDates } from './data/openEnrollmentData';
import './OpenEnrollment.css';

type Stage = 'setup' | 'active' | 'final-48' | 'closed';

const stagePrimaryAction: Record<Stage, string> = {
  'setup': 'Open to Employees',
  'active': 'Send Custom Update',
  'final-48': 'Send Manager Reminder',
  'closed': 'Export Summary',
};

export default function OpenEnrollment() {
  const [activeStage, setActiveStage] = useState<Stage>('active');

  return (
    <div className="oe-page">
      <PageHeaderV2
        title="2026 Open Enrollment"
        subtitle={`Open ${cycleDates.opensOn} · Closes ${cycleDates.closesOn} · Effective ${cycleDates.effectiveOn}`}
        primaryContent={
          <div className="oe-header-actions">
            <Pill muted type={PillType.Info}>247 employees</Pill>
            <Button variant="contained" color="primary">{stagePrimaryAction[activeStage]}</Button>
          </div>
        }
      />

      <div className="oe-tabs">
        <Tabs
          value={activeStage}
          onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveStage(value as Stage)}
          mode="line"
        >
          <Tab value="setup" label="Setup" />
          <Tab value="active" label="Active" />
          <Tab value="final-48" label="Final 48" />
          <Tab value="closed" label="Closed" />
        </Tabs>
      </div>

      <div className="oe-stage-content">
        {activeStage === 'setup' && <SetupStage />}
        {activeStage === 'active' && <ActiveStage />}
        {activeStage === 'final-48' && <Final48Stage />}
        {activeStage === 'closed' && <ClosedStage />}
      </div>
    </div>
  );
}
