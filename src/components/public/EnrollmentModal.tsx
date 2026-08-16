import React, { useState } from 'react';
import { WildernessDojo, Participant, MedicalInsurance, EmergencyContact } from '../../types';
import { useDojo } from '../../context/DojoContext';
import { EnrollmentConfirmation } from './EnrollmentConfirmation';
import {
  X,
  User,
  HeartPulse,
  FileSignature,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EnrollmentModalProps {
  dojo: WildernessDojo;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ dojo, onClose }) => {
  const { registerParticipant, setActiveTab } = useDojo();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdParticipant, setCreatedParticipant] = useState<Participant | null>(null);

  // Step 1: Personal info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(28);
  const [genderIdentity, setGenderIdentity] = useState('Prefer not to say');
  const [dietaryNeeds, setDietaryNeeds] = useState('Omnivore / No strict restrictions');
  const [priorExperience, setPriorExperience] = useState('');

  // Emergency contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Spouse / Partner');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyEmail, setEmergencyEmail] = useState('');

  // Step 2: Medical & Insurance
  const [provider, setProvider] = useState('Blue Cross Blue Shield');
  const [policyNumber, setPolicyNumber] = useState('');
  const [groupNumber, setGroupNumber] = useState('');
  const [primaryPhysician, setPrimaryPhysician] = useState('');
  const [physicianPhone, setPhysicianPhone] = useState('');
  const [hasPreExistingConditions, setHasPreExistingConditions] = useState(false);
  const [conditionsDescription, setConditionsDescription] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [tetanusShotYear, setTetanusShotYear] = useState<number>(2024);
  const [bloodType, setBloodType] = useState('O+');
  const [evacuationInsuranceAccepted, setEvacuationInsuranceAccepted] = useState(true);

  // Step 3: Waiver & Signature
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState('');
  const [scholarshipRequested, setScholarshipRequested] = useState(false);
  const [scholarshipReason, setScholarshipReason] = useState('');

  // Form Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full legal name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!emergencyName.trim()) errs.emergencyName = 'Emergency contact name is required';
    if (!emergencyPhone.trim()) errs.emergencyPhone = 'Emergency contact phone is required';
    if (age < 18) errs.age = 'Participants must be at least 18 years old for wilderness dojos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!provider.trim()) errs.provider = 'Health insurance provider is required';
    if (!policyNumber.trim()) errs.policyNumber = 'Policy/Member ID is mandatory for wilderness field access';
    if (!primaryPhysician.trim()) errs.primaryPhysician = 'Primary care physician name is required';
    if (hasPreExistingConditions && !conditionsDescription.trim()) {
      errs.conditionsDescription = 'Please describe your medical conditions for field safety protocol';
    }
    if (!evacuationInsuranceAccepted) {
      errs.evacuationInsuranceAccepted = 'You must confirm emergency medical evacuation coverage terms';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!waiverAccepted) {
      errs.waiverAccepted = 'You must accept the Wilderness Expedition & Medical Release waiver';
    }
    if (!digitalSignature.trim()) {
      errs.digitalSignature = 'Please type your full legal name as your digital signature';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const emergencyContact: EmergencyContact = {
      name: emergencyName,
      relationship: emergencyRelation,
      phone: emergencyPhone,
      email: emergencyEmail,
    };

    const medicalInsurance: MedicalInsurance = {
      provider,
      policyNumber,
      groupNumber,
      primaryPhysician,
      physicianPhone,
      hasPreExistingConditions,
      conditionsDescription,
      allergies: allergies || 'None declared',
      currentMedications: currentMedications || 'None',
      tetanusShotYear,
      bloodType,
      evacuationInsuranceAccepted,
    };

    const newParticipant = registerParticipant({
      dojoId: dojo.id,
      dojoTitle: dojo.title,
      fullName,
      email,
      phone,
      age: Number(age),
      genderIdentity,
      emergencyContact,
      dietaryNeeds,
      priorWildernessExperience: priorExperience || 'General outdoor backcountry recreation experience.',
      medicalInsurance,
      waiverAccepted,
      digitalSignature,
      signatureDate: new Date().toISOString().split('T')[0],
      scholarshipRecipient: scholarshipRequested,
      scholarshipSponsorId: scholarshipRequested ? dojo.sponsorOrgId : undefined,
      scholarshipNotes: scholarshipRequested
        ? `Applied for ${dojo.sponsorName} Field Scholar Grant: "${scholarshipReason}"`
        : undefined,
    });

    setCreatedParticipant(newParticipant);
    setCurrentStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#111814] rounded-2xl max-w-2xl w-full shadow-2xl border border-[#2d3a30] overflow-hidden flex flex-col my-auto max-h-[92vh] text-[#e0e7e1]"
        id="wilderness-enrollment-modal"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0d120f] text-[#e0e7e1] p-5 flex items-start justify-between gap-4 border-b border-[#2d3a30] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official Enrollment Intake
              </span>
              <span className="text-xs text-[#8c9e92]">Step {currentStep} of 4</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-[#e0e7e1] leading-tight">
              {dojo.title}
            </h3>
            <p className="text-xs text-[#8c9e92] mt-0.5">
              {dojo.location} • {dojo.durationDays} Days Field Research Intensive
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#8c9e92] hover:text-[#e0e7e1] p-1.5 rounded-lg hover:bg-[#18221c] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (when not confirmed) */}
        {currentStep < 4 && (
          <div className="bg-[#18221c] px-5 py-3 border-b border-[#2d3a30] flex items-center justify-between text-xs font-semibold shrink-0 text-[#8c9e92]">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-emerald-300' : 'text-[#728478]'}`}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-[#232f27] text-[#728478]'
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline">Personal & Emergency</span>
            </div>
            <div className="h-0.5 w-6 bg-[#2d3a30]" />

            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-emerald-300' : 'text-[#728478]'}`}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-[#232f27] text-[#728478]'
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline">Medical & Insurance</span>
            </div>
            <div className="h-0.5 w-6 bg-[#2d3a30]" />

            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-emerald-300' : 'text-[#728478]'}`}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-[#232f27] text-[#728478]'
                }`}
              >
                3
              </div>
              <span className="hidden sm:inline">Liability Waiver</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-[#e0e7e1]">
          {currentStep === 1 && (
            <div className="space-y-4" id="enrollment-step-1">
              <div className="p-3 bg-[#18221c] border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-[#e0e7e1]">
                <span className="font-semibold text-[#8c9e92]">Sponsoring Research Partner:</span>
                <span className="font-bold text-teal-300">{dojo.sponsorName}</span>
              </div>

              <h4 className="text-sm font-bold text-[#e0e7e1] uppercase tracking-wider border-b border-[#232f27] pb-2">
                1. Participant Identity
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Samantha Vance"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-participant-name"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="samantha@example.org"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-participant-email"
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-participant-phone"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                      Age (18+) *
                    </label>
                    <input
                      type="number"
                      min={18}
                      max={90}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                      id="input-participant-age"
                    />
                    {errors.age && <p className="text-[11px] text-rose-400 mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                      Gender Identity
                    </label>
                    <select
                      value={genderIdentity}
                      onChange={(e) => setGenderIdentity(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                      id="input-participant-gender"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-[#e0e7e1] uppercase tracking-wider border-b border-[#232f27] pb-2 pt-2">
                2. Emergency Contact
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="David Vance"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-emergency-name"
                  />
                  {errors.emergencyName && <p className="text-[11px] text-rose-400 mt-1">{errors.emergencyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={emergencyRelation}
                    onChange={(e) => setEmergencyRelation(e.target.value)}
                    placeholder="e.g., Spouse, Parent, Sibling"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-emergency-relation"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Emergency Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-emergency-phone"
                  />
                  {errors.emergencyPhone && <p className="text-[11px] text-rose-400 mt-1">{errors.emergencyPhone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Emergency Email
                  </label>
                  <input
                    type="email"
                    value={emergencyEmail}
                    onChange={(e) => setEmergencyEmail(e.target.value)}
                    placeholder="emergency@example.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-emergency-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Dietary Requirements for Backcountry Rations
                </label>
                <input
                  type="text"
                  value={dietaryNeeds}
                  onChange={(e) => setDietaryNeeds(e.target.value)}
                  placeholder="e.g. Vegetarian, Nut-free, Vegan, Celiac (Gluten-free)"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                  id="input-dietary-needs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Prior Wilderness / Field Experience (Optional)
                </label>
                <textarea
                  rows={2}
                  value={priorExperience}
                  onChange={(e) => setPriorExperience(e.target.value)}
                  placeholder="e.g. Multi-day backpacking, Wilderness First Aid, botany coursework, navigation..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                  id="input-prior-experience"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4" id="enrollment-step-2">
              <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-3 text-xs text-amber-200">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-amber-300">Mandatory Wilderness Medical & Insurance Clearance</strong>
                  <p className="mt-0.5 text-amber-200/80 leading-relaxed">
                    Due to the remote wilderness setting with no immediate road access, all participants must provide active health insurance credentials and primary physician contacts for the expedition medic dossier.
                  </p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-[#e0e7e1] uppercase tracking-wider border-b border-[#232f27] pb-2">
                1. Medical Insurance Credentials
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Insurance Provider / Carrier *
                  </label>
                  <input
                    type="text"
                    required
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="e.g., Blue Cross Blue Shield, Kaiser, Aetna, Cigna"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-insurance-provider"
                  />
                  {errors.provider && <p className="text-[11px] text-rose-400 mt-1">{errors.provider}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Member / Policy ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="e.g., BCBS-994821034"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-mono placeholder-[#6b7c70]"
                    id="input-insurance-policy"
                  />
                  {errors.policyNumber && <p className="text-[11px] text-rose-400 mt-1">{errors.policyNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Group Number (if applicable)
                  </label>
                  <input
                    type="text"
                    value={groupNumber}
                    onChange={(e) => setGroupNumber(e.target.value)}
                    placeholder="e.g., GRP-8812"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-mono placeholder-[#6b7c70]"
                    id="input-insurance-group"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                      Blood Type
                    </label>
                    <select
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      className="w-full px-2 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] font-semibold"
                      id="input-blood-type"
                    >
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                      Last Tetanus Shot
                    </label>
                    <input
                      type="number"
                      min={2010}
                      max={2026}
                      value={tetanusShotYear}
                      onChange={(e) => setTetanusShotYear(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1]"
                      id="input-tetanus-year"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Primary Care Physician *
                  </label>
                  <input
                    type="text"
                    required
                    value={primaryPhysician}
                    onChange={(e) => setPrimaryPhysician(e.target.value)}
                    placeholder="Dr. Arthur Sterling, MD"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-physician-name"
                  />
                  {errors.primaryPhysician && <p className="text-[11px] text-rose-400 mt-1">{errors.primaryPhysician}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Physician Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={physicianPhone}
                    onChange={(e) => setPhysicianPhone(e.target.value)}
                    placeholder="+1 (555) 444-2200"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-physician-phone"
                  />
                </div>
              </div>

              <h4 className="text-sm font-bold text-[#e0e7e1] uppercase tracking-wider border-b border-[#232f27] pb-2 pt-2">
                2. Allergies, Medications & Medical History
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Allergies (Medications, Foods, Bee Stings)
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g., Peanuts (Epipen carried), Penicillin, None"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-allergies"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                    Current Medications Brought to Field
                  </label>
                  <input
                    type="text"
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    placeholder="e.g., Albuterol inhaler, daily antihistamine, None"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-medications"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#2d3a30] bg-[#18221c] space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPreExistingConditions}
                    onChange={(e) => setHasPreExistingConditions(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    id="check-has-conditions"
                  />
                  <span className="text-xs font-semibold text-[#c2d1c6]">
                    I have pre-existing medical conditions (Asthma, Cardiac, Diabetes, Joint/Back issues)
                  </span>
                </label>

                {hasPreExistingConditions && (
                  <div className="pt-2">
                    <textarea
                      rows={2}
                      value={conditionsDescription}
                      onChange={(e) => setConditionsDescription(e.target.value)}
                      placeholder="Please specify conditions and any field action protocol for our wilderness medic..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#111814] text-[#e0e7e1] placeholder-[#6b7c70]"
                      id="input-conditions-desc"
                    />
                    {errors.conditionsDescription && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.conditionsDescription}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evacuationInsuranceAccepted}
                    onChange={(e) => setEvacuationInsuranceAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    id="check-evacuation-insurance"
                  />
                  <div className="text-xs text-emerald-200">
                    <span className="font-bold text-emerald-300">Wilderness Med-Evac Agreement:</span>
                    <p className="mt-0.5 text-emerald-200/80 leading-relaxed">
                      I confirm that my insurance or supplemental policy covers backcountry emergency rescue/evacuation, and I authorize the expedition medical lead to initiate emergency dispatch if medically necessary.
                    </p>
                  </div>
                </label>
                {errors.evacuationInsuranceAccepted && (
                  <p className="text-[11px] text-rose-400 mt-1 pl-6">{errors.evacuationInsuranceAccepted}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmitEnrollment} className="space-y-4" id="enrollment-step-3">
              {/* Sponsorship Grant Co-Pay Breakdown */}
              <div className="p-4 bg-teal-950/40 border border-teal-500/40 rounded-xl text-xs text-teal-200">
                <div className="flex items-center justify-between font-bold text-sm mb-1">
                  <span className="text-teal-300">Tuition & Research Grant Subsidy</span>
                  <span className="text-teal-200 font-extrabold">${dojo.tuitionFee} Due</span>
                </div>
                <p className="text-teal-200/80 leading-relaxed">
                  This Wilderness Dojo is heavily subsidized by an ecological research grant from{' '}
                  <strong className="text-white">{dojo.sponsorName}</strong> (${(dojo.researchGrantAmount / 1000).toFixed(0)}k grant).
                </p>

                <div className="mt-3 pt-3 border-t border-teal-500/30">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scholarshipRequested}
                      onChange={(e) => setScholarshipRequested(e.target.checked)}
                      className="w-4 h-4 text-teal-500 rounded"
                      id="check-scholarship-request"
                    />
                    <span className="font-semibold text-teal-300">
                      Apply for 100% Sponsor Diversity/Student Tuition Fellowship
                    </span>
                  </label>

                  {scholarshipRequested && (
                    <div className="mt-2 pl-6">
                      <input
                        type="text"
                        value={scholarshipReason}
                        onChange={(e) => setScholarshipReason(e.target.value)}
                        placeholder="State your academic or conservation background..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-teal-500/50 bg-[#18221c] text-[#e0e7e1] placeholder-[#6b7c70]"
                        id="input-scholarship-reason"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Liability Waiver Text */}
              <div className="border border-[#2d3a30] rounded-xl p-4 bg-[#18221c] max-h-40 overflow-y-auto text-xs text-[#a1b3a6] space-y-2 leading-relaxed">
                <h5 className="font-bold text-[#e0e7e1] uppercase">
                  Wilderness Dojo Participant Agreement & Liability Release
                </h5>
                <p>
                  1. <strong>Assumption of Inherent Risks:</strong> I acknowledge that participation in Wilderness Dojos involves strenuous physical activities in remote backcountry environments with inherent risks including extreme weather, altitude, wildlife encounters, difficult terrain, and limited access to clinical medical facilities.
                </p>
                <p>
                  2. <strong>Medical Fitness & Insurance:</strong> I certify that I am physically capable of participating, and that the medical insurance details provided are accurate and active.
                </p>
                <p>
                  3. <strong>Leave No Trace & Ecological Integrity:</strong> I agree to strictly abide by leave-no-trace protocols and scientific sample handling ethics directed by {dojo.researchLead.name}.
                </p>
              </div>

              {/* Signature Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waiverAccepted}
                    onChange={(e) => setWaiverAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    id="check-waiver-accept"
                  />
                  <div className="text-xs text-[#c2d1c6]">
                    <span className="font-bold text-[#e0e7e1]">I have read, understood, and accept the Wilderness Release & Medical Agreement *</span>
                  </div>
                </label>
                {errors.waiverAccepted && (
                  <p className="text-[11px] text-rose-400 mt-1 pl-6">{errors.waiverAccepted}</p>
                )}
              </div>

              {/* Digital Signature */}
              <div>
                <label className="block text-xs font-semibold text-[#c2d1c6] mb-1">
                  Digital Signature (Type Full Legal Name) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={digitalSignature}
                    onChange={(e) => setDigitalSignature(e.target.value)}
                    placeholder={fullName || 'Samantha Vance'}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#2d3a30] focus:border-emerald-500 focus:outline-hidden bg-[#18221c] font-serif italic text-[#e0e7e1] placeholder-[#6b7c70]"
                    id="input-digital-signature"
                  />
                  <FileSignature className="w-4 h-4 text-[#728478] absolute right-3 top-3 pointer-events-none" />
                </div>
                {errors.digitalSignature && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.digitalSignature}</p>
                )}
                <span className="text-[11px] text-[#8c9e92] mt-1 block">
                  Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </form>
          )}

          {currentStep === 4 && createdParticipant && (
            <EnrollmentConfirmation
              participant={createdParticipant}
              dojo={dojo}
              onClose={onClose}
              onGoToCRM={() => {
                onClose();
                setActiveTab('participants_crm');
              }}
            />
          )}
        </div>

        {/* Bottom Actions Bar */}
        {currentStep < 4 && (
          <div className="p-4 bg-[#0d120f] border-t border-[#2d3a30] flex items-center justify-between gap-3 shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
                id="btn-enrollment-prev"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#8c9e92] hover:text-[#e0e7e1] cursor-pointer"
              >
                Cancel
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors cursor-pointer"
                id="btn-enrollment-next"
              >
                <span>Continue to {currentStep === 1 ? 'Medical & Insurance' : 'Waiver & Sign'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitEnrollment}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                id="btn-submit-enrollment"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Enrollment</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
