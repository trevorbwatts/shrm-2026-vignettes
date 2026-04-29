import { useMemo } from 'react';
import {
  BodyText,
  Headline,
  Pill,
  PillType,
  IconV2,
  InlineMessage,
} from '@bamboohr/fabric';
import { useReport } from '../../contexts/ReportContext';
import type { SortKey } from '../../contexts/ReportContext';
import { offerAcceptanceData, offerAcceptanceSynthesis } from '../../data/offerAcceptanceData';
import type { OfferRecord } from '../../data/offerAcceptanceData';
import './OfferAcceptanceReportView.css';

const formatCurrency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const gapPercent = (offer: number, market: number) =>
  ((offer - market) / market) * 100;

const dateMatchesFilter = (iso: string, filter: string): boolean => {
  if (filter === 'all') return true;
  const date = new Date(iso);
  const today = new Date('2026-04-29');
  const monthsAgo = (m: number) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - m);
    return d;
  };
  if (filter === 'last-2-quarters') return date >= monthsAgo(6);
  if (filter === 'last-quarter') return date >= monthsAgo(3);
  if (filter === 'last-6-months') return date >= monthsAgo(6);
  return true;
};

const filterLabel: Record<string, string> = {
  all: 'All time',
  'last-2-quarters': 'Last two quarters',
  'last-quarter': 'Last quarter',
  'last-6-months': 'Last 6 months',
};

const statusPillType: Record<string, PillType> = {
  accepted: PillType.Success,
  declined: PillType.Error,
  pending: PillType.Info,
};

interface OfferAcceptanceReportViewProps {
  /**
   * If true, hides the AI hint banner ("Reshape this report from Ask").
   * Use when this view is rendered inside the Ask workspace itself (the hint is redundant).
   */
  hideAskHint?: boolean;
  /**
   * Optional content rendered to the right of the section header (e.g. Save / Reset buttons).
   */
  headerActions?: React.ReactNode[];
}

