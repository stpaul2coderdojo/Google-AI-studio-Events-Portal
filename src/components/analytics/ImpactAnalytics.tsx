import React from 'react';
import { useDojo } from '../../context/DojoContext';
import {
  Trees,
  Mountain,
  Waves,
  Sparkles,
  BarChart3,
  Globe,
  Radio,
  Download,
  Building2,
  Users2,
  ShieldCheck,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

export const ImpactAnalytics: React.FC = () => {
  const { dojos, participants, sponsors, showToast } = useDojo();

  // Aggregations
  const totalFunding = sponsors.reduce((acc, s) => acc + s.totalCommitted, 0);
  const totalPaid = sponsors.reduce((acc, s) => acc + s.totalPaid, 0);
  const totalCapacity = dojos.reduce((acc, d) => acc + d.capacity, 0);
  const totalEnrolled = participants.length;
  const clearedParticipants = participants.filter(
    (p) => p.status === 'medical_cleared' || p.status === 'confirmed'
  ).length;

  // Aggregate all research projects
  const allProjects = sponsors.flatMap((s) => s.researchProjects);
  const totalSpecies = allProjects.reduce((acc, p) => acc + p.speciesCataloged, 0);
  const totalHectares = allProjects.reduce((acc, p) => acc + p.hectaresSurveyed, 0);
  const totalSensors = allProjects.reduce((acc, p) => acc + p.sensorNodesDeployed, 0);

  const handleExportData = () => {
    const exportObj = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFundingCommitted: totalFunding,
        totalFundingPaid: totalPaid,
        totalWildernessDojos: dojos.length,
        totalEnrolledParticipants: totalEnrolled,
        medicalClearedCount: clearedParticipants,
        totalSpeciesCataloged: totalSpecies,
        totalHectaresSurveyed: totalHectares,
        totalTelemetrySensors: totalSensors,
      },
      dojos,
      participants,
      sponsors,
    };

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Wilderness_Dojo_Ecosystem_Telemetry_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('success', 'Data Package Exported', 'Full JSON dataset downloaded.');
  };

  return (
    <div className="space-y-6" id="impact-analytics-root">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Ecological Telemetry & Research Impact
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mt-1">Research & Biosphere Metrics</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Consolidated scientific milestones, telemetry sensor array status, and sponsor funding allocations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportData}
          className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          id="btn-export-impact-json"
        >
          <Download className="w-4 h-4" />
          <span>Export Research Data Package (JSON)</span>
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-emerald-200 text-xs font-semibold">
            <span>Hectares Surveyed</span>
            <Trees className="w-4 h-4 text-emerald-300" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{totalHectares.toLocaleString()} ha</p>
          <span className="text-[11px] text-emerald-200">Across 5 distinct biome reserves</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-teal-800 text-xs font-semibold">
            <span>Species Cataloged</span>
            <Globe className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-3xl font-black text-teal-900 mt-2">{totalSpecies}</p>
          <span className="text-[11px] text-stone-500">Sub-alpine & ancient flora/fauna taxa</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-sky-800 text-xs font-semibold">
            <span>Telemetry Nodes Active</span>
            <Radio className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-3xl font-black text-sky-700 mt-2">{totalSensors}</p>
          <span className="text-[11px] text-stone-500">Autonomous solar acoustic & lidar</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-teal-800 text-xs font-semibold">
            <span>Research Capital Deployed</span>
            <Building2 className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-3xl font-black text-teal-900 mt-2">${(totalPaid / 1000).toFixed(0)}k</p>
          <span className="text-[11px] text-emerald-700 font-medium">
            of ${(totalFunding / 1000).toFixed(0)}k committed
          </span>
        </div>
      </div>

      {/* Grid: Biome Cohort Capacity & Research Projects Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Wilderness Dojos Overview */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-700" />
            <span>Wilderness Dojo Roster & Occupancy</span>
          </h3>

          <div className="space-y-3">
            {dojos.map((dojo) => {
              const occRate = Math.round((dojo.enrolledCount / dojo.capacity) * 100);
              return (
                <div key={dojo.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{dojo.title}</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {dojo.enrolledCount} / {dojo.capacity} seats ({occRate}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occRate >= 100 ? 'bg-rose-500' : occRate >= 80 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, occRate)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>Biome: {dojo.biome}</span>
                    <span>Grant: ${dojo.researchGrantAmount.toLocaleString()} ({dojo.sponsorName})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Research Project Milestones */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Trees className="w-4 h-4 text-teal-700" />
            <span>Ecological Research Milestones</span>
          </h3>

          <div className="space-y-3">
            {allProjects.map((proj) => (
              <div key={proj.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-stone-900 truncate">{proj.title}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 shrink-0">
                    {proj.milestoneStatus}
                  </span>
                </div>
                <p className="text-stone-600 text-[11px] line-clamp-2">{proj.objective}</p>
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                  <span>Grant: ${proj.grantAmount.toLocaleString()}</span>
                  <span>
                    {proj.speciesCataloged} species • {proj.sensorNodesDeployed} nodes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
