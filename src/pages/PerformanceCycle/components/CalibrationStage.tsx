import { Section, BodyText, InlineMessage, TileV2 } from '@bamboohr/fabric';
import { calibrationFlags, stageStats } from '../data/performanceCycleData';
import { CalibrationFlagCard } from './CalibrationFlagCard';
import './stages.css';

export function CalibrationStage() {
  const stats = stageStats.calibration;

  return (
    <Section>
      <div className="pc-stage">
        <div className="pc-stat-tiles">
          <TileV2 icon="flag-solid" title={String(stats.flagsTotal)} description="Items flagged" orientation="horizontal" />
          <TileV2 icon="chart-column-solid" title={String(stats.distributionOutliers)} description="Distribution outliers" orientation="horizontal" />
          <TileV2 icon="scale-balanced-solid" title={String(stats.similarPairs)} description="Similar employee pairs" orientation="horizontal" />
          <TileV2 icon="clock-rotate-left-solid" title={`~${stats.estMinutes} min`} description="Estimated session" orientation="horizontal" />
        </div>

        <InlineMessage
          status="ai"
          title="Calibration Pre-Work Complete"
          description="I flagged 7 items for your calibration session: 2 rating-distribution outliers, 4 similar employees with significantly different ratings, 1 recency-bias pattern. Estimated session: 40 minutes."
        />

        <div className="pc-section-header">
          <BodyText size="medium" weight="semibold">Flagged items</BodyText>
          <BodyText size="small" color="neutral-weak">Review each item, then lock calibration when ready.</BodyText>
        </div>

        <div className="pc-flag-list">
          {calibrationFlags.map((flag) => (
            <CalibrationFlagCard key={flag.id} flag={flag} />
          ))}
        </div>
      </div>
    </Section>
  );
}
