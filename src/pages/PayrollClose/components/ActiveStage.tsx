import { Section, BodyText, Headline, InlineMessage, TileV2 } from '@bamboohr/fabric';
import { stageStats, cycleDates } from '../data/payrollCloseData';
import { PayrollAssistantPanel } from './PayrollAssistantPanel';
import './stages.css';

export function ActiveStage() {
  const stats = stageStats.active;
  const submittedPct = Math.round((stats.timesheetsSubmitted / stats.totalEmployees) * 100);

  return (
    <div className="pcl-stage">
      <InlineMessage
        status="ai"
        title="Period In Progress · No Action Needed"
        description={`Pay period ${cycleDates.periodStart} – ${cycleDates.periodEnd}. ${stats.timesheetsSubmitted} of ${stats.totalEmployees} timesheets submitted. ${stats.cleanSoFar} clean so far. The Payroll Assistant has handled ${stats.questionsResolvedByAssistant} of ${stats.questionsThisWeek} employee questions this week.`}
      />

      <Section>
        <Section.Header
          title="In-Progress Snapshot"
          icon="hourglass-half-solid"
          description="Live view of timesheets coming in and questions being answered."
        />
        <div className="pcl-stat-tiles">
          <TileV2 icon="clipboard-list-solid" title={`${submittedPct}%`} description={`Timesheets submitted (${stats.timesheetsSubmitted}/${stats.totalEmployees})`} orientation="horizontal" />
          <TileV2 icon="circle-check-solid" title={String(stats.cleanSoFar)} description="Clean so far" orientation="horizontal" />
          <TileV2 icon="triangle-exclamation-solid" title={String(stats.exceptionsSoFar)} description="Exceptions surfacing" orientation="horizontal" />
          <TileV2 icon="message-question-solid" title={String(stats.questionsThisWeek)} description="Questions this week" orientation="horizontal" />
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Live Assistant Activity"
          icon="sparkles-solid"
          description="Questions employees asked this week. You haven't seen most of these — that's the point."
        />
        <PayrollAssistantPanel
          resolvedCount={stats.questionsResolvedByAssistant}
          routedCount={stats.questionsThisWeek - stats.questionsResolvedByAssistant}
        />
      </Section>

      <Section>
        <Section.Header
          title="What You're Not Doing"
          icon="hand-solid"
        />
        <div className="pcl-card-grid">
          <div className="pcl-not-doing-card">
            <Headline size="extra-small" component="h4">Routing employee questions</Headline>
            <BodyText size="small" color="neutral-weak">
              {stats.questionsResolvedByAssistant} questions answered directly this week. Sources cited. No back-and-forth between you and payroll.
            </BodyText>
          </div>
          <div className="pcl-not-doing-card">
            <Headline size="extra-small" component="h4">Chasing timesheet submissions</Headline>
            <BodyText size="small" color="neutral-weak">
              Reminders go out to the {stats.totalEmployees - stats.timesheetsSubmitted} stragglers automatically. You'll see them in the Approval queue if anything's still missing on Thursday.
            </BodyText>
          </div>
          <div className="pcl-not-doing-card">
            <Headline size="extra-small" component="h4">Reviewing clean weeks</Headline>
            <BodyText size="small" color="neutral-weak">
              Clean timesheets approve themselves. {stats.cleanSoFar} so far this period.
            </BodyText>
          </div>
        </div>
      </Section>
    </div>
  );
}
