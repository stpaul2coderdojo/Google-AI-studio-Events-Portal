import React, { useState } from 'react';
import { useDojo } from '../../context/DojoContext';
import { SponsorOrg, ResearchMilestoneStatus } from '../../types';
import { SponsorModal } from './SponsorModal';
import { ResearchGrantModal } from './ResearchGrantModal';
import { SponsorImpactReportModal } from './SponsorImpactReportModal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import {
  Building2,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  FileText,
  Trees,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Globe,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Cpu
} from 'lucide-react';

export const SponsorCRM: React.FC = () => {
  const { sponsors, deleteSponsor, updateResearchProject, showToast, setActiveTab } = useDojo();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSponsorForReport, setSelectedSponsorForReport] = useState<SponsorOrg | null>(null);
  const [selectedSponsorForGrant, setSelectedSponsorForGrant] = useState<string | null>(null);
  const [isAddSponsorOpen, setIsAddSponsorOpen] = useState(false);
  const [sponsorToEdit, setSponsorToEdit] = useState<SponsorOrg | null>(null);
  const [sponsorToDelete, setSponsorToDelete] = useState<SponsorOrg | null>(null);

  // Totals
  const totalFunding = sponsors.reduce((acc, s) => acc + s.totalCommitted, 0);
  const totalPaid = sponsors.reduce((acc, s) => acc + s.totalPaid, 0);
  const totalProjects = sponsors.reduce((acc, s) => acc + s.researchProjects.length, 0);

  const filteredSponsors = sponsors.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAdvanceMilestone = (sponsorId: string, projectId: string, current: ResearchMilestoneStatus) => {
    const milestones: ResearchMilestoneStatus[] = [
      'Proposal Approved',
      'Equipment Deployed',
      'Field Sampling Active',
      'DNA/Acoustic Analysis',
      'Dataset Published',
    ];
    const currentIndex = milestones.indexOf(current);
    if (currentIndex < milestones.length - 1) {
      const nextStatus = milestones[currentIndex + 1];
      updateResearchProject(sponsorId, projectId, { milestoneStatus: nextStatus });
    }
  };

  return (
    <div className="space-y-6" id="sponsor-crm-root">
      {/* Top Banner & Stats */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Sponsor & Ecological Grant CRM
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mt-1">Conservation Benefactors & Grants</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Track institutional sponsors paying for ecological field research, hardware telemetry grants, and student fellowships.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('antigravity_agent')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors border border-teal-300 shadow-xs cursor-pointer"
            id="btn-antigravity-grant-planner"
          >
            <Cpu className="w-4 h-4 text-teal-700" />
            <span>Antigravity Grant Planner</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddSponsorOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            id="btn-add-sponsor-crm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sponsoring Org</span>
          </button>
        </div>
      </div>

      {/* Financial & Grant KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-teal-800 text-xs font-semibold">
            <span>Total Grant Commitments</span>
            <DollarSign className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-teal-900 mt-2">${(totalFunding / 1000).toFixed(0)}k</p>
          <span className="text-[11px] text-stone-500">Across {sponsors.length} Partner Orgs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold">
            <span>Funds Deployed to Field</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">${(totalPaid / 1000).toFixed(0)}k</p>
          <span className="text-[11px] text-emerald-800 font-medium">
            {totalFunding > 0 ? Math.round((totalPaid / totalFunding) * 100) : 0}% Realized to Stations
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Active Research Grants</span>
            <Trees className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">{totalProjects}</p>
          <span className="text-[11px] text-stone-500">Field Investigations</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-sky-800 text-xs font-semibold">
            <span>Benefactor Pipeline</span>
            <Building2 className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-sky-700 mt-2">{sponsors.length}</p>
          <span className="text-[11px] text-sky-700">100% Tax-Exempt Compliant</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sponsoring organizations by name, category, or contact..."
            className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-teal-600 bg-stone-50/50"
            id="input-sponsor-search"
          />
        </div>
      </div>

      {/* Sponsors Directory & Grant Tracker */}
      <div className="space-y-6">
        {filteredSponsors.map((sponsor) => {
          const totalGrantProjects = sponsor.researchProjects.length;
          return (
            <div
              key={sponsor.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
              id={`sponsor-item-${sponsor.id}`}
            >
              {/* Sponsor Profile Top Bar */}
              <div className="p-5 sm:p-6 bg-stone-50/60 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-xs shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-teal-100 text-teal-800 border border-teal-200">
                        {sponsor.tier}
                      </span>
                      {sponsor.isMock && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                          Mock Data
                        </span>
                      )}
                      <span className="text-xs text-stone-500 font-semibold">{sponsor.category}</span>
                      <span className="text-[11px] text-stone-400 font-mono">Tax ID: {sponsor.taxExemptId}</span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 mt-1">{sponsor.name}</h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1">
                      <span>
                        Contact: <strong>{sponsor.contactPerson.name}</strong> ({sponsor.contactPerson.title})
                      </span>
                      <span>{sponsor.contactPerson.email}</span>
                      <span>{sponsor.contactPerson.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Capital Metrics & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Committed</span>
                    <p className="text-xl font-black text-teal-800">${sponsor.totalCommitted.toLocaleString()}</p>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      ${sponsor.totalPaid.toLocaleString()} paid
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSponsorForGrant(sponsor.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer"
                      title="Add a new ecological research grant to this sponsor"
                      id={`btn-add-grant-${sponsor.id}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Grant</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSponsorForReport(sponsor)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-xs cursor-pointer"
                      title="Generate official sponsor impact & ROI dossier"
                      id={`btn-impact-report-${sponsor.id}`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Impact ROI Report</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSponsorToEdit(sponsor)}
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl"
                      title="Edit organization info"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSponsorToDelete(sponsor)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Delete organization"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Research Projects Accordion Table */}
              <div className="p-5">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Funded Ecological Research Projects ({totalGrantProjects})</span>
                  <span className="text-[11px] text-stone-500 font-normal">
                    {sponsor.sponsoredDojoIds.length} Linked Wilderness Dojos
                  </span>
                </h4>

                {sponsor.researchProjects.length === 0 ? (
                  <p className="text-xs text-stone-500 italic p-3 bg-stone-50 rounded-xl text-center">
                    No active research projects recorded yet for this sponsor. Click "Log Grant" to allocate research funding.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {sponsor.researchProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                              ${project.grantAmount.toLocaleString()} Grant
                            </span>
                            {project.isMock && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                                Mock Data
                              </span>
                            )}
                            <span className="text-xs text-stone-500">
                              Dojo: <strong>{project.dojoTitle}</strong>
                            </span>
                          </div>

                          <h5 className="font-bold text-stone-900 text-sm">{project.title}</h5>
                          <p className="text-xs text-stone-600 leading-relaxed">{project.objective}</p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500 pt-1">
                            <span>Hectares: <strong>{project.hectaresSurveyed.toLocaleString()} ha</strong></span>
                            <span>Species Tagged: <strong>{project.speciesCataloged}</strong></span>
                            <span>Sensors: <strong>{project.sensorNodesDeployed} Nodes</strong></span>
                            <span>Last Telemetry: {project.lastTelemetryDate}</span>
                          </div>
                        </div>

                        {/* Milestone State Tracker */}
                        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                          <span className="text-[10px] uppercase font-bold text-stone-400">Research Milestone</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase ${
                                project.milestoneStatus === 'Dataset Published'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-teal-100 text-teal-800 border border-teal-200'
                              }`}
                            >
                              {project.milestoneStatus}
                            </span>

                            {project.milestoneStatus !== 'Dataset Published' && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceMilestone(sponsor.id, project.id, project.milestoneStatus)}
                                className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-white hover:bg-teal-50 border border-teal-300 rounded-lg cursor-pointer"
                                title="Advance to next milestone phase"
                              >
                                Advance Phase →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredSponsors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
            <Building2 className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h4 className="text-base font-bold text-stone-800">No Sponsoring Organizations Found</h4>
            <p className="text-xs text-stone-500 mt-1">Add a sponsoring organization to begin recording ecological grants.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {(isAddSponsorOpen || sponsorToEdit) && (
        <SponsorModal
          sponsorToEdit={sponsorToEdit}
          onClose={() => {
            setIsAddSponsorOpen(false);
            setSponsorToEdit(null);
          }}
        />
      )}

      {selectedSponsorForGrant && (
        <ResearchGrantModal
          sponsorId={selectedSponsorForGrant}
          onClose={() => setSelectedSponsorForGrant(null)}
        />
      )}

      {selectedSponsorForReport && (
        <SponsorImpactReportModal
          sponsor={selectedSponsorForReport}
          onClose={() => setSelectedSponsorForReport(null)}
        />
      )}

      {sponsorToDelete && (
        <ConfirmationModal
          isOpen={true}
          title="Remove Sponsoring Partner?"
          message={`Are you sure you want to remove ${sponsorToDelete.name}? Any associated research grant records will be deleted.`}
          confirmLabel="Delete Sponsor"
          isDestructive={true}
          onConfirm={() => deleteSponsor(sponsorToDelete.id)}
          onCancel={() => setSponsorToDelete(null)}
        />
      )}
    </div>
  );
};
