import React, { useState } from 'react';
import { SponsorOrg, SponsorCategory, SponsorTier } from '../../types';
import { useDojo } from '../../context/DojoContext';
import { X, Building2, DollarSign, Globe, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface SponsorModalProps {
  sponsorToEdit?: SponsorOrg | null;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ sponsorToEdit, onClose }) => {
  const { addSponsor, updateSponsor } = useDojo();
  const isEditing = !!sponsorToEdit;

  const [name, setName] = useState(sponsorToEdit?.name || '');
  const [logo, setLogo] = useState(
    sponsorToEdit?.logo ||
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80'
  );
  const [category, setCategory] = useState<SponsorCategory>(sponsorToEdit?.category || 'Eco-Tech Philanthropy');
  const [tier, setTier] = useState<SponsorTier>(sponsorToEdit?.tier || 'Lead Research Benefactor');
  const [totalCommitted, setTotalCommitted] = useState<number>(sponsorToEdit?.totalCommitted || 100000);
  const [totalPaid, setTotalPaid] = useState<number>(sponsorToEdit?.totalPaid || 75000);

  const [contactName, setContactName] = useState(sponsorToEdit?.contactPerson.name || '');
  const [contactTitle, setContactTitle] = useState(sponsorToEdit?.contactPerson.title || 'Director of Philanthropy');
  const [contactEmail, setContactEmail] = useState(sponsorToEdit?.contactPerson.email || '');
  const [contactPhone, setContactPhone] = useState(sponsorToEdit?.contactPerson.phone || '');

  const [website, setWebsite] = useState(sponsorToEdit?.website || 'https://example-foundation.org');
  const [taxExemptId, setTaxExemptId] = useState(sponsorToEdit?.taxExemptId || 'EIN-94-3382910');
  const [status, setStatus] = useState<'Active Partner' | 'Pending Renewal' | 'Prospective Partner'>(
    sponsorToEdit?.status || 'Active Partner'
  );
  const [notes, setNotes] = useState(sponsorToEdit?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactName.trim()) return;

    if (isEditing && sponsorToEdit) {
      updateSponsor(sponsorToEdit.id, {
        name,
        logo,
        category,
        tier,
        totalCommitted: Number(totalCommitted),
        totalPaid: Number(totalPaid),
        contactPerson: {
          name: contactName,
          title: contactTitle,
          email: contactEmail,
          phone: contactPhone,
        },
        website,
        taxExemptId,
        status,
        notes,
      });
    } else {
      addSponsor({
        name,
        logo,
        category,
        tier,
        totalCommitted: Number(totalCommitted),
        totalPaid: Number(totalPaid),
        sponsoredDojoIds: [],
        contactPerson: {
          name: contactName,
          title: contactTitle,
          email: contactEmail,
          phone: contactPhone,
        },
        status,
        website,
        sponsorshipDate: new Date().toISOString().split('T')[0],
        notes,
        taxExemptId,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between gap-4 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600/30 border border-teal-500/40 text-teal-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {isEditing ? 'Edit Sponsor Organization' : 'Add Sponsoring Organization'}
              </h3>
              <p className="text-xs text-stone-400">
                Institutional & corporate funders for ecological field research
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Organization / Foundation Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., EarthPulse BioAcoustics Foundation"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Sponsor Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SponsorCategory)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                <option value="Eco-Tech Philanthropy">Eco-Tech Philanthropy</option>
                <option value="Conservation Trust">Conservation Trust</option>
                <option value="Corporate Sustainability Fund">Corporate Sustainability Fund</option>
                <option value="Academic Research Endowment">Academic Research Endowment</option>
                <option value="Outdoor Heritage Brand">Outdoor Heritage Brand</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Benefactor Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as SponsorTier)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-semibold"
              >
                <option value="Visionary Patron">Visionary Patron ($200k+)</option>
                <option value="Lead Research Benefactor">Lead Research Benefactor ($100k+)</option>
                <option value="Biome Protector">Biome Protector ($50k+)</option>
                <option value="Expedition Fellow Partner">Expedition Fellow Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Total Funding Committed ($)
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                value={totalCommitted}
                onChange={(e) => setTotalCommitted(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Total Paid to Date ($)
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                value={totalPaid}
                onChange={(e) => setTotalPaid(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-bold"
              />
            </div>
          </div>

          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-1.5 pt-2">
            Primary Contact Person
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Victoria Stirling"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="VP of Ecological Philanthropy"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="v.stirling@foundation.org"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+1 (415) 902-7711"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tax-Exempt / EIN ID
              </label>
              <input
                type="text"
                value={taxExemptId}
                onChange={(e) => setTaxExemptId(e.target.value)}
                placeholder="EIN-94-3382910"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Internal Partnership Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Committed to multi-year research grants for high altitude sensor equipment..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
            />
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
              {isEditing ? 'Save Sponsor Partner' : 'Add Sponsor'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
