import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gridlet,
  Headline,
  BodyText,
  Avatar,
  TextButton,
  IconV2,
} from '@bamboohr/fabric';
import { overnightSummary } from '../data/automationsData';
import type { AutomationException } from '../data/automationsData';
import { ExceptionReviewSheet } from './ExceptionReviewSheet';
import './WhileYouWereAwayCard.css';

interface WhileYouWereAwayCardProps {
  onResolveAction?: (message: string) => void;
}

export function WhileYouWereAwayCard({ onResolveAction }: WhileYouWereAwayCardProps) {
  const navigate = useNavigate();
  const [activeException, setActiveException] = useState<AutomationException | null>(null);
  const [resolvedExceptionIds, setResolvedExceptionIds] = useState<Set<string>>(new Set());
  const [isDismissed, setIsDismissed] = useState(false);

  const exceptions = overnightSummary.exceptions.filter((e) => !resolvedExceptionIds.has(e.id));
  const hasExceptions = exceptions.length > 0;

  if (isDismissed) {
    return null;
  }

  const handleReview = (exception: AutomationException) => {
    setActiveException(exception);
  };

  const handleResolve = (exceptionId: string, confirmation: string) => {
    setResolvedExceptionIds((prev) => new Set(prev).add(exceptionId));
    setActiveException(null);
    onResolveAction?.(confirmation);
  };

  const handleClose = () => {
    setActiveException(null);
  };

  return (
    <>
      <Gridlet
        header={
          <Gridlet.Header
            title="While You Were Away"
            icon="moon-regular"
            right={
              <button
                type="button"
                className="wywa-dismiss-button"
                aria-label="Dismiss"
                onClick={() => setIsDismissed(true)}
              >
                <IconV2 name="xmark-regular" size={16} color="neutral-medium" />
              </button>
            }
          />
        }
      >
        <Gridlet.Body>
          <div className="wywa-content">
            <div className="wywa-headline">
              <BodyText size="small" color="neutral-weak">
                Since {overnightSummary.since}
              </BodyText>
              <div className="wywa-headline-row">
                <Headline size="medium" color="neutral-strong">
                  {overnightSummary.totalResolved} tasks resolved overnight
                </Headline>
              </div>
              <BodyText size="small" color="neutral-weak">
                Across {overnightSummary.automationsRun} automations · {overnightSummary.totalContacted} employees contacted
              </BodyText>
            </div>

            {hasExceptions && (
              <div className="wywa-exceptions">
                <div className="wywa-exceptions-label">
                  <IconV2 name="circle-exclamation-regular" size={14} color="warning-strong" />
                  <BodyText size="small" weight="semibold" color="neutral-strong">
                    Needs your eyes ({exceptions.length})
                  </BodyText>
                </div>
                <div className="wywa-exceptions-list">
                  {exceptions.map((exception) => (
                    <div key={exception.id} className="wywa-exception-row">
                      <Avatar
                        src={exception.employee.avatar}
                        alt={exception.employee.name}
                        size={32}
                      />
                      <div className="wywa-exception-text">
                        <BodyText size="small" weight="semibold" color="neutral-strong">
                          {exception.employee.name}
                        </BodyText>
                        <BodyText size="extra-small" color="neutral-weak">
                          {exception.issue} · {exception.daysOverdue} days overdue
                        </BodyText>
                      </div>
                      <TextButton
                        size="small"
                        onClick={() => handleReview(exception)}
                      >
                        Review
                      </TextButton>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasExceptions && (
              <div className="wywa-empty">
                <BodyText size="small" color="neutral-weak">
                  All quiet overnight ☕ — automations will check in again at 7 AM.
                </BodyText>
              </div>
            )}

            <div className="wywa-footer">
              <TextButton
                size="small"
                onClick={() => navigate('/automations')}
              >
                View all automations
              </TextButton>
            </div>
          </div>
        </Gridlet.Body>
      </Gridlet>

      {activeException && (
        <ExceptionReviewSheet
          exception={activeException}
          isOpen={!!activeException}
          onClose={handleClose}
          onResolve={handleResolve}
        />
      )}
    </>
  );
}
