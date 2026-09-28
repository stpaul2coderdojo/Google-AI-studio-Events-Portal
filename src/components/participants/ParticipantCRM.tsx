import React, { useState, useMemo } from 'react';
import { useDojo } from '../../context/DojoContext';
import { Participant, ParticipantStatus } from '../../types';
import { MedicalDossierModal } from './MedicalDossierModal';
import { ParticipantModal } from './ParticipantModal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import {
  Users2,
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  Phone,
  Mail,
  HeartPulse,
  Award,
  Cpu
} from 'lucide-react';

export const ParticipantCRM: React.FC = () => {
  const {
    participants,
    dojos,
    deleteParticipant,
    updateParticipantStatus,
    showToast,
    setActiveTab
  } = useDojo();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDojo, setFilterDojo] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<ParticipantStatus | 'all'>('all');
  const [filterAllergyOnly, setFilterAllergyOnly] = useState(false);

  const [selectedDossierParticipant, setSelectedDossierParticipant] = useState<Participant | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [participantToEdit, setParticipantToEdit] = useState<Participant | null>(null);
  const [participantToDelete, setParticipantToDelete] = useState<Participant | null>(null);

  // Statistics
  const totalCount = participants.length;
  const clearedCount = participants.filter((p) => p.status === 'medical_cleared' || p.status === 'confirmed').length;
  const pendingCount = participants.filter((p) => p.status === 'pending_review').length;
  const highRiskCount = participants.filter(
    (p) =>
      p.medicalInsurance.hasPreExistingConditions ||
      p.medicalInsurance.allergies.toLowerCase().includes('peanuts') ||
      p.medicalInsurance.allergies.toLowerCase().includes('bee') ||
      p.medicalInsurance.allergies.toLowerCase().includes('epipen')
  ).length;
  const scholarshipCount = participants.filter((p) => p.scholarshipRecipient).length;

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const matchesSearch =
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fieldIdBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.medicalInsurance.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDojo = filterDojo === 'all' || p.dojoId === filterDojo;
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      const matchesAllergy =
        !filterAllergyOnly ||
        (p.medicalInsurance.allergies.toLowerCase() !== 'none' &&
          p.medicalInsurance.allergies.toLowerCase() !== 'none declared');

      return matchesSearch && matchesDojo && matchesStatus && matchesAllergy;
    });
  }, [participants, searchQuery, filterDojo, filterStatus, filterAllergyOnly]);

  const handleExportCSV = () => {
    const headers = [
      'Field Badge ID',
      'Full Name',
      'Email',
      'Phone',
      'Wilderness Dojo',
      'Status',
      'Insurance Carrier',
      'Policy ID',
      'Group ID',
      'Primary Physician',
      'Allergies',
      'Emergency Contact',
      'Emergency Phone',
      'Registration Date',
    ];

    const rows = filteredParticipants.map((p) => [
      `"${p.fieldIdBadge}"`,
      `"${p.fullName}"`,
      `"${p.email}"`,
      `"${p.phone}"`,
      `"${p.dojoTitle}"`,
      `"${p.status}"`,
      `"${p.medicalInsurance.provider}"`,
      `"${p.medicalInsurance.policyNumber}"`,
      `"${p.medicalInsurance.groupNumber}"`,
      `"${p.medicalInsurance.primaryPhysician}"`,
      `"${p.medicalInsurance.allergies}"`,
      `"${p.emergencyContact.name} (${p.emergencyContact.relationship})"`,
      `"${p.emergencyContact.phone}"`,
      `"${p.registrationDate}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Wilderness_Dojo_Participants_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Export Complete', `Exported ${filteredParticipants.length} participant records to CSV.`);
  };

  const handleSendBriefing = (participant: Participant) => {
    showToast(
      'info',
      'Expedition Briefing Dispatched',
      `Sent GPS waypoints and medical checklist to ${participant.email}`
    );
  };

  const getStatusBadge = (status: ParticipantStatus) => {
    switch (status) {
      case 'medical_cleared':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Medical Cleared
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'pending_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
      case 'checked_in':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            🏕️ In Field (Checked In)
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            🏆 Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="participant-crm-root">
      {/* Top Banner & Stats */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Participant & Medical Safety CRM
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mt-1">Expedition Participants</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor medical insurance verification, emergency contact dossiers, allergy alerts, and expedition clearances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('antigravity_agent')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors border border-amber-300 shadow-xs cursor-pointer"
            id="btn-antigravity-medical-audit"
          >
            <Cpu className="w-4 h-4 text-amber-700" />
            <span>Antigravity Medical Audit</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200 cursor-pointer"
            id="btn-export-participants-csv"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            id="btn-add-participant-crm"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll Participant</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Total Enrolled</span>
            <Users2 className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{totalCount}</p>
          <span className="text-[11px] text-stone-500">Across {dojos.length} Wilderness Dojos</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold">
            <span>Medical Cleared</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">{clearedCount}</p>
          <span className="text-[11px] text-emerald-800 font-medium">
            {totalCount > 0 ? Math.round((clearedCount / totalCount) * 100) : 0}% Cohort Readiness
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-semibold">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">{pendingCount}</p>
          <span className="text-[11px] text-amber-700">Awaiting Medic Approval</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-rose-800 text-xs font-semibold">
            <span>Allergy / Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{highRiskCount}</p>
          <span className="text-[11px] text-rose-700">Epipen/Asthma/Condition flags</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by participant name, email, badge ID, or insurance carrier..."
            className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-emerald-600 bg-stone-50/50"
            id="input-participant-search"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={filterDojo}
            onChange={(e) => setFilterDojo(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white font-medium focus:outline-emerald-600"
            id="select-participant-filter-dojo"
          >
            <option value="all">All Cohorts</option>
            {dojos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white font-medium focus:outline-emerald-600"
            id="select-participant-filter-status"
          >
            <option value="all">All Statuses</option>
            <option value="pending_review">Pending Review</option>
            <option value="medical_cleared">Medical Cleared</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="completed">Completed</option>
          </select>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 cursor-pointer">
            <input
              type="checkbox"
              checked={filterAllergyOnly}
              onChange={(e) => setFilterAllergyOnly(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-rose-600 focus:ring-rose-500"
              id="check-filter-allergies"
            />
            <span>Allergy Alerts</span>
          </label>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Participant & Badge</th>
                <th className="p-4">Cohort Dojo</th>
                <th className="p-4">Medical Insurance Carrier</th>
                <th className="p-4">Allergies & Risk</th>
                <th className="p-4">Emergency Contact</th>
                <th className="p-4">Clearance Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-normal">
              {filteredParticipants.map((p) => {
                const hasAllergy =
                  p.medicalInsurance.allergies.toLowerCase() !== 'none' &&
                  p.medicalInsurance.allergies.toLowerCase() !== 'none declared';

                return (
                  <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                    {/* Participant & Badge */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{p.fullName}</span>
                        {p.isMock && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            Mock Data
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                          {p.fieldIdBadge}
                        </span>
                        <span>{p.email}</span>
                      </div>
                    </td>

                    {/* Dojo */}
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-stone-900 truncate">{p.dojoTitle}</div>
                      <div className="text-[11px] text-stone-500">Reg: {p.registrationDate}</div>
                    </td>

                    {/* Insurance */}
                    <td className="p-4">
                      <div className="font-medium text-emerald-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.medicalInsurance.provider}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        #{p.medicalInsurance.policyNumber} (Physician: {p.medicalInsurance.primaryPhysician})
                      </div>
                    </td>

                    {/* Allergies & Risk */}
                    <td className="p-4">
                      {hasAllergy ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          {p.medicalInsurance.allergies}
                        </span>
                      ) : (
                        <span className="text-stone-500 text-[11px]">None declared</span>
                      )}
                      {p.medicalInsurance.hasPreExistingConditions && (
                        <div className="text-[10px] text-amber-700 mt-0.5 font-medium">
                          ⚠ Pre-existing condition
                        </div>
                      )}
                    </td>

                    {/* Emergency */}
                    <td className="p-4">
                      <div className="font-medium text-stone-900">{p.emergencyContact.name}</div>
                      <div className="text-[11px] text-stone-500">
                        {p.emergencyContact.relationship} • {p.emergencyContact.phone}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {getStatusBadge(p.status)}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDossierParticipant(p)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                          title="Open full medical insurance dossier & clearance"
                          id={`btn-open-dossier-${p.id}`}
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Medic Dossier</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendBriefing(p)}
                          className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg"
                          title="Send expedition briefing"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setParticipantToEdit(p)}
                          className="p-1.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 rounded-lg"
                          title="Edit participant data"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setParticipantToDelete(p)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Remove participant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-12 p-6">
            <Users2 className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h4 className="text-base font-bold text-stone-800">No Participants Found</h4>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search query or filters.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedDossierParticipant && (
        <MedicalDossierModal
          participant={selectedDossierParticipant}
          onClose={() => setSelectedDossierParticipant(null)}
        />
      )}

      {(isAddModalOpen || participantToEdit) && (
        <ParticipantModal
          participantToEdit={participantToEdit}
          onClose={() => {
            setIsAddModalOpen(false);
            setParticipantToEdit(null);
          }}
        />
      )}

      {participantToDelete && (
        <ConfirmationModal
          isOpen={true}
          title="Remove Participant?"
          message={`Are you sure you want to remove ${participantToDelete.fullName} (${participantToDelete.fieldIdBadge}) from the expedition roster? This will reopen their seat in "${participantToDelete.dojoTitle}".`}
          confirmLabel="Remove Participant"
          isDestructive={true}
          onConfirm={() => deleteParticipant(participantToDelete.id)}
          onCancel={() => setParticipantToDelete(null)}
        />
      )}
    </div>
  );
};
