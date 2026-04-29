import { Section, BodyText, InlineMessage, Button, Avatar, Pill, PillType, TileV2, IconV2 } from '@bamboohr/fabric';
import { reviewedEmployees, stageStats } from '../data/performanceCycleData';
import './stages.css';

const formatComp = (n: number) => `$${n.toLocaleString()}`;

export function DashboardStage() {
  const stats = stageStats.dashboard;

  const retentionRiskEmployees = reviewedEmployees.filter((e) => e.retentionRisk === 'high' || e.retentionRisk === 'medium');
  const belowMarketHighPerformers = reviewedEmployees.filter((e) => {
    const gap = ((e.marketMidpoint - e.currentComp) / e.marketMidpoint) * 100;
    return e.reviewScore >= 85 && gap >= 5;
  });

  return (
    <div className="pc-stage pc-dashboard">
      <Section>
        <div className="pc-stage">
          <div className="pc-stat-tiles">
            <TileV2 icon="star-solid" title={`${stats.avgRating}/100`} description="Avg review score" orientation="horizontal" />
            <TileV2 icon="circle-dollar-solid" title={`$${(stats.compInvestment / 1000).toFixed(0)}K`} description="Comp investment" orientation="horizontal" />
            <div className="stat-tile-wrapper stat-tile-wrapper--warning">
              <TileV2 icon="triangle-exclamation-solid" title={String(stats.retentionRisk)} description="Retention risk" orientation="horizontal" />
            </div>
            <div className="stat-tile-wrapper stat-tile-wrapper--error">
              <TileV2 icon="chart-line-down-solid" title={String(stats.belowMarketHighPerformers)} description="Below market, scored well" orientation="horizontal" />
            </div>
          </div>

          <InlineMessage
            status="ai"
            title="Cycle Closed — Here's the Picture"
            description="Average rating tracked steady year-over-year. Comp investment landed on plan. The two signals worth your attention: 4 retention-risk employees, and 3 high performers sitting below market midpoint despite this cycle's adjustments."
          />
        </div>
      </Section>

      <div className="pc-dashboard-grid">
        <Section>
          <div className="pc-stage">
            <div className="pc-section-header">
              <div className="pc-section-title">
                <IconV2 name="triangle-exclamation-regular" size={16} color="warning-strong" />
                <BodyText size="medium" weight="semibold">Retention risk</BodyText>
              </div>
              <Pill muted type={PillType.Warning}>{retentionRiskEmployees.length} employees</Pill>
            </div>

            <InlineMessage
              status="ai"
              title="Suggested Action"
              description="I drafted retention check-in talking points for each manager. Open the queue when you're ready."
              action={
                <Button size="small" color="ai" variant="outlined">
                  Review Talking Points
                </Button>
              }
            />

            <div className="insights-table-container">
              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Score</th>
                    <th>Tenure</th>
                    <th>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionRiskEmployees.map((e) => (
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
                      <td><BodyText size="small">{e.reviewScore}</BodyText></td>
                      <td><BodyText size="small">{e.tenureYears} yrs</BodyText></td>
                      <td>
                        <BodyText size="small" color={e.retentionRisk === 'high' ? 'error-strong' : 'warning-strong'}>
                          {e.lastEngagementSignal ?? '—'}
                        </BodyText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section>
          <div className="pc-stage">
            <div className="pc-section-header">
              <div className="pc-section-title">
                <IconV2 name="chart-line-down-regular" size={16} color="error-strong" />
                <BodyText size="medium" weight="semibold">Scored well, below market</BodyText>
              </div>
              <Pill muted type={PillType.Warning}>{belowMarketHighPerformers.length} employees</Pill>
            </div>

            <InlineMessage
              status="ai"
              title="Worth a Second Look"
              description="These high performers sit below market midpoint even after this cycle's recommended adjustment. Consider an off-cycle correction."
              action={
                <Button size="small" color="ai" variant="outlined">
                  Draft Adjustments
                </Button>
              }
            />

            <div className="insights-table-container">
              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Score</th>
                    <th>Current</th>
                    <th>Market mid</th>
                    <th>Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {belowMarketHighPerformers.map((e) => {
                    const gap = Math.round(((e.marketMidpoint - e.currentComp) / e.marketMidpoint) * 1000) / 10;
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
                        <td><BodyText size="small">{e.reviewScore}</BodyText></td>
                        <td><BodyText size="small">{formatComp(e.currentComp)}</BodyText></td>
                        <td><BodyText size="small" color="neutral-weak">{formatComp(e.marketMidpoint)}</BodyText></td>
                        <td>
                          <Pill muted type={PillType.Warning}>−{gap}%</Pill>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
