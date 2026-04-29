import { Section, BodyText, InlineMessage, Button, IconV2, Pill, PillType } from '@bamboohr/fabric';
import { roleGroups, stageStats } from '../data/performanceCycleData';
import './stages.css';

export function SetupStage() {
  return (
    <Section>
      <div className="pc-stage">
        <InlineMessage
          status="ai"
          title="Cycle Pre-populated From the Job Library"
          description={`I generated ${stageStats.setup.questionsGenerated} competency questions for ${stageStats.setup.roleGroups} role groups, drawn from each role's job code and level. Review and adjust before opening the cycle to managers.`}
        />

        <div className="pc-role-grid">
          {roleGroups.map((group) => (
            <div key={group.id} className="pc-role-card">
              <div className="pc-role-card-header">
                <div>
                  <BodyText size="extra-small" color="neutral-weak">{group.department}</BodyText>
                  <BodyText size="medium" weight="semibold">{group.level}</BodyText>
                </div>
                <Pill muted type={PillType.Info}>{group.competencyCount} questions</Pill>
              </div>

              <ul className="pc-competency-list">
                {group.questions.slice(0, 3).map((q) => (
                  <li key={q.id} className="pc-competency-item">
                    <IconV2 name="circle-check-regular" size={12} color="success-strong" />
                    <div>
                      <BodyText size="small" weight="medium">{q.competency}</BodyText>
                      <BodyText size="extra-small" color="neutral-weak">{q.sample}</BodyText>
                    </div>
                  </li>
                ))}
                {group.questions.length > 3 && (
                  <li className="pc-competency-more">
                    <BodyText size="extra-small" color="neutral-weak">
                      +{group.questions.length - 3} more
                    </BodyText>
                  </li>
                )}
              </ul>

              <div className="pc-role-card-footer">
                <Button size="small" variant="outlined" color="secondary">Adjust</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
