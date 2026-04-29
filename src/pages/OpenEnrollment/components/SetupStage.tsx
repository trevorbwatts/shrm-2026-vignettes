import { Section, BodyText, InlineMessage, Button, IconV2, Pill, PillType, TileV2 } from '@bamboohr/fabric';
import { planDocuments, reminderTiers, stageStats, cycleDates } from '../data/openEnrollmentData';
import './stages.css';

const docTypeLabel: Record<string, string> = {
  medical: 'Medical',
  dental: 'Dental',
  vision: 'Vision',
  fsa: 'FSA',
  hsa: 'HSA',
  '401k': '401(k)',
  life: 'Life',
  disability: 'Disability',
  eligibility: 'Eligibility',
};

export function SetupStage() {
  const stats = stageStats.setup;

  return (
    <div className="oe-stage">
      <Section>
        <div className="oe-stage">
          <div className="oe-stat-tiles">
            <TileV2 icon="file-lines-solid" title={String(stats.docsImported)} description="Plan documents imported" orientation="horizontal" />
            <TileV2 icon="list-check-solid" title={String(stats.eligibilityRulesGenerated)} description="Eligibility rules generated" orientation="horizontal" />
            <TileV2 icon="bell-solid" title={String(stats.reminderTiers)} description="Tiered reminders configured" orientation="horizontal" />
          </div>

          <InlineMessage
            status="ai"
            title="Cycle Is Ready to Open"
            description={`I imported your 12 plan documents, generated 17 eligibility rules, and scheduled 4 tiered reminders. Cycle opens ${cycleDates.opensOn} and closes ${cycleDates.closesOn}. Effective ${cycleDates.effectiveOn}.`}
          />
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Plan Documents"
          icon="file-lines-solid"
          description="Bamboo reads these to answer enrollment questions and apply eligibility rules."
        />
        <div className="oe-stage">
          <div className="oe-doc-grid">
            {planDocuments.map((doc) => (
              <div key={doc.id} className="oe-doc-card">
                <div className="oe-doc-icon">
                  <IconV2 name="file-lines-regular" size={16} color="primary-strong" />
                </div>
                <div className="oe-doc-meta">
                  <BodyText size="small" weight="semibold">{doc.title}</BodyText>
                  <div className="oe-doc-pills">
                    <Pill muted type={PillType.Info}>{docTypeLabel[doc.type]}</Pill>
                    <BodyText size="extra-small" color="neutral-weak">{doc.pages} pages · imported {doc.importedAt}</BodyText>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Reminder Cadence"
          icon="bell-solid"
          description="Tiered by status. The final 48 hours auto-loops managers for any holdouts."
        />
        <div className="oe-stage">
          <div className="oe-tier-list">
            {reminderTiers.map((tier) => (
              <div key={tier.id} className="oe-tier-card">
                <div className="oe-tier-head">
                  <div>
                    <BodyText size="medium" weight="semibold">{tier.label}</BodyText>
                    <BodyText size="small" color="neutral-weak">{tier.description}</BodyText>
                  </div>
                  <Button size="small" variant="outlined" color="secondary">Adjust</Button>
                </div>
                <div className="oe-tier-meta">
                  <div className="oe-tier-meta-item">
                    <BodyText size="extra-small" color="neutral-weak">Audience</BodyText>
                    <BodyText size="small">{tier.audience}</BodyText>
                  </div>
                  <div className="oe-tier-meta-item">
                    <BodyText size="extra-small" color="neutral-weak">Channel</BodyText>
                    <BodyText size="small">{tier.channel}</BodyText>
                  </div>
                  <div className="oe-tier-meta-item">
                    <BodyText size="extra-small" color="neutral-weak">Trigger</BodyText>
                    <BodyText size="small">{tier.trigger}</BodyText>
                  </div>
                  <div className="oe-tier-meta-item">
                    <BodyText size="extra-small" color="neutral-weak">Scheduled</BodyText>
                    <BodyText size="small">{tier.scheduledFor}</BodyText>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
