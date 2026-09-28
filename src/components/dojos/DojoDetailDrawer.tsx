import React from 'react';
import { WildernessDojo, Participant } from '../../types';
import { useDojo } from '../../context/DojoContext';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Mountain,
  FileCheck,
  ShieldCheck,
  Building2,
  DollarSign,
  Award,
  ChevronRight,
  ExternalLink,
  Tent,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DojoDetailDrawerProps {
  dojo: WildernessDojo;
  onClose: () => void;
  onEnroll?: (dojo: WildernessDojo) => void;
  onEditDojo?: (dojo: WildernessDojo) => void;
}

export const DojoDetailDrawer: React.FC<DojoDetailDrawerProps> = ({
  dojo,
  onClose,
  onEnroll,
  onEditDojo,
}) => {
  const { getParticipantsByDojo, sponsors, setActiveTab } = useDojo();
  const dojoParticipants = getParticipantsByDojo(dojo.id);
  const sponsor = sponsors.find((s) => s.id === dojo.sponsorOrgId);

  const spotsLeft = Math.max(0, dojo.capacity - dojo.enrolledCount);
  const isSoldOut = dojo.status === 'sold_out' || spotsLeft === 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden"
        id="dojo-detail-drawer"
      >
        {/* Drawer Header Image */}
        <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
          <img
            src={dojo.imageUrl}
            alt={dojo.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-800/90 text-emerald-100 backdrop-blur-md border border-emerald-600">
              {dojo.biome}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-900/90 text-stone-200 backdrop-blur-md border border-stone-700">
              {dojo.difficulty}
            </span>
            {dojo.isMock && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/90 text-amber-300 backdrop-blur-md border border-amber-500/50 uppercase tracking-wider">
                Mock Data
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-black leading-tight">{dojo.title}</h2>
            <p className="text-xs text-emerald-300 font-medium mt-1">{dojo.subtitle}</p>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-stone-800 text-xs sm:text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500">Duration</span>
              <p className="font-bold text-stone-900 text-sm mt-0.5">{dojo.durationDays} Days</p>
              <span className="text-[11px] text-stone-500">Full Backcountry</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500">Capacity</span>
              <p className="font-bold text-stone-900 text-sm mt-0.5">
                {dojo.enrolledCount} / {dojo.capacity}
              </p>
              <span className={`text-[11px] font-semibold ${isSoldOut ? 'text-rose-600' : 'text-emerald-700'}`}>
                {isSoldOut ? 'Cohort Full' : `${spotsLeft} Remaining`}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500">Tuition</span>
              <p className="font-bold text-stone-900 text-sm mt-0.5">${dojo.tuitionFee}</p>
              <span className="text-[11px] text-emerald-700">Subsidized</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500">Research Grant</span>
              <p className="font-bold text-teal-800 text-sm mt-0.5">${(dojo.researchGrantAmount / 1000).toFixed(0)}k</p>
              <span className="text-[11px] text-stone-500">Active Funding</span>
            </div>
          </div>

          {/* Expedition Details & Logistics */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">Field Logistics & Location</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{dojo.location}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Mountain className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Coords: {dojo.coordinates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                <span>
                  {new Date(dojo.startDate).toLocaleDateString()} – {new Date(dojo.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <FileCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Permit: {dojo.wildernessPermitNumber}</span>
              </div>
            </div>
            <p className="text-stone-600 pt-2 border-t border-stone-200/80 leading-relaxed">
              <strong>Terrain & Environment:</strong> {dojo.terrainDescription} (Elevation gain: {dojo.elevationGainMeters}m).
            </p>
          </div>

          {/* Sponsoring Partner & Research Focus */}
          <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Sponsoring Conservation Partner
              </span>
              <span className="text-xs font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded">
                ${dojo.researchGrantAmount.toLocaleString()} Research Grant
              </span>
            </div>
            <h4 className="font-bold text-teal-950 text-sm">{dojo.sponsorName}</h4>
            <p className="text-xs text-teal-900/90 leading-relaxed">
              <strong>Ecological Research Project:</strong> {dojo.researchTopic}
            </p>
          </div>

          {/* Lead Ecologist */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3.5">
            <img
              src={dojo.researchLead.avatar}
              alt={dojo.researchLead.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shrink-0"
            />
            <div className="flex-1 min-w-0 text-xs">
              <span className="text-[10px] uppercase font-bold text-stone-500">Expedition & Research Lead</span>
              <h5 className="font-bold text-stone-900 text-sm mt-0.5">{dojo.researchLead.name}</h5>
              <p className="text-emerald-700 font-medium">{dojo.researchLead.title} • {dojo.researchLead.institution}</p>
              <p className="text-stone-600 mt-1.5 leading-relaxed">{dojo.researchLead.bio}</p>
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              Field Mastery Curriculum & Objectives
            </h4>
            <ul className="space-y-2 text-xs text-stone-700">
              {dojo.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Gear & Medical Criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
              <h5 className="font-bold text-stone-900 uppercase text-[11px] flex items-center gap-1.5">
                <Tent className="w-3.5 h-3.5 text-stone-600" /> Required Gear Checklist
              </h5>
              <ul className="space-y-1 text-stone-600">
                {dojo.gearRequirements.map((gear, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 mt-1.5" />
                    <span>{gear}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
              <h5 className="font-bold text-amber-950 uppercase text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Medical Prerequisites
              </h5>
              <ul className="space-y-1 text-amber-900">
                {dojo.medicalPrerequisites.map((med, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <span>{med}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enrolled Participants Roster */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-2.5 flex items-center justify-between">
              <span>Enrolled Participants ({dojoParticipants.length})</span>
              <span className="text-[11px] text-stone-500 font-normal">Capacity: {dojo.capacity}</span>
            </h4>

            {dojoParticipants.length === 0 ? (
              <p className="text-xs text-stone-500 italic p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                No participants currently enrolled in this cohort.
              </p>
            ) : (
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white text-xs">
                {dojoParticipants.map((p) => (
                  <div key={p.id} className="p-3 flex items-center justify-between gap-3 hover:bg-stone-50">
                    <div>
                      <span className="font-semibold text-stone-900">{p.fullName}</span>
                      <span className="text-stone-500 ml-2 font-mono text-[11px]">{p.fieldIdBadge}</span>
                      <div className="text-[11px] text-stone-500">
                        {p.medicalInsurance.provider} • Emergency: {p.emergencyContact.name}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        p.status === 'medical_cleared' || p.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setActiveTab('antigravity_agent');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl cursor-pointer shadow-xs transition-colors"
              id="dispatch-antigravity-drawer-btn"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-700" />
              <span>Antigravity AI Planner</span>
            </button>

            {onEditDojo && (
              <button
                type="button"
                onClick={() => onEditDojo(dojo)}
                className="px-3 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-200 border border-stone-300 rounded-xl cursor-pointer"
                id="edit-dojo-drawer-btn"
              >
                Edit Specs
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onEnroll && (
              <button
                type="button"
                disabled={isSoldOut}
                onClick={() => onEnroll(dojo)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer ${
                  isSoldOut
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-98'
                }`}
                id="enroll-dojo-drawer-btn"
              >
                {isSoldOut ? 'Cohort Full' : `Sign Up ($${dojo.tuitionFee})`}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
