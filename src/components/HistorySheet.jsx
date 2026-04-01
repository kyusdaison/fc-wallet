import React, { useState, useMemo } from 'react';
import { ShieldCheck, ArrowUp, ArrowDown, ArrowRightLeft, Search, X, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { SheetCloseButtonV2, SheetTitleBlockV2 } from './SheetParts';

const getVisual = (tx) => {
  if (tx.type === 'system') {
    return {
      icon: <ShieldCheck size={18} color="var(--green)" />,
      iconClass: 'tone-green',
      amountClass: 'positive',
      status: 'Confirmed',
    };
  }

  if (tx.type === 'swap') {
    return {
      icon: <ArrowRightLeft size={18} color="#a78bfa" />,
      iconClass: 'tone-purple',
      amountClass: 'neutral',
    };
  }

  if (String(tx.amount).startsWith('+')) {
    return {
      icon: <ArrowDown size={18} color="var(--green)" />,
      iconClass: 'tone-green',
      amountClass: 'positive',
    };
  }

  return {
    icon: <ArrowUp size={18} color="#f87171" />,
    iconClass: 'tone-red',
    amountClass: 'negative',
  };
};

const TYPE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'receive', label: 'Received' },
  { key: 'send', label: 'Sent' },
  { key: 'swap', label: 'Swaps' },
  { key: 'system', label: 'System' },
];

const HistorySheetV2 = ({ onClose, transactions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = transactions;

    if (typeFilter !== 'all') {
      result = result.filter(tx => tx.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(tx =>
        tx.title.toLowerCase().includes(q) ||
        tx.subtitle.toLowerCase().includes(q) ||
        (tx.currency && tx.currency.toLowerCase().includes(q)) ||
        (tx.amount && String(tx.amount).toLowerCase().includes(q))
      );
    }

    return result;
  }, [transactions, typeFilter, searchQuery]);

  const groups = ['JUST NOW', 'TODAY', 'YESTERDAY']
    .map((label) => ({ label, items: filtered.filter((tx) => tx.date === label) }))
    .filter((group) => group.items.length > 0);

  const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

  return (
    <div className="sheet-v2-backdrop" onClick={onClose}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="sheet-v2-shell sheet-v2-tall"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-v2-handle"></div>
        <div className="sheet-v2-header">
          <SheetTitleBlockV2 eyebrow="LEDGER" title="Transaction History" subtitle="Encrypted activity across transfers, swaps, and identity operations." />
          <SheetCloseButtonV2 onClick={onClose} />
        </div>

        {/* Search & Filter Bar */}
        <div className="history-search-bar">
          <div className="history-search-input-wrap">
            <Search size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="history-search-input"
            />
            {searchQuery && (
              <button type="button" className="history-search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
          <button
            type="button"
            className={`history-filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {activeFilterCount > 0 && <span className="history-filter-count">{activeFilterCount}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="history-filter-row">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.key}
                type="button"
                className={`history-filter-pill ${typeFilter === f.key ? 'active' : ''}`}
                onClick={() => setTypeFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="sheet-v2-scroll">
          {groups.length === 0 && (
            <div className="history-empty-state">
              <Search size={28} color="var(--text-tertiary)" />
              <div className="history-empty-title">No transactions found</div>
              <div className="history-empty-copy">Try adjusting your search or filters.</div>
              {(searchQuery || typeFilter !== 'all') && (
                <button type="button" className="history-clear-filters" onClick={() => { setSearchQuery(''); setTypeFilter('all'); }}>
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {groups.map((group) => (
            <div key={group.label} className="sheet-v2-group">
              <div className="sheet-v2-group-heading">
                <span>{group.label}</span>
                <span>{group.items.length} items</span>
              </div>

              <div className="sheet-v2-card">
                {group.items.map((tx) => {
                  const visual = getVisual(tx);
                  return (
                    <div key={tx.id} className={`sheet-v2-history-row ${group.label === 'JUST NOW' ? 'fresh' : ''}`}>
                      <div className={`sheet-v2-history-icon ${visual.iconClass}`}>{visual.icon}</div>
                      <div className="sheet-v2-history-copy">
                        <div className="sheet-v2-history-title">{tx.title}</div>
                        <div className="sheet-v2-history-subtitle">{tx.subtitle}</div>
                      </div>
                      <div className="sheet-v2-history-side">
                        {tx.type === 'system' ? (
                          <span className="sheet-v2-history-pill">{visual.status}</span>
                        ) : (
                          <>
                            <div className={`sheet-v2-history-amount ${visual.amountClass}`}>{tx.amount}</div>
                            <div className="sheet-v2-history-currency">{tx.currency}</div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HistorySheetV2;
