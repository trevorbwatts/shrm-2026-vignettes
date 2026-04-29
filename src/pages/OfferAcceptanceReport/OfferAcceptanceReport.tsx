import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeaderV2,
  BodyText,
  Headline,
  Button,
  TextButton,
  IconV2,
  StandardModal,
  TextField,
  IconTile,
} from '@bamboohr/fabric';
import { useReport } from '../../contexts/ReportContext';
import { OfferAcceptanceReportView } from '../../components/reports/OfferAcceptanceReportView';
import './OfferAcceptanceReport.css';

export default function OfferAcceptanceReport() {
  const navigate = useNavigate();
  const { setActiveReportId, applyShape, resetShape, shape } = useReport();
  const [saveOpen, setSaveOpen] = useState(false);
  const [viewName, setViewName] = useState(shape.savedViewName ?? 'Engineering Comp Gap Q1–Q2');
  const [slidedown, setSlidedown] = useState<string | null>(null);

  useEffect(() => {
    setActiveReportId('offer-acceptance');
    return () => {
      setActiveReportId(null);
    };
  }, [setActiveReportId]);

  const triggerSlidedown = (msg: string) => {
    setSlidedown(msg);
    window.setTimeout(() => setSlidedown(null), 2800);
  };

  const handleSave = () => {
    applyShape({ savedViewName: viewName });
    setSaveOpen(false);
    triggerSlidedown(`View saved: "${viewName}"`);
  };

  return (
    <div className="oar-page">
      {slidedown && (
        <div className="oar-slidedown">
          <div className="oar-toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedown}</BodyText>
          </div>
        </div>
      )}

      <div className="oar-back">
        <TextButton
          startIcon={<IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />}
          size="small"
          color="secondary"
          onClick={() => navigate('/reports')}
        >
          Back to Reports
        </TextButton>
      </div>

      <PageHeaderV2
        title="Offer Acceptance"
        subtitle="Engineering · trends, market positioning, and decline reasons"
      />

      <OfferAcceptanceReportView
        headerActions={[
          <Button
            key="save"
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={<IconV2 name="bookmark-regular" size={12} />}
            onClick={() => setSaveOpen(true)}
          >
            Save View
          </Button>,
          <Button
            key="reset"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              resetShape();
              triggerSlidedown('View reset');
            }}
          >
            Reset
          </Button>,
        ]}
      />

      <StandardModal isOpen={saveOpen} onRequestClose={() => setSaveOpen(false)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Save this view" />}
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
                  Save View
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div className="oar-save-modal">
              <div className="oar-save-icon">
                <IconTile
                  icon={<IconV2 name="bookmark-regular" color="info-strong" size={24} />}
                  size={56}
                  variant="muted"
                />
              </div>
              <Headline size="small" component="h4" color="neutral-strong">
                Save this view for later
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                You can pull this exact filter, columns, and sort up again from the Reports list.
              </BodyText>
              <div className="oar-save-input">
                <TextField
                  label="View name"
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
