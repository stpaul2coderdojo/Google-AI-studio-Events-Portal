import React, { useEffect } from 'react';
import { Participant, WildernessDojo } from '../../types';
import {
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Calendar,
  MapPin,
  HeartPulse,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  FileCheck,
  Tent
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnrollmentConfirmationProps {
  participant: Participant;
  dojo: WildernessDojo;
  onClose: () => void;
  onGoToCRM?: () => void;
}

export const EnrollmentConfirmation: React.FC<EnrollmentConfirmationProps> = ({
  participant,
  dojo,
  onClose,
  onGoToCRM,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#047857', '#059669', '#10b981', '#34d399', '#f59e0b'],
      });
    } catch {
      // Ignore if canvas-confetti fails in container
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="enrollment-confirmation-view">
      {/* Header Banner */}
      <div className="text-center bg-gradient-to-br from-emerald-900 to-teal-950 text-[#e0e7e1] p-6 rounded-2xl relative overflow-hidden shadow-lg border border-emerald-500/40">
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <Tent className="w-48 h-48 text-emerald-300" />
        </div>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 mb-3 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-[#e0e7e1]">
          Enrollment & Medical Registration Confirmed!
        </h3>
        <p className="text-sm text-emerald-200/90 mt-1.5 max-w-md mx-auto">
          Welcome to the expedition, <strong>{participant.fullName}</strong>. Your medical and insurance dossier has been submitted to the field medical officer.
        </p>

        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/40 text-xs font-mono tracking-wider font-semibold">
          <span className="text-[#8c9e92]">FIELD BADGE ID:</span>
          <span className="text-emerald-300">{participant.fieldIdBadge}</span>
        </div>
      </div>

      {/* Printable Expedition Pass Card */}
      <div className="bg-[#111814] border-2 border-[#2d3a30] rounded-2xl p-6 relative print:border-black print:bg-white shadow-md text-[#e0e7e1]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2d3a30]">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-md">
              Official Wilderness Dojo Expedition Pass
            </span>
            <h4 className="text-xl font-bold text-[#e0e7e1] mt-2">{dojo.title}</h4>
            <p className="text-xs text-[#8c9e92] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#728478]" />
              <span>{dojo.location}</span>
            </p>
          </div>

          {/* QR Simulation */}
          <div className="bg-[#18221c] p-3 rounded-xl border border-[#2d3a30] flex flex-col items-center justify-center shadow-xs shrink-0 self-start sm:self-auto">
            <QrCode className="w-16 h-16 text-emerald-400" />
            <span className="text-[9px] font-mono text-[#8c9e92] mt-1 font-semibold">
              {participant.fieldIdBadge}
            </span>
          </div>
        </div>

        {/* Participant & Medical Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#2d3a30] text-xs">
          <div>
            <span className="text-[#8c9e92] text-[10px] uppercase font-bold tracking-wider">Participant Details</span>
            <p className="font-semibold text-[#e0e7e1] text-sm mt-0.5">{participant.fullName}</p>
            <p className="text-[#a1b3a6] mt-0.5">{participant.email} • {participant.phone}</p>
            <p className="text-[#8c9e92] mt-0.5">Emergency Contact: {participant.emergencyContact.name} ({participant.emergencyContact.relationship}, {participant.emergencyContact.phone})</p>
          </div>

          <div>
            <span className="text-[#8c9e92] text-[10px] uppercase font-bold tracking-wider">Medical & Insurance Clearance</span>
            <p className="font-semibold text-emerald-300 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{participant.medicalInsurance.provider}</span>
            </p>
            <p className="text-[#a1b3a6] font-mono text-[11px] mt-0.5">Policy #{participant.medicalInsurance.policyNumber} (Grp: {participant.medicalInsurance.groupNumber || 'N/A'})</p>
            <p className="text-[#8c9e92] mt-0.5">
              Allergies: <span className="font-medium text-[#e0e7e1]">{participant.medicalInsurance.allergies || 'None declared'}</span> • Blood: {participant.medicalInsurance.bloodType}
            </p>
          </div>
        </div>

        {/* Expedition Dates & Gear Checklist Notice */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#18221c] p-3 rounded-xl border border-[#2d3a30]">
            <span className="text-[#8c9e92] text-[10px] uppercase font-bold">Field Dates</span>
            <p className="font-semibold text-[#e0e7e1] mt-1">
              {new Date(dojo.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(dojo.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <span className="text-[11px] text-[#728478]">{dojo.durationDays} Days Field Cohort</span>
          </div>

          <div className="bg-[#18221c] p-3 rounded-xl border border-[#2d3a30]">
            <span className="text-[#8c9e92] text-[10px] uppercase font-bold">Wilderness Permit</span>
            <p className="font-semibold text-[#e0e7e1] mt-1 font-mono">{dojo.wildernessPermitNumber}</p>
            <span className="text-[11px] text-[#728478]">Lead: {dojo.researchLead.name}</span>
          </div>

          <div className="bg-[#18221c] p-3 rounded-xl border border-[#2d3a30]">
            <span className="text-[#8c9e92] text-[10px] uppercase font-bold">Research Grant Sponsor</span>
            <p className="font-semibold text-teal-300 mt-1">{dojo.sponsorName}</p>
            <span className="text-[11px] text-emerald-400">Tuition Subsidized (${dojo.tuitionFee})</span>
          </div>
        </div>
      </div>

      {/* Mandatory Field Gear Checklist */}
      <div className="p-4 bg-[#18221c] border border-emerald-500/30 rounded-xl text-xs">
        <h5 className="font-bold text-emerald-300 flex items-center gap-1.5 mb-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          Mandatory Expedition Gear Preparedness
        </h5>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#c2d1c6]">
          {dojo.gearRequirements.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
          id="print-expedition-pass-btn"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Expedition Pass (PDF)</span>
        </button>

        <div className="flex items-center gap-2">
          {onGoToCRM && (
            <button
              type="button"
              onClick={onGoToCRM}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors cursor-pointer"
              id="view-in-crm-btn"
            >
              <span>View in Medical CRM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors cursor-pointer"
            id="close-confirmation-btn"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
