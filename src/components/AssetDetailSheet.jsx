import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowRightLeft, ChevronLeft, TrendingUp, CheckCircle2 } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AssetDetailSheetV2 = ({ asset, onClose, onOpenSend, onOpenReceive }) => {
  const [chartRange, setChartRange] = useState('1M');

  const generateChartData = (id) => {
    const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const points = [];
    const count = 30;
    let val = 50;
    for (let i = 0; i < count; i++) {
      val += Math.sin(seed * i * 0.3) * 8 + (Math.cos(i * 0.7 + seed) * 5);
      val = Math.max(10, Math.min(90, val));
      points.push({ x: (i / (count - 1)) * 280, y: 100 - val });
    }
    return points;
  };

  const chartPoints = generateChartData(asset.id);
  const pathD = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L280,100 L0,100 Z`;
  const isUp = asset.changeDir === 'up';
  const chartColor = isUp ? '#10b981' : asset.changeDir === 'down' ? '#ef4444' : '#60a5fa';
  const statRows = [
    { label: 'Market Cap', value: asset.id === 'BTC' ? '$1.27T' : asset.id === 'ETH' ? '$253B' : asset.id === 'FCC' ? '$4.8B' : '$100B' },
    { label: '24H Volume', value: asset.id === 'BTC' ? '$34.2B' : asset.id === 'ETH' ? '$12.8B' : asset.id === 'FCC' ? '$890M' : '$52B' },
    { label: 'Your Value', value: asset.id === 'BTC' ? '$2,890' : asset.id === 'ETH' ? '$2,495' : asset.id === 'FCC' ? '$49,877' : '$4,750' },
    { label: 'P&L (30D)', value: isUp ? '+$348.20' : '-$124.50', tone: isUp ? 'positive' : 'negative' },
  ];
  const assetTxs = [
    { type: 'receive', title: 'Received from Alex', amount: `+120.00 ${asset.id}`, time: 'Today, 10:42 AM' },
    { type: 'send', title: 'Sent to Treasury', amount: `-50.00 ${asset.id}`, time: 'Yesterday' },
    { type: 'swap', title: `Swapped for FCUSD`, amount: `-200.00 ${asset.id}`, time: '3 days ago' },
  ];

  return (
    <motion.div
      key="asset-detail-v2"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="asset-detail-v2-shell"
    >
      <div className="asset-detail-v2-header">
        <button type="button" className="asset-detail-v2-back" onClick={onClose}>
          <ChevronLeft size={22} strokeWidth={2.5} />
          Back
        </button>

        <div className="asset-detail-v2-title-wrap">
          <div className="asset-detail-v2-token" style={{ backgroundColor: asset.bgColor }}>
            {asset.icon}
          </div>
          <div>
            <div className="asset-detail-v2-title">{asset.name}</div>
            <div className="asset-detail-v2-subtitle">{asset.price} per unit</div>
          </div>
        </div>

        <div className="asset-detail-v2-spacer"></div>
      </div>

      <div className="asset-detail-v2-scroll">
        <div className="asset-detail-v2-hero">
          <div className="asset-detail-v2-kicker">CURRENT POSITION</div>
          <div className="asset-detail-v2-amount">{asset.amount}</div>
          <div className={`asset-detail-v2-change ${isUp ? 'positive' : asset.changeDir === 'down' ? 'negative' : 'neutral'}`}>
            <TrendingUp size={16} />
            {asset.change} (24h)
          </div>
        </div>

        <div className="asset-detail-v2-chart">
          <div className="asset-detail-v2-chart-head">
            <span>Price Trend</span>
            <div className="asset-detail-v2-tabs">
              {['1D', '1W', '1M', '1Y'].map((tab) => (
                <span key={tab} className={chartRange === tab ? 'active' : ''} onClick={() => setChartRange(tab)}>{tab}</span>
              ))}
            </div>
          </div>

          <svg width="280" height="100" viewBox="0 0 280 100" className="asset-detail-v2-svg">
            <defs>
              <linearGradient id={`grad-v2-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={chartColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={areaD} fill={`url(#grad-v2-${asset.id})`} />
            <path d={pathD} fill="none" stroke={chartColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={chartPoints[chartPoints.length - 1].x} cy={chartPoints[chartPoints.length - 1].y} r="4" fill={chartColor} />
          </svg>
        </div>

        <div className="asset-detail-v2-actions">
          <button type="button" className="sheet-v2-secondary-btn" onClick={() => { onClose(); setTimeout(onOpenSend, 180); }}>
            <ArrowUp size={18} />
            Send
          </button>
          <button type="button" className="sheet-v2-primary-btn" onClick={() => { onClose(); setTimeout(onOpenReceive, 180); }}>
            <ArrowDown size={18} />
            Receive
          </button>
          <button type="button" className="sheet-v2-icon-action">
            <ArrowRightLeft size={18} />
          </button>
        </div>

        <div className="asset-detail-v2-stats">
          {statRows.map((stat) => (
            <div key={stat.label} className="asset-detail-v2-stat">
              <div className="asset-detail-v2-stat-label">{stat.label}</div>
              <div className={`asset-detail-v2-stat-value ${stat.tone || ''}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="asset-detail-v2-activity">
          <div className="asset-detail-v2-activity-head">Recent Activity</div>
          {assetTxs.map((tx, index) => (
            <div key={tx.title} className="asset-detail-v2-row">
              <div className={`sheet-v2-history-icon ${tx.type === 'receive' ? 'tone-green' : tx.type === 'swap' ? 'tone-purple' : 'tone-red'}`}>
                {tx.type === 'receive' ? <ArrowDown size={16} color="var(--green)" /> : tx.type === 'swap' ? <ArrowRightLeft size={16} color="#a78bfa" /> : <ArrowUp size={16} color="#f87171" />}
              </div>
              <div className="sheet-v2-history-copy">
                <div className="sheet-v2-history-title">{tx.title}</div>
                <div className="sheet-v2-history-subtitle">{tx.time}</div>
              </div>
              <div className={`sheet-v2-history-amount ${tx.type === 'receive' ? 'positive' : tx.type === 'swap' ? 'neutral' : 'negative'}`}>{tx.amount}</div>
              {index < assetTxs.length - 1 && <div className="asset-detail-v2-divider"></div>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AssetDetailSheetV2;
