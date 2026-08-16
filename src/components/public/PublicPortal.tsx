import React, { useState, useMemo } from 'react';
import { useDojo } from '../../context/DojoContext';
import { WildernessDojo, BiomeType, DifficultyLevel } from '../../types';
import { DojoCard } from './DojoCard';
import { EnrollmentModal } from './EnrollmentModal';
import { DojoDetailDrawer } from '../dojos/DojoDetailDrawer';
import {
  Search,
  Filter,
  Trees,
  Mountain,
  Compass,
  ShieldCheck,
  Building2,
  Users,
  Sparkles,
  CalendarCheck,
  ChevronDown,
  Info
} from 'lucide-react';

export const PublicPortal: React.FC = () => {
  const { dojos, selectedDojoForEnrollment, closeEnrollmentModal, openEnrollmentModal, sponsors } = useDojo();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBiome, setSelectedBiome] = useState<BiomeType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [drawerDojo, setDrawerDojo] = useState<WildernessDojo | null>(null);

  const biomes: (BiomeType | 'all')[] = [
    'all',
    'Alpine Crest',
    'Old-Growth Rainforest',
    'Boreal Taiga',
    'Coastal Mangrove & Estuary',
    'High Desert Canyon',
  ];

  const difficulties: (DifficultyLevel | 'all')[] = [
    'all',
    'Novice Explorer',
    'Intermediate Field Tracker',
    'Advanced Ecological Scout',
    'Master Wilderness Specialist',
  ];

  const filteredDojos = useMemo(() => {
    return dojos.filter((dojo) => {
      const matchesSearch =
        dojo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dojo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dojo.researchTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dojo.sponsorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBiome = selectedBiome === 'all' || dojo.biome === selectedBiome;
      const matchesDifficulty = selectedDifficulty === 'all' || dojo.difficulty === selectedDifficulty;
      const matchesAvailability = !onlyAvailable || dojo.enrolledCount < dojo.capacity;

      return matchesSearch && matchesBiome && matchesDifficulty && matchesAvailability;
    });
  }, [dojos, searchQuery, selectedBiome, selectedDifficulty, onlyAvailable]);

  const totalOpenSpots = dojos.reduce((acc, d) => acc + Math.max(0, d.capacity - d.enrolledCount), 0);
  const totalGrantCapital = sponsors.reduce((acc, s) => acc + s.totalCommitted, 0);

  return (
    <div className="space-y-8" id="public-dojo-portal-root">
      {/* Hero Banner with Wilderness Aesthetic */}
      <div className="relative rounded-3xl overflow-hidden bg-[#111814] text-[#e0e7e1] shadow-2xl border border-[#2d3a30]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d120f] via-[#111814]/90 to-[#0d120f]/80" />

        <div className="relative p-6 sm:p-10 lg:p-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trees className="w-3.5 h-3.5" />
            <span>Public Wilderness Dojo Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#e0e7e1] leading-tight">
            Field Mastery in Pristine Biomes.
          </h1>

          <p className="text-sm sm:text-base text-[#a1b3a6] mt-3 max-w-2xl leading-relaxed">
            Wilderness Dojos are immersive, science-backed field expeditions. Participants train in ecological tracking, bioacoustics, and environmental forensics while conducting real research sponsored by leading conservation institutions.
          </p>

          {/* Key Value Props Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2d3a30] text-xs">
            <div>
              <span className="text-[#8c9e92] block text-[11px] uppercase font-bold tracking-wider">Open Spots</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{totalOpenSpots}</p>
              <span className="text-[11px] text-[#728478]">Available Cohort Seats</span>
            </div>

            <div>
              <span className="text-[#8c9e92] block text-[11px] uppercase font-bold tracking-wider">Research Capital</span>
              <p className="text-xl sm:text-2xl font-black text-teal-400 mt-0.5">
                ${(totalGrantCapital / 1000).toFixed(0)}k
              </p>
              <span className="text-[11px] text-[#728478]">Sponsor Subsidized</span>
            </div>

            <div>
              <span className="text-[#8c9e92] block text-[11px] uppercase font-bold tracking-wider">Medical Protocol</span>
              <p className="text-xl sm:text-2xl font-black text-[#e0e7e1] mt-0.5">100%</p>
              <span className="text-[11px] text-[#728478]">Med-Evac & Insurance Clearance</span>
            </div>

            <div>
              <span className="text-[#8c9e92] block text-[11px] uppercase font-bold tracking-wider">Active Biomes</span>
              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{biomes.length - 1}</p>
              <span className="text-[11px] text-[#728478]">Field Terrains</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#111814] p-4 sm:p-5 rounded-2xl border border-[#2d3a30] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#728478] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dojo name, research topic, biome, or sponsor..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
              id="search-dojos-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#8c9e92] hover:text-[#e0e7e1]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter: Availability toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-start">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#c2d1c6] bg-[#18221c] px-3 py-2 rounded-xl border border-[#2d3a30] hover:bg-[#223028] transition-colors">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                id="filter-available-only"
              />
              <span>Available Spots Only</span>
            </label>
          </div>
        </div>

        {/* Biome Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] uppercase font-bold text-[#8c9e92] shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Biome:
          </span>
          {biomes.map((biome) => {
            const isSelected = selectedBiome === biome;
            return (
              <button
                key={biome}
                onClick={() => setSelectedBiome(biome)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#18221c] text-[#a1b3a6] border border-[#2d3a30] hover:bg-[#223028] hover:text-[#e0e7e1]'
                }`}
                id={`filter-biome-${biome.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {biome === 'all' ? 'All Biomes' : biome}
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-[#232f27]">
          <span className="text-[11px] uppercase font-bold text-[#8c9e92] shrink-0 flex items-center gap-1 mr-1">
            <Mountain className="w-3 h-3" /> Difficulty:
          </span>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#2a382e] text-emerald-300 border border-emerald-500/40 shadow-xs'
                    : 'bg-[#18221c] text-[#a1b3a6] border border-[#2d3a30] hover:bg-[#223028] hover:text-[#e0e7e1]'
                }`}
                id={`filter-diff-${diff.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {diff === 'all' ? 'All Experience Levels' : diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#e0e7e1] flex items-center gap-2">
            <span>Upcoming Wilderness Dojos</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {filteredDojos.length} {filteredDojos.length === 1 ? 'Expedition' : 'Expeditions'}
            </span>
          </h2>

          <div className="text-xs text-[#8c9e92] hidden sm:block">
            Tuition is heavily subsidized by ecological research sponsors
          </div>
        </div>

        {filteredDojos.length === 0 ? (
          <div className="text-center py-16 bg-[#111814] rounded-2xl border border-[#2d3a30] p-6 text-[#e0e7e1]">
            <Compass className="w-12 h-12 text-[#6b7c70] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#e0e7e1]">No Wilderness Dojos Match Filters</h3>
            <p className="text-xs text-[#8c9e92] mt-1 max-w-sm mx-auto">
              Try adjusting your search query, biome selection, or experience difficulty filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBiome('all');
                setSelectedDifficulty('all');
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDojos.map((dojo) => (
              <DojoCard
                key={dojo.id}
                dojo={dojo}
                onOpenDetails={(d) => setDrawerDojo(d)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Safety & Medical Insurance Verification Banner */}
      <div className="bg-[#111814] text-[#e0e7e1] rounded-2xl p-6 sm:p-8 border border-[#2d3a30] shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Wilderness Expedition Medical Safety Protocol</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e0e7e1]">
              Rigorous Medical & Evacuation Safeguards
            </h3>
            <p className="text-xs sm:text-sm text-[#a1b3a6] leading-relaxed">
              Every Wilderness Dojo operates under certified Wilderness First Responders and MD medical advisory. We require complete medical insurance verification, emergency contact dossiers, and dietary safety planning before field departure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <div className="p-4 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs text-center">
              <span className="block font-extrabold text-lg text-emerald-400">1:4</span>
              <span className="text-[#8c9e92] text-[11px]">Instructor to Student Field Ratio</span>
            </div>
            <div className="p-4 bg-[#18221c] rounded-xl border border-[#2d3a30] text-xs text-center">
              <span className="block font-extrabold text-lg text-teal-400">Garmin InReach</span>
              <span className="text-[#8c9e92] text-[11px]">24/7 Satellite Telemetry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      {selectedDojoForEnrollment && (
        <EnrollmentModal
          dojo={selectedDojoForEnrollment}
          onClose={closeEnrollmentModal}
        />
      )}

      {drawerDojo && (
        <DojoDetailDrawer
          dojo={drawerDojo}
          onClose={() => setDrawerDojo(null)}
          onEnroll={(d) => {
            setDrawerDojo(null);
            openEnrollmentModal(d);
          }}
        />
      )}
    </div>
  );
};
