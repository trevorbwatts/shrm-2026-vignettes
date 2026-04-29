import { Section, BodyText, Headline, InlineMessage, Pill, PillType, IconV2, TileV2 } from '@bamboohr/fabric';
import { stageStats } from '../data/payrollCloseData';
import './stages.css';

export function ClosedStage() {
  const stats = stageStats.closed;

  return (
    <div className="pcl-stage">
      <InlineMessage
        status="ai"
        title="Payroll Closed Cleanly"
        description={`$${stats.totalPayroll.toLocaleString()} paid to ${stats.employeesPaid} employees, on time. The Payroll Assistant answered ${stats.assistantConversations} questions this cycle. You handled the ${stats.exceptionsHandled} exceptions that needed your call. Nothing else.`}
      />

      <Section>
        <Section.Header
          title="Cycle Summary"
          icon="circle-check-solid"
          description="What this run looked like compared to before the assistant was on."
        />
        <div className="pcl-stat-tiles">
          <TileV2 icon="circle-dollar-solid" title={`$${(stats.totalPayroll / 1_000_000).toFixed(2)}M`} description="Total paid" orientation="horizontal" />
          <TileV2 icon="users-solid" title={String(stats.employeesPaid)} description="Employees paid" orientation="horizontal" />
          <TileV2 icon="hand-solid" title={String(stats.exceptionsHandled)} description="Exceptions you handled" orientation="horizontal" />
          <TileV2 icon="clock-rotate-left-solid" title={`${stats.hoursSavedVsLastYear}h`} description="Saved vs last cycle" orientation="horizontal" />
        </div>
      </Section>

      <div className="pcl-card-grid pcl-card-grid--2">
        <Section>
          <Section.Header
            title="Payroll Assistant"
            icon="sparkles-solid"
          />
          <ul className="pcl-summary-list">
            <li><BodyText size="small">{stats.assistantConversations} total conversations this cycle</BodyText></li>
            <li><BodyText size="small">{stats.assistantConversations - stats.exceptionsHandled} resolved without you</BodyText></li>
            <li><BodyText size="small">{stats.exceptionsHandled} routed to you with context pre-gathered</BodyText></li>
            <li><BodyText size="small">Sources cited on every answer (pay statements, deduction schedules, garnishment orders, payroll calendar)</BodyText></li>
          </ul>
        </Section>

        <Section>
          <Section.Header
            title="Timesheets"
            icon="clipboard-check-solid"
          />
          <ul className="pcl-summary-list">
            <li><BodyText size="small">229 clean weeks auto-approved</BodyText></li>
            <li><BodyText size="small">14 corrections handled by managers + assistant before reaching you</BodyText></li>
            <li><BodyText size="small">4 exceptions you reviewed and resolved</BodyText></li>
            <li><BodyText size="small">0 outstanding at close</BodyText></li>
          </ul>
        </Section>

        <Section>
          <Section.Header
            title="Exceptions You Handled"
            icon="hand-solid"
          />
          <ul className="pcl-summary-list">
            <li><BodyText size="small">2 outside-policy calls (one OT approval, one CA meal-break compliance)</BodyText></li>
            <li><BodyText size="small">1 retroactive correction confirmed</BodyText></li>
            <li><BodyText size="small">1 missing-punch resolution</BodyText></li>
            <li><BodyText size="small">2 routed-to-you assistant cases (withholding config, pay advance request)</BodyText></li>
          </ul>
        </Section>

        <div className="pcl-summary-card pcl-summary-card--callout">
          <div className="pcl-summary-head">
            <IconV2 name="user-solid" size={16} color="success-strong" />
            <Headline size="extra-small" component="h4">What you spent Thursday afternoon doing</Headline>
          </div>
          <BodyText size="small">
            Looking at four exceptions and answering two questions that needed your judgment. Four phone calls and an email. Forty-five minutes total.
          </BodyText>
          <BodyText size="small" weight="semibold">Not fielding twenty Slack threads.</BodyText>
          <Pill muted type={PillType.Success}>The point of the cycle</Pill>
        </div>
      </div>
    </div>
  );
}
