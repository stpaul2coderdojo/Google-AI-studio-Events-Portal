import React from 'react';
import { SponsorOrg, WildernessDojo } from '../../types';
import { useDojo } from '../../context/DojoContext';
import {
  X,
  Printer,
  Download,
  Building2,
  Trees,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Globe,
  Radio,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface SponsorImpactReportModalProps {
  sponsor: SponsorOrg;
  onClose: () => void;
}

export const SponsorImpactReportModal: React.FC<SponsorImpactReportModalProps> = ({ sponsor, onClose }) => {
  const { dojos } = useDojo();

  const handlePrint = () => {
    window.print();
  };

  const totalProjects = sponsor.researchProjects.length;
  const totalGrantCapital = sponsor.researchProjects.reduce((acc, p) => acc + p.grantAmount, 0);
  const totalSpecies = sponsor.researchProjects.reduce((acc, p) => acc + p.speciesCataloged, 0);
  const totalHectares = sponsor.researchProjects.reduce((acc, p) => acc + p.hectaresSurveyed, 0);
  const totalSensors = sponsor.researchProjects.reduce((acc, p) => acc + p.sensorNodesDeployed, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        id="sponsor-impact-report-modal"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-start justify-between gap-4 border-b border-stone-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Official Ecological ROI Dossier
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Partner ID: {sponsor.id}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {sponsor.name}
            </h3>
            <p className="text-xs text-stone-400">
              {sponsor.tier} • Tax-Exempt {sponsor.taxExemptId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Report */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-stone-800">
          {/* Executive Summary Card */}
          <div className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white p-6 rounded-2xl relative overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
                  Total Research Grant Commitment
                </span>
                <p className="text-3xl font-black text-white mt-1">
                  ${sponsor.totalCommitted.toLocaleString()} USD
                </p>
                <p className="text-xs text-teal-200 mt-1">
                  ${sponsor.totalPaid.toLocaleString()} deployed to active wilderness field stations
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-right shrink-0">
                <span className="text-[10px] uppercase text-teal-200 block">Sponsorship Tier</span>
                <span className="text-sm font-bold text-white block">{sponsor.tier}</span>
                <span className="text-[11px] text-teal-300">{sponsor.category}</span>
              </div>
            </div>

            {/* Biodiversity Impact KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-teal-800/80 text-xs">
              <div>
                <span className="text-teal-300 text-[10px] uppercase font-bold">Hectares Surveyed</span>
                <p className="text-xl font-bold text-white mt-0.5">{totalHectares.toLocaleString()} ha</p>
                <span className="text-[10px] text-teal-200">Pristine Wilderness</span>
              </div>

              <div>
                <span className="text-teal-300 text-[10px] uppercase font-bold">Species Cataloged</span>
                <p className="text-xl font-bold text-white mt-0.5">{totalSpecies}</p>
                <span className="text-[10px] text-teal-200">Flora & Fauna Taxa</span>
              </div>

              <div>
                <span className="text-teal-300 text-[10px] uppercase font-bold">Field Sensors Active</span>
                <p className="text-xl font-bold text-white mt-0.5">{totalSensors}</p>
                <span className="text-[10px] text-teal-200">Autonomous Nodes</span>
              </div>

              <div>
                <span className="text-teal-300 text-[10px] uppercase font-bold">Field Cohorts</span>
                <p className="text-xl font-bold text-white mt-0.5">{totalProjects}</p>
                <span className="text-[10px] text-teal-200">Dojos Funded</span>
              </div>
            </div>
          </div>

          {/* Research Grants Breakdown */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-3 flex items-center justify-between">
              <span>Funded Ecological Research Grants & Telemetry</span>
              <span className="text-[11px] text-stone-500 font-normal">{sponsor.researchProjects.length} Projects</span>
            </h4>

            <div className="space-y-3">
              {sponsor.researchProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">{project.title}</h5>
                      <p className="text-stone-500 text-[11px]">
                        Linked Cohort: <strong>{project.dojoTitle}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-xs">
                        ${project.grantAmount.toLocaleString()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {project.milestoneStatus}
                      </span>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    <strong>Objective:</strong> {project.objective}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-2 border-t border-stone-200/80">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                      Deliverables & Evidence
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-stone-600">
                      {project.deliverables.map((del, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>Last Telemetry Feed: {project.lastTelemetryDate}</span>
                    <span>
                      {project.sensorNodesDeployed} Nodes • {project.speciesCataloged} Taxa Logged
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Contact & Agreement */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <h5 className="font-bold text-stone-900 uppercase text-[11px]">Partnership Point of Contact</h5>
            <p className="text-stone-700">
              {sponsor.contactPerson.name} ({sponsor.contactPerson.title}) • {sponsor.contactPerson.email} • {sponsor.contactPerson.phone}
            </p>
            <p className="text-stone-500 text-[11px] pt-1">
              Partnership Agreement Established: {sponsor.sponsorshipDate} • Tax Identifier: {sponsor.taxExemptId}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-200 border border-stone-300 rounded-xl cursor-pointer"
            id="print-impact-report-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sponsor Report (PDF)</span>
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