export function OfferAcceptanceReportView({
  hideAskHint,
  headerActions,
}: OfferAcceptanceReportViewProps) {
  const { shape } = useReport();

  const engineering = useMemo(
    () => offerAcceptanceData.filter((o) => o.department === 'Engineering'),
    []
  );

  const filtered = useMemo(
    () => engineering.filter((o) => dateMatchesFilter(o.date, shape.dateFilter)),
    [engineering, shape.dateFilter]
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    const dir = shape.sortDir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      const ga = gapPercent(a.offerAmount, a.marketMidpoint);
      const gb = gapPercent(b.offerAmount, b.marketMidpoint);
      switch (shape.sortBy as SortKey) {
        case 'gap':
          return (ga - gb) * dir;
        case 'amount':
          return (a.offerAmount - b.offerAmount) * dir;
        case 'level':
          return a.level.localeCompare(b.level) * dir;
        case 'date':
        default:
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      }
    });
    return list;
  }, [filtered, shape.sortBy, shape.sortDir]);

  const acceptedCount = filtered.filter((o) => o.status === 'accepted').length;
  const totalCount = filtered.length;
  const acceptanceRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;

  return (
    <div className="oarv">
      <div className="oarv-stats">
        <div className="oarv-stat">
          <BodyText size="extra-small" color="neutral-weak">
            Acceptance rate
          </BodyText>
          <div className="oarv-stat-value">
            <Headline size="medium" color="neutral-strong">
              {acceptanceRate}%
            </Headline>
            <Pill muted type={PillType.Error}>
              {offerAcceptanceSynthesis.engineeringSixMonths.delta} pts (6 mo)
            </Pill>
          </div>
        </div>
        <div className="oarv-stat">
          <BodyText size="extra-small" color="neutral-weak">
            Senior &amp; Staff IC market gap
          </BodyText>
          <div className="oarv-stat-value">
            <Headline size="medium" color="neutral-strong">
              −{offerAcceptanceSynthesis.seniorStaffMarketGap.percentBelow}%
            </Headline>
            <Pill muted type={PillType.Warning}>
              vs. Bamboo benchmark
            </Pill>
          </div>
        </div>
        <div className="oarv-stat">
          <BodyText size="extra-small" color="neutral-weak">
            Recent declines
          </BodyText>
          <div className="oarv-stat-value">
            <Headline size="medium" color="neutral-strong">
              {offerAcceptanceSynthesis.recentDeclines}
            </Headline>
            <Pill muted type={PillType.Discovery}>
              all cited compensation
            </Pill>
          </div>
        </div>
      </div>

      <div className="oarv-report">
        <div className="oarv-report-header">
          <div className="oarv-report-header-text">
            <Headline size="small" component="h3" color="primary-strong">
              Engineering Offers
            </Headline>
            <BodyText size="small" color="neutral-weak">
              {`${totalCount} offers · sorted by ${shape.sortBy} (${shape.sortDir}) · ${filterLabel[shape.dateFilter]}`}
            </BodyText>
          </div>
          {headerActions && headerActions.length > 0 && (
            <div className="oarv-report-header-actions">{headerActions}</div>
          )}
        </div>

        {!hideAskHint && (
          <div className="oarv-tip">
            <InlineMessage
              status="ai"
              title="Reshape this report from Ask"
              description='Try "filter to last two quarters", "show market gap", or "sort by gap" in the Ask panel.'
            />
          </div>
        )}

        <div className="oarv-active-filters">
          {shape.dateFilter !== 'all' && (
            <Pill muted type={PillType.Info}>
              {filterLabel[shape.dateFilter]}
            </Pill>
          )}
          {shape.showGapColumn && (
            <Pill muted type={PillType.Info}>
              Showing market gap column
            </Pill>
          )}
          <Pill muted type={PillType.Discovery}>
            Sort: {shape.sortBy} {shape.sortDir === 'asc' ? '↑' : '↓'}
          </Pill>
          {shape.savedViewName && (
            <Pill muted type={PillType.Success}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <IconV2 name="bookmark-solid" size={10} color="success-strong" />
                Saved as &ldquo;{shape.savedViewName}&rdquo;
              </span>
            </Pill>
          )}
        </div>

        <div className="oarv-table-wrap">
          <table className="oarv-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Level</th>
                <th>Date</th>
                <th>Offer</th>
                <th>Market Mid</th>
                {shape.showGapColumn && <th>Market Gap</th>}
                <th>Status</th>
                <th>Decline reason</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((offer: OfferRecord) => {
                const gap = gapPercent(offer.offerAmount, offer.marketMidpoint);
                const gapBadge =
                  gap < -5 ? 'oarv-gap-negative' : gap > 5 ? 'oarv-gap-positive' : 'oarv-gap-neutral';
                return (
                  <tr key={offer.id}>
                    <td>
                      <BodyText size="small" weight="semibold" color="neutral-strong">
                        {offer.candidateName}
                      </BodyText>
                    </td>
                    <td>
                      <BodyText size="small" color="neutral-medium">
                        {offer.role}
                      </BodyText>
                    </td>
                    <td>
                      <Pill muted type={PillType.Neutral}>
                        {offer.level}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small" color="neutral-medium">
                        {formatDate(offer.date)}
                      </BodyText>
                    </td>
                    <td className="oarv-num">
                      <BodyText size="small" color="neutral-strong">
                        {formatCurrency(offer.offerAmount)}
                      </BodyText>
                    </td>
                    <td className="oarv-num">
                      <BodyText size="small" color="neutral-weak">
                        {formatCurrency(offer.marketMidpoint)}
                      </BodyText>
                    </td>
                    {shape.showGapColumn && (
                      <td className="oarv-num">
                        <span className={`oarv-gap ${gapBadge}`}>
                          {gap > 0 ? '+' : ''}
                          {gap.toFixed(1)}%
                        </span>
                      </td>
                    )}
                    <td>
                      <Pill muted type={statusPillType[offer.status]}>
                        {offer.status}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small" color="neutral-weak">
                        {offer.declineReason
                          ? offer.declineReason.replace('-', ' ')
                          : '—'}
                      </BodyText>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
