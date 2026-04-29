import { useState } from 'react';
import {
  Gridlet,
  Headline,
  BodyText,
  Button,
  IconV2,
  Avatar,
} from '@bamboohr/fabric';
import { recognitionEmployees, recognitionInsight } from '../data/recognitionData';
import { RecognitionQueueModal } from './RecognitionQueueModal';
import './RecognitionInsightCard.css';

interface RecognitionInsightCardProps {
  onSendComplete?: (count: number) => void;
}

export function RecognitionInsightCard({ onSendComplete }: RecognitionInsightCardProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  if (isDismissed) {
    return null;
  }

  const previewAvatars = recognitionEmployees.slice(0, 5);
  const remainingCount = recognitionInsight.totalEmployees - previewAvatars.length;

  return (
    <>
      <Gridlet
        header={
          <Gridlet.Header
            title="Worth Your Attention"
            icon={<IconV2 name="sparkles-solid" color="discovery-strong" size={16} />}
            right={
              <button
                type="button"
                className="ric-dismiss-button"
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
          <div className="ric-content">
            <div className="ric-headline">
              <Headline size="small" component="h4" color="neutral-strong">
                {recognitionInsight.headline}
              </Headline>
              <BodyText size="small" color="neutral-weak">
                {recognitionInsight.description}
              </BodyText>
            </div>

            <div className="ric-preview">
              <div className="ric-avatars">
                {previewAvatars.map((employee, index) => (
                  <div
                    key={employee.id}
                    className="ric-avatar-stack"
                    style={{ zIndex: previewAvatars.length - index }}
                  >
                    <Avatar src={employee.avatar} alt={employee.name} size={32} />
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div className="ric-avatar-more">
                    <BodyText size="extra-small" weight="semibold" color="neutral-strong">
                      +{remainingCount}
                    </BodyText>
                  </div>
                )}
              </div>
              <BodyText size="small" color="neutral-weak">
                {recognitionInsight.totalEmployees} people · drafts ready
              </BodyText>
            </div>

            <div className="ric-actions">
              <Button
                size="small"
                color="ai"
                variant="outlined"
                onClick={() => setIsQueueOpen(true)}
              >
                Open Recognition Queue
              </Button>
            </div>
          </div>
        </Gridlet.Body>
      </Gridlet>

      <RecognitionQueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        onSend={(count) => onSendComplete?.(count)}
      />
    </>
  );
}
