import { WildernessDojo, Participant, SponsorOrg } from '../types';

export const INITIAL_DOJOS: WildernessDojo[] = [
  {
    id: 'dojo-real-arc-01',
    isMock: false,
    title: 'ARC: AI for River Conservation with Microsoft Sparrow & Seeed Studio XIAO',
    subtitle: 'Building Driftwood-Based Observer Units for Bioacoustics & Camera Monitoring',
    biome: 'Riparian Watershed',
    location: 'Agumbe Rainforest Research Centre (Karnataka) & Online (Hybrid)',
    coordinates: '13.5065° N, 75.0937° E',
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    durationDays: 1,
    capacity: 30,
    enrolledCount: 22,
    status: 'open',
    difficulty: 'Intermediate Field Tracker',
    terrainDescription: 'Tropical rainforest riverbanks, riparian waterways, and freshwater tributaries in the Western Ghats biodiversity hotspot.',
    researchTopic: 'Deploying solar-powered driftwood observer units with Seeed Studio XIAO Mesh, hydrophones, and MegaDetector for freshwater biodiversity monitoring.',
    researchLead: {
      name: 'Nvidia DLI Ambassador & AI for Good Lead',
      title: 'Lead Bioacoustic AI Researcher',
      institution: 'Microsoft AI for Good Lab & CoderDojo StPaul2',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Pioneering edge-AI bioacoustic sensor deployment, PyTorch Wildlife integrations, and community-driven river conservation.'
    },
    sponsorOrgId: 'sponsor-msft-aiforgood',
    sponsorName: 'Microsoft AI for Good Lab & CoderDojo StPaul2',
    tuitionFee: 0,
    researchGrantAmount: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    gearRequirements: [
      'Seeed Studio XIAO Meshmatics MCU development board',
      'Submersible Hydrophone Probe with pre-amplifier',
      'Micro-camera trap unit (MegaDetector compatible)',
      'Mini solar panel (5V/2W) with weatherproof driftwood casing',
      'Laptop with Python & Microsoft Sparrow Studio installed'
    ],
    learningObjectives: [
      'Introduction to AI for Good and bioacoustics monitoring',
      'Using Microsoft Sparrow Studio for data collection, annotation, and model training',
      'Building a driftwood-based observer unit with Seeed Studio XIAO Meshmatics',
      'Capturing audio with hydrophones and images with camera traps',
      'End-to-end workflow: from field data to AI models',
      'Ethics, community science and conservation impact'
    ],
    medicalPrerequisites: [
      'Standard tropical field hydration and leeches/insect protection awareness',
      'Basic outdoor footing around wet riverbanks and riparian rocks'
    ],
    elevationGainMeters: 180,
    wildernessPermitNumber: 'ARRC-KA-2026-ARC01'
  },
  {
    id: 'dojo-real-gharial-02',
    isMock: false,
    title: 'HITL for Gharial & Turtle ISPA at MCBT',
    subtitle: 'Human-in-the-Loop Bioacoustics & InterSpecies Phonetic Alphabet Workflows',
    biome: 'Coastal Mangrove & Estuary',
    location: 'Madras Crocodile Bank Trust (MCBT, Tamil Nadu) & Field Estuary (Hybrid)',
    coordinates: '12.7533° N, 80.2411° E',
    startDate: '2026-09-30',
    endDate: '2026-09-30',
    durationDays: 1,
    capacity: 25,
    enrolledCount: 19,
    status: 'open',
    difficulty: 'Advanced Ecological Scout',
    terrainDescription: 'Estuarine mangrove lagoons, breeding pens, and brackish river delta banks.',
    researchTopic: 'Human-in-the-loop bioacoustic annotation and InterSpecies Phonetic Alphabet (ISPA) acoustic phonetics for endangered crocodilians and freshwater turtles.',
    researchLead: {
      name: 'Dr. Romulus Whitaker & MCBT Team',
      title: 'Distinguished Conservation Herpetologist',
      institution: 'Madras Crocodile Bank Trust & CoderDojo StPaul2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Decades of crocodile and reptile conservation leadership across South Asia and international wetlands.'
    },
    sponsorOrgId: 'sponsor-msft-aiforgood',
    sponsorName: 'Microsoft AI for Good Lab & CoderDojo StPaul2',
    tuitionFee: 0,
    researchGrantAmount: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    gearRequirements: [
      'High-frequency directional hydrophone kit',
      'Sparrow Studio audio spectrogram annotation workstation',
      'PyTorch Wildlife runtime environment',
      'Waterproof field notebook and audio calibration meter'
    ],
    learningObjectives: [
      'Acoustic phonetics and low-frequency reptile vocalization classification',
      'Developing human-in-the-loop (HITL) verification loops in Sparrow Studio',
      'ISPA (InterSpecies Phonetic Alphabet) structural tokenization',
      'Real-time bioacoustic classification of critically endangered Gharials'
    ],
    medicalPrerequisites: [
      'Estuary safety protocol compliance (no solo water approach)',
      'Heat and humidity field endurance'
    ],
    elevationGainMeters: 15,
    wildernessPermitNumber: 'MCBT-TN-WILD-2026-02'
  },
  {
    id: 'dojo-real-birdnet-03',
    isMock: false,
    title: 'Cornell BirdNET + Sparrow + MegaDetector at Agumbe',
    subtitle: 'From Multi-Modal Species Detection to RavaTTT-Based Bioacoustic LLMs',
    biome: 'Old-Growth Rainforest',
    location: 'Agumbe Rainforest Research Centre (Karnataka, Western Ghats)',
    coordinates: '13.5065° N, 75.0937° E',
    startDate: '2026-10-15',
    endDate: '2026-10-15',
    durationDays: 1,
    capacity: 35,
    enrolledCount: 28,
    status: 'almost_full',
    difficulty: 'Master Wilderness Specialist',
    terrainDescription: 'High-canopy wet evergreen rainforest with heavy canopy density in the Cherrapunji of South India.',
    researchTopic: 'End-to-end multi-modal pipeline integrating Cornell BirdNET acoustic neural networks, MegaDetector vision models, and RavaTTT audio transformer LLMs.',
    researchLead: {
      name: 'ARRC Bioacoustic Intelligence Consortium',
      title: 'Senior Bioacoustic AI Architect',
      institution: 'Agumbe Rainforest Research Centre & Microsoft AI for Good Lab',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Specializing in edge inference models for avian biodiversity in biodiversity-dense tropical canopies.'
    },
    sponsorOrgId: 'sponsor-msft-aiforgood',
    sponsorName: 'Microsoft AI for Good Lab & CoderDojo StPaul2',
    tuitionFee: 0,
    researchGrantAmount: 140000,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80',
    gearRequirements: [
      'Cornell BirdNET-compatible Raspberry Pi / Seeed audio logger',
      'Parabolic microphone attachment for canopy isolation',
      'PyTorch Wildlife & RavaTTT transformer inference toolchain',
      'Rainproof field casing and canopy mounting rig'
    ],
    learningObjectives: [
      'Deploying multi-channel Cornell BirdNET models on rainforest audio feeds',
      'Combining camera trap vision detections (MegaDetector) with acoustic events',
      'Fine-tuning RavaTTT bioacoustic LLMs for rare Western Ghats endemic fauna',
      'Building automated real-time biodiversity telemetry dashboards'
    ],
    medicalPrerequisites: [
      'Rainforest wet weather gear & leech gaiters',
      'Canopy transect physical fitness'
    ],
    elevationGainMeters: 450,
    wildernessPermitNumber: 'ARRC-KA-2026-BN03'
  },
  {
    id: 'dojo-01',
    isMock: true,
    title: 'High Sierra Alpine Bio-Acoustics Dojo',
    subtitle: 'High-Altitude Avian & Mammalian Audio Telemetry Intensive',
    biome: 'Alpine Crest',
    location: 'Mount Whitney Massif & Evolution Basin, Sierra Nevada, CA',
    coordinates: '36.5785° N, 118.2920° W',
    startDate: '2026-09-04',
    endDate: '2026-09-12',
    durationDays: 9,
    capacity: 12,
    enrolledCount: 10,
    status: 'almost_full',
    difficulty: 'Advanced Ecological Scout',
    terrainDescription: 'Granite scree, glacial cirques, alpine passes above 3,500m elevation. Extreme diurnal temperature swings.',
    researchTopic: 'Monitoring Climate Migration of Sub-Alpine Pika & Clark\'s Nutcracker using Ultrasonic Sensor Matrices',
    researchLead: {
      name: 'Dr. Elena Rostova',
      title: 'Principal Investigator of High Altitude Ecology',
      institution: 'Sierra Wilderness Research Institute',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: '22 years conducting high-alpine field transects across the Andes and Sierra Nevada. Certified Wilderness First Responder.'
    },
    sponsorOrgId: 'sponsor-01',
    sponsorName: 'EarthPulse BioAcoustics Foundation',
    tuitionFee: 850,
    researchGrantAmount: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    gearRequirements: [
      'Four-season sub-zero mountaineering tent',
      'Crampons and trekking poles for glacial pass crossing',
      'Ultrasonic bat/bird detector kit (provided in field)',
      'Water filtration system (0.1 micron absolute)',
      'Solar field power bank 24,000mAh for sensor loggers'
    ],
    learningObjectives: [
      'Install autonomous audio recorders in extreme cold conditions',
      'Analyze spectral bioacoustic signatures in real time',
      'Execute high-altitude navigation without GPS dependency',
      'Practice zero-impact alpine leave-no-trace protocol'
    ],
    medicalPrerequisites: [
      'Doctor clearance for physical exertion above 11,000 ft',
      'Active emergency helicopter evacuation coverage',
      'No unmanaged cardiovascular or severe pulmonary conditions'
    ],
    elevationGainMeters: 2450,
    wildernessPermitNumber: 'USFS-SN-2026-8812'
  },
  {
    id: 'dojo-02',
    isMock: true,
    title: 'Olympic Ancient Canopy Dendrochronology Dojo',
    subtitle: 'Old-Growth Rainforest Canopy Coring & Epiphyte Resilience',
    biome: 'Old-Growth Rainforest',
    location: 'Hoh Rain Forest & Queets River Basin, Olympic Peninsula, WA',
    coordinates: '47.8608° N, 123.9348° W',
    startDate: '2026-09-18',
    endDate: '2026-09-24',
    durationDays: 7,
    capacity: 10,
    enrolledCount: 6,
    status: 'open',
    difficulty: 'Intermediate Field Tracker',
    terrainDescription: 'Temperate rainforest with 140 inches annual precipitation, massive Sitka spruce fallen logs, moss-draped canopy.',
    researchTopic: '800-Year Climate Drought Reconstruction from Sitka Spruce & Western Red Cedar Canopy Cores',
    researchLead: {
      name: 'Prof. Marcus Thorne',
      title: 'Senior Canopy Ecologist',
      institution: 'Pacific Northwest Forest Sciences',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'World pioneer in temperate rainforest single-rope technique (SRT) canopy exploration and tree-ring isotopic analysis.'
    },
    sponsorOrgId: 'sponsor-02',
    sponsorName: 'Canopy Canopy Earth Initiative',
    tuitionFee: 950,
    researchGrantAmount: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    gearRequirements: [
      'GORE-TEX Pro heavy precipitation field rainwear',
      'Arborist safety helmet with Petzl headlamp mount',
      'Tree-climbing harness and ascenders (SRT certified)',
      'Waterproof Rite in the Rain field journals and core tubes',
      'Neoprene waterproof boots for riparian crossing'
    ],
    learningObjectives: [
      'Master safe rope ascent into 70-meter old-growth canopy',
      'Extract non-destructive 5mm increment core samples',
      'Catalog endangered canopy bryophyte and lichen colonies',
      'Document microclimate gradients from forest floor to crown'
    ],
    medicalPrerequisites: [
      'Comfort with heights above 50 meters in climbing gear',
      'Complete wilderness medical questionnaire and waiver',
      'Recent tetanus vaccination within past 5 years'
    ],
    elevationGainMeters: 850,
    wildernessPermitNumber: 'NPS-OLY-2026-4409'
  },
  {
    id: 'dojo-03',
    isMock: true,
    title: 'Cascades Sub-Surface Mycelial Network Mapping Dojo',
    subtitle: 'Soil Metagenomics & Fungal Symbiosis Field Expedition',
    biome: 'Boreal Taiga',
    location: 'Mount Adams Wilderness & Dark Divide, Cascade Range, WA',
    coordinates: '46.2024° N, 121.4910° W',
    startDate: '2026-10-02',
    endDate: '2026-10-08',
    durationDays: 7,
    capacity: 14,
    enrolledCount: 14,
    status: 'sold_out',
    difficulty: 'Novice Explorer',
    terrainDescription: 'Subalpine fir forests, volcanic pumice fields, and ancient root complexes along glacial meltwater streams.',
    researchTopic: 'Portable Nanopore DNA Sequencing of Ectomycorrhizal Fungal Highways Supporting Douglas Fir Resiliency',
    researchLead: {
      name: 'Dr. Sarah Lin-O\'Connor',
      title: 'Microbial Ecologist & Ethnobotanist',
      institution: 'Cascade Biosphere Research Center',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Leading researcher in field-portable genomic sequencing and old-growth underground carbon transport systems.'
    },
    sponsorOrgId: 'sponsor-03',
    sponsorName: 'TerraNova BioVenture Fund',
    tuitionFee: 650,
    researchGrantAmount: 110000,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    gearRequirements: [
      'Field microscope and Oxford Nanopore MinION sequencer (shared)',
      'Sterile core collection scoops and liquid nitrogen cryo-vials',
      'Three-season backcountry shelter',
      'Waterproof field notebook and GPS tagger'
    ],
    learningObjectives: [
      'Collect aseptic rhizosphere soil cores along a 20km transect',
      'Perform DNA extractions inside a mobile canvas field lab',
      'Map underground fungal connectivity to mature mother trees',
      'Publish open-source biodiversity data to Global Biodiversity Facility'
    ],
    medicalPrerequisites: [
      'Ability to hike 10km per day with 15kg pack',
      'Declaration of any fungal or mold spore allergies'
    ],
    elevationGainMeters: 1100,
    wildernessPermitNumber: 'USFS-GP-2026-1021'
  },
  {
    id: 'dojo-04',
    isMock: true,
    title: 'Everglades Mangrove Blue-Carbon & Apex Predator Dojo',
    subtitle: 'Estuarine Hydrology & American Crocodile Bio-Tracking',
    biome: 'Coastal Mangrove & Estuary',
    location: 'Ten Thousand Islands & Cape Sable Wilderness, Everglades, FL',
    coordinates: '25.3214° N, 80.9324° W',
    startDate: '2026-11-10',
    endDate: '2026-11-17',
    durationDays: 8,
    capacity: 10,
    enrolledCount: 4,
    status: 'open',
    difficulty: 'Intermediate Field Tracker',
    terrainDescription: 'Tidal mangrove channels, mudflats, open shallow bays navigable by wilderness expedition canoes.',
    researchTopic: 'Sub-Surface Peat Carbon Deposition Rates & Coastal Apex Reptile Tracking under Sea Level Rise Scenarios',
    researchLead: {
      name: 'Capt. Javier Morales, M.Sc.',
      title: 'Wetlands Wildlife Biologist & Expedition Mariner',
      institution: 'Gulf Coast Estuary Consortium',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'US Coast Guard licensed master and certified master naturalist with 18 years wilderness expedition guiding.'
    },
    sponsorOrgId: 'sponsor-04',
    sponsorName: 'Apex Oceanic & Wetlands Trust',
    tuitionFee: 1100,
    researchGrantAmount: 92000,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    gearRequirements: [
      'Sea kayak/canoe spray deck and USCG Type III PFD with distress strobe',
      'UPF 50+ sun protection clothing and insect head netting',
      'Handheld sediment Russian corer and salinity refractometer',
      'Marine VHF radio and satellite emergency messenger (InReach)'
    ],
    learningObjectives: [
      'Measure blue carbon soil core layers in submerged mangrove roots',
      'Deploy acoustic telemetry tags for tracking marine organisms',
      'Navigate intricate mangrove labyrinth channels by compass and tide tables',
      'Conduct night eye-shine predator population surveys'
    ],
    medicalPrerequisites: [
      'Proficient swimmer (200-meter unassisted swim test passed)',
      'Valid medical insurance with coastal search & rescue coverage',
      'No severe heat intolerance conditions'
    ],
    elevationGainMeters: 5,
    wildernessPermitNumber: 'NPS-EVER-2026-0932'
  },
  {
    id: 'dojo-05',
    isMock: true,
    title: 'Great Basin Desert Riparian Oasis Forensics Dojo',
    subtitle: 'Endemic Spring Hydro-Geology & Relict Flora Survival',
    biome: 'High Desert Canyon',
    location: 'Ruby Mountains & Secret Pass Wilderness, Elko County, NV',
    coordinates: '40.6289° N, 115.4856° W',
    startDate: '2026-09-28',
    endDate: '2026-10-04',
    durationDays: 7,
    capacity: 12,
    enrolledCount: 11,
    status: 'almost_full',
    difficulty: 'Master Wilderness Specialist',
    terrainDescription: 'Arid desert canyon floor, isolated thermal relict springs, jagged limestone cliffs with zero cellular coverage.',
    researchTopic: 'Isotopic Hydrogen-Oxygen Signatures of Ancient Deep Aquifer Recharge in Desert Spring Snails',
    researchLead: {
      name: 'Dr. Tariq Al-Mansoor',
      title: 'Hydro-geologist and Desert Ecologist',
      institution: 'Desert Research Institute',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Author of 35 peer-reviewed studies on Pleistocene relict ecosystems and arid hydrology.'
    },
    sponsorOrgId: 'sponsor-05',
    sponsorName: 'GreenHorizon Renewable & Ecology Fund',
    tuitionFee: 800,
    researchGrantAmount: 78000,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    gearRequirements: [
      'High-capacity water transport bladder system (min 8L)',
      'Desert sun shelter tarp and reflective thermal bivouac',
      'pH, conductivity, and dissolved oxygen probe field kit',
      'Snake bite gaiters and ultraviolet scorpion survey lamp'
    ],
    learningObjectives: [
      'Sample isotopic baseline of spring water discharging from ancient aquifers',
      'Perform micro-habitat demographic mapping of endangered spring snails',
      'Establish survival water distillation stations in extreme arid conditions',
      'Construct long-range wireless telemetry stations on canyon rims'
    ],
    medicalPrerequisites: [
      'Ability to sustain physical output in high heat conditions (35°C+)',
      'Pre-expedition hydration stress test verification',
      'Current health insurance with overland wilderness ambulance riders'
    ],
    elevationGainMeters: 1750,
    wildernessPermitNumber: 'BLM-NV-2026-3391'
  }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'part-real-01',
    isMock: false,
    dojoId: 'dojo-real-arc-01',
    dojoTitle: 'ARC: AI for River Conservation with Microsoft Sparrow & Seeed Studio XIAO',
    fullName: 'Ananya Sharma, M.Tech',
    email: 'ananya.sharma@iisc.ac.in',
    phone: '+91 98450 22194',
    age: 27,
    genderIdentity: 'Female',
    emergencyContact: {
      name: 'Rohan Sharma',
      relationship: 'Spouse',
      phone: '+91 98450 22195',
      email: 'rohan.sharma@gmail.com'
    },
    dietaryNeeds: 'Vegetarian',
    priorWildernessExperience: '4 years Western Ghats field expeditions with IISc ecological telemetry lab.',
    medicalInsurance: {
      provider: 'Star Health Wilderness & Field Care',
      policyNumber: 'STAR-WG-902144',
      groupNumber: 'GRP-IND-01',
      primaryPhysician: 'Dr. Suresh Rao, MD',
      physicianPhone: '+91 80 2360 0123',
      hasPreExistingConditions: false,
      conditionsDescription: 'None reported. Cleared for remote Western Ghats field trek.',
      allergies: 'None',
      currentMedications: 'None',
      tetanusShotYear: 2025,
      bloodType: 'B+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Ananya Sharma',
    signatureDate: '2026-08-10',
    registrationDate: '2026-08-10',
    status: 'medical_cleared',
    medicalClearanceNotes: 'Full clearance granted for Agumbe riparian fieldwork and Seeed Studio hardware deployment.',
    scholarshipRecipient: true,
    scholarshipSponsorId: 'sponsor-msft-aiforgood',
    scholarshipNotes: 'Full Fellowship covered by Microsoft AI for Good Lab & CoderDojo StPaul2.',
    fieldIdBadge: 'WD-2026-ARC-001'
  },
  {
    id: 'part-real-02',
    isMock: false,
    dojoId: 'dojo-real-gharial-02',
    dojoTitle: 'HITL for Gharial & Turtle ISPA at MCBT',
    fullName: 'Karthik Subramanian',
    email: 'karthik.subramanian@mcbt.org',
    phone: '+91 94441 87652',
    age: 31,
    genderIdentity: 'Male',
    emergencyContact: {
      name: 'Meera Subramanian',
      relationship: 'Sister',
      phone: '+91 94441 87653',
      email: 'meera.subramanian@gmail.com'
    },
    dietaryNeeds: 'Standard / No restrictions',
    priorWildernessExperience: 'Lead field bioacoustician at Madras Crocodile Bank Trust; 6 years reptilian acoustic logging.',
    medicalInsurance: {
      provider: 'National Insurance EcoField Plan',
      policyNumber: 'NIC-MCBT-2026',
      groupNumber: 'GRP-MCBT',
      primaryPhysician: 'Dr. R. Natarajan, MBBS',
      physicianPhone: '+91 44 2491 5521',
      hasPreExistingConditions: false,
      conditionsDescription: 'No pre-existing conditions reported. Standard field clearance.',
      allergies: 'Penicillin',
      currentMedications: 'None',
      tetanusShotYear: 2026,
      bloodType: 'O+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Karthik Subramanian',
    signatureDate: '2026-08-12',
    registrationDate: '2026-08-12',
    status: 'medical_cleared',
    medicalClearanceNotes: 'Certified for brackish estuarine fieldwork and ISPA annotation protocols.',
    scholarshipRecipient: true,
    scholarshipSponsorId: 'sponsor-msft-aiforgood',
    scholarshipNotes: 'MCBT Herpetology Research Fellowship Grant.',
    fieldIdBadge: 'WD-2026-MCBT-002'
  },
  {
    id: 'part-real-03',
    isMock: false,
    dojoId: 'dojo-real-birdnet-03',
    dojoTitle: 'Cornell BirdNET + Sparrow + MegaDetector at Agumbe',
    fullName: 'Maya Sundaram, Ph.D.',
    email: 'maya.sundaram@cornell.edu',
    phone: '+1 (607) 255-9011',
    age: 34,
    genderIdentity: 'Female',
    emergencyContact: {
      name: 'V. Sundaram',
      relationship: 'Father',
      phone: '+1 (607) 255-9012',
      email: 'v.sundaram@gmail.com'
    },
    dietaryNeeds: 'Vegan',
    priorWildernessExperience: 'Postdoctoral fellow at Cornell Lab of Ornithology; 8 years bioacoustic transformer modeling.',
    medicalInsurance: {
      provider: 'Cornell University Worldwide Scholar Travel Health',
      policyNumber: 'COR-SCH-2026-778',
      groupNumber: 'GRP-CORNELL-AI',
      primaryPhysician: 'Dr. Claire Bennett, MD',
      physicianPhone: '+1 (607) 555-8821',
      hasPreExistingConditions: false,
      conditionsDescription: 'None. Cleared for high-canopy climbing and acoustic rigging.',
      allergies: 'None',
      currentMedications: 'None',
      tetanusShotYear: 2024,
      bloodType: 'A+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Maya Sundaram',
    signatureDate: '2026-08-14',
    registrationDate: '2026-08-14',
    status: 'medical_cleared',
    medicalClearanceNotes: 'High-canopy safety clearance and RavaTTT field compute rig verified.',
    scholarshipRecipient: true,
    scholarshipSponsorId: 'sponsor-msft-aiforgood',
    scholarshipNotes: 'Cornell BirdNET Global Research Exchange Travel Grant.',
    fieldIdBadge: 'WD-2026-BIRD-003'
  },
  {
    id: 'part-01',
    isMock: true,
    dojoId: 'dojo-01',
    dojoTitle: 'High Sierra Alpine Bio-Acoustics Dojo',
    fullName: 'Samantha Vance',
    email: 'samantha.vance@ecologymail.org',
    phone: '+1 (415) 882-9910',
    age: 29,
    genderIdentity: 'Female',
    emergencyContact: {
      name: 'David Vance',
      relationship: 'Brother',
      phone: '+1 (415) 882-9914',
      email: 'david.vance@gmail.com'
    },
    dietaryNeeds: 'Vegetarian, nut-free',
    priorWildernessExperience: '5 years backcountry backpacking across Sierra Crest; completed Wilderness First Aid (WFA).',
    medicalInsurance: {
      provider: 'Blue Cross Blue Shield Wilderness Preferred',
      policyNumber: 'BCBS-994821034',
      groupNumber: 'GRP-ALP-881',
      primaryPhysician: 'Dr. Arthur Sterling, MD',
      physicianPhone: '+1 (415) 555-0142',
      hasPreExistingConditions: true,
      conditionsDescription: 'Mild exercise-induced asthma (carries rescue inhaler)',
      allergies: 'Peanuts, Tree nuts (Epipen carried)',
      currentMedications: 'Albuterol inhaler (as needed)',
      tetanusShotYear: 2024,
      bloodType: 'O+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Samantha Vance',
    signatureDate: '2026-07-14',
    registrationDate: '2026-07-14',
    status: 'medical_cleared',
    medicalClearanceNotes: 'Asthma protocol reviewed with Dr. Rostova. Inhaler backup inspected. Medical clearance APPROVED.',
    scholarshipRecipient: true,
    scholarshipSponsorId: 'sponsor-01',
    scholarshipNotes: 'Awarded EarthPulse BioAcoustics Emerging Field Scholar Grant ($850 tuition waiver).',
    fieldIdBadge: 'WD-2026-ALP-001'
  },
  {
    id: 'part-02',
    isMock: true,
    dojoId: 'dojo-01',
    dojoTitle: 'High Sierra Alpine Bio-Acoustics Dojo',
    fullName: 'Liam Chen, B.S.',
    email: 'lchen.bio@stanford.edu',
    phone: '+1 (650) 492-3319',
    age: 26,
    genderIdentity: 'Male',
    emergencyContact: {
      name: 'Mei-Ling Chen',
      relationship: 'Mother',
      phone: '+1 (650) 492-3300',
      email: 'm.chen@stanfordalumni.org'
    },
    dietaryNeeds: 'No restrictions',
    priorWildernessExperience: 'Sierra Club High Trip volunteer; proficient with GPS and topographical map orienteering.',
    medicalInsurance: {
      provider: 'Kaiser Permanente High Deductible w/ Global Rescue',
      policyNumber: 'KP-8829104',
      groupNumber: 'STN-GRAD-402',
      primaryPhysician: 'Dr. Robert Zhao, MD',
      physicianPhone: '+1 (650) 555-8930',
      hasPreExistingConditions: false,
      conditionsDescription: 'None',
      allergies: 'No known drug or environmental allergies',
      currentMedications: 'None',
      tetanusShotYear: 2025,
      bloodType: 'A+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Liam Chen',
    signatureDate: '2026-07-18',
    registrationDate: '2026-07-18',
    status: 'confirmed',
    medicalClearanceNotes: 'Full medical dossier approved. High altitude clearance verified.',
    scholarshipRecipient: false,
    fieldIdBadge: 'WD-2026-ALP-002'
  },
  {
    id: 'part-03',
    isMock: true,
    dojoId: 'dojo-02',
    dojoTitle: 'Olympic Ancient Canopy Dendrochronology Dojo',
    fullName: 'Kendra Washington',
    email: 'kwashington@forestrypnw.org',
    phone: '+1 (206) 714-9921',
    age: 34,
    genderIdentity: 'Female',
    emergencyContact: {
      name: 'Marcus Washington',
      relationship: 'Spouse',
      phone: '+1 (206) 714-9900',
      email: 'm.washington@seattlelaw.com'
    },
    dietaryNeeds: 'Gluten-free celiac',
    priorWildernessExperience: 'Certified ISA Arborist; 8 years tree canopy climbing experience; Wilderness First Responder (WFR).',
    medicalInsurance: {
      provider: 'Premera Blue Cross Comprehensive Care',
      policyNumber: 'PBC-77218390',
      groupNumber: 'PNW-FOR-209',
      primaryPhysician: 'Dr. Claire Bennett, MD',
      physicianPhone: '+1 (206) 555-3211',
      hasPreExistingConditions: false,
      conditionsDescription: 'None',
      allergies: 'Gluten (severe celiac)',
      currentMedications: 'None',
      tetanusShotYear: 2023,
      bloodType: 'B+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Kendra Washington',
    signatureDate: '2026-08-01',
    registrationDate: '2026-08-01',
    status: 'medical_cleared',
    medicalClearanceNotes: 'Celiac dietary provisions packed in airtight backcountry containers. Climbing safety certification logged.',
    scholarshipRecipient: true,
    scholarshipSponsorId: 'sponsor-02',
    scholarshipNotes: 'Canopy Canopy Earth Initiative Forestry Diversity Fellowship.',
    fieldIdBadge: 'WD-2026-CAN-001'
  },
  {
    id: 'part-04',
    isMock: true,
    dojoId: 'dojo-04',
    dojoTitle: 'Everglades Mangrove Blue-Carbon & Apex Predator Dojo',
    fullName: 'Diego Ramirez',
    email: 'd.ramirez@miamimarine.edu',
    phone: '+1 (305) 991-8273',
    age: 31,
    genderIdentity: 'Male',
    emergencyContact: {
      name: 'Valeria Ramirez',
      relationship: 'Sister',
      phone: '+1 (305) 991-8270',
      email: 'vramirez@gmail.com'
    },
    dietaryNeeds: 'Pescatarian',
    priorWildernessExperience: 'Coastal sea kayaking guide in Florida Keys; 100+ open-water navigation days.',
    medicalInsurance: {
      provider: 'Aetna Open Choice PPO with MedJet Evac',
      policyNumber: 'AET-66391024',
      groupNumber: 'MIA-MAR-77',
      primaryPhysician: 'Dr. Carlos Mendoza, MD',
      physicianPhone: '+1 (305) 555-4491',
      hasPreExistingConditions: false,
      conditionsDescription: 'None',
      allergies: 'Penicillin',
      currentMedications: 'None',
      tetanusShotYear: 2024,
      bloodType: 'AB+',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Diego Ramirez',
    signatureDate: '2026-08-05',
    registrationDate: '2026-08-05',
    status: 'pending_review',
    medicalClearanceNotes: 'Pending verification of swim test and penicillin allergy tag for emergency medic kit.',
    scholarshipRecipient: false,
    fieldIdBadge: 'WD-2026-EVE-001'
  },
  {
    id: 'part-05',
    isMock: true,
    dojoId: 'dojo-05',
    dojoTitle: 'Great Basin Desert Riparian Oasis Forensics Dojo',
    fullName: 'Dr. Julian Thorne-Smith',
    email: 'j.thorne@geoconsult.io',
    phone: '+1 (775) 441-2098',
    age: 42,
    genderIdentity: 'Non-binary',
    emergencyContact: {
      name: 'Alex Thorne',
      relationship: 'Partner',
      phone: '+1 (775) 441-2000',
      email: 'alex.thorne@unr.edu'
    },
    dietaryNeeds: 'Vegan',
    priorWildernessExperience: 'Desert geological surveyor in Death Valley and Mojave for 12 years. HAM radio license operator.',
    medicalInsurance: {
      provider: 'UnitedHealthcare Choice Plus w/ Search & Rescue Rider',
      policyNumber: 'UHC-440192837',
      groupNumber: 'GEO-NEV-104',
      primaryPhysician: 'Dr. Gregory House, MD',
      physicianPhone: '+1 (775) 555-7721',
      hasPreExistingConditions: true,
      conditionsDescription: 'Hypertension (managed with daily medication)',
      allergies: 'Bee stings (Grade 2 local reaction, carries antihistamine)',
      currentMedications: 'Lisinopril 10mg daily',
      tetanusShotYear: 2022,
      bloodType: 'O-',
      evacuationInsuranceAccepted: true
    },
    waiverAccepted: true,
    digitalSignature: 'Julian Thorne-Smith',
    signatureDate: '2026-07-29',
    registrationDate: '2026-07-29',
    status: 'medical_cleared',
    medicalClearanceNotes: 'Lisinopril supply for 14 days verified in waterproof kit. Heat tolerance protocol confirmed.',
    scholarshipRecipient: false,
    fieldIdBadge: 'WD-2026-DES-001'
  }
];

export const INITIAL_SPONSORS: SponsorOrg[] = [
  {
    id: 'sponsor-msft-aiforgood',
    isMock: false,
    name: 'Microsoft AI for Good Lab & Microsoft Azure',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    category: 'Eco-Tech Philanthropy',
    tier: 'Visionary Patron',
    contactPerson: {
      name: 'AI for Earth & Good Lab Research Directors',
      title: 'Global Director of AI for Earth & Ecological Innovation',
      email: 'ai4earth@coderdojostpaul2.org',
      phone: '+1 (425) 882-8080'
    },
    totalCommitted: 355000,
    totalPaid: 355000,
    sponsoredDojoIds: ['dojo-real-arc-01', 'dojo-real-gharial-02', 'dojo-real-birdnet-03'],
    researchProjects: [
      {
        id: 'proj-real-01',
        isMock: false,
        title: 'ARC: AI for River Conservation Driftwood Observers (Microsoft Sparrow + XIAO)',
        dojoId: 'dojo-real-arc-01',
        dojoTitle: 'ARC: AI for River Conservation with Microsoft Sparrow & Seeed Studio XIAO',
        grantAmount: 120000,
        objective: 'Build and deploy solar-powered driftwood observer nodes equipped with Seeed Studio XIAO Mesh, hydrophone arrays, and MegaDetector camera traps in Agumbe riverways.',
        milestoneStatus: 'Field Sampling Active',
        deliverables: [
          '30 Driftwood-based low-cost bioacoustic & vision observer units',
          'Microsoft Sparrow Studio data annotation and model training pipeline',
          'Acoustic spectrum dataset for Western Ghats riverine biodiversity',
          'Open-source firmware and hardware build specifications on GitHub'
        ],
        speciesCataloged: 112,
        hectaresSurveyed: 18500,
        sensorNodesDeployed: 28,
        publishedReportUrl: 'https://bit.ly/arc-ai-river-conservation',
        lastTelemetryDate: '2026-08-16'
      },
      {
        id: 'proj-real-02',
        isMock: false,
        title: 'HITL for Gharial & Turtle ISPA Telemetry at MCBT',
        dojoId: 'dojo-real-gharial-02',
        dojoTitle: 'HITL for Gharial & Turtle ISPA at MCBT',
        grantAmount: 95000,
        objective: 'Establish Human-in-the-loop (HITL) bioacoustic workflows and InterSpecies Phonetic Alphabet (ISPA) acoustic phonetics for critically endangered Gharials and freshwater turtles.',
        milestoneStatus: 'DNA/Acoustic Analysis',
        deliverables: [
          'ISPA phonetic token dictionary for crocodilian acoustic signaling',
          'Sparrow Studio human-in-the-loop active learning classifier',
          'Submersible estuarine hydrophone sensor mesh validation'
        ],
        speciesCataloged: 46,
        hectaresSurveyed: 8400,
        sensorNodesDeployed: 18,
        publishedReportUrl: 'https://mcbt.org/research/ispa-gharial-2026',
        lastTelemetryDate: '2026-08-15'
      },
      {
        id: 'proj-real-03',
        isMock: false,
        title: 'Agumbe Multi-Modal BirdNET + MegaDetector + RavaTTT LLM Canopy Sentinel',
        dojoId: 'dojo-real-birdnet-03',
        dojoTitle: 'Cornell BirdNET + Sparrow + MegaDetector at Agumbe',
        grantAmount: 140000,
        objective: 'Integrate Cornell BirdNET acoustic neural networks, MegaDetector vision models, and RavaTTT bioacoustic transformer models for full-canopy real-time biodiversity detection.',
        milestoneStatus: 'Field Sampling Active',
        deliverables: [
          'Multi-modal acoustic-visual species detection pipeline on PyTorch Wildlife',
          'RavaTTT bioacoustic language model fine-tuned on Agumbe rainforest fauna',
          'Real-time edge inference telemetry streaming to Microsoft Azure'
        ],
        speciesCataloged: 178,
        hectaresSurveyed: 26000,
        sensorNodesDeployed: 34,
        publishedReportUrl: 'https://agumberainforest.org/bioacoustics-birdnet-2026',
        lastTelemetryDate: '2026-08-16'
      }
    ],
    status: 'Active Partner',
    website: 'https://bit.ly/arc-ai-river-conservation',
    sponsorshipDate: '2026-01-10',
    notes: 'Official Workshop Series Sponsor for AI for Good • AI for Earth in partnership with CoderDojo StPaul2 and Wilderness Dojo.',
    taxExemptId: 'MSFT-AIEARTH-2026'
  },
  {
    id: 'sponsor-01',
    isMock: true,
    name: 'EarthPulse BioAcoustics Foundation',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&auto=format&fit=crop&q=80',
    category: 'Eco-Tech Philanthropy',
    tier: 'Lead Research Benefactor',
    contactPerson: {
      name: 'Victoria Stirling',
      title: 'VP of Ecological Philanthropy & Sensor Systems',
      email: 'v.stirling@earthpulsefund.org',
      phone: '+1 (415) 902-7711'
    },
    totalCommitted: 145000,
    totalPaid: 110000,
    sponsoredDojoIds: ['dojo-01'],
    researchProjects: [
      {
        id: 'proj-01',
        isMock: true,
        title: 'High Sierra Sub-Alpine Bioacoustic Sentinel Grid',
        dojoId: 'dojo-01',
        dojoTitle: 'High Sierra Alpine Bio-Acoustics Dojo',
        grantAmount: 65000,
        objective: 'Deploy 40 autonomous solar audio recorders to monitor threatened American Pika vocalizations in climate refugia.',
        milestoneStatus: 'Field Sampling Active',
        deliverables: [
          '40 ultrasonic audio sensor node installations',
          'Continuous 90-day acoustic spectrum repository',
          'AI-trained species vocalization classification model',
          'Published open research dataset for USFS biologists'
        ],
        speciesCataloged: 84,
        hectaresSurveyed: 14200,
        sensorNodesDeployed: 38,
        publishedReportUrl: 'https://earthpulsefund.org/reports/sierra-pika-2026',
        lastTelemetryDate: '2026-08-14'
      },
      {
        id: 'proj-02',
        isMock: true,
        title: 'Sierra Alpine Avian Migration Chronology',
        dojoId: 'dojo-01',
        dojoTitle: 'High Sierra Alpine Bio-Acoustics Dojo',
        grantAmount: 80000,
        objective: 'Longitudinal bioacoustic frequency shift tracking across glacial cirques.',
        milestoneStatus: 'DNA/Acoustic Analysis',
        deliverables: [
          'Spectral frequency shift analysis whitepaper',
          'Peer-reviewed field paper submitted to Journal of Field Ecology'
        ],
        speciesCataloged: 128,
        hectaresSurveyed: 22000,
        sensorNodesDeployed: 45,
        publishedReportUrl: 'https://earthpulsefund.org/reports/sierra-avian-2026',
        lastTelemetryDate: '2026-08-10'
      }
    ],
    status: 'Active Partner',
    website: 'https://earthpulsefund.org',
    sponsorshipDate: '2025-11-15',
    notes: 'Primary funder of high-altitude acoustic hardware. Committed to multi-year research grants.',
    taxExemptId: 'EIN-94-3382910'
  },
  {
    id: 'sponsor-02',
    isMock: true,
    name: 'Canopy Earth Initiative',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80',
    category: 'Conservation Trust',
    tier: 'Visionary Patron',
    contactPerson: {
      name: 'Dr. Henrik Lindqvist',
      title: 'Director of Forest Science Partnerships',
      email: 'h.lindqvist@canopyearth.org',
      phone: '+1 (206) 881-4022'
    },
    totalCommitted: 220000,
    totalPaid: 175000,
    sponsoredDojoIds: ['dojo-02'],
    researchProjects: [
      {
        id: 'proj-03',
        isMock: true,
        title: 'Olympic Rainforest 800-Year Canopy Dendroclimatology',
        dojoId: 'dojo-02',
        dojoTitle: 'Olympic Ancient Canopy Dendrochronology Dojo',
        grantAmount: 85000,
        objective: 'Extract 120 Sitka spruce tree ring cores to reconstruct historic mega-drought cycles in the Pacific Northwest.',
        milestoneStatus: 'Field Sampling Active',
        deliverables: [
          '120 increment core extractions with microscopic scan imaging',
          'Canopy micro-climate sensor array across 6 vertical tiers',
          'Open dendroclimatology dataset on NOAA World Paleoclimatology'
        ],
        speciesCataloged: 142,
        hectaresSurveyed: 18500,
        sensorNodesDeployed: 24,
        lastTelemetryDate: '2026-08-15'
      }
    ],
    status: 'Active Partner',
    website: 'https://canopyearth.org',
    sponsorshipDate: '2025-09-20',
    notes: 'Provides funding for canopy climbing harnesses, coring drills, and participant scholarships.',
    taxExemptId: 'EIN-91-8849201'
  },
  {
    id: 'sponsor-03',
    isMock: true,
    name: 'TerraNova BioVenture Fund',
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    category: 'Corporate Sustainability Fund',
    tier: 'Lead Research Benefactor',
    contactPerson: {
      name: 'Cassandra Moore',
      title: 'Head of Natural Capital Investment',
      email: 'cmoore@terranovaventures.com',
      phone: '+1 (415) 300-8840'
    },
    totalCommitted: 180000,
    totalPaid: 180000,
    sponsoredDojoIds: ['dojo-03'],
    researchProjects: [
      {
        id: 'proj-04',
        isMock: true,
        title: 'Cascade Underground Mycelial Carbon Highway Metagenomics',
        dojoId: 'dojo-03',
        dojoTitle: 'Cascades Sub-Surface Mycelial Network Mapping Dojo',
        grantAmount: 110000,
        objective: 'Deploy field-portable Oxford Nanopore sequencers to decipher mycorrhizal network resilience against wildfire stress.',
        milestoneStatus: 'DNA/Acoustic Analysis',
        deliverables: [
          'Metagenomic sequencing of 400 rhizosphere soil samples',
          '3D digital mapping of fungal mycelial interconnected zones',
          'Sponsor Carbon Sequestration ROI Assessment Report'
        ],
        speciesCataloged: 310,
        hectaresSurveyed: 31000,
        sensorNodesDeployed: 50,
        lastTelemetryDate: '2026-08-12'
      }
    ],
    status: 'Active Partner',
    website: 'https://terranovaventures.com/impact',
    sponsorshipDate: '2026-01-10',
    notes: 'Fully funded the 2026 Cascades Mycelial Dojo and mobile laboratory trailer.',
    taxExemptId: 'EIN-47-2918402'
  },
  {
    id: 'sponsor-04',
    isMock: true,
    name: 'Apex Oceanic & Wetlands Trust',
    logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&auto=format&fit=crop&q=80',
    category: 'Conservation Trust',
    tier: 'Biome Protector',
    contactPerson: {
      name: 'Capt. Wallace Sterling',
      title: 'Trustee of Marine & Estuarine Grants',
      email: 'w.sterling@apexwetlands.org',
      phone: '+1 (305) 772-9104'
    },
    totalCommitted: 92000,
    totalPaid: 65000,
    sponsoredDojoIds: ['dojo-04'],
    researchProjects: [
      {
        id: 'proj-05',
        isMock: true,
        title: 'Everglades Ten Thousand Islands Blue-Carbon Peat Accretion',
        dojoId: 'dojo-04',
        dojoTitle: 'Everglades Mangrove Blue-Carbon & Apex Predator Dojo',
        grantAmount: 92000,
        objective: 'Analyze tidal mangrove carbon sequestration rates and acoustic tracking of coastal crocodile nursery zones.',
        milestoneStatus: 'Equipment Deployed',
        deliverables: [
          'Deep peat core isotope dating profile',
          '15 acoustic telemetry listening stations in tidal creeks',
          'Restoration roadmap for Florida Fish and Wildlife Commission'
        ],
        speciesCataloged: 96,
        hectaresSurveyed: 12800,
        sensorNodesDeployed: 15,
        lastTelemetryDate: '2026-08-08'
      }
    ],
    status: 'Active Partner',
    website: 'https://apexwetlands.org',
    sponsorshipDate: '2026-03-01',
    notes: 'Interested in expanding research grants into Caribbean mangrove systems in 2027.',
    taxExemptId: 'EIN-59-9928174'
  },
  {
    id: 'sponsor-05',
    isMock: true,
    name: 'GreenHorizon Renewable & Ecology Fund',
    logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=150&auto=format&fit=crop&q=80',
    category: 'Outdoor Heritage Brand',
    tier: 'Biome Protector',
    contactPerson: {
      name: 'Clara Oswald-Bates',
      title: 'Director of Desert Stewardship Grants',
      email: 'clara@greenhorizonfund.com',
      phone: '+1 (702) 448-9100'
    },
    totalCommitted: 78000,
    totalPaid: 78000,
    sponsoredDojoIds: ['dojo-05'],
    researchProjects: [
      {
        id: 'proj-06',
        isMock: true,
        title: 'Great Basin Relict Spring Aquifer Forensics',
        dojoId: 'dojo-05',
        dojoTitle: 'Great Basin Desert Riparian Oasis Forensics Dojo',
        grantAmount: 78000,
        objective: 'Establish baseline geochemical telemetry across 18 isolated desert springs facing groundwater extraction threats.',
        milestoneStatus: 'Proposal Approved',
        deliverables: [
          'Hydrologic telemetry network across Ruby Mountains basin',
          'Genetic inventory of endemic Pyrgulopsis spring snail species',
          'Comprehensive legal water rights evidence dossier'
        ],
        speciesCataloged: 45,
        hectaresSurveyed: 9500,
        sensorNodesDeployed: 18,
        lastTelemetryDate: '2026-08-01'
      }
    ],
    status: 'Active Partner',
    website: 'https://greenhorizonfund.com',
    sponsorshipDate: '2026-04-12',
    notes: 'Sponsored gear grants for satellite telemetry nodes and water purification bladders.',
    taxExemptId: 'EIN-88-2910385'
  }
];
