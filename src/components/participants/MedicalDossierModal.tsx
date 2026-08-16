import React, { useState } from 'react';
import { Participant, ParticipantStatus } from '../../types';
import { useDojo } from '../../context/DojoContext';
import {
  X,
  HeartPulse,
  ShieldCheck,
  AlertTriangle,
  User,
  Phone,
  Mail,
  FileSignature,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Tent,
  FileCheck,
  Stethoscope,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

interface MedicalDossierModalProps {
  participant: Participant;
  onClose: () => void;
}

export const MedicalDossierModal: React.FC<MedicalDossierModalProps> = ({ participant, onClose }) => {
  const { updateParticipantStatus, updateParticipant, showToast } = useDojo();

  const [status, setStatus] = useState<ParticipantStatus>(participant.status);
  const [medicalNotes, setMedicalNotes] = useState(participant.medicalClearanceNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleSaveStatus = () => {
    updateParticipantStatus(participant.id, status, medicalNotes);
    showToast('success', 'Medical Clearance Saved', `Status updated to ${status.replace('_', ' ').toUpperCase()}`);
    setIsEditingNotes(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const isHighRisk =
    participant.medicalInsurance.hasPreExistingConditions ||
    participant.medicalInsurance.allergies.toLowerCase().includes('peanuts') ||
    participant.medicalInsurance.allergies.toLowerCase().includes('bee') ||
    participant.medicalInsurance.allergies.toLowerCase().includes('epipen');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        id="medical-dossier-modal"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-start justify-between gap-4 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Field Medic & Safety Dossier
                </span>
                <span className="font-mono text-xs text-stone-400 font-semibold">
                  {participant.fieldIdBadge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {participant.fullName}
              </h3>
              <p className="text-xs text-stone-400">
                Cohort: {participant.dojoTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm text-stone-800">
          {/* Status & Medic Action Header */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Medical Clearance Workflow</span>
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ParticipantStatus)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-bold text-xs focus:outline-emerald-600 shadow-xs"
                  id="select-medical-clearance-status"
                >
                  <option value="pending_review">⏳ Pending Review</option>
                  <option value="medical_cleared">✅ Medical Cleared (Safe for Field)</option>
                  <option value="confirmed">🌟 Confirmed & Briefed</option>
                  <option value="checked_in">🏕️ Checked In (In Field)</option>
                  <option value="completed">🏆 Completed Expedition</option>
                  <option value="cancelled">❌ Cancelled / Ineligible</option>
                </select>

                <button
                  type="button"
                  onClick={handleSaveStatus}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  id="save-medical-status-btn"
                >
                  Update
                </button>
              </div>
            </div>

            {isHighRisk && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Medic Alert: Pre-existing condition / Allergen flags present</span>
              </div>
            )}
          </div>

          {/* Grid: Insurance & Emergency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Health Insurance Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-950 uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Health Insurance Information
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                  Active Verified
                </span>
              </div>

              <div className="space-y-1 text-emerald-900">
                <p>
                  <strong>Carrier:</strong> {participant.medicalInsurance.provider}
                </p>
                <p className="font-mono">
                  <strong>Policy ID:</strong> {participant.medicalInsurance.policyNumber}
                </p>
                <p className="font-mono">
                  <strong>Group ID:</strong> {participant.medicalInsurance.groupNumber || 'N/A'}
                </p>
                <p>
                  <strong>Primary Physician:</strong> {participant.medicalInsurance.primaryPhysician} ({participant.medicalInsurance.physicianPhone || 'No direct phone'})
                </p>
                <p className="text-[11px] text-emerald-800 pt-1">
                  ✓ Backcountry Emergency Evacuation Rider Confirmed
                </p>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] flex items-center gap-1.5">
                <User className="w-4 h-4 text-stone-600" /> 24/7 Emergency Contact
              </h4>
              <div className="space-y-1 text-stone-700">
                <p className="text-sm font-bold text-stone-900">
                  {participant.emergencyContact.name}{' '}
                  <span className="text-xs font-normal text-stone-500">({participant.emergencyContact.relationship})</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <strong>Phone:</strong> {participant.emergencyContact.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <strong>Email:</strong> {participant.emergencyContact.email || 'None on file'}
                </p>
              </div>
            </div>
          </div>

          {/* Medical Clinical Specs */}
          <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-600" /> Clinical Assessment & Vitals Background
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 font-bold">Blood Group</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">{participant.medicalInsurance.bloodType}</p>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 font-bold">Tetanus Booster</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">
                  Year {participant.medicalInsurance.tetanusShotYear}
                </p>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 font-bold">Age / Gender</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">
                  {participant.age} yrs • {participant.genderIdentity}
                </p>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 font-bold">Dietary Rations</span>
                <p className="font-bold text-stone-900 text-xs mt-0.5 truncate">{participant.dietaryNeeds}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100">
              <p>
                <strong>Known Allergies:</strong>{' '}
                <span className={`font-semibold ${participant.medicalInsurance.allergies.toLowerCase() !== 'none' ? 'text-rose-700' : 'text-stone-700'}`}>
                  {participant.medicalInsurance.allergies}
                </span>
              </p>
              <p>
                <strong>Current Medications (in field pack):</strong>{' '}
                <span className="text-stone-800 font-medium">
                  {participant.medicalInsurance.currentMedications}
                </span>
              </p>
              <p>
                <strong>Pre-existing Conditions Description:</strong>{' '}
                <span className="text-stone-800">
                  {participant.medicalInsurance.conditionsDescription || 'No pre-existing conditions reported.'}
                </span>
              </p>
            </div>
          </div>

          {/* Expedition Medic Notes */}
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-950 uppercase text-[11px]">
                Expedition Medical Officer Notes & Protocols
              </h4>
              {!isEditingNotes && (
                <button
                  type="button"
                  onClick={() => setIsEditingNotes(true)}
                  className="text-amber-800 hover:text-amber-950 font-semibold text-xs cursor-pointer"
                >
                  Edit Notes
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-amber-300 bg-white text-xs text-stone-800"
                  placeholder="Record medic briefing notes, inhaler check, or emergency instructions..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingNotes(false)}
                    className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveStatus}
                    className="px-3 py-1 bg-emerald-700 text-white font-semibold text-xs rounded-lg"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-stone-700 italic bg-white p-3 rounded-xl border border-amber-200 leading-relaxed">
                {medicalNotes || 'No notes currently logged.'}
              </p>
            )}
          </div>

          {/* Digital Signature & Scholarship Info */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400">Digital Legal Waiver</span>
              <p className="font-serif italic text-stone-900 mt-0.5">
                Signed by: <strong>{participant.digitalSignature}</strong> on {participant.signatureDate}
              </p>
            </div>

            {participant.scholarshipRecipient && (
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  Sponsor Research Grant Scholar
                </span>
                <p className="text-[11px] text-teal-900 mt-0.5">{participant.scholarshipNotes || 'Full Tuition Fellowship'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-200 border border-stone-300 rounded-xl cursor-pointer"
            id="print-medical-dossier-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Print Medic Dossier</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
