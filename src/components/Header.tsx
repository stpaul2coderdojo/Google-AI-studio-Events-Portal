import React from 'react';
import { useDojo } from '../context/DojoContext';
import { ActiveTab } from '../types';
import {
  Compass,
  Tent,
  Users2,
  Building2,
  BarChart3,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Trees
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    dojos,
    participants,
    sponsors,
    resetToDefaults
  } = useDojo();

  const totalResearchFunding = sponsors.reduce((acc, s) => acc + s.totalCommitted, 0);
  const pendingMedicalCount = participants.filter((p) => p.status === 'pending_review').length;
  const activeDojosCount = dojos.length;

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string; badgeColor?: string }[] = [
    {
      id: 'public_portal',
      label: 'Public Dojo Portal',
      icon: Compass,
      badge: 'Public View',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'dojo_manager',
      label: 'Wilderness Dojos',
      icon: Tent,
      badge: activeDojosCount,
      badgeColor: 'bg-[#18221c] text-[#a1b3a6] border border-[#2d3a30]'
    },
    {
      id: 'participants_crm',
      label: 'Participants & Medical',
      icon: Users2,
      badge: pendingMedicalCount > 0 ? `${pendingMedicalCount} Pending` : participants.length,
      badgeColor: pendingMedicalCount > 0 ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 font-semibold' : 'bg-[#18221c] text-[#a1b3a6] border border-[#2d3a30]'
    },
    {
      id: 'sponsors_crm',
      label: 'Sponsors & Grants CRM',
      icon: Building2,
      badge: `$${(totalResearchFunding / 1000).toFixed(0)}k`,
      badgeColor: 'bg-teal-950/80 text-teal-300 border border-teal-500/30 font-medium'
    },
    {
      id: 'impact_analytics',
      label: 'Ecological Impact',
      icon: BarChart3
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#111814] border-b border-[#2d3a30] text-[#e0e7e1] shadow-md">
      {/* Top Banner / Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 flex items-center justify-center shadow-inner border border-emerald-500/40 text-white">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#e0e7e1]">WILDERNESS DOJO</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CRM & Research Portal
                </span>
              </div>
              <p className="text-xs text-[#8c9e92] font-normal hidden sm:block">
                Field Masterclasses • Medical Insurance Verification • Ecological Research Grants
              </p>
            </div>
          </div>

          {/* Right Header Status Badges & Utilities */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#18221c] px-3 py-1.5 rounded-lg border border-[#2d3a30] text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[#c2d1c6]">Med-Evac Certified</span>
            </div>

            <button
              onClick={resetToDefaults}
              title="Reset to initial demo data"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8c9e92] hover:text-[#e0e7e1] hover:bg-[#1c2821] rounded-lg transition-colors border border-transparent hover:border-[#2d3a30] cursor-pointer"
              id="header-reset-demo-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-[#2d3a30]/80 pt-1 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`nav-tab-${item.id}`}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-xs'
                    : 'text-[#8c9e92] hover:text-[#e0e7e1] hover:bg-[#18221c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-[#8c9e92]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-emerald-500/30 text-emerald-200' : item.badgeColor || 'bg-[#18221c] text-[#8c9e92]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
