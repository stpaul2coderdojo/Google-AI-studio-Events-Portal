import React, { useState } from 'react';
import { useDojo } from '../../context/DojoContext';
import { BioacousticSpectrogramWidget } from '../common/BioacousticSpectrogramWidget';
import { HardwareSchematicWidget } from '../common/HardwareSchematicWidget';
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
  HeartPulse,
  Cpu,
  CheckCircle2,
  Activity,
  Layers,
  Camera,
  Sun,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface SpeciesCard {
  id: string;
  name: string;
  scientificName: string;
  iucnStatus: 'Critically Endangered' | 'Endangered' | 'Vulnerable';
  statusColor: string;
  location: string;
  acousticToken: string;
  sightingsCount: number;
  imageUrl: string;
  notes: string;
}

const FIELD_SPECIES_DATA: SpeciesCard[] = [
  {
    id: 'gharial_croc',
    name: 'Gharial (Fish-Eating Crocodile)',
    scientificName: 'Gavialis gangeticus',
    iucnStatus: 'Critically Endangered',
    statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    location: 'Chambal & Agumbe River Basins',
    acousticToken: 'ISPA: [GHAR-CLICK-09] (14.2 kHz)',
    sightingsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    notes: 'Submerged hydrophone detected distinct underwater jaw-clap sonar pulses near sandbank nesting beaches.'
  },
  {
    id: 'olive_turtle',
    name: 'Olive Ridley Sea Turtle',
    scientificName: 'Lepidochelys olivacea',
    iucnStatus: 'Vulnerable',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    location: 'Odisha & MCBT Coastal Estuaries',
    acousticToken: 'ISPA: [TURT-LOWP-02] (280 Hz)',
    sightingsCount: 388,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    notes: 'Arribada mass-nesting events monitored via PyTorch Wildlife MegaDetector low-light traps.'
  },
  {
    id: 'king_cobra',
    name: 'King Cobra',
    scientificName: 'Ophiophagus hannah',
    iucnStatus: 'Vulnerable',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    location: 'Agumbe Rainforest Canopy',
    acousticToken: 'ISPA: [OPHIO-HISS-04] (1.8 kHz)',
    sightingsCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop&q=80',
    notes: 'Acoustic thermal tracking in dense evergreen canopy with telemetry transmitters.'
  },
  {
    id: 'malabar_hornbill',
    name: 'Great Malabar Pied Hornbill',
    scientificName: 'Anthracoceros coronatus',
    iucnStatus: 'Vulnerable',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    location: 'Western Ghats Riparian Canopy',
    acousticToken: 'ISPA: [BIRD-CAL-99] (3.4 kHz)',
    sightingsCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600&auto=format&fit=crop&q=80',
    notes: 'Bioacoustic wing-whoosh and territorial hornbill calls registered on BirdNET AI models.'
  }
];

