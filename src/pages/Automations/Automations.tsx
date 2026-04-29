import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeaderV2,
  Section,
  BodyText,
  IconV2,
  RoundedToggle,
  TextButton,
} from '@bamboohr/fabric';
import { automations as initialAutomations, weeklyTaskCount } from '../HRManagerHome/data/automationsData';
import type { Automation } from '../HRManagerHome/data/automationsData';
import './Automations.css';

export default function Automations() {
  const navigate = useNavigate();
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);

  const activeCount = automations.filter((a) => a.isActive).length;
  const pausedCount = automations.length - activeCount;

  const handleToggle = (id: string) => {
    let nextActive = false;
    let name = '';
    setAutomations((prev) =>
      prev.map((automation) => {
        if (automation.id === id) {
          nextActive = !automation.isActive;
          name = automation.name;
          return { ...automation, isActive: nextActive };
        }
        return automation;
      })
    );

    setSlidedownMessage(`${name} ${nextActive ? 'resumed' : 'paused'}`);
    window.setTimeout(() => setSlidedownMessage(null), 2400);
  };

  return (
    <div className="automations-page">
      {slidedownMessage && (
        <div className="automations-slidedown">
          <div className="automations-toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedownMessage}</BodyText>
          </div>
        </div>
      )}

      <div className="automations-back">
        <TextButton
          startIcon={<IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />}
          size="small"
          color="secondary"
          onClick={() => navigate('/hr-home')}
        >
          Back to home
        </TextButton>
      </div>

      <PageHeaderV2
        title="Automations"
        subtitle="Repeating work that BambooHR handles for you. Pause anything you don't want running."
      />

      <Section>
        <Section.Header
          title="Running Automations"
          description={`${activeCount} active · ${pausedCount} paused · ${weeklyTaskCount} tasks completed this week`}
        />
        <div className="automations-list">
          {automations.map((automation) => (
            <div
              key={automation.id}
              className={`automation-row${automation.isActive ? '' : ' automation-row--paused'}`}
            >
              <div className="automation-icon">
                <IconV2
                  name={automation.icon}
                  size={20}
                  color={automation.isActive ? 'primary-strong' : 'neutral-medium'}
                />
              </div>
              <div className="automation-text">
                <BodyText weight="semibold" color="neutral-strong">
                  {automation.name}
                </BodyText>
                <BodyText size="small" color="neutral-weak">
                  {automation.description}
                </BodyText>
                {automation.lastRun && automation.isActive && (
                  <BodyText size="extra-small" color="neutral-weak">
                    Last run: {automation.lastRunAt} — {automation.lastRun.summary}
                  </BodyText>
                )}
                {!automation.isActive && (
                  <BodyText size="extra-small" color="neutral-weak">
                    {automation.lastRunAt}
                  </BodyText>
                )}
              </div>
              <div className="automation-meta">
                <BodyText size="small" color="neutral-medium">
                  {automation.schedule}
                </BodyText>
              </div>
              <div className="automation-toggle">
                <RoundedToggle
                  ariaLabel={`${automation.name} ${automation.isActive ? 'on' : 'off'}`}
                  isChecked={automation.isActive}
                  isControlled={true}
                  onChange={() => handleToggle(automation.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
