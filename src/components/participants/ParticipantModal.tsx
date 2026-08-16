import React, { useState } from 'react';
import { Participant, MedicalInsurance, EmergencyContact } from '../../types';
import { useDojo } from '../../context/DojoContext';
import { X, UserPlus, ShieldCheck, HeartPulse, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ParticipantModalProps {
  participantToEdit?: Participant | null;
  onClose: () => void;
}

export const ParticipantModal: React.FC<ParticipantModalProps> = ({
  participantToEdit,
  onClose,
}) => {
  const { dojos, registerParticipant, updateParticipant } = useDojo();
  const isEditing = !!participantToEdit;

  const [dojoId, setDojoId] = useState(participantToEdit?.dojoId || dojos[0]?.id || '');
  const [fullName, setFullName] = useState(participantToEdit?.fullName || '');
  const [email, setEmail] = useState(participantToEdit?.email || '');
  const [phone, setPhone] = useState(participantToEdit?.phone || '');
  const [age, setAge] = useState<number>(participantToEdit?.age || 28);
  const [genderIdentity, setGenderIdentity] = useState(participantToEdit?.genderIdentity || 'Prefer not to say');
  const [dietaryNeeds, setDietaryNeeds] = useState(participantToEdit?.dietaryNeeds || 'Standard Rations');
  const [priorExperience, setPriorExperience] = useState(participantToEdit?.priorWildernessExperience || '');

  // Emergency
  const [emergencyName, setEmergencyName] = useState(participantToEdit?.emergencyContact.name || '');
  const [emergencyRelation, setEmergencyRelation] = useState(participantToEdit?.emergencyContact.relationship || 'Spouse');
  const [emergencyPhone, setEmergencyPhone] = useState(participantToEdit?.emergencyContact.phone || '');
  const [emergencyEmail, setEmergencyEmail] = useState(participantToEdit?.emergencyContact.email || '');

  // Medical & Insurance
  const [provider, setProvider] = useState(participantToEdit?.medicalInsurance.provider || 'Blue Cross Blue Shield');
  const [policyNumber, setPolicyNumber] = useState(participantToEdit?.medicalInsurance.policyNumber || '');
  const [groupNumber, setGroupNumber] = useState(participantToEdit?.medicalInsurance.groupNumber || '');
  const [primaryPhysician, setPrimaryPhysician] = useState(participantToEdit?.medicalInsurance.primaryPhysician || 'Dr. Arthur Sterling, MD');
  const [physicianPhone, setPhysicianPhone] = useState(participantToEdit?.medicalInsurance.physicianPhone || '+1 (415) 555-0142');
  const [hasPreExistingConditions, setHasPreExistingConditions] = useState(participantToEdit?.medicalInsurance.hasPreExistingConditions || false);
  const [conditionsDescription, setConditionsDescription] = useState(participantToEdit?.medicalInsurance.conditionsDescription || '');
  const [allergies, setAllergies] = useState(participantToEdit?.medicalInsurance.allergies || 'None declared');
  const [currentMedications, setCurrentMedications] = useState(participantToEdit?.medicalInsurance.currentMedications || 'None');
  const [tetanusShotYear, setTetanusShotYear] = useState<number>(participantToEdit?.medicalInsurance.tetanusShotYear || 2024);
  const [bloodType, setBloodType] = useState(participantToEdit?.medicalInsurance.bloodType || 'O+');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDojo = dojos.find((d) => d.id === dojoId);
    const dojoTitle = targetDojo?.title || 'Wilderness Dojo';

    const emergencyContact: EmergencyContact = {
      name: emergencyName || 'Primary Emergency Contact',
      relationship: emergencyRelation,
      phone: emergencyPhone || phone,
      email: emergencyEmail,
    };

    const medicalInsurance: MedicalInsurance = {
      provider: provider || 'Standard Medical Plan',
      policyNumber: policyNumber || 'POL-992182',
      groupNumber,
      primaryPhysician: primaryPhysician || 'On-Call Physician',
      physicianPhone,
      hasPreExistingConditions,
      conditionsDescription,
      allergies,
      currentMedications,
      tetanusShotYear,
      bloodType,
      evacuationInsuranceAccepted: true,
    };

    if (isEditing && participantToEdit) {
      updateParticipant(participantToEdit.id, {
        dojoId,
        dojoTitle,
        fullName,
        email,
        phone,
        age: Number(age),
        genderIdentity,
        dietaryNeeds,
        priorWildernessExperience: priorExperience,
        emergencyContact,
        medicalInsurance,
      });
    } else {
      registerParticipant({
        dojoId,
        dojoTitle,
        fullName,
        email,
        phone,
        age: Number(age),
        genderIdentity,
        emergencyContact,
        dietaryNeeds,
        priorWildernessExperience: priorExperience,
        medicalInsurance,
        waiverAccepted: true,
        digitalSignature: fullName,
        signatureDate: new Date().toISOString().split('T')[0],
        scholarshipRecipient: false,
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
            <div className="p-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {isEditing ? 'Edit Participant Record' : 'Enroll New Participant in CRM'}
              </h3>
              <p className="text-xs text-stone-400">
                Log personal details, medical insurance info, and cohort assignment
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
              Select Wilderness Dojo Cohort *
            </label>
            <select
              value={dojoId}
              onChange={(e) => setDojoId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold bg-white"
            >
              {dojos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.enrolledCount}/{d.capacity} enrolled)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.org"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Age (18+)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-stone-300 bg-white font-semibold"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Insurance Section */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Medical Insurance Verification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Policy / ID #
                </label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Primary Physician
                </label>
                <input
                  type="text"
                  value={primaryPhysician}
                  onChange={(e) => setPrimaryPhysician(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Known Allergies
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                />
              </div>
            </div>
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
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs"
            >
              {isEditing ? 'Save Changes' : 'Enroll Participant'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
