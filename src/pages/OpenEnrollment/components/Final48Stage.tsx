import { Section, BodyText, Headline, InlineMessage, Avatar, Pill, PillType, IconV2, TileV2, Button } from '@bamboohr/fabric';
import { enrollmentEmployees, stageStats } from '../data/openEnrollmentData';
import './stages.css';

const statusPill = (status: string): { type: PillType; label: string } => {
  if (status === 'not-started') return { type: PillType.Error, label: 'Not started' };
  if (status === 'in-progress') return { type: PillType.Info, label: 'In progress' };
  if (status === 'incomplete') return { type: PillType.Warning, label: 'Incomplete' };
  return { type: PillType.Success, label: 'Complete' };
};

export function Final48Stage() {
  const stats = stageStats.final48;
  const holdouts = enrollmentEmployees.filter((e) => e.status === 'not-started' || e.status === 'incomplete');

  return (
    <div className="oe-stage">
      <Section>
        <div className="oe-stage">
          <div className="oe-stat-tiles">
            <TileV2 icon="user-clock-solid" title={String(stats.holdouts)} description="Holdouts remaining" orientation="horizontal" />
            <TileV2 icon="user-check-solid" title={String(stats.managersLooped)} description="Managers looped in" orientation="horizontal" />
            <TileV2 icon="clock-solid" title={stats.expectedClose} description="Cycle closes" orientation="horizontal" />
          </div>

          <InlineMessage
            status="ai"
            title="Manager Loop Activated"
            description={`We're inside the final 48 hours. I emailed the ${stats.managersLooped} managers of remaining holdouts with the names of their reports and a one-click reminder. Most cycles close cleanly from here.`}
          />
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Holdouts by Manager"
          icon="user-tie-solid"
          description="Each manager owns the conversation with their reports."
        />
        <div className="oe-stage">
          <div className="oe-holdout-list">
            {holdouts.map((e) => {
              const pill = statusPill(e.status);
              return (
                <div key={e.id} className="oe-holdout-row">
                  <Avatar src={e.photoUrl} alt={`${e.firstName} ${e.lastName}`} size={40} />
                  <div className="oe-holdout-meta">
                    <BodyText size="small" weight="semibold">{e.firstName} {e.lastName}</BodyText>
                    <BodyText size="extra-small" color="neutral-weak">{e.jobTitle} · {e.department}</BodyText>
                    {e.blocker && (
                      <BodyText size="extra-small" color="warning-strong">Blocker: {e.blocker}</BodyText>
                    )}
                  </div>
                  <div className="oe-holdout-status">
                    <Pill muted type={pill.type}>{pill.label}</Pill>
                    {e.managerName && (
                      <div className="oe-holdout-manager">
                        <IconV2 name="user-tie-regular" size={12} color="neutral-medium" />
                        <BodyText size="extra-small" color="neutral-weak">Manager: {e.managerName}</BodyText>
                      </div>
                    )}
                  </div>
                  <Button size="small" variant="outlined" color="secondary">View</Button>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <Section.Header
          title="What You Don't Have to Do"
          icon="circle-check-solid"
        />
        <div className="oe-stage">
          <div className="oe-card-grid">
            <div className="oe-not-doing-card">
              <IconV2 name="circle-check-regular" size={16} color="success-strong" />
              <div>
                <BodyText size="small" weight="semibold">Send reminders</BodyText>
                <BodyText size="small" color="neutral-weak">Tier 1, 2, and 3 reminders went out automatically. Manager emails are scheduled.</BodyText>
              </div>
            </div>
            <div className="oe-not-doing-card">
              <IconV2 name="circle-check-regular" size={16} color="success-strong" />
              <div>
                <BodyText size="small" weight="semibold">Track who hasn't enrolled</BodyText>
                <BodyText size="small" color="neutral-weak">The dashboard updates live. No spreadsheets.</BodyText>
              </div>
            </div>
            <div className="oe-not-doing-card">
              <IconV2 name="circle-check-regular" size={16} color="success-strong" />
              <div>
                <BodyText size="small" weight="semibold">Answer routine benefits questions</BodyText>
                <BodyText size="small" color="neutral-weak">The Benefits Assistant handled 612 conversations this cycle. Maya handled 14 exceptions.</BodyText>
              </div>
            </div>
            <div className="oe-not-doing-card">
              <Headline size="extra-small" component="h4">What you do, do</Headline>
              <BodyText size="small" color="neutral-weak">
                Real conversations with employees who need help thinking through tradeoffs. Exceptions that need real judgment.
              </BodyText>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
