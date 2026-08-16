import React, { useState } from 'react';
import { useDojo } from '../../context/DojoContext';
import { ResearchMilestoneStatus } from '../../types';
import { X, Sparkles, Plus, Trash2, Building2, Trees, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface ResearchGrantModalProps {
  sponsorId: string;
  onClose: () => void;
}

export const ResearchGrantModal: React.FC<ResearchGrantModalProps> = ({ sponsorId, onClose }) => {
  const { sponsors, dojos, addResearchGrant } = useDojo();
  const sponsor = sponsors.find((s) => s.id === sponsorId);

  const [title, setTitle] = useState('');
  const [dojoId, setDojoId] = useState(dojos[0]?.id || '');
  const [grantAmount, setGrantAmount] = useState<number>(75000);
  const [objective, setObjective] = useState('');
  const [milestoneStatus, setMilestoneStatus] = useState<ResearchMilestoneStatus>('Proposal Approved');
  const [speciesCataloged, setSpeciesCataloged] = useState<number>(45);
  const [hectaresSurveyed, setHectaresSurveyed] = useState<number>(10000);
  const [sensorNodesDeployed, setSensorNodesDeployed] = useState<number>(20);
  const [deliverables, setDeliverables] = useState<string[]>([
    'Deployment of autonomous telemetry sensor array',
    'Open-access field dataset publication to Global Biodiversity Facility',
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables((prev) => [...prev, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (idx: number) => {
    setDeliverables((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !objective.trim()) return;

    const selectedDojo = dojos.find((d) => d.id === dojoId);
    const dojoTitle = selectedDojo?.title || 'Wilderness Dojo';

    addResearchGrant(sponsorId, {
      title,
      dojoId,
      dojoTitle,
      grantAmount: Number(grantAmount),
      objective,
      milestoneStatus,
      deliverables,
      speciesCataloged: Number(speciesCataloged),
      hectaresSurveyed: Number(hectaresSurveyed),
      sensorNodesDeployed: Number(sensorNodesDeployed),
      lastTelemetryDate: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        id="research-grant-modal"
      >
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between gap-4 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600/30 border border-teal-500/40 text-teal-400">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Record Ecological Research Grant
              </h3>
              <p className="text-xs text-stone-400">
                Funded by <strong>{sponsor?.name}</strong> for field scientific telemetry
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

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-stone-800">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Research Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., High Sierra Sub-Alpine Bioacoustic Sentinel Grid"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Linked Wilderness Dojo *
              </label>
              <select
                value={dojoId}
                onChange={(e) => setDojoId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                {dojos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.biome})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Grant Capital Amount ($) *
              </label>
              <input
                type="number"
                min={1000}
                step={1000}
                required
                value={grantAmount}
                onChange={(e) => setGrantAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-teal-300 bg-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Milestone Status
              </label>
              <select
                value={milestoneStatus}
                onChange={(e) => setMilestoneStatus(e.target.value as ResearchMilestoneStatus)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-semibold"
              >
                <option value="Proposal Approved">Proposal Approved</option>
                <option value="Equipment Deployed">Equipment Deployed</option>
                <option value="Field Sampling Active">Field Sampling Active</option>
                <option value="DNA/Acoustic Analysis">DNA/Acoustic Analysis</option>
                <option value="Dataset Published">Dataset Published</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Species Target
                </label>
                <input
                  type="number"
                  value={speciesCataloged}
                  onChange={(e) => setSpeciesCataloged(Number(e.target.value))}
                  className="w-full px-2 py-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Hectares
                </label>
                <input
                  type="number"
                  value={hectaresSurveyed}
                  onChange={(e) => setHectaresSurveyed(Number(e.target.value))}
                  className="w-full px-2 py-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Sensors
                </label>
                <input
                  type="number"
                  value={sensorNodesDeployed}
                  onChange={(e) => setSensorNodesDeployed(Number(e.target.value))}
                  className="w-full px-2 py-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Scientific Objective & Hypothesis *
            </label>
            <textarea
              rows={2}
              required
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g., Deploy autonomous solar audio recorders to monitor climate migration in alpine refugia..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
            />
          </div>

          {/* Deliverables */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <label className="block text-xs font-bold text-stone-900 uppercase">
              Grant Deliverables & Milestones
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                placeholder="Add deliverable (e.g. 30 audio sensor nodes installed)..."
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
              {deliverables.map((deliv, i) => (
                <li key={i} className="flex items-center justify-between gap-2 p-1.5 bg-white rounded-md border border-stone-200 text-xs">
                  <span className="truncate">{deliv}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(i)}
                    className="text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              Authorize & Log Grant
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
