import { useState } from 'react';
import { Section, BodyText, InlineMessage, Button, Avatar, ProgressBar, TileV2 } from '@bamboohr/fabric';
import { managerProgress, stageStats } from '../data/performanceCycleData';
import { ManagerAssessmentModal } from './ManagerAssessmentModal';
import './stages.css';

export function InProgressStage() {
  const [modalOpen, setModalOpen] = useState(false);
  const stats = stageStats.inProgress;

  return (
    <Section>
      <div className="pc-stage">
        <div className="pc-stat-tiles">
          <TileV2 icon="clipboard-list-solid" title={String(stats.assigned)} description="Reviews assigned" orientation="horizontal" />
          <TileV2 icon="circle-check-solid" title={String(stats.submitted)} description="Submitted" orientation="horizontal" />
          <TileV2 icon="hourglass-half-solid" title={String(stats.inReview)} description="In review" orientation="horizontal" />
          <TileV2 icon="circle-exclamation-solid" title={String(stats.notStarted)} description="Not started" orientation="horizontal" />
        </div>

        <InlineMessage
          status="ai"
          title="2 Managers Haven't Started Their Reviews"
          description="Priya Raman (Product) and Jenna Liu (Design) haven't submitted any reviews yet. I can send a friendly nudge with the calibration date."
          action={
            <Button size="small" color="ai" variant="outlined">
              Send Nudge
            </Button>
          }
        />

        <div className="pc-section-header">
          <BodyText size="medium" weight="semibold">Manager progress</BodyText>
          <Button
            size="small"
            color="ai"
            variant="outlined"
            onClick={() => setModalOpen(true)}
          >
            Preview Manager View
          </Button>
        </div>

        <div className="insights-table-container">
          <table className="insights-table">
            <thead>
              <tr>
                <th>Manager</th>
                <th>Department</th>
                <th>Reports</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managerProgress.map((m) => {
                const pct = Math.round((m.submittedCount / m.reportsCount) * 100);
                const submittedColor = pct === 0 ? 'error-strong' : pct < 60 ? 'warning-strong' : 'neutral-strong';
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={m.photoUrl} alt={m.name} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{m.name}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td><BodyText size="small" color="neutral-weak">{m.department}</BodyText></td>
                    <td><BodyText size="small">{m.submittedCount} / {m.reportsCount}</BodyText></td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small" color={submittedColor}>{pct}%</BodyText>
                        <ProgressBar current={m.submittedCount} total={m.reportsCount} />
                      </div>
                    </td>
                    <td>
                      <Button size="small" variant="outlined" color="secondary">
                        {pct === 0 ? 'Nudge' : 'View'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ManagerAssessmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  );
}
