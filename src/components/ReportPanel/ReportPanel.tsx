import { useState } from 'react';
import {
  Button,
  TextButton,
  IconButton,
  IconV2,
  BodyText,
  Headline,
  StandardModal,
  TextField,
  IconTile,
} from '@bamboohr/fabric';
import { useReport, DEFAULT_SHAPE } from '../../contexts/ReportContext';
import { OfferAcceptanceReportView } from '../reports/OfferAcceptanceReportView';
import './ReportPanel.css';

export function ReportPanel() {
  const { attachedReport, setAttachedReport, setActiveReportId, shape, applyShape, resetShape } =
    useReport();
  const [saveOpen, setSaveOpen] = useState(false);
  const [viewName, setViewName] = useState('Engineering Comp Gap Q1–Q2');
  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);

  if (!attachedReport) return null;

  const triggerSlidedown = (msg: string) => {
    setSlidedownMessage(msg);
    window.setTimeout(() => setSlidedownMessage(null), 2800);
  };

  const handleClose = () => {
    setAttachedReport(null);
    setActiveReportId(null);
    resetShape();
  };

  const handleReset = () => {
    applyShape(DEFAULT_SHAPE);
    triggerSlidedown('Report reset');
  };

  const handleSave = () => {
    applyShape({ savedViewName: viewName });
    setSaveOpen(false);
    triggerSlidedown(`Saved to Reports as "${viewName}"`);
  };

  return (
    <div className="report-panel">
      {slidedownMessage && (
        <div className="report-panel__slidedown">
          <div className="report-panel__toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedownMessage}</BodyText>
          </div>
        </div>
      )}

      <div className="report-panel__header">
        <div className="report-panel__title">
          <IconV2 name="chart-line-up-regular" size={20} color="discovery-strong" />
          <BodyText size="large" weight="semibold">
            Offer Acceptance · Engineering
          </BodyText>
          <span
            className={`report-panel__badge${shape.savedViewName ? ' report-panel__badge--saved' : ''}`}
          >
            {shape.savedViewName
              ? `Saved · ${shape.savedViewName}`
              : 'Ephemeral · not saved yet'}
          </span>
        </div>
        <div className="report-panel__header-actions">
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={<IconV2 name="arrow-rotate-left-regular" size={12} />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<IconV2 name="bookmark-regular" size={12} />}
            onClick={() => setSaveOpen(true)}
          >
            Save to Reports
          </Button>
          <IconButton
            icon="xmark-solid"
            aria-label="Close report"
            size="small"
            variant="outlined"
            onClick={handleClose}
          />
        </div>
      </div>

      <div className="report-panel__body">
        <OfferAcceptanceReportView hideAskHint />
      </div>

      <StandardModal isOpen={saveOpen} onRequestClose={() => setSaveOpen(false)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Save to Reports" />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setSaveOpen(false)}>
                  Cancel
                </TextButton>,
                <Button
                  key="save"
                  variant="contained"
                  color="primary"
                  disabled={!viewName.trim()}
                  onClick={handleSave}
                >
                  Save Report
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div className="report-panel__save-modal">
              <IconTile
                icon={<IconV2 name="bookmark-regular" color="info-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">
                Save this report to Reports
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                Your filter, columns, and sort will be saved as a named report. You'll find it in
                the Reports section.
              </BodyText>
              <div className="report-panel__save-input">
                <TextField
                  label="Report name"
                  value={viewName}
                  onChange={(e) => setViewName(e.target.value)}
                />
              </div>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
    </div>
  );
}
