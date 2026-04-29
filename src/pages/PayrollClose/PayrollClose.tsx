import { useState, type ChangeEvent } from 'react';
import { PageHeaderV2, Tabs, Tab, Button, Pill, PillType } from '@bamboohr/fabric';
import { ActiveStage } from './components/ActiveStage';
import { ApprovalStage } from './components/ApprovalStage';
import { ClosedStage } from './components/ClosedStage';
import { cycleDates } from './data/payrollCloseData';
import './PayrollClose.css';

type Stage = 'active' | 'approval' | 'closed';

const stagePrimaryAction: Record<Stage, string> = {
  'active': 'Send Custom Update',
  'approval': 'Approve & Submit',
  'closed': 'Export Summary',
};

export default function PayrollClose() {
  const [activeStage, setActiveStage] = useState<Stage>('approval');

  return (
    <div className="pcl-page">
      <PageHeaderV2
        title={`Payroll Close · ${cycleDates.periodStart.split(',')[0]} – ${cycleDates.periodEnd.split(',')[0]}`}
        subtitle={`Approval deadline ${cycleDates.approvalDeadline} · Paycheck ${cycleDates.paycheckDate}`}
        primaryContent={
          <div className="pcl-header-actions">
            <Pill muted type={PillType.Info}>247 employees</Pill>
            <Button variant="contained" color="primary">{stagePrimaryAction[activeStage]}</Button>
          </div>
        }
      />

      <div className="pcl-tabs">
        <Tabs
          value={activeStage}
          onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveStage(value as Stage)}
          mode="line"
        >
          <Tab value="active" label="Active" />
          <Tab value="approval" label="Approval" />
          <Tab value="closed" label="Closed" />
        </Tabs>
      </div>

      <div className="pcl-stage-content">
        {activeStage === 'active' && <ActiveStage />}
        {activeStage === 'approval' && <ApprovalStage />}
        {activeStage === 'closed' && <ClosedStage />}
      </div>
    </div>
  );
}
