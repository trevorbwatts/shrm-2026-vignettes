import { useState } from 'react';
import { BodyText, Button, TextButton, Pill, PillType, IconV2, Avatar, Headline } from '@bamboohr/fabric';
import type { CalibrationFlag, ReviewRating } from '../data/performanceCycleData';
import './stages.css';

interface CalibrationFlagCardProps {
  flag: CalibrationFlag;
}

const ratingLabel = (r: ReviewRating) =>
  r === 'exceeds' ? 'Exceeds' : r === 'meets' ? 'Meets' : 'Below';

const ratingPillType = (r: ReviewRating): PillType =>
  r === 'exceeds' ? PillType.Success : r === 'meets' ? PillType.Info : PillType.Warning;

const flagTypeMeta = {
  'distribution-outlier': { label: 'Outlier', icon: 'chart-column-regular', color: 'warning-strong' },
  'similar-employees': { label: 'Inconsistency', icon: 'scale-balanced-regular', color: 'info-strong' },
  'recency-bias': { label: 'Recency bias', icon: 'clock-rotate-left-regular', color: 'discovery-strong' },
} as const;

export function CalibrationFlagCard({ flag }: CalibrationFlagCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [resolved, setResolved] = useState(false);
  const meta = flagTypeMeta[flag.type];

  return (
    <div className={`pc-flag-card${resolved ? ' pc-flag-card--resolved' : ''}`}>
      <div className="pc-flag-header" onClick={() => setExpanded((p) => !p)}>
        <div className="pc-flag-header-left">
          <div className={`pc-flag-icon pc-flag-icon--${flag.type}`}>
            <IconV2 name={meta.icon} size={16} color={meta.color} />
          </div>
          <div>
            <div className="pc-flag-pill-row">
              <Pill muted type={flag.type === 'distribution-outlier' ? PillType.Warning : flag.type === 'similar-employees' ? PillType.Info : PillType.Discovery}>
                {meta.label}
              </Pill>
              {resolved && <Pill muted type={PillType.Success}>Resolved</Pill>}
            </div>
            <Headline size="extra-small" component="h4">{flag.headline}</Headline>
            <BodyText size="small" color="neutral-weak">{flag.body}</BodyText>
          </div>
        </div>
        <IconV2
          name={expanded ? 'chevron-up-regular' : 'chevron-down-regular'}
          size={12}
          color="neutral-medium"
        />
      </div>

      {expanded && !resolved && (
        <div className="pc-flag-body">
          {flag.distribution && (
            <div className="pc-distribution">
              <div className="pc-dist-section">
                <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                  {flag.distribution.managerName} — this cycle
                </BodyText>
                <div className="pc-dist-bars">
                  {flag.distribution.ratings.map((r, i) => (
                    <div key={i} className="pc-dist-bar-row">
                      <span className="pc-dist-bar-label">
                        <Pill muted type={ratingPillType(r.rating)}>{ratingLabel(r.rating)}</Pill>
                      </span>
                      <div className="pc-dist-bar-track">
                        <div
                          className={`pc-dist-bar-fill pc-dist-bar-fill--${r.rating}`}
                          style={{ width: `${(r.count / Math.max(...flag.distribution!.ratings.map((x) => x.count), 1)) * 100}%` }}
                        />
                      </div>
                      <span className="pc-dist-bar-value">
                        <BodyText size="small">{r.count}</BodyText>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pc-dist-section">
                <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                  Peer managers — this cycle
                </BodyText>
                <div className="pc-dist-bars">
                  {flag.distribution.peerAverage.map((r, i) => (
                    <div key={i} className="pc-dist-bar-row">
                      <span className="pc-dist-bar-label">
                        <Pill muted type={ratingPillType(r.rating)}>{ratingLabel(r.rating)}</Pill>
                      </span>
                      <div className="pc-dist-bar-track">
                        <div
                          className={`pc-dist-bar-fill pc-dist-bar-fill--peer pc-dist-bar-fill--${r.rating}`}
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="pc-dist-bar-value">
                        <BodyText size="small" color="neutral-weak">{r.pct}%</BodyText>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {flag.pair && (
            <div className="pc-pair">
              <div className="pc-pair-cards">
                {[flag.pair.a, flag.pair.b].map((p) => (
                  <div key={p.id} className="pc-pair-card">
                    <div className="pc-pair-card-head">
                      <Avatar src={p.photoUrl} alt={`${p.firstName} ${p.lastName}`} size={40} />
                      <div>
                        <BodyText size="small" weight="semibold">{p.firstName} {p.lastName}</BodyText>
                        <BodyText size="extra-small" color="neutral-weak">{p.jobTitle}</BodyText>
                      </div>
                    </div>
                    <div className="pc-pair-card-rating">
                      <Pill muted type={ratingPillType(p.rating)}>{ratingLabel(p.rating)} Expectations</Pill>
                      <BodyText size="small" color="neutral-weak">Score: {p.reviewScore}</BodyText>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pc-pair-diffs">
                <BodyText size="extra-small" weight="semibold" color="neutral-medium">What they share</BodyText>
                <ul>
                  {flag.pair.differentiators.map((d, i) => (
                    <li key={i}>
                      <IconV2 name="circle-dot-regular" size={10} color="neutral-medium" />
                      <BodyText size="small">{d}</BodyText>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {flag.recency && (
            <div className="pc-recency">
              <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                Recent events influencing the rating
              </BodyText>
              <ol className="pc-timeline">
                {flag.recency.events.map((e, i) => (
                  <li key={i}>
                    <span className="pc-timeline-dot" />
                    <div>
                      <BodyText size="extra-small" color="neutral-weak">{e.date}</BodyText>
                      <BodyText size="small">{e.impact}</BodyText>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="pc-flag-actions">
            <TextButton onClick={() => setResolved(true)}>Mark Resolved</TextButton>
            <Button size="small" variant="outlined" color="secondary">
              Open in Calibration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
