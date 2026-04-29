import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeaderV2,
  Section,
  BodyText,
  Headline,
  Avatar,
  Button,
  TextButton,
  IconV2,
  Pill,
  PillType,
  Checkbox,
  InlineMessage,
  StandardModal,
  IconTile,
} from '@bamboohr/fabric';
import {
  recognitionEmployees,
  recognitionInsight,
  recognitionContextMeta,
} from '../HRManagerHome/data/recognitionData';
import type { RecognitionEmployee } from '../HRManagerHome/data/recognitionData';
import './Recognition.css';

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

export default function Recognition() {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(recognitionEmployees.map((e) => [e.id, e.draftMessage]))
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftBuffer, setDraftBuffer] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(recognitionEmployees.map((e) => e.id))
  );
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);

  const remaining = useMemo(
    () => recognitionEmployees.filter((e) => !sentIds.has(e.id)),
    [sentIds]
  );
  const selectedRemaining = useMemo(
    () => remaining.filter((e) => selectedIds.has(e.id)),
    [remaining, selectedIds]
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRemaining.length === remaining.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(remaining.map((e) => e.id)));
    }
  };

  const startEditing = (employee: RecognitionEmployee) => {
    setEditingId(employee.id);
    setDraftBuffer(drafts[employee.id]);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraftBuffer('');
  };

  const saveEditing = () => {
    if (editingId) {
      setDrafts((prev) => ({ ...prev, [editingId]: draftBuffer }));
    }
    setEditingId(null);
    setDraftBuffer('');
  };

  const sendBatch = () => {
    const ids = Array.from(selectedIds).filter((id) => !sentIds.has(id));
    setSentIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
    setSelectedIds(new Set());
    setConfirmOpen(false);
    setSlidedownMessage(`Recognition sent to ${ids.length} ${ids.length === 1 ? 'person' : 'people'}`);
    window.setTimeout(() => setSlidedownMessage(null), 3000);
  };

  const allDone = remaining.length === 0;

  return (
    <div className="recognition-page">
      {slidedownMessage && (
        <div className="recognition-slidedown">
          <div className="recognition-toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedownMessage}</BodyText>
          </div>
        </div>
      )}

      <div className="recognition-back">
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
        title="Recognition Queue"
        subtitle="People who haven't been recognized in a while. Drafts are written from real context — review, edit if needed, then send."
      />

      {!allDone && (
        <div className="recognition-banner">
          <InlineMessage
            status="ai"
            title={`${remaining.length} people in ${recognitionInsight.department} need recognition`}
            description="I drafted each message from a milestone, project, or peer mention I found. You can edit anything before sending."
          />
        </div>
      )}

      <Section>
        <Section.Header
          title="Drafts"
          description={
            allDone
              ? 'You\'re caught up — no one in this queue right now.'
              : `${remaining.length} drafts ready · ${selectedRemaining.length} selected`
          }
        />

        {!allDone && (
          <div className="recognition-toolbar">
            <div className="recognition-toolbar-left">
              <Checkbox
                value="select-all"
                checked={selectedRemaining.length === remaining.length && remaining.length > 0}
                indeterminate={
                  selectedRemaining.length > 0 && selectedRemaining.length < remaining.length
                }
                label={`Select all (${remaining.length})`}
                onChange={toggleAll}
              />
            </div>
            <div className="recognition-toolbar-right">
              <Button
                variant="contained"
                color="primary"
                disabled={selectedRemaining.length === 0}
                onClick={() => setConfirmOpen(true)}
                startIcon={<IconV2 name="paper-plane-regular" size={14} />}
              >
                Send Selected ({selectedRemaining.length})
              </Button>
            </div>
          </div>
        )}

        <div className="recognition-list">
          {remaining.map((employee) => {
            const meta = recognitionContextMeta[employee.contextType];
            const isEditing = editingId === employee.id;
            const isSelected = selectedIds.has(employee.id);
            const draft = drafts[employee.id];

            return (
              <div
                key={employee.id}
                className={`recognition-card${isSelected ? ' recognition-card--selected' : ''}`}
              >
                <div className="recognition-card-top">
                  <Checkbox
                    value={employee.id}
                    checked={isSelected}
                    onChange={() => toggleSelect(employee.id)}
                  />
                  <Avatar src={employee.avatar} alt={employee.name} size={48} />
                  <div className="recognition-card-identity">
                    <Headline size="extra-small" component="h4" color="neutral-strong">
                      {employee.name}
                    </Headline>
                    <BodyText size="small" color="neutral-weak">
                      {employee.role}
                    </BodyText>
                  </div>
                  <div className="recognition-card-meta">
                    <BodyText size="small" color="neutral-weak">
                      Last recognized {employee.daysSinceLastRecognized} days ago
                    </BodyText>
                  </div>
                </div>

                <div className="recognition-card-context">
                  <Pill muted type={pillTypeFor(meta.pillType)}>
                    {meta.label}
                  </Pill>
                  <BodyText size="small" color="neutral-medium">
                    {employee.contextDetail}
                  </BodyText>
                </div>

                <div className="recognition-card-draft">
                  {isEditing ? (
                    <>
                      <textarea
                        className="recognition-textarea"
                        value={draftBuffer}
                        onChange={(e) => setDraftBuffer(e.target.value)}
                        rows={5}
                        aria-label={`Recognition message for ${employee.name}`}
                      />
                      <div className="recognition-edit-actions">
                        <TextButton size="small" onClick={cancelEditing}>
                          Cancel
                        </TextButton>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={saveEditing}
                        >
                          Save Edits
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="recognition-draft-text">
                        <BodyText size="medium" color="neutral-strong">
                          {draft}
                        </BodyText>
                      </div>
                      <div className="recognition-draft-actions">
                        <TextButton
                          size="small"
                          startIcon={
                            <IconV2 name="pen-regular" size={12} color="link" />
                          }
                          onClick={() => startEditing(employee)}
                        >
                          Edit message
                        </TextButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {allDone && (
            <div className="recognition-empty">
              <IconTile
                icon={<IconV2 name="circle-check-regular" color="success-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">
                You're caught up
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                Recognition is current across Customer Success. I'll let you know when patterns
                like this come up again.
              </BodyText>
            </div>
          )}
        </div>
      </Section>

      <StandardModal isOpen={confirmOpen} onRequestClose={() => setConfirmOpen(false)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Send recognition?" />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </TextButton>,
                <Button
                  key="send"
                  variant="contained"
                  color="primary"
                  onClick={sendBatch}
                >
                  Send {selectedRemaining.length} Recognition{selectedRemaining.length === 1 ? '' : 's'}
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
                padding: '24px 0 16px',
                width: '100%',
              }}
            >
              <IconTile
                icon={<IconV2 name="paper-plane-regular" color="info-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">
                Send {selectedRemaining.length} recognition{' '}
                {selectedRemaining.length === 1 ? 'message' : 'messages'}?
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                Each message will be posted to the company recognition feed and the recipient
                will be notified.
              </BodyText>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
    </div>
  );
}
