import { Section, BodyText, Headline, InlineMessage, Pill, PillType, IconV2, TileV2 } from '@bamboohr/fabric';
import { stageStats } from '../data/openEnrollmentData';
import './stages.css';

export function ClosedStage() {
  const stats = stageStats.closed;

  return (
    <Section>
      <div className="oe-stage">
        <div className="oe-stat-tiles">
          <TileV2 icon="circle-check-solid" title={`${stats.completionRate}%`} description="Completion rate" orientation="horizontal" />
          <TileV2 icon="calendar-check-solid" title="On time" description="Closed Oct 27, 5:00 PM" orientation="horizontal" />
          <TileV2 icon="hand-solid" title={String(stats.exceptionsHandled)} description="Exceptions you handled" orientation="horizontal" />
          <TileV2 icon="clock-rotate-left-solid" title={`${stats.hoursSavedVsLastYear}h`} description="Saved vs last year" orientation="horizontal" />
        </div>

        <InlineMessage
          status="ai"
          title="Cycle Closed Cleanly"
          description={`${stats.completionRate}% completion, on time, with ${stats.exceptionsHandled} exceptions you personally handled. The Benefits Assistant answered ${stats.assistantConversations} employee questions across the three surfaces — that's roughly the volume that used to fill your inbox.`}
        />

        <div className="oe-card-grid oe-card-grid--2">
          <div className="oe-summary-card">
            <div className="oe-summary-head">
              <IconV2 name="bell-solid" size={16} color="info-strong" />
              <Headline size="extra-small" component="h4">Reminder automation</Headline>
            </div>
            <ul className="oe-summary-list">
              <li><BodyText size="small">Tier 1 (not started) — 23 sent · 19 enrolled within 48 hrs</BodyText></li>
              <li><BodyText size="small">Tier 2 (in progress) — 14 sent · 12 completed within 24 hrs</BodyText></li>
              <li><BodyText size="small">Tier 3 (incomplete) — 6 sent · 5 completed before close</BodyText></li>
              <li><BodyText size="small">Manager loop — 8 manager emails · 7 holdouts closed in final 48 hrs</BodyText></li>
            </ul>
          </div>

          <div className="oe-summary-card">
            <div className="oe-summary-head">
              <IconV2 name="sparkles-solid" size={16} color="discovery-strong" />
              <Headline size="extra-small" component="h4">Benefits Assistant</Headline>
            </div>
            <ul className="oe-summary-list">
              <li><BodyText size="small">{stats.assistantConversations} total conversations across three surfaces</BodyText></li>
              <li><BodyText size="small">94% resolved without escalation</BodyText></li>
              <li><BodyText size="small">38 conversations escalated to you (mostly the exception cases)</BodyText></li>
              <li><BodyText size="small">Avg response time under 4 seconds</BodyText></li>
            </ul>
          </div>

          <div className="oe-summary-card">
            <div className="oe-summary-head">
              <IconV2 name="hand-solid" size={16} color="warning-strong" />
              <Headline size="extra-small" component="h4">Exceptions you handled</Headline>
            </div>
            <ul className="oe-summary-list">
              <li><BodyText size="small">5 mid-cycle qualifying events</BodyText></li>
              <li><BodyText size="small">3 domestic partner documentation cases</BodyText></li>
              <li><BodyText size="small">2 HSA contribution coordination cases</BodyText></li>
              <li><BodyText size="small">2 variable-hour eligibility look-backs</BodyText></li>
              <li><BodyText size="small">2 dependent verification edge cases</BodyText></li>
            </ul>
          </div>

          <div className="oe-summary-card oe-summary-card--callout">
            <div className="oe-summary-head">
              <IconV2 name="user-solid" size={16} color="success-strong" />
              <Headline size="extra-small" component="h4">What you spent the month doing</Headline>
            </div>
            <BodyText size="small">
              Helping 14 employees think through tradeoffs that needed real judgment. Reviewing the eligibility look-back history for Felix. Confirming the qualifying event date with Hana. Coordinating Imani's HSA election with her spouse's plan.
            </BodyText>
            <BodyText size="small" weight="semibold">Not sending reminders.</BodyText>
            <Pill muted type={PillType.Success}>The point of the cycle</Pill>
          </div>
        </div>
      </div>
    </Section>
  );
}
