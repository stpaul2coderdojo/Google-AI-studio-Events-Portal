import React, { useState } from 'react';
import { useDojo } from '../../context/DojoContext';
import { WildernessDojo, DojoStatus, BiomeType } from '../../types';
import { DojoModal } from './DojoModal';
import { DojoDetailDrawer } from './DojoDetailDrawer';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { DatasetImportModal } from '../common/DatasetImportModal';
import {
  Tent,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  Building2,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Mountain,
  FileCheck,
  Upload,
  Database
} from 'lucide-react';

export const DojoManager: React.FC = () => {
  const { dojos, deleteDojo, updateDojo, openEnrollmentModal } = useDojo();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBiome, setFilterBiome] = useState<BiomeType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<DojoStatus | 'all'>('all');
  const [dataOriginFilter, setDataOriginFilter] = useState<'all' | 'real_only' | 'mock_only'>('all');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [dojoToEdit, setDojoToEdit] = useState<WildernessDojo | null>(null);
  const [selectedDrawerDojo, setSelectedDrawerDojo] = useState<WildernessDojo | null>(null);
  const [dojoToDelete, setDojoToDelete] = useState<WildernessDojo | null>(null);

  const filteredDojos = dojos.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.researchTopic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBiome = filterBiome === 'all' || d.biome === filterBiome;
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchesOrigin =
      dataOriginFilter === 'all' ||
      (dataOriginFilter === 'real_only' && !d.isMock) ||
      (dataOriginFilter === 'mock_only' && d.isMock);

    return matchesSearch && matchesBiome && matchesStatus && matchesOrigin;
  });

  const getStatusBadge = (status: DojoStatus) => {
    switch (status) {
      case 'open':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">Open for Enrollment</span>;
      case 'almost_full':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">Almost Full</span>;
      case 'sold_out':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/40">Sold Out / Waitlist</span>;
      case 'in_session':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-500/40 animate-pulse">In Session (Active)</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#18221c] text-[#8c9e92] border border-[#2d3a30]">Expedition Completed</span>;
    }
  };

  return (
    <div className="space-y-6" id="dojo-event-manager-root">
      {/* Top Header Bar */}
      <div className="bg-[#111814] p-5 sm:p-6 rounded-2xl border border-[#2d3a30] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#e0e7e1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              Operations & Event CRM
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#e0e7e1] mt-1">Wilderness Dojo Events</h2>
          <p className="text-xs text-[#8c9e92] mt-0.5">
            Manage field cohorts, biome locations, research grants, capacity rosters, and curriculum specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#18221c] hover:bg-[#233027] text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            id="btn-import-dataset"
          >
            <Upload className="w-4 h-4" />
            <span>Import / Real Datasets</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            id="btn-create-new-dojo"
          >
            <Plus className="w-4 h-4" />
            <span>New Wilderness Dojo</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111814] p-4 rounded-2xl border border-[#2d3a30] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#728478] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter dojos by title, research focus, or region..."
            className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
            id="input-manager-search"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={dataOriginFilter}
            onChange={(e) => setDataOriginFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-[#2d3a30] bg-[#18221c] text-[#e0e7e1] font-medium focus:border-emerald-500 focus:outline-hidden"
          >
            <option value="all">All Data ({dojos.length})</option>
            <option value="real_only">Real Data Only (3)</option>
            <option value="mock_only">Mock Data Only</option>
          </select>

          <select
            value={filterBiome}
            onChange={(e) => setFilterBiome(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-[#2d3a30] bg-[#18221c] text-[#e0e7e1] font-medium focus:border-emerald-500 focus:outline-hidden"
            id="select-manager-filter-biome"
          >
            <option value="all">All Ecosystems</option>
            <option value="Riparian Watershed">Riparian Watershed</option>
            <option value="Alpine Crest">Alpine Crest</option>
            <option value="Old-Growth Rainforest">Old-Growth Rainforest</option>
            <option value="Boreal Taiga">Boreal Taiga</option>
            <option value="Coastal Mangrove & Estuary">Coastal Mangrove</option>
            <option value="High Desert Canyon">High Desert Canyon</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-[#2d3a30] bg-[#18221c] text-[#e0e7e1] font-medium focus:border-emerald-500 focus:outline-hidden"
            id="select-manager-filter-status"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="almost_full">Almost Full</option>
            <option value="sold_out">Sold Out</option>
            <option value="in_session">In Session</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Dojos Roster List / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDojos.map((dojo) => {
          const occupancyRate = Math.round((dojo.enrolledCount / dojo.capacity) * 100);
          return (
            <div
              key={dojo.id}
              className="bg-[#111814] rounded-2xl border border-[#2d3a30] shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 text-[#e0e7e1]"
              id={`manager-dojo-item-${dojo.id}`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={dojo.imageUrl}
                  alt={dojo.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#2d3a30] shrink-0"
                />

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(dojo.status)}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#18221c] text-[#c2d1c6] border border-[#2d3a30]">
                      {dojo.biome}
                    </span>
                    {dojo.isMock && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                        Mock Data
                      </span>
                    )}
                    <span className="text-xs text-[#8c9e92] font-mono">
                      Permit: {dojo.wildernessPermitNumber}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#e0e7e1] leading-snug">
                    {dojo.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#8c9e92]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#728478]" />
                      {dojo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#728478]" />
                      {new Date(dojo.startDate).toLocaleDateString()} – {new Date(dojo.endDate).toLocaleDateString()} ({dojo.durationDays}d)
                    </span>
                  </div>

                  <p className="text-xs text-[#8c9e92] line-clamp-1">
                    <strong className="text-[#c2d1c6]">Research Focus:</strong> {dojo.researchTopic}
                  </p>
                </div>
              </div>

              {/* Middle Metrics: Capacity & Research Grant */}
              <div className="flex items-center gap-6 lg:border-l lg:border-r border-[#232f27] lg:px-6 shrink-0 text-xs">
                <div>
                  <div className="flex items-center justify-between gap-3 text-[#8c9e92] mb-1">
                    <span className="font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#728478]" /> Cohort Roster:
                    </span>
                    <span className="font-bold text-[#e0e7e1]">
                      {dojo.enrolledCount} / {dojo.capacity} ({occupancyRate}%)
                    </span>
                  </div>
                  <div className="w-36 h-2 bg-[#18221c] rounded-full overflow-hidden border border-[#2d3a30]">
                    <div
                      className={`h-full rounded-full ${
                        occupancyRate >= 100
                          ? 'bg-rose-500'
                          : occupancyRate >= 80
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, occupancyRate)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#728478] mt-1 block">
                    {Math.max(0, dojo.capacity - dojo.enrolledCount)} seats available
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8c9e92] block">Sponsor & Grant</span>
                  <p className="font-bold text-teal-300 text-sm mt-0.5">
                    ${dojo.researchGrantAmount.toLocaleString()}
                  </p>
                  <span className="text-[11px] text-[#8c9e92] truncate max-w-[130px] block">
                    {dojo.sponsorName}
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  type="button"
                  onClick={() => setSelectedDrawerDojo(dojo)}
                  className="p-2 text-[#8c9e92] hover:text-[#e0e7e1] hover:bg-[#18221c] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#2d3a30]"
                  title="View full curriculum & details"
                  id={`btn-view-dojo-${dojo.id}`}
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDojoToEdit(dojo)}
                  className="p-2 text-[#8c9e92] hover:text-emerald-300 hover:bg-[#18221c] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#2d3a30]"
                  title="Edit Dojo specifications"
                  id={`btn-edit-dojo-${dojo.id}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDojoToDelete(dojo)}
                  className="p-2 text-[#8c9e92] hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-500/30"
                  title="Delete Wilderness Dojo"
                  id={`btn-delete-dojo-${dojo.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredDojos.length === 0 && (
          <div className="text-center py-12 bg-[#111814] rounded-2xl border border-[#2d3a30] p-6 text-[#e0e7e1]">
            <Tent className="w-10 h-10 text-[#6b7c70] mx-auto mb-2" />
            <h4 className="text-base font-bold text-[#e0e7e1]">No Wilderness Dojos Found</h4>
            <p className="text-xs text-[#8c9e92] mt-1">Try adjusting your filters or create a new Wilderness Dojo.</p>
          </div>
        )}
      </div>

      {/* Modals & Confirmation */}
      {(isCreateModalOpen || dojoToEdit) && (
        <DojoModal
          dojoToEdit={dojoToEdit}
          onClose={() => {
            setIsCreateModalOpen(false);
            setDojoToEdit(null);
          }}
        />
      )}

      {selectedDrawerDojo && (
        <DojoDetailDrawer
          dojo={selectedDrawerDojo}
          onClose={() => setSelectedDrawerDojo(null)}
          onEnroll={(d) => {
            setSelectedDrawerDojo(null);
            openEnrollmentModal(d);
          }}
          onEditDojo={(d) => {
            setSelectedDrawerDojo(null);
            setDojoToEdit(d);
          }}
        />
      )}

      {dojoToDelete && (
        <ConfirmationModal
          isOpen={true}
          title="Delete Wilderness Dojo?"
          message={`Are you sure you want to remove "${dojoToDelete.title}"? Any enrolled participants will remain in the database but their cohort will be unlinked.`}
          confirmLabel="Delete Dojo"
          isDestructive={true}
          onConfirm={() => deleteDojo(dojoToDelete.id)}
          onCancel={() => setDojoToDelete(null)}
        />
      )}

      {isImportModalOpen && (
        <DatasetImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </div>
  );
};
