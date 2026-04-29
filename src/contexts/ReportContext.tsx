import { createContext, useContext, useState, type ReactNode } from 'react';

export type DateFilter = 'all' | 'last-2-quarters' | 'last-quarter' | 'last-6-months';
export type SortKey = 'date' | 'gap' | 'amount' | 'level';
export type SortDir = 'asc' | 'desc';

export interface ReportShape {
  dateFilter: DateFilter;
  showGapColumn: boolean;
  sortBy: SortKey;
  sortDir: SortDir;
  savedViewName: string | null;
}

export const DEFAULT_SHAPE: ReportShape = {
  dateFilter: 'all',
  showGapColumn: false,
  sortBy: 'date',
  sortDir: 'desc',
  savedViewName: null,
};

export type AttachableReport = 'offer-acceptance';

interface ReportContextValue {
  activeReportId: string | null;
  setActiveReportId: (id: string | null) => void;
  attachedReport: AttachableReport | null;
  setAttachedReport: (id: AttachableReport | null) => void;
  shape: ReportShape;
  applyShape: (patch: Partial<ReportShape>) => void;
  resetShape: () => void;
}

const ReportContext = createContext<ReportContextValue | null>(null);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [attachedReport, setAttachedReport] = useState<AttachableReport | null>(null);
  const [shape, setShape] = useState<ReportShape>(DEFAULT_SHAPE);

  const applyShape = (patch: Partial<ReportShape>) => {
    setShape((prev) => ({ ...prev, ...patch }));
  };

  const resetShape = () => {
    setShape(DEFAULT_SHAPE);
  };

  return (
    <ReportContext.Provider
      value={{
        activeReportId,
        setActiveReportId,
        attachedReport,
        setAttachedReport,
        shape,
        applyShape,
        resetShape,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReport(): ReportContextValue {
  const ctx = useContext(ReportContext);
  if (!ctx) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return ctx;
}