export const ImpactAnalytics: React.FC = () => {
  const { dojos, participants, sponsors, showToast, setActiveTab } = useDojo();
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesCard | null>(null);

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
    <div className="space-y-8 text-[#e0e7e1]" id="impact-analytics-root">
      {/* Top Banner */}
      <div className="bg-[#101713] p-5 sm:p-7 rounded-3xl border border-[#2d3a30] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              Ecological Telemetry & Research Impact
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Real & Autonomous Telemetry Feeds
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#e0e7e1] mt-1.5">
            Research & Biosphere Metrics
          </h2>
          <p className="text-xs sm:text-sm text-[#8c9e92] mt-0.5 max-w-2xl">
            Consolidated scientific milestones, Seeed Studio XIAO LoRa sensor array diagnostics, and sponsor capital efficiency analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('antigravity_agent')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 rounded-xl transition-colors border border-emerald-500/40 shadow-xs cursor-pointer"
            id="btn-antigravity-analytics"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Run AI Bio-Acoustic Agent</span>
          </button>

          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#18231c] hover:bg-[#223028] text-[#e0e7e1] text-xs font-bold rounded-xl border border-[#2d3a30] shadow-xs transition-colors cursor-pointer"
            id="btn-export-impact-json"
          >
            <Download className="w-4 h-4" />
            <span>Export Data Package</span>
          </button>
        </div>
      </div>

      {/* Hero Impact Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-[#13261a] to-[#0c1810] border border-emerald-500/40 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
            <span>Hectares Surveyed</span>
            <Trees className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-[#e0e7e1] mt-2">{totalHectares.toLocaleString()} ha</p>
          <span className="text-[11px] text-[#8c9e92]">Across 6 distinct biosphere reserves</span>
        </div>

        <div className="bg-[#101713] p-5 rounded-2xl border border-[#2d3a30] shadow-lg">
          <div className="flex items-center justify-between text-teal-400 text-xs font-bold">
            <span>Species Cataloged</span>
            <Globe className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-3xl font-black text-teal-300 mt-2">{totalSpecies}</p>
          <span className="text-[11px] text-[#8c9e92]">Sub-alpine & ancient taxa</span>
        </div>

        <div className="bg-[#101713] p-5 rounded-2xl border border-[#2d3a30] shadow-lg">
          <div className="flex items-center justify-between text-cyan-400 text-xs font-bold">
            <span>Telemetry Nodes Active</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-cyan-300 mt-2">{totalSensors}</p>
          <span className="text-[11px] text-[#8c9e92]">Autonomous solar hydrophones & traps</span>
        </div>

        <div className="bg-[#101713] p-5 rounded-2xl border border-[#2d3a30] shadow-lg">
          <div className="flex items-center justify-between text-amber-400 text-xs font-bold">
            <span>Research Capital</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-amber-300 mt-2">${(totalPaid / 1000).toFixed(0)}k</p>
          <span className="text-[11px] text-[#8c9e92]">
            of ${(totalFunding / 1000).toFixed(0)}k committed
          </span>
        </div>
      </div>

      {/* High-Resolution Endangered Species Monitoring Matrix */}
      <div className="bg-[#101713] rounded-3xl border border-[#2d3a30] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#223026] pb-4">
          <div>
            <h3 className="text-lg font-black text-[#e0e7e1] flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              <span>Bioacoustic & Camera Trap Target Species Gallery</span>
            </h3>
            <p className="text-xs text-[#8c9e92]">
              Real-time sightings verified through PyTorch Wildlife MegaDetector and Microsoft Sparrow acoustic ISPA models.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
            Active Sightings: 1,071 Events
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FIELD_SPECIES_DATA.map((sp) => (
            <div
              key={sp.id}
              onClick={() => setSelectedSpecies(sp)}
              className="bg-[#141f18] rounded-2xl border border-[#2d3a30] hover:border-emerald-500/50 transition-all duration-300 overflow-hidden group cursor-pointer shadow-md flex flex-col justify-between"
            >
              <div className="relative h-40 w-full overflow-hidden bg-stone-900">
                <img
                  src={sp.imageUrl}
                  alt={sp.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#141f18] via-[#141f18]/30 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-lg border backdrop-blur-md ${sp.statusColor}`}>
                    {sp.iucnStatus}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 text-right">
                  <span className="text-xs font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md">
                    {sp.sightingsCount} Hits
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div>
                  <h4 className="text-sm font-extrabold text-[#e0e7e1] group-hover:text-emerald-300 transition-colors">
                    {sp.name}
                  </h4>
                  <p className="text-[11px] italic text-[#8c9e92] font-serif">
                    {sp.scientificName}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-[#0e1611] border border-[#223026] text-[11px] font-mono text-emerald-400 truncate">
                  {sp.acousticToken}
                </div>

                <p className="text-xs text-[#a1b3a6] line-clamp-2 leading-relaxed">
                  {sp.notes}
                </p>

                <div className="pt-2 border-t border-[#223026] flex items-center justify-between text-[11px] text-[#728478]">
                  <span>{sp.location}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Bioacoustic Spectrogram & Synthesis Studio */}
      <BioacousticSpectrogramWidget />

      {/* Hardware Engineering Blueprint Schematic */}
      <HardwareSchematicWidget />

      {/* Grid: Biome Cohort Capacity & Research Projects Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Wilderness Dojos Overview */}
        <div className="bg-[#101713] p-5 sm:p-6 rounded-3xl border border-[#2d3a30] shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-[#e0e7e1] flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <span>Wilderness Dojo Roster & Cohort Density</span>
          </h3>

          <div className="space-y-3">
            {dojos.map((dojo) => {
              const occRate = Math.round((dojo.enrolledCount / dojo.capacity) * 100);
              return (
                <div key={dojo.id} className="p-4 bg-[#141f18] rounded-2xl border border-[#243329] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#e0e7e1]">{dojo.title}</span>
                    <span className="font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/40">
                      {dojo.enrolledCount} / {dojo.capacity} seats ({occRate}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#0c130e] rounded-full overflow-hidden border border-[#223026]">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        occRate >= 100 ? 'bg-rose-500' : occRate >= 80 ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, occRate)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#8c9e92]">
                    <span>Biome: <strong className="text-[#c2d1c6]">{dojo.biome}</strong></span>
                    <span className="text-emerald-400 font-mono">Grant: ${dojo.researchGrantAmount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Research Project Milestones */}
        <div className="bg-[#101713] p-5 sm:p-6 rounded-3xl border border-[#2d3a30] shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-[#e0e7e1] flex items-center gap-2">
            <Trees className="w-4 h-4 text-teal-400" />
            <span>Ecological Research Milestones & Funding</span>
          </h3>

          <div className="space-y-3">
            {allProjects.map((proj) => (
              <div key={proj.id} className="p-4 bg-[#141f18] rounded-2xl border border-[#243329] space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-[#e0e7e1] truncate">{proj.title}</span>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40 shrink-0">
                    {proj.milestoneStatus}
                  </span>
                </div>
                <p className="text-[#a1b3a6] text-[11px] line-clamp-2 leading-relaxed">{proj.objective}</p>
                <div className="flex items-center justify-between text-[11px] text-[#8c9e92] pt-1 border-t border-[#223026]">
                  <span>Grant: <strong className="text-emerald-400">${proj.grantAmount.toLocaleString()}</strong></span>
                  <span className="text-cyan-300">
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

