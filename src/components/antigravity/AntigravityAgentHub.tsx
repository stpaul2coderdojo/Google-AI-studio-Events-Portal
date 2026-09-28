import React, { useState } from 'react';
import { useDojo } from '../../context/DojoContext';
import { AntigravityResult, AntigravityStep } from '../../types';
import {
  Cpu,
  Terminal,
  Play,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Sparkles,
  Mountain,
  Volume2,
  HeartPulse,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AntigravityAgentHub: React.FC = () => {
  const { dojos, participants, sponsors, addResearchProject, updateDojo, showToast } = useDojo();

  const [selectedDojoId, setSelectedDojoId] = useState<string>(dojos[0]?.id || '');
  const [activePreset, setActivePreset] = useState<'expedition_planning' | 'bioacoustic_research' | 'medical_triage' | 'grant_synthesis' | 'custom'>('expedition_planning');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<AntigravityResult | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showRawTerminal, setShowRawTerminal] = useState(false);

  const selectedDojo = dojos.find((d) => d.id === selectedDojoId) || dojos[0];

  const presets = [
    {
      id: 'expedition_planning' as const,
      name: 'Autonomous Expedition & Terrain Planner',
      icon: Mountain,
      badge: 'USGS 3DEP LiDAR',
      color: 'from-emerald-900 to-teal-950 border-emerald-500/40 text-emerald-300',
      description: 'Executes Python topography gradient calculations, calculates water caches, analyzes USFS wilderness permit compliance, and builds high-altitude evacuation routes.',
      defaultPrompt: `Analyze terrain coordinates ${selectedDojo?.coordinates || '36.5785° N, 118.2920° W'} for "${selectedDojo?.title || 'Alpine Expedition'}". Compute slope gradient matrices, establish satellite telemetry windows, and generate a certified USFS Wilderness Permit Annex.`
    },
    {
      id: 'bioacoustic_research' as const,
      name: 'Bio-Acoustic & Eco-Telemetry Pipeline',
      icon: Volume2,
      badge: 'Python DSP & FFT',
      color: 'from-teal-900 to-emerald-950 border-teal-500/40 text-teal-300',
      description: 'Runs remote DSP bandpass filtering (15kHz-96kHz), computes Shannon-Wiener biodiversity indices, classifies indicator species, and estimates canopy carbon storage.',
      defaultPrompt: `Ingest 8-node ultrasonic telemetry stream for "${selectedDojo?.researchTopic || 'Ecological Field Station'}". Execute FFT spectral density analysis, calculate Shannon-Wiener biodiversity index, and generate XPRIZE-compliant data tables.`
    },
    {
      id: 'medical_triage' as const,
      name: 'Wilderness Medical Triage & Evac Protocol',
      icon: HeartPulse,
      badge: 'WFR & Lake Louise AMS',
      color: 'from-amber-950 to-stone-900 border-amber-500/40 text-amber-300',
      description: 'Audits enrolled participant medical dossiers, calculates AMS altitude risk scores, checks global rescue evacuation coverage, and creates search & rescue protocols.',
      defaultPrompt: `Audit medical dossiers for cohort enrolled in "${selectedDojo?.title}". Evaluate high-altitude AMS risk scores against elevation profile (${selectedDojo?.elevationGainMeters || 1450}m gain), verify medical evacuation insurance, and configure SAR VHF frequencies.`
    },
    {
      id: 'grant_synthesis' as const,
      name: 'XPRIZE & Ecological Grant Synthesis',
      icon: Award,
      badge: 'Philanthropy Alignment',
      color: 'from-cyan-950 to-emerald-950 border-cyan-500/40 text-cyan-300',
      description: 'Formulates multi-phase research grant proposals, itemizes autonomous sensor node budgets, and drafts publication deliverables for corporate benefactors.',
      defaultPrompt: `Synthesize an XPRIZE Ecological Research Grant dossier for sponsor "${selectedDojo?.sponsorName || 'Conservation Trust'}". Outline sensor matrix deployment, species cataloging timeline, and $${selectedDojo?.researchGrantAmount?.toLocaleString() || '75,000'} fund allocation schedule.`
    }
  ];

  const handleRunAgent = async (presetType = activePreset, promptOverride?: string) => {
    setIsRunning(true);
    setExecutionResult(null);

    const targetPrompt = promptOverride || (presetType === 'custom' ? customPrompt : presets.find(p => p.id === presetType)?.defaultPrompt || customPrompt);

    try {
      const response = await fetch('/api/antigravity/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: targetPrompt,
          taskType: presetType,
          context: {
            selectedDojo,
            cohortCount: selectedDojo?.enrolledCount || 0,
            participantsSummary: participants.filter(p => p.dojoId === selectedDojo?.id).map(p => ({
              name: p.fullName,
              status: p.status,
              allergies: p.medicalInsurance.allergies,
              hasPreExisting: p.medicalInsurance.hasPreExistingConditions,
              evacInsurance: p.medicalInsurance.evacuationInsuranceAccepted
            })),
            sponsorsSummary: sponsors.map(s => ({ name: s.name, category: s.category, committed: s.totalCommitted }))
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data: AntigravityResult = await response.json();
      setExecutionResult(data);
      showToast('Antigravity Agent execution completed successfully', 'success');
    } catch (err: any) {
      console.error('Antigravity Agent error:', err);
      showToast('Error communicating with Antigravity Agent backend', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleApplyToDojo = () => {
    if (!executionResult || !selectedDojo) return;

    if (executionResult.structuredData?.actionsTaken) {
      const updatedObjectives = [
        ...selectedDojo.learningObjectives,
        `[Antigravity AI]: ${executionResult.structuredData.title || 'Advanced Field Protocol'}`
      ];
      updateDojo({
        ...selectedDojo,
        learningObjectives: Array.from(new Set(updatedObjectives))
      });
      showToast(`Updated "${selectedDojo.title}" with Antigravity recommendations!`, 'success');
    }
  };

  const handleCreateResearchProject = () => {
    if (!executionResult || !selectedDojo) return;

    const newProject = {
      id: `proj-ag-${Date.now()}`,
      title: executionResult.structuredData?.title || `Antigravity Telemetry: ${selectedDojo.title}`,
      dojoId: selectedDojo.id,
      dojoTitle: selectedDojo.title,
      grantAmount: Math.round(selectedDojo.researchGrantAmount * 0.4),
      objective: executionResult.structuredData?.summary || 'Autonomous eco-telemetry sensor matrix analysis.',
      milestoneStatus: 'Equipment Deployed' as const,
      deliverables: [
        'Antigravity Remote Sandbox Analysis Log',
        'LiDAR & Bio-Acoustic Telemetry Dataset',
        'Shannon-Wiener Biodiversity Index Report'
      ],
      speciesCataloged: 17,
      hectaresSurveyed: 450,
      sensorNodesDeployed: 8,
      publishedReportUrl: 'https://wildernessdojo.internal/reports/antigravity-telemetry-01',
      lastTelemetryDate: new Date().toISOString().split('T')[0]
    };

    addResearchProject(selectedDojo.sponsorOrgId, newProject);
    showToast('Autonomous research project registered under sponsor CRM!', 'success');
  };

  const handleCopyOutput = () => {
    if (executionResult?.fullOutput) {
      navigator.clipboard.writeText(executionResult.fullOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('Copied agent output to clipboard', 'info');
    }
  };

  return (
    <div className="space-y-6 text-[#e0e7e1]" id="antigravity-agent-root">
      {/* Top Banner / Mission Control */}
      <div className="bg-gradient-to-br from-[#111814] via-[#141e17] to-[#0d1410] p-6 rounded-2xl border border-emerald-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AGENT: antigravity-preview-05-2026</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/50 text-[#8c9e92] border border-[#2d3a30]">
                ENV: remote-sandbox-linux-6.6
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-950/80 text-teal-300 border border-teal-500/40">
                Interactions API Ready
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#e0e7e1] flex items-center gap-3">
              <span>Antigravity Agentic AI</span>
              <span className="text-sm font-normal px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Wilderness Operations
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#8c9e92] max-w-3xl leading-relaxed">
              Autonomous sandboxed intelligence executing code, spatial LiDAR algorithms, bio-acoustic DSP pipelines, wilderness medical triage audits, and XPRIZE grant synthesis in isolated cloud containers.
            </p>
          </div>

          {/* Context Selector */}
          <div className="bg-[#18221c]/90 border border-[#2d3a30] p-4 rounded-xl shrink-0 w-full lg:w-80 shadow-md">
            <label className="block text-xs font-bold text-[#c2d1c6] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Target Expedition Context
            </label>
            <select
              value={selectedDojoId}
              onChange={(e) => setSelectedDojoId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#2d3a30] bg-[#111814] text-[#e0e7e1] font-medium focus:border-emerald-500 focus:outline-hidden"
              id="select-antigravity-dojo"
            >
              {dojos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.biome})
                </option>
              ))}
            </select>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#8c9e92]">
              <span>Roster: {selectedDojo?.enrolledCount}/{selectedDojo?.capacity}</span>
              <span className="text-teal-300 font-mono">${selectedDojo?.researchGrantAmount.toLocaleString()} Grant</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Agent Archetypes & Custom Trigger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {presets.map((preset) => {
          const Icon = preset.icon;
          const isSelected = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset.id);
                setCustomPrompt(preset.defaultPrompt);
              }}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-[#18221c] border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                  : 'bg-[#111814] border-[#2d3a30] hover:border-[#3d4f42] hover:bg-[#151f19]'
              }`}
              id={`btn-preset-${preset.id}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-black/40 border border-[#2d3a30] text-emerald-400`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-black/60 text-[#8c9e92] border border-[#2d3a30]">
                    {preset.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#e0e7e1] leading-tight">
                  {preset.name}
                </h4>
                <p className="text-[11px] text-[#8c9e92] line-clamp-3 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#232f27] flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-emerald-300' : 'text-[#728478]'}>
                  {isSelected ? 'Selected Archetype' : 'Select Workflow'}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-[#728478]'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Prompt & Dispatcher */}
      <div className="bg-[#111814] p-5 sm:p-6 rounded-2xl border border-[#2d3a30] shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-[#e0e7e1] uppercase tracking-wider">
              Antigravity Mission Prompt & Directives
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8c9e92]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Sandbox: Remote Linux Exec Engine</span>
          </div>
        </div>

        <textarea
          rows={3}
          value={activePreset === 'custom' ? customPrompt : customPrompt || presets.find(p => p.id === activePreset)?.defaultPrompt}
          onChange={(e) => {
            setActivePreset('custom');
            setCustomPrompt(e.target.value);
          }}
          placeholder="Enter custom autonomous execution directives for Antigravity Agent..."
          className="w-full p-3.5 rounded-xl border border-[#2d3a30] bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70] text-xs sm:text-sm font-mono focus:border-emerald-500 focus:outline-hidden leading-relaxed shadow-inner"
          id="input-antigravity-prompt"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 text-xs text-[#8c9e92]">
            <span className="font-mono text-[11px] text-[#728478]">
              Target: {selectedDojo?.title} ({selectedDojo?.coordinates})
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleRunAgent()}
              disabled={isRunning}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isRunning
                  ? 'bg-emerald-800 text-emerald-200 cursor-not-allowed opacity-75'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-900/40'
              }`}
              id="btn-dispatch-antigravity"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing in Remote Sandbox...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Dispatch Antigravity Agent</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Execution Results & Proof of Work Visualization */}
      {isRunning && (
        <div className="bg-[#111814] p-8 rounded-2xl border border-emerald-500/40 shadow-lg text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-300 animate-pulse">
            <Cpu className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-[#e0e7e1]">
            Antigravity Sandbox Active
          </h4>
          <p className="text-xs text-[#8c9e92] max-w-md mx-auto">
            Spawning isolated Linux environment, compiling LiDAR topography gradients, filtering bio-acoustic spectral density, and cross-referencing USFS wilderness protocols...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Streaming interactions.create telemetry from backend...</span>
          </div>
        </div>
      )}

      {executionResult && !isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          id="antigravity-results-panel"
        >
          {/* Result Header & Actions */}
          <div className="bg-[#111814] p-6 rounded-2xl border border-emerald-500/40 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md">
                  Execution Verified: {executionResult.environmentId}
                </span>
                <span className="text-xs text-[#8c9e92] font-mono">
                  ID: {executionResult.interactionId}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#e0e7e1] mt-1.5">
                {executionResult.structuredData?.title || 'Antigravity Autonomous Output'}
              </h3>
              <p className="text-xs text-[#8c9e92] mt-0.5">
                {executionResult.structuredData?.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyOutput}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
                title="Copy markdown text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleApplyToDojo}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors cursor-pointer"
                title="Inject objectives into selected Dojo curriculum"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apply to Dojo</span>
              </button>

              <button
                onClick={handleCreateResearchProject}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 rounded-xl transition-colors cursor-pointer"
                title="Create a research milestone under sponsor"
              >
                <Award className="w-3.5 h-3.5 text-teal-400" />
                <span>Register Research Project</span>
              </button>
            </div>
          </div>

          {/* Structured Intelligence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Structured Actions & Telemetry Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Actions Taken in Sandbox */}
              <div className="bg-[#111814] p-5 rounded-2xl border border-[#2d3a30] shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Autonomous Actions Executed in Container Sandbox
                </h4>
                <ul className="space-y-2">
                  {executionResult.structuredData?.actionsTaken?.map((action, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs flex items-start gap-2.5 text-[#c2d1c6]"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps Timeline / Proof of Work */}
              {executionResult.structuredData?.stepsSummary && (
                <div className="bg-[#111814] p-5 rounded-2xl border border-[#2d3a30] shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    Agent Sub-Step Timeline & Decomposition
                  </h4>
                  <div className="space-y-2.5">
                    {executionResult.structuredData.stepsSummary.map((stepItem, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#e0e7e1] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-400" />
                            {stepItem.step}
                          </span>
                          <span className="text-[10px] font-mono text-[#8c9e92]">Step {idx + 1}</span>
                        </div>
                        <p className="text-[#a1b3a6] text-[11px] pl-4">
                          {stepItem.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Field Actions */}
              {executionResult.structuredData?.recommendedActions && (
                <div className="bg-[#111814] p-5 rounded-2xl border border-[#2d3a30] shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Recommended Operational Directives
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {executionResult.structuredData.recommendedActions.map((rec, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs text-[#c2d1c6] flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Generated Telemetry Data & Terminal View */}
            <div className="space-y-6">
              {/* Generated Data Key-Value Matrix */}
              {executionResult.structuredData?.generatedData && (
                <div className="bg-[#111814] p-5 rounded-2xl border border-[#2d3a30] shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-[#e0e7e1] uppercase tracking-wider flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    Computed Telemetry Values
                  </h4>
                  <div className="space-y-2 text-xs">
                    {Object.entries(executionResult.structuredData.generatedData).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-2.5 bg-[#18221c] rounded-xl border border-[#2d3a30]"
                      >
                        <span className="text-[10px] font-mono text-[#8c9e92] uppercase block font-semibold">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-semibold text-emerald-300 mt-0.5 block break-words">
                          {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Output Accordion */}
              <div className="bg-[#111814] rounded-2xl border border-[#2d3a30] overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowRawTerminal(!showRawTerminal)}
                  className="w-full p-4 text-left font-bold text-xs flex items-center justify-between text-[#e0e7e1] hover:bg-[#18221c] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Raw Agent Markdown & Terminal Output
                  </span>
                  {showRawTerminal ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {showRawTerminal && (
                  <div className="p-4 bg-[#0a0f0c] border-t border-[#2d3a30] text-[11px] font-mono text-[#a1b3a6] whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
                    {executionResult.fullOutput}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
