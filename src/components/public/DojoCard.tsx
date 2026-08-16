import React from 'react';
import { WildernessDojo } from '../../types';
import { useDojo } from '../../context/DojoContext';
import {
  Calendar,
  MapPin,
  Users,
  ShieldAlert,
  Award,
  Sparkles,
  Mountain,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DojoCardProps {
  dojo: WildernessDojo;
  onOpenDetails?: (dojo: WildernessDojo) => void;
}

export const DojoCard: React.FC<DojoCardProps> = ({ dojo, onOpenDetails }) => {
  const { openEnrollmentModal } = useDojo();
  const spotsLeft = Math.max(0, dojo.capacity - dojo.enrolledCount);
  const isSoldOut = dojo.status === 'sold_out' || spotsLeft === 0;
  const isAlmostFull = dojo.status === 'almost_full' || (spotsLeft <= 2 && spotsLeft > 0);

  const getBiomeColor = (biome: string) => {
    switch (biome) {
      case 'Alpine Crest':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      case 'Old-Growth Rainforest':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Boreal Taiga':
        return 'bg-teal-950/80 text-teal-300 border-teal-500/40';
      case 'Coastal Mangrove & Estuary':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      case 'High Desert Canyon':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      default:
        return 'bg-[#18221c] text-[#c2d1c6] border-[#2d3a30]';
    }
  };

  return (
    <div
      className="bg-[#111814] rounded-2xl border border-[#2d3a30] shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
      id={`dojo-card-${dojo.id}`}
    >
      {/* Image Banner & Overlay Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-950">
        <img
          src={dojo.imageUrl}
          alt={dojo.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111814] via-[#111814]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border backdrop-blur-xs shadow-xs ${getBiomeColor(
              dojo.biome
            )}`}
          >
            {dojo.biome}
          </span>

          {/* Enrollment Status Pill */}
          {isSoldOut ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-950/90 text-rose-200 border border-rose-500/50 backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              Cohort Full
            </span>
          ) : isAlmostFull ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/90 text-amber-300 border border-amber-500/60 backdrop-blur-xs flex items-center gap-1 shadow-xs animate-pulse">
              <Users className="w-3.5 h-3.5" />
              Only {spotsLeft} {spotsLeft === 1 ? 'Spot' : 'Spots'} Left
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {spotsLeft} Spots Open
            </span>
          )}
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
            <Mountain className="w-3.5 h-3.5" />
            <span>{dojo.difficulty}</span>
            <span className="opacity-60">•</span>
            <span>{dojo.durationDays} Days Field Dojo</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col text-[#e0e7e1]">
        <h3 className="text-lg font-bold text-[#e0e7e1] group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
          {dojo.title}
        </h3>
        <p className="text-xs text-emerald-400 font-medium mt-1 line-clamp-1">
          {dojo.subtitle}
        </p>

        {/* Location & Dates */}
        <div className="mt-3.5 space-y-1.5 text-xs text-[#8c9e92]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#728478] shrink-0" />
            <span className="truncate">{dojo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#728478] shrink-0" />
            <span>
              {new Date(dojo.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
              –{' '}
              {new Date(dojo.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Research Focus & Sponsor Pill */}
        <div className="mt-4 p-3 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs">
          <div className="text-[11px] uppercase tracking-wider text-[#8c9e92] font-semibold flex items-center justify-between">
            <span>Ecological Research Focus</span>
            <span className="text-teal-400 font-bold">${(dojo.researchGrantAmount / 1000).toFixed(0)}k Grant</span>
          </div>
          <p className="text-[#c2d1c6] font-medium mt-1 line-clamp-2 leading-relaxed">
            {dojo.researchTopic}
          </p>
          <div className="mt-2 pt-2 border-t border-[#2d3a30] flex items-center justify-between text-[11px] text-[#8c9e92]">
            <span className="truncate">Sponsor: <strong className="text-[#e0e7e1]">{dojo.sponsorName}</strong></span>
          </div>
        </div>

        {/* Lead Ecologist */}
        <div className="mt-4 flex items-center gap-2.5">
          <img
            src={dojo.researchLead.avatar}
            alt={dojo.researchLead.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-[#2d3a30] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#e0e7e1] truncate">
              {dojo.researchLead.name}
            </p>
            <p className="text-[11px] text-[#8c9e92] truncate">
              {dojo.researchLead.title}
            </p>
          </div>
        </div>

        {/* Footer with Tuition / Sponsor Subsidy & Action */}
        <div className="mt-5 pt-4 border-t border-[#232f27] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#8c9e92] block uppercase font-medium">Participant Tuition</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#e0e7e1]">${dojo.tuitionFee}</span>
              <span className="text-[11px] text-emerald-400 font-medium">Sponsor subsidized</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDetails && (
              <button
                type="button"
                onClick={() => onOpenDetails(dojo)}
                className="px-3 py-2 text-xs font-medium text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
                id={`dojo-details-btn-${dojo.id}`}
              >
                Curriculum
              </button>
            )}

            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => openEnrollmentModal(dojo)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isSoldOut
                  ? 'bg-[#18221c] text-[#728478] border border-[#2d3a30] cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98 shadow-sm'
              }`}
              id={`dojo-enroll-btn-${dojo.id}`}
            >
              <span>{isSoldOut ? 'Cohort Full' : 'Sign Up'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
