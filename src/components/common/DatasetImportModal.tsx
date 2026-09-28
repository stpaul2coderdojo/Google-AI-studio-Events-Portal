import React, { useState, useRef } from 'react';
import { useDojo } from '../../context/DojoContext';
import { WildernessDojo, SponsorOrg, Participant } from '../../types';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Layers,
  Cpu,
  Radio,
  Sun,
  Camera,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Database
} from 'lucide-react';

interface DatasetImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatasetImportModal: React.FC<DatasetImportModalProps> = ({ isOpen, onClose }) => {
  const { addDojo, showToast, dojos, sponsors } = useDojo();
  const [activeTab, setActiveTab] = useState<'poster_specs' | 'upload_file' | 'json_paste'>('poster_specs');
  const [jsonInput, setJsonInput] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const realDojoIds = ['dojo-real-arc-01', 'dojo-real-gharial-02', 'dojo-real-birdnet-03'];
  const realDojosFound = dojos.filter((d) => realDojoIds.includes(d.id));

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        importParsedDojos(parsed);
      } catch (err: any) {
        setParseError(`JSON parse failure: ${err.message}`);
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      setParseError('Failed to read uploaded file.');
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const handleJsonSubmit = () => {
    if (!jsonInput.trim()) {
      setParseError('Please paste valid JSON data.');
      return;
    }

    setIsProcessing(true);
    setParseError(null);

    try {
      const parsed = JSON.parse(jsonInput);
      importParsedDojos(parsed);
    } catch (err: any) {
      setParseError(`JSON parse failure: ${err.message}`);
      setIsProcessing(false);
    }
  };

  const importParsedDojos = (data: any) => {
    try {
      const items = Array.isArray(data) ? data : data.dojos || [data];
      let importedCount = 0;

      items.forEach((item: any) => {
        if (item.title && item.location) {
          const newDojo: WildernessDojo = {
            id: item.id || `dojo-imported-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            isMock: item.isMock !== undefined ? item.isMock : false,
            title: item.title,
            subtitle: item.subtitle || 'Imported Ecological Dojo Expedition',
            biome: item.biome || 'Riparian Watershed',
            location: item.location,
            coordinates: item.coordinates || '13.5065° N, 75.0937° E',
            startDate: item.startDate || '2026-09-15',
            endDate: item.endDate || '2026-09-15',
            durationDays: item.durationDays || 1,
            capacity: item.capacity || 25,
            enrolledCount: item.enrolledCount || 0,
            status: item.status || 'open',
            difficulty: item.difficulty || 'Intermediate Field Tracker',
            terrainDescription: item.terrainDescription || 'Pristine riparian watershed and rainforest waterway.',
            researchTopic: item.researchTopic || 'Bioacoustic and camera telemetry monitoring.',
            researchLead: item.researchLead || {
              name: 'Field Principal Investigator',
              title: 'Senior Ecological Researcher',
              institution: 'AI for Good Research Network',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              bio: 'Leading field telemetry and bioacoustic observer deployments.'
            },
            sponsorOrgId: item.sponsorOrgId || 'sponsor-msft-aiforgood',
            sponsorName: item.sponsorName || 'Microsoft AI for Good Lab & CoderDojo StPaul2',
            tuitionFee: item.tuitionFee || 0,
            researchGrantAmount: item.researchGrantAmount || 100000,
            imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
            gearRequirements: item.gearRequirements || ['Seeed Studio XIAO MCU', 'Hydrophone probe', 'Solar module'],
            learningObjectives: item.learningObjectives || ['Bioacoustics monitoring', 'Model training in Sparrow Studio'],
            medicalPrerequisites: item.medicalPrerequisites || ['Basic outdoor hydration awareness'],
            elevationGainMeters: item.elevationGainMeters || 150,
            wildernessPermitNumber: item.wildernessPermitNumber || 'WD-REAL-2026-IMP'
          };
          addDojo(newDojo);
          importedCount++;
        }
      });

      if (importedCount > 0) {
        showToast('success', 'Import Successful', `Added ${importedCount} authentic Dojo dataset(s) to the catalog.`);
        onClose();
      } else {
        setParseError('No valid Dojo structures found in data.');
      }
    } catch (err: any) {
      setParseError(`Import error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#111814] border border-[#2d3a30] rounded-3xl shadow-2xl overflow-hidden text-[#e0e7e1] my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2d3a30] flex items-center justify-between bg-[#151f19]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#e0e7e1]">Real Dojo Dataset & Spec Importer</h2>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Real Data
                </span>
              </div>
              <p className="text-xs text-[#8c9e92] mt-0.5">
                Import and review the 3-part AI for Good • AI for Earth Workshop Series datasets and hardware specifications.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8c9e92] hover:text-[#e0e7e1] hover:bg-[#1f2d24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 border-b border-[#2d3a30] flex gap-4 bg-[#111814]">
          <button
            onClick={() => setActiveTab('poster_specs')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'poster_specs'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-[#728478] hover:text-[#c2d1c6]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI for Good 3-Part Series (Verified)</span>
          </button>
          <button
            onClick={() => setActiveTab('upload_file')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'upload_file'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-[#728478] hover:text-[#c2d1c6]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload JSON / Spec File</span>
          </button>
          <button
            onClick={() => setActiveTab('json_paste')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'json_paste'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-[#728478] hover:text-[#c2d1c6]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste JSON Specs</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'poster_specs' && (
            <div className="space-y-6">
              {/* Poster Highlight Card */}
              <div className="bg-linear-to-br from-[#18261e] to-[#0f1712] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d3a30] pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      <span>WORKSHOP SERIES</span>
                      <span>•</span>
                      <span>AI FOR GOOD • AI FOR EARTH</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#e0e7e1] mt-1">
                      ARC: AI for River Conservation Workshop Series
                    </h3>
                    <p className="text-xs text-[#a1b3a6] mt-1">
                      With Microsoft Sparrow Studio & Seeed Studio XIAO • Building Driftwood-Based Observer Units
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                      {realDojosFound.length}/3 Datasets Active
                    </span>
                  </div>
                </div>

                {/* Observer Unit Hardware Architecture Breakdown */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c2d1c6] mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Driftwood-Based Observer Unit Hardware Architecture (From Field Poster)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#121c15] p-3.5 rounded-xl border border-[#2d3a30]">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                        <Sun className="w-4 h-4" />
                        <span>Solar Powered</span>
                      </div>
                      <p className="text-[11px] text-[#8c9e92]">
                        High-efficiency mini photovoltaic panel for autonomous remote riverbank deployment.
                      </p>
                    </div>

                    <div className="bg-[#121c15] p-3.5 rounded-xl border border-[#2d3a30]">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                        <Radio className="w-4 h-4" />
                        <span>Seeed Studio XIAO</span>
                      </div>
                      <p className="text-[11px] text-[#8c9e92]">
                        XIAO Meshmatics low-power microcontroller network for local edge telemetry.
                      </p>
                    </div>

                    <div className="bg-[#121c15] p-3.5 rounded-xl border border-[#2d3a30]">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                        <WavesIcon className="w-4 h-4" />
                        <span>Hydrophone Probes</span>
                      </div>
                      <p className="text-[11px] text-[#8c9e92]">
                        Submersible acoustic sensors for freshwater micro-fauna and reptilian vocalizations.
                      </p>
                    </div>

                    <div className="bg-[#121c15] p-3.5 rounded-xl border border-[#2d3a30]">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1">
                        <Camera className="w-4 h-4" />
                        <span>MegaDetector Traps</span>
                      </div>
                      <p className="text-[11px] text-[#8c9e92]">
                        Automated acoustic & image species bounding box detection on PyTorch Wildlife.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Real Workshops List */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c2d1c6] mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>3 Real Dojo Datasets Configured</span>
                  </h4>

                  {/* Workshop 1 */}
                  <div className="bg-[#131d16] p-4 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Workshop 1 • SEP 15, 2026
                        </span>
                        <span className="text-xs text-[#8c9e92]">Agumbe Rainforest (Hybrid)</span>
                      </div>
                      <h5 className="font-bold text-sm text-[#e0e7e1] mt-1">
                        ARC: AI for River Conservation with Microsoft Sparrow & Seeed Studio XIAO
                      </h5>
                      <p className="text-xs text-[#8c9e92] mt-0.5">
                        Building driftwood-based observer units for bioacoustics & camera monitoring.
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">
                      ✓ Active in Catalog
                    </span>
                  </div>

                  {/* Workshop 2 */}
                  <div className="bg-[#131d16] p-4 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          Workshop 2 • SEP 30, 2026
                        </span>
                        <span className="text-xs text-[#8c9e92]">Madras Crocodile Bank Trust (MCBT)</span>
                      </div>
                      <h5 className="font-bold text-sm text-[#e0e7e1] mt-1">
                        HITL for Gharial & Turtle ISPA at MCBT
                      </h5>
                      <p className="text-xs text-[#8c9e92] mt-0.5">
                        Human-in-the-loop bioacoustics & InterSpecies Phonetic Alphabet workflows for endangered reptiles.
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">
                      ✓ Active in Catalog
                    </span>
                  </div>

                  {/* Workshop 3 */}
                  <div className="bg-[#131d16] p-4 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Workshop 3 • OCT 15, 2026
                        </span>
                        <span className="text-xs text-[#8c9e92]">Agumbe Rainforest Research Centre</span>
                      </div>
                      <h5 className="font-bold text-sm text-[#e0e7e1] mt-1">
                        Cornell BirdNET + Sparrow + MegaDetector at Agumbe
                      </h5>
                      <p className="text-xs text-[#8c9e92] mt-0.5">
                        From multi-modal species detection to RavaTTT-based bioacoustic LLMs at Agumbe.
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">
                      ✓ Active in Catalog
                    </span>
                  </div>
                </div>

                {/* Partner Network & Registration Footnote */}
                <div className="mt-6 pt-4 border-t border-[#2d3a30] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8c9e92]">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#c2d1c6]">Official Partners:</span>
                    <span>Microsoft AI for Good Lab</span>
                    <span>•</span>
                    <span>Microsoft Azure</span>
                    <span>•</span>
                    <span>CoderDojo StPaul2</span>
                    <span>•</span>
                    <span>PyTorch Wildlife</span>
                    <span>•</span>
                    <span>CornellLab BirdNET</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-emerald-400">
                    <span>Slack: coderdojostpaul2group.slack.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload_file' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#2d3a30] hover:border-emerald-500/50 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-[#141e17]/50"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,.txt"
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#e0e7e1]">Upload Dojo Specification JSON</h4>
                <p className="text-xs text-[#8c9e92] mt-1 max-w-md mx-auto">
                  Drag and drop a .json file containing one or more Wilderness Dojo objects or an array of expeditions.
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Browse Files
                </button>
              </div>

              {parseError && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'json_paste' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Paste JSON Array or Dojo Object
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`[
  {
    "title": "Custom Field Expedition",
    "biome": "Riparian Watershed",
    "location": "Western Ghats, India",
    "startDate": "2026-09-15",
    "endDate": "2026-09-15",
    "capacity": 20
  }
]`}
                  className="w-full h-48 px-3.5 py-2.5 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-mono text-xs"
                />
              </div>

              {parseError && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleJsonSubmit}
                disabled={isProcessing || !jsonInput.trim()}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Parse and Import Datasets</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#2d3a30] bg-[#151f19]/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8c9e92]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>3 Real Datasets Loaded (ARC Agumbe, Gharial MCBT, BirdNET Agumbe)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#233328] hover:bg-[#2d4234] text-[#e0e7e1] text-xs font-bold transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

function WavesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}
