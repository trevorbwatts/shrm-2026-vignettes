import { useState, useEffect, useMemo } from 'react';
import {
  StandardModal,
  Avatar,
  BodyText,
  Headline,
  Button,
  TextButton,
  IconV2,
  IconTile,
  Pill,
  PillType,
  InlineMessage,
} from '@bamboohr/fabric';
import {
  recognitionEmployees,
  recognitionContextMeta,
} from '../data/recognitionData';
import './RecognitionQueueModal.css';

interface RecognitionQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (count: number) => void;
}

const pillTypeFor = (key: 'info' | 'success' | 'discovery' | 'warning'): PillType => {
  switch (key) {
    case 'info':
      return PillType.Info;
    case 'success':
      return PillType.Success;
    case 'discovery':
      return PillType.Discovery;
    case 'warning':
      return PillType.Warning;
  }
};

export function RecognitionQueueModal({ isOpen, onClose, onSend }: RecognitionQueueModalProps) {
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(recognitionEmployees.map((e) => [e.id, e.draftMessage]))
  );
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setDrafts(Object.fromEntries(recognitionEmployees.map((e) => [e.id, e.draftMessage])));
      setSentIds(new Set());
      setSkippedIds(new Set());
      setCurrentIndex(0);
    }
  }, [isOpen]);

  const totalCount = recognitionEmployees.length;
  const sentCount = sentIds.size;
  const skippedCount = skippedIds.size;
  const isDone = currentIndex >= totalCount;

  const currentEmployee = useMemo(
    () => (isDone ? null : recognitionEmployees[currentIndex]),
    [currentIndex, isDone]
  );

  const updateDraft = (value: string) => {
    if (!currentEmployee) return;
    setDrafts((prev) => ({ ...prev, [currentEmployee.id]: value }));
  };

  const handleSkip = () => {
    if (!currentEmployee) return;
    setSkippedIds((prev) => {
      const next = new Set(prev);
      if (!sentIds.has(currentEmployee.id)) {
        next.add(currentEmployee.id);
      }
      return next;
    });
    setCurrentIndex((i) => i + 1);
  };

  const handleSendAndNext = () => {
    if (!currentEmployee) return;
    setSentIds((prev) => new Set(prev).add(currentEmployee.id));
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.delete(currentEmployee.id);
      return next;
    });
    setCurrentIndex((i) => i + 1);
  };

  const handleBack = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleClose = () => {
    if (sentCount > 0) {
      onSend?.(sentCount);
    }
    onClose();
  };

  const meta = currentEmployee ? recognitionContextMeta[currentEmployee.contextType] : null;
  const draftValue = currentEmployee ? drafts[currentEmployee.id] : '';
  const isLast = currentIndex === totalCount - 1;

  return (
    <StandardModal isOpen={isOpen} onRequestClose={handleClose}>
      <StandardModal.Body
        size="medium"
        renderHeader={
          <StandardModal.Header
            title={
              isDone
                ? 'Recognition Queue'
                : `Recognition Queue · ${currentIndex + 1} of ${totalCount}`
            }
          />
        }
        renderFooter={
          isDone ? (
            <StandardModal.Footer
              actions={[
                <Button
                  key="done"
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Done
                </Button>,
              ]}
            />
          ) : (
            <StandardModal.Footer
              actions={[
                ...(currentIndex > 0
                  ? [
                      <TextButton
                        key="back"
                        startIcon={
                          <IconV2 name="chevron-left-solid" size={12} color="link" />
                        }
                        onClick={handleBack}
                      >
                        Back
                      </TextButton>,
                    ]
                  : []),
                <TextButton key="skip" onClick={handleSkip}>
                  Skip for now
                </TextButton>,
                <Button
                  key="send"
                  variant="contained"
                  color="primary"
                  startIcon={<IconV2 name="paper-plane-regular" size={14} />}
                  onClick={handleSendAndNext}
                >
                  {isLast ? 'Send & Finish' : 'Send & Next'}
                </Button>,
              ]}
            />
          )
        }
      >
        <StandardModal.UpperContent>
          {isDone ? (
            <div className="rqm-done">
              <IconTile
                icon={<IconV2 name="circle-check-regular" color="success-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">
                You've reached the end of the queue
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                {sentCount > 0
                  ? `Sent ${sentCount} ${sentCount === 1 ? 'recognition' : 'recognitions'}.`
                  : 'No recognitions sent yet.'}
                {skippedCount > 0 && ` ${skippedCount} ${skippedCount === 1 ? 'is' : 'are'} still waiting — I'll keep them in the queue.`}
              </BodyText>
            </div>
          ) : (
            currentEmployee && meta && (
              <div className="rqm-content">
                <div className="rqm-progress">
                  <div className="rqm-progress-bar">
                    <div
                      className="rqm-progress-fill"
                      style={{ width: `${(currentIndex / totalCount) * 100}%` }}
                    />
                  </div>
                  <BodyText size="extra-small" color="neutral-weak">
                    {sentCount} sent · {skippedCount} deferred · {totalCount - currentIndex} remaining
                  </BodyText>
                </div>

                <div className="rqm-card">
                  <div className="rqm-card-identity">
                    <Avatar
                      src={currentEmployee.avatar}
                      alt={currentEmployee.name}
                      size={56}
                    />
                    <div className="rqm-card-identity-text">
                      <Headline size="small" component="h4" color="neutral-strong">
                        {currentEmployee.name}
                      </Headline>
                      <BodyText size="small" color="neutral-weak">
                        {currentEmployee.role}
                      </BodyText>
                      <BodyText size="extra-small" color="neutral-weak">
                        Last recognized {currentEmployee.daysSinceLastRecognized} days ago
                      </BodyText>
                    </div>
                  </div>

                  <div className="rqm-card-context">
                    <Pill muted type={pillTypeFor(meta.pillType)}>
                      {meta.label}
                    </Pill>
                    <BodyText size="small" color="neutral-medium">
                      {currentEmployee.contextDetail}
                    </BodyText>
                  </div>

                  <InlineMessage
                    status="ai"
                    title="I drafted this from the context above"
                    description="Edit anything you'd like before sending. Skip to come back later."
                  />

                  <div className="rqm-card-message">
                    <label className="rqm-card-label" htmlFor="rqm-draft">
                      <BodyText size="small" weight="semibold" color="neutral-strong">
                        Recognition message
                      </BodyText>
                    </label>
                    <textarea
                      id="rqm-draft"
                      className="rqm-textarea"
                      value={draftValue}
                      onChange={(e) => updateDraft(e.target.value)}
                      rows={6}
                      aria-label={`Recognition message for ${currentEmployee.name}`}
                    />
                    <BodyText size="extra-small" color="neutral-weak">
                      Posted to the company recognition feed and sent to {currentEmployee.name.split(' ')[0]}.
                    </BodyText>
                  </div>
                </div>
              </div>
            )
          )}
        </StandardModal.UpperContent>
      </StandardModal.Body>
    </StandardModal>
  );
}
