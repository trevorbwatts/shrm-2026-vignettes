import { useNavigate } from 'react-router-dom';
import {
  Gridlet,
  BodyText,
  Button,
  IconV2,
  Pill,
  PillType,
} from '@bamboohr/fabric';
import './OnYourPlateCard.css';

interface PlateItem {
  id: string;
  icon: string;
  title: string;
  status: string;
  statusType: PillType;
  context: string;
  primaryActionLabel: string;
  primaryActionHref: string;
}

const plateItems: PlateItem[] = [
  {
    id: 'q2-cycle',
    icon: 'clipboard-list-solid',
    title: 'Q2 2026 Performance Review Cycle',
    status: 'Calibration ready',
    statusType: PillType.Info,
    context: '7 items flagged · ~40 min · Locks May 9',
    primaryActionLabel: 'Start Calibration',
    primaryActionHref: '/performance-cycle',
  },
  {
    id: '2026-open-enrollment',
    icon: 'heart-pulse-solid',
    title: '2026 Open Enrollment',
    status: 'Active · 80% complete',
    statusType: PillType.Success,
    context: '23 not started · 4 exceptions need your judgment · Closes Oct 27',
    primaryActionLabel: 'Open Dashboard',
    primaryActionHref: '/open-enrollment',
  },
  {
    id: 'payroll-close-apr',
    icon: 'circle-dollar-solid',
    title: 'Payroll Close · Apr 14 – Apr 25',
    status: 'Approval ready',
    statusType: PillType.Warning,
    context: '229 auto-approved · 4 exceptions need your call · Deadline Thu 4:00 PM',
    primaryActionLabel: 'Open Approval',
    primaryActionHref: '/payroll-close',
  },
];

export function OnYourPlateCard() {
  const navigate = useNavigate();

  return (
    <Gridlet
      header={
        <Gridlet.Header
          title="On Your Plate"
          icon={<IconV2 name="circle-half-stroke-solid" color="primary-strong" size={16} />}
        />
      }
    >
      <Gridlet.Body>
        <div className="oyp-content">
          <BodyText size="small" color="neutral-weak">
            Active work waiting on you. Lives here until it's done.
          </BodyText>

          <ul className="oyp-list">
            {plateItems.map((item) => (
              <li key={item.id} className="oyp-item">
                <div className="oyp-item-icon">
                  <IconV2 name={item.icon} size={16} color="primary-strong" />
                </div>

                <div className="oyp-item-body">
                  <div className="oyp-item-title-row">
                    <BodyText size="medium" weight="semibold" color="neutral-strong">
                      {item.title}
                    </BodyText>
                    <Pill muted type={item.statusType}>{item.status}</Pill>
                  </div>
                  <BodyText size="small" color="neutral-weak">
                    {item.context}
                  </BodyText>
                </div>

                <div className="oyp-item-action">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(item.primaryActionHref)}
                  >
                    {item.primaryActionLabel}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
