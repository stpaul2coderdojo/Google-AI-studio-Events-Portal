import React, { useState } from 'react';
import { WildernessDojo, BiomeType, DifficultyLevel, DojoStatus, ResearchLead } from '../../types';
import { useDojo } from '../../context/DojoContext';
import { X, Tent, Plus, Trash2, Mountain, Building2, UserCheck, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface DojoModalProps {
  dojoToEdit?: WildernessDojo | null;
  onClose: () => void;
}

export const DojoModal: React.FC<DojoModalProps> = ({ dojoToEdit, onClose }) => {
  const { addDojo, updateDojo, sponsors } = useDojo();

  const isEditing = !!dojoToEdit;

  // Basic Info
  const [title, setTitle] = useState(dojoToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(dojoToEdit?.subtitle || '');
  const [biome, setBiome] = useState<BiomeType>(dojoToEdit?.biome || 'Alpine Crest');
  const [location, setLocation] = useState(dojoToEdit?.location || '');
  const [coordinates, setCoordinates] = useState(dojoToEdit?.coordinates || '37.8651° N, 119.5383° W');
  const [startDate, setStartDate] = useState(dojoToEdit?.startDate || '2026-09-15');
  const [endDate, setEndDate] = useState(dojoToEdit?.endDate || '2026-09-22');
  const [durationDays, setDurationDays] = useState<number>(dojoToEdit?.durationDays || 7);
  const [capacity, setCapacity] = useState<number>(dojoToEdit?.capacity || 12);
  const [status, setStatus] = useState<DojoStatus>(dojoToEdit?.status || 'open');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(dojoToEdit?.difficulty || 'Intermediate Field Tracker');
  const [terrainDescription, setTerrainDescription] = useState(dojoToEdit?.terrainDescription || '');
  const [elevationGainMeters, setElevationGainMeters] = useState<number>(dojoToEdit?.elevationGainMeters || 1200);
  const [wildernessPermitNumber, setWildernessPermitNumber] = useState(dojoToEdit?.wildernessPermitNumber || 'USFS-2026-0912');
  const [imageUrl, setImageUrl] = useState(
    dojoToEdit?.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
  );

  // Research & Sponsor
  const [sponsorOrgId, setSponsorOrgId] = useState(dojoToEdit?.sponsorOrgId || (sponsors[0]?.id || ''));
  const [researchTopic, setResearchTopic] = useState(dojoToEdit?.researchTopic || '');
  const [researchGrantAmount, setResearchGrantAmount] = useState<number>(dojoToEdit?.researchGrantAmount || 75000);
  const [tuitionFee, setTuitionFee] = useState<number>(dojoToEdit?.tuitionFee || 850);

  // Lead Ecologist
  const [leadName, setLeadName] = useState(dojoToEdit?.researchLead.name || '');
  const [leadTitle, setLeadTitle] = useState(dojoToEdit?.researchLead.title || 'Field Research Director');
  const [leadInstitution, setLeadInstitution] = useState(dojoToEdit?.researchLead.institution || 'Wilderness Research Ecology');
  const [leadAvatar, setLeadAvatar] = useState(
    dojoToEdit?.researchLead.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );
  const [leadBio, setLeadBio] = useState(dojoToEdit?.researchLead.bio || '');

  // Arrays
  const [gearRequirements, setGearRequirements] = useState<string[]>(
    dojoToEdit?.gearRequirements || [
      'Four-season shelter or bivouac',
      'Water filtration unit',
      'Field notebook and specimen tubes',
    ]
  );
  const [newGearItem, setNewGearItem] = useState('');

  const [learningObjectives, setLearningObjectives] = useState<string[]>(
    dojoToEdit?.learningObjectives || [
      'Deploy autonomous ecological telemetry sensors in backcountry',
      'Collect and log GPS-tagged environmental samples',
      'Master Leave No Trace wilderness expedition protocols',
    ]
  );
  const [newObjective, setNewObjective] = useState('');

  const [medicalPrerequisites, setMedicalPrerequisites] = useState<string[]>(
    dojoToEdit?.medicalPrerequisites || [
      'Physician clearance for multi-day backcountry physical exertion',
      'Active medical insurance with emergency evacuation coverage',
    ]
  );
  const [newMedPrereq, setNewMedPrereq] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddGear = () => {
    if (newGearItem.trim()) {
      setGearRequirements((prev) => [...prev, newGearItem.trim()]);
      setNewGearItem('');
    }
  };

  const handleRemoveGear = (idx: number) => {
    setGearRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setLearningObjectives((prev) => [...prev, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (idx: number) => {
    setLearningObjectives((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddMedPrereq = () => {
    if (newMedPrereq.trim()) {
      setMedicalPrerequisites((prev) => [...prev, newMedPrereq.trim()]);
      setNewMedPrereq('');
    }
  };

  const handleRemoveMedPrereq = (idx: number) => {
    setMedicalPrerequisites((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!location.trim()) errs.location = 'Location is required';
    if (!researchTopic.trim()) errs.researchTopic = 'Research topic is required';
    if (!leadName.trim()) errs.leadName = 'Lead ecologist name is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const selectedSponsor = sponsors.find((s) => s.id === sponsorOrgId);
    const sponsorName = selectedSponsor?.name || 'Wilderness Conservation Trust';

    const researchLead: ResearchLead = {
      name: leadName,
      title: leadTitle,
      institution: leadInstitution,
      avatar: leadAvatar,
      bio: leadBio || 'Senior field research specialist and expedition coordinator.',
    };

    if (isEditing && dojoToEdit) {
      updateDojo(dojoToEdit.id, {
        title,
        subtitle,
        biome,
        location,
        coordinates,
        startDate,
        endDate,
        durationDays: Number(durationDays),
        capacity: Number(capacity),
        status,
        difficulty,
        terrainDescription,
        elevationGainMeters: Number(elevationGainMeters),
        wildernessPermitNumber,
        imageUrl,
        sponsorOrgId,
        sponsorName,
        researchTopic,
        researchGrantAmount: Number(researchGrantAmount),
        tuitionFee: Number(tuitionFee),
        researchLead,
        gearRequirements,
        learningObjectives,
        medicalPrerequisites,
      });
    } else {
      addDojo({
        title,
        subtitle,
        biome,
        location,
        coordinates,
        startDate,
        endDate,
        durationDays: Number(durationDays),
        capacity: Number(capacity),
        status,
        difficulty,
        terrainDescription,
        elevationGainMeters: Number(elevationGainMeters),
        wildernessPermitNumber,
        imageUrl,
        sponsorOrgId,
        sponsorName,
        researchTopic,
        researchGrantAmount: Number(researchGrantAmount),
        tuitionFee: Number(tuitionFee),
        researchLead,
        gearRequirements,
        learningObjectives,
        medicalPrerequisites,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#111814] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#2d3a30] overflow-hidden flex flex-col my-auto max-h-[92vh] text-[#e0e7e1]"
        id="dojo-modal-dialog"
      >
        {/* Top Modal Bar */}
        <div className="bg-[#151e18] text-[#e0e7e1] p-5 flex items-center justify-between gap-4 border-b border-[#2d3a30] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <Tent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#e0e7e1] leading-tight">
                {isEditing ? 'Edit Wilderness Dojo' : 'Create New Wilderness Dojo'}
              </h3>
              <p className="text-xs text-[#8c9e92]">
                Configure field expedition curriculum, research grants, capacity, and medical requirements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#8c9e92] hover:text-[#e0e7e1] p-1.5 rounded-lg hover:bg-[#1f2b23] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-[#e0e7e1]">
          {/* 1. Basic Dojo Identity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-[#2d3a30] pb-1.5">
              1. Dojo Title & Terrain Biome
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Wilderness Dojo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., High Sierra Alpine Bio-Acoustics Dojo"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-title"
                />
                {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Expedition Subtitle / Focus
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g., High-Altitude Audio Telemetry Intensive"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-subtitle"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Ecosystem Biome *
                </label>
                <select
                  value={biome}
                  onChange={(e) => setBiome(e.target.value as BiomeType)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-medium"
                  id="select-dojo-biome"
                >
                  <option value="Alpine Crest">Alpine Crest</option>
                  <option value="Old-Growth Rainforest">Old-Growth Rainforest</option>
                  <option value="Boreal Taiga">Boreal Taiga</option>
                  <option value="Coastal Mangrove & Estuary">Coastal Mangrove & Estuary</option>
                  <option value="High Desert Canyon">High Desert Canyon</option>
                  <option value="Riparian Watershed">Riparian Watershed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Location / National Park / Range *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mount Whitney & Evolution Basin, Sierra Nevada, CA"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-location"
                />
                {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  GPS Coordinates
                </label>
                <input
                  type="text"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  placeholder="36.5785° N, 118.2920° W"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-mono"
                  id="input-dojo-coordinates"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Cover Photo Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] text-xs"
                  id="input-dojo-image"
                />
              </div>
            </div>
          </div>

          {/* 2. Logistics & Schedule */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-[#2d3a30] pb-1.5">
              2. Dates, Capacity, & Enrollment State
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-start-date"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-end-date"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-duration"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Max Cohort Capacity
                </label>
                <input
                  type="number"
                  min={2}
                  max={50}
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-capacity"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Cohort Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DojoStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-semibold"
                  id="select-dojo-status"
                >
                  <option value="open">Open for Enrollment</option>
                  <option value="almost_full">Almost Full</option>
                  <option value="sold_out">Sold Out / Waitlist</option>
                  <option value="in_session">In Session (Active)</option>
                  <option value="completed">Completed Expedition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Field Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="select-dojo-difficulty"
                >
                  <option value="Novice Explorer">Novice Explorer</option>
                  <option value="Intermediate Field Tracker">Intermediate Field Tracker</option>
                  <option value="Advanced Ecological Scout">Advanced Ecological Scout</option>
                  <option value="Master Wilderness Specialist">Master Wilderness Specialist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Tuition Fee ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={tuitionFee}
                  onChange={(e) => setTuitionFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-dojo-tuition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Wilderness Permit #
                </label>
                <input
                  type="text"
                  value={wildernessPermitNumber}
                  onChange={(e) => setWildernessPermitNumber(e.target.value)}
                  placeholder="USFS-SN-2026-8812"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-mono"
                  id="input-dojo-permit"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                Terrain & Environmental Description
              </label>
              <textarea
                rows={2}
                value={terrainDescription}
                onChange={(e) => setTerrainDescription(e.target.value)}
                placeholder="e.g. Granite scree, glacial cirques above 3,500m elevation..."
                className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                id="input-dojo-terrain"
              />
            </div>
          </div>

          {/* 3. Ecological Research & Sponsoring Organization */}
          <div className="space-y-3 p-4 bg-[#18221c] border border-teal-500/30 rounded-2xl">
            <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              3. Ecological Research Sponsorship Grant
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Sponsoring Organization *
                </label>
                <select
                  value={sponsorOrgId}
                  onChange={(e) => setSponsorOrgId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-teal-400 focus:outline-hidden bg-[#111814] text-[#e0e7e1] font-medium"
                  id="select-dojo-sponsor"
                >
                  {sponsors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.tier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Allocated Research Grant ($) *
                </label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={researchGrantAmount}
                  onChange={(e) => setResearchGrantAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-teal-400 focus:outline-hidden bg-[#111814] text-teal-300 font-bold"
                  id="input-dojo-grant"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Ecological Research Topic & Scientific Focus *
                </label>
                <input
                  type="text"
                  required
                  value={researchTopic}
                  onChange={(e) => setResearchTopic(e.target.value)}
                  placeholder="e.g., Monitoring Climate Migration of Sub-Alpine Pika using Ultrasonic Sensor Matrices"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-teal-400 focus:outline-hidden bg-[#111814] text-[#e0e7e1]"
                  id="input-dojo-research-topic"
                />
                {errors.researchTopic && <p className="text-[11px] text-rose-400 mt-1">{errors.researchTopic}</p>}
              </div>
            </div>
          </div>

          {/* 4. Lead Field Ecologist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-[#2d3a30] pb-1.5 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              4. Principal Field Ecologist / Expedition Leader
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Lead Ecologist Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Dr. Elena Rostova"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-lead-name"
                />
                {errors.leadName && <p className="text-[11px] text-rose-400 mt-1">{errors.leadName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Academic Title
                </label>
                <input
                  type="text"
                  value={leadTitle}
                  onChange={(e) => setLeadTitle(e.target.value)}
                  placeholder="Principal Investigator"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-lead-title"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Institution / Affiliation
                </label>
                <input
                  type="text"
                  value={leadInstitution}
                  onChange={(e) => setLeadInstitution(e.target.value)}
                  placeholder="Sierra Wilderness Research Institute"
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-lead-institution"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Lead Bio & Qualifications
                </label>
                <textarea
                  rows={2}
                  value={leadBio}
                  onChange={(e) => setLeadBio(e.target.value)}
                  placeholder="20 years conducting high-alpine field transects. Certified Wilderness First Responder."
                  className="w-full px-3 py-2 rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                  id="input-lead-bio"
                />
              </div>
            </div>
          </div>

          {/* 5. Dynamic Lists: Objectives & Gear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Learning Objectives */}
            <div className="p-4 bg-[#18221c] rounded-xl border border-[#2d3a30] space-y-2">
              <label className="block text-xs font-bold text-[#e0e7e1] uppercase">
                Field Mastery Objectives
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddObjective();
                    }
                  }}
                  placeholder="Add learning objective..."
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-[#2d3a30] bg-[#111814] text-[#e0e7e1] placeholder-[#6b7c70] focus:border-emerald-500 focus:outline-hidden"
                  id="input-new-objective"
                />
                <button
                  type="button"
                  onClick={handleAddObjective}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
                {learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 p-1.5 bg-[#111814] rounded-md border border-[#2d3a30] text-xs text-[#c2d1c6]">
                    <span className="truncate">{obj}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(i)}
                      className="text-[#8c9e92] hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gear Requirements */}
            <div className="p-4 bg-[#18221c] rounded-xl border border-[#2d3a30] space-y-2">
              <label className="block text-xs font-bold text-[#e0e7e1] uppercase">
                Mandatory Field Gear
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGearItem}
                  onChange={(e) => setNewGearItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddGear();
                    }
                  }}
                  placeholder="Add gear item..."
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-[#2d3a30] bg-[#111814] text-[#e0e7e1] placeholder-[#6b7c70] focus:border-emerald-500 focus:outline-hidden"
                  id="input-new-gear"
                />
                <button
                  type="button"
                  onClick={handleAddGear}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-1 max-h-32 overflow-y-auto pt-1">
                {gearRequirements.map((gear, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 p-1.5 bg-[#111814] rounded-md border border-[#2d3a30] text-xs text-[#c2d1c6]">
                    <span className="truncate">{gear}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGear(i)}
                      className="text-[#8c9e92] hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#2d3a30] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors cursor-pointer"
              id="submit-dojo-btn"
            >
              {isEditing ? 'Save Dojo Changes' : 'Publish Wilderness Dojo'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
