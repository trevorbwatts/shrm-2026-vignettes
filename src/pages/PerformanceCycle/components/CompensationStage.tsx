import { Section, BodyText, InlineMessage, Button, Avatar, Pill, PillType, TileV2 } from '@bamboohr/fabric';
import { reviewedEmployees, stageStats } from '../data/performanceCycleData';
import type { ReviewedEmployee, ReviewRating } from '../data/performanceCycleData';
import './stages.css';

const ratingLabel = (r: ReviewRating) =>
  r === 'exceeds' ? 'Exceeds' : r === 'meets' ? 'Meets' : 'Below';

const ratingPillType = (r: ReviewRating): PillType =>
  r === 'exceeds' ? PillType.Success : r === 'meets' ? PillType.Info : PillType.Warning;

const formatComp = (n: number) => `$${n.toLocaleString()}`;

const adjustmentPct = (e: ReviewedEmployee) => {
  if (e.recommendedComp === e.currentComp) return 0;
  return Math.round(((e.recommendedComp - e.currentComp) / e.currentComp) * 1000) / 10;
};

export function CompensationStage() {
  const stats = stageStats.compensation;

  return (
    <Section>
      <div className="pc-stage">
        <div className="pc-stat-tiles">
          <TileV2 icon="users-solid" title={String(stats.totalEmployees)} description="Employees in cycle" orientation="horizontal" />
          <TileV2 icon="circle-dollar-solid" title={String(stats.recommendedAdjustments)} description="Recommended adjustments" orientation="horizontal" />
          <TileV2 icon="chart-line-up-solid" title={`$${(stats.totalInvestment / 1000).toFixed(0)}K`} description="Total investment" orientation="horizontal" />
        </div>

        <InlineMessage
          status="ai"
          title="Compensation Recommendations Ready"
          description="Calibration locked. I generated comp recommendations using review score, job code, band position, and Bamboo market benchmarks. 23 of 47 employees recommended for adjustment."
        />

        <div className="pc-section-header">
          <BodyText size="medium" weight="semibold">Recommendations by employee</BodyText>
        </div>

        <div className="insights-table-container">
          <table className="insights-table pc-comp-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Rating</th>
                <th>Current</th>
                <th>Band</th>
                <th>Market mid</th>
                <th>Recommended</th>
                <th>Adjustment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewedEmployees.map((e) => {
                const pct = adjustmentPct(e);
                const pillType: PillType =
                  pct >= 7 ? PillType.Success : pct >= 3 ? PillType.Info : pct === 0 ? PillType.Neutral : PillType.Warning;
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={e.photoUrl} alt={`${e.firstName} ${e.lastName}`} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{e.firstName} {e.lastName}</BodyText>
                          <BodyText size="extra-small" color="neutral-weak">{e.jobTitle}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Pill muted type={ratingPillType(e.rating)}>{ratingLabel(e.rating)}</Pill>
                    </td>
                    <td><BodyText size="small">{formatComp(e.currentComp)}</BodyText></td>
                    <td>
                      <Pill muted type={PillType.Neutral}>{e.bandPosition}</Pill>
                    </td>
                    <td><BodyText size="small" color="neutral-weak">{formatComp(e.marketMidpoint)}</BodyText></td>
                    <td><BodyText size="small" weight="semibold">{formatComp(e.recommendedComp)}</BodyText></td>
                    <td>
                      <Pill muted type={pillType}>
                        {pct === 0 ? 'No change' : `+${pct}%`}
                      </Pill>
                    </td>
                    <td>
                      <Button size="small" color="ai" variant="outlined">
                        {pct === 0 ? 'Review' : 'Accept'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
