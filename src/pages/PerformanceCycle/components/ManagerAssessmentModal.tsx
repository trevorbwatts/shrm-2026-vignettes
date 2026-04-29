import { useState } from 'react';
import {
  StandardModal,
  BodyText,
  Headline,
  Button,
  TextButton,
  TextField,
  RadioGroup,
  InlineMessage,
  IconV2,
} from '@bamboohr/fabric';
import { AssessmentCopilot } from './AssessmentCopilot';
import { reviewedEmployees, assessmentContexts } from '../data/performanceCycleData';
import './stages.css';

interface ManagerAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ratingOptions = [
  { label: 'Below Expectations', value: 'below' },
  { label: 'Meets Expectations', value: 'meets' },
  { label: 'Exceeds Expectations', value: 'exceeds' },
];

const competencies = [
  { id: 'technical', label: 'Technical depth', prompt: 'Describe a complex technical decision Alex owned and how it played out.' },
  { id: 'collaboration', label: 'Collaboration', prompt: 'How did Alex partner across functions to ship work this cycle?' },
  { id: 'quality', label: 'Quality', prompt: 'How consistently does Alex produce work that meets the team bar?' },
  { id: 'mentorship', label: 'Mentorship', prompt: 'What evidence have you seen of Alex raising the level of others?' },
  { id: 'ownership', label: 'Ownership', prompt: 'How does Alex handle ambiguity and unblock themselves?' },
];

export function ManagerAssessmentModal({ isOpen, onClose }: ManagerAssessmentModalProps) {
  const employee = reviewedEmployees[0];
  const context = assessmentContexts[employee.id];
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState('');
  const [contextAdded, setContextAdded] = useState(false);

  const collaborationRating = ratings['collaboration'];
  const showCollaborationCopilot = collaborationRating === 'meets' && !contextAdded;

  const handleAddContext = () => {
    setNotes((prev) => ({
      ...prev,
      collaboration:
        (prev.collaboration ? prev.collaboration + '\n\n' : '') +
        'Alex led the cross-functional onboarding revamp this cycle when the original lead went on leave — coordinated three teams and shipped two weeks ahead of schedule. Notes from our last three 1:1s consistently reference her cross-team work.',
    }));
    setContextAdded(true);
  };

  return (
    <StandardModal isOpen={isOpen} onRequestClose={onClose}>
      <StandardModal.Body
        size="full"
        renderHeader={
          <StandardModal.Header
            title={`Performance review: ${employee.firstName} ${employee.lastName}`}
          />
        }
        renderFooter={
          <StandardModal.Footer
            actions={[
              <Button key="submit" variant="contained" color="primary" onClick={onClose}>
                Submit Review
              </Button>,
              <TextButton key="draft" onClick={onClose}>Save Draft</TextButton>,
              <TextButton key="close" color="secondary" onClick={onClose}>Close Preview</TextButton>,
            ]}
          />
        }
      >
        <StandardModal.UpperContent>
          <div className="pc-manager-modal">
            <div className="pc-manager-subhead">
              <BodyText size="medium" color="neutral-medium">
                {employee.jobTitle} · {employee.department} · Q2 2026 · Reviewer: Sarah Okafor
              </BodyText>
            </div>

            <InlineMessage
              status="discovery"
              title="Manager view preview"
              description="You're previewing the manager-side experience for this assessment. Submitting won't change cycle state."
            />

            <div className="pc-manager-grid">
              <div className="pc-manager-form">
                <div className="pc-manager-section-head">
                  <IconV2 name="circle-user-regular" size={16} color="primary-strong" />
                  <Headline size="extra-small" component="h3">Competency ratings</Headline>
                </div>

                {competencies.map((c) => (
                  <div key={c.id} className="pc-competency-block">
                    <div className="pc-competency-block-header">
                      <BodyText size="medium" weight="semibold">{c.label}</BodyText>
                      <BodyText size="small" color="neutral-weak">{c.prompt}</BodyText>
                    </div>

                    <RadioGroup
                      ariaLabel={`Rating for ${c.label}`}
                      name={`rating-${c.id}`}
                      value={ratings[c.id] ?? ''}
                      onChange={({ value }: { value: string }) => setRatings((prev) => ({ ...prev, [c.id]: value }))}
                      items={ratingOptions}
                    />

                    {c.id === 'collaboration' && showCollaborationCopilot && (
                      <div className="pc-copilot-prompt">
                        <InlineMessage
                          status="ai"
                          title="Add Recent Context?"
                          description="You rated Alex as Meets Expectations on collaboration. Her last three 1:1 notes reference the cross-functional initiative she led. Would you like to add that context before submitting?"
                          action={
                            <Button size="small" color="ai" variant="outlined" onClick={handleAddContext}>
                              Add This Context
                            </Button>
                          }
                        />
                      </div>
                    )}

                    <TextField
                      label="Notes (optional)"
                      value={notes[c.id] ?? ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setNotes((prev) => ({ ...prev, [c.id]: e.target.value }))
                      }
                      multiline
                      rows={3}
                      placeholder="Share specific examples to support your rating..."
                    />
                  </div>
                ))}

                <div className="pc-competency-block">
                  <div className="pc-competency-block-header">
                    <BodyText size="medium" weight="semibold">Overall summary</BodyText>
                    <BodyText size="small" color="neutral-weak">A short narrative on this cycle as a whole.</BodyText>
                  </div>
                  <TextField
                    label="Summary"
                    value={summary}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSummary(e.target.value)}
                    multiline
                    rows={5}
                    placeholder="What did Alex do well this cycle? Where can she stretch next?"
                  />
                </div>
              </div>

              <aside className="pc-manager-sidebar">
                <AssessmentCopilot context={context} employeeFirstName={employee.firstName} />
              </aside>
            </div>
          </div>
        </StandardModal.UpperContent>
      </StandardModal.Body>
    </StandardModal>
  );
}
