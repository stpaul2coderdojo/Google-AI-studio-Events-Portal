export type BiomeType = 
  | 'Alpine Crest' 
  | 'Old-Growth Rainforest' 
  | 'Boreal Taiga' 
  | 'Coastal Mangrove & Estuary' 
  | 'High Desert Canyon' 
  | 'Riparian Watershed';

export type DojoStatus = 'open' | 'almost_full' | 'sold_out' | 'in_session' | 'completed';

export type DifficultyLevel = 
  | 'Novice Explorer' 
  | 'Intermediate Field Tracker' 
  | 'Advanced Ecological Scout' 
  | 'Master Wilderness Specialist';

export interface ResearchLead {
  name: string;
  title: string;
  institution: string;
  avatar: string;
  bio: string;
}

export interface WildernessDojo {
  id: string;
  title: string;
  subtitle: string;
  biome: BiomeType;
  location: string;
  coordinates: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  capacity: number;
  enrolledCount: number;
  status: DojoStatus;
  difficulty: DifficultyLevel;
  terrainDescription: string;
  researchTopic: string;
  researchLead: ResearchLead;
  sponsorOrgId: string;
  sponsorName: string;
  tuitionFee: number;
  researchGrantAmount: number;
  imageUrl: string;
  gearRequirements: string[];
  learningObjectives: string[];
  medicalPrerequisites: string[];
  elevationGainMeters: number;
  wildernessPermitNumber: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface MedicalInsurance {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  primaryPhysician: string;
  physicianPhone: string;
  hasPreExistingConditions: boolean;
  conditionsDescription: string;
  allergies: string;
  currentMedications: string;
  tetanusShotYear: number;
  bloodType: string;
  evacuationInsuranceAccepted: boolean;
}

export type ParticipantStatus = 
  | 'pending_review' 
  | 'medical_cleared' 
  | 'confirmed' 
  | 'checked_in' 
  | 'completed' 
  | 'cancelled';

export interface Participant {
  id: string;
  dojoId: string;
  dojoTitle: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  genderIdentity: string;
  emergencyContact: EmergencyContact;
  dietaryNeeds: string;
  priorWildernessExperience: string;
  medicalInsurance: MedicalInsurance;
  waiverAccepted: boolean;
  digitalSignature: string;
  signatureDate: string;
  registrationDate: string;
  status: ParticipantStatus;
  medicalClearanceNotes: string;
  scholarshipRecipient: boolean;
  scholarshipSponsorId?: string;
  scholarshipNotes?: string;
  fieldIdBadge: string;
}

export type SponsorCategory = 
  | 'Eco-Tech Philanthropy' 
  | 'Conservation Trust' 
  | 'Corporate Sustainability Fund' 
  | 'Academic Research Endowment' 
  | 'Outdoor Heritage Brand';

export type SponsorTier = 
  | 'Visionary Patron' 
  | 'Lead Research Benefactor' 
  | 'Biome Protector' 
  | 'Expedition Fellow Partner';

export type ResearchMilestoneStatus = 
  | 'Proposal Approved' 
  | 'Equipment Deployed' 
  | 'Field Sampling Active' 
  | 'DNA/Acoustic Analysis' 
  | 'Dataset Published';

export interface EcologicalResearchProject {
  id: string;
  title: string;
  dojoId: string;
  dojoTitle: string;
  grantAmount: number;
  objective: string;
  milestoneStatus: ResearchMilestoneStatus;
  deliverables: string[];
  speciesCataloged: number;
  hectaresSurveyed: number;
  sensorNodesDeployed: number;
  publishedReportUrl?: string;
  lastTelemetryDate: string;
}

export interface SponsorOrg {
  id: string;
  name: string;
  logo: string;
  category: SponsorCategory;
  tier: SponsorTier;
  contactPerson: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  totalCommitted: number;
  totalPaid: number;
  sponsoredDojoIds: string[];
  researchProjects: EcologicalResearchProject[];
  status: 'Active Partner' | 'Pending Renewal' | 'Prospective Partner';
  website: string;
  sponsorshipDate: string;
  notes: string;
  taxExemptId: string;
}

export type ActiveTab = 
  | 'public_portal' 
  | 'dojo_manager' 
  | 'participants_crm' 
  | 'sponsors_crm' 
  | 'impact_analytics';

export interface FilterOptions {
  biome?: BiomeType | 'all';
  status?: DojoStatus | 'all';
  difficulty?: DifficultyLevel | 'all';
  searchQuery?: string;
}
