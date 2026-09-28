import React, { createContext, useContext, useState, useEffect } from 'react';
import { WildernessDojo, Participant, SponsorOrg, EcologicalResearchProject, ActiveTab, ParticipantStatus } from '../types';
import { INITIAL_DOJOS, INITIAL_PARTICIPANTS, INITIAL_SPONSORS } from '../data/seedData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface DojoContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  dojos: WildernessDojo[];
  participants: Participant[];
  sponsors: SponsorOrg[];
  
  // Dojo Actions
  addDojo: (dojo: Omit<WildernessDojo, 'id' | 'enrolledCount'>) => WildernessDojo;
  updateDojo: (id: string, updates: Partial<WildernessDojo>) => void;
  deleteDojo: (id: string) => void;
  getDojoById: (id: string) => WildernessDojo | undefined;
  
  // Participant Actions
  registerParticipant: (participantData: Omit<Participant, 'id' | 'registrationDate' | 'status' | 'medicalClearanceNotes' | 'fieldIdBadge'>) => Participant;
  updateParticipantStatus: (id: string, status: ParticipantStatus, notes?: string) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
  deleteParticipant: (id: string) => void;
  getParticipantById: (id: string) => Participant | undefined;
  getParticipantsByDojo: (dojoId: string) => Participant[];
  
  // Sponsor Actions
  addSponsor: (sponsor: Omit<SponsorOrg, 'id' | 'researchProjects'>) => SponsorOrg;
  updateSponsor: (id: string, updates: Partial<SponsorOrg>) => void;
  deleteSponsor: (id: string) => void;
  addResearchGrant: (sponsorId: string, project: Omit<EcologicalResearchProject, 'id'>) => void;
  updateResearchProject: (sponsorId: string, projectId: string, updates: Partial<EcologicalResearchProject>) => void;
  getSponsorById: (id: string) => SponsorOrg | undefined;
  
  // UI Helpers & Modals
  selectedDojoForEnrollment: WildernessDojo | null;
  openEnrollmentModal: (dojo: WildernessDojo) => void;
  closeEnrollmentModal: () => void;
  
  // Reset demo data
  resetToDefaults: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const DojoContext = createContext<DojoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DOJOS: 'wilderness_dojo_events_v2',
  PARTICIPANTS: 'wilderness_dojo_participants_v2',
  SPONSORS: 'wilderness_dojo_sponsors_v2',
};

export const DojoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('public_portal');
  
  const [dojos, setDojos] = useState<WildernessDojo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOJOS);
      return saved ? JSON.parse(saved) : INITIAL_DOJOS;
    } catch {
      return INITIAL_DOJOS;
    }
  });

  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARTICIPANTS);
      return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  });

  const [sponsors, setSponsors] = useState<SponsorOrg[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SPONSORS);
      return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
    } catch {
      return INITIAL_SPONSORS;
    }
  });

  const [selectedDojoForEnrollment, setSelectedDojoForEnrollment] = useState<WildernessDojo | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOJOS, JSON.stringify(dojos));
    } catch (e) {
      console.error('Failed saving dojos to localStorage', e);
    }
  }, [dojos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
    } catch (e) {
      console.error('Failed saving participants to localStorage', e);
    }
  }, [participants]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(sponsors));
    } catch (e) {
      console.error('Failed saving sponsors to localStorage', e);
    }
  }, [sponsors]);

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openEnrollmentModal = (dojo: WildernessDojo) => {
    setSelectedDojoForEnrollment(dojo);
  };

  const closeEnrollmentModal = () => {
    setSelectedDojoForEnrollment(null);
  };

  // Dojo Methods
  const addDojo = (dojoData: Omit<WildernessDojo, 'id' | 'enrolledCount'>): WildernessDojo => {
    const newId = `dojo-${Date.now().toString(36)}`;
    const newDojo: WildernessDojo = {
      ...dojoData,
      id: newId,
      enrolledCount: 0,
    };
    setDojos((prev) => [newDojo, ...prev]);
    showToast('success', 'Wilderness Dojo Created', `"${newDojo.title}" is now active in the catalog.`);
    return newDojo;
  };

  const updateDojo = (id: string, updates: Partial<WildernessDojo>) => {
    setDojos((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    showToast('info', 'Dojo Updated', 'Wilderness dojo specifications updated.');
  };

  const deleteDojo = (id: string) => {
    const target = dojos.find((d) => d.id === id);
    setDojos((prev) => prev.filter((d) => d.id !== id));
    showToast('warning', 'Dojo Removed', `"${target?.title || 'Dojo'}" removed from schedule.`);
  };

  const getDojoById = (id: string) => dojos.find((d) => d.id === id);

  // Participant Methods
  const registerParticipant = (
    participantData: Omit<Participant, 'id' | 'registrationDate' | 'status' | 'medicalClearanceNotes' | 'fieldIdBadge'>
  ): Participant => {
    const badgePrefix = participantData.dojoTitle.substring(0, 3).toUpperCase();
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newId = `part-${Date.now().toString(36)}`;
    const fieldIdBadge = `WD-2026-${badgePrefix}-${randomCode}`;

    const newParticipant: Participant = {
      ...participantData,
      id: newId,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending_review',
      medicalClearanceNotes: 'Enrollment received with medical insurance. Awaiting expedition medic safety review.',
      fieldIdBadge,
    };

    setParticipants((prev) => [newParticipant, ...prev]);

    // Update Dojo enrolled count & auto-update status
    setDojos((prev) =>
      prev.map((d) => {
        if (d.id === participantData.dojoId) {
          const newCount = d.enrolledCount + 1;
          let newStatus = d.status;
          if (newCount >= d.capacity) {
            newStatus = 'sold_out';
          } else if (newCount >= d.capacity - 2) {
            newStatus = 'almost_full';
          }
          return {
            ...d,
            enrolledCount: newCount,
            status: newStatus,
          };
        }
        return d;
      })
    );

    showToast(
      'success',
      'Enrollment Confirmed!',
      `Welcome ${newParticipant.fullName}! Field badge #${fieldIdBadge} issued.`
    );

    return newParticipant;
  };

  const updateParticipantStatus = (id: string, status: ParticipantStatus, notes?: string) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status,
            ...(notes ? { medicalClearanceNotes: notes } : {}),
          };
        }
        return p;
      })
    );
    showToast('info', 'Participant Status Updated', `Status changed to ${status.replace('_', ' ').toUpperCase()}.`);
  };

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('info', 'Participant Dossier Updated', 'Record successfully modified.');
  };

  const deleteParticipant = (id: string) => {
    const target = participants.find((p) => p.id === id);
    if (target) {
      // Decrement dojo count
      setDojos((prev) =>
        prev.map((d) => {
          if (d.id === target.dojoId) {
            const newCount = Math.max(0, d.enrolledCount - 1);
            let newStatus = d.status;
            if (newCount < d.capacity && d.status === 'sold_out') {
              newStatus = newCount >= d.capacity - 2 ? 'almost_full' : 'open';
            }
            return {
              ...d,
              enrolledCount: newCount,
              status: newStatus,
            };
          }
          return d;
        })
      );
    }
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    showToast('warning', 'Participant Removed', `${target?.fullName || 'Record'} has been removed.`);
  };

  const getParticipantById = (id: string) => participants.find((p) => p.id === id);

  const getParticipantsByDojo = (dojoId: string) =>
    participants.filter((p) => p.dojoId === dojoId);

  // Sponsor Methods
  const addSponsor = (sponsorData: Omit<SponsorOrg, 'id' | 'researchProjects'>): SponsorOrg => {
    const newId = `sponsor-${Date.now().toString(36)}`;
    const newSponsor: SponsorOrg = {
      ...sponsorData,
      id: newId,
      researchProjects: [],
    };
    setSponsors((prev) => [newSponsor, ...prev]);
    showToast('success', 'Sponsor Partner Added', `${newSponsor.name} added to Ecological Research CRM.`);
    return newSponsor;
  };

  const updateSponsor = (id: string, updates: Partial<SponsorOrg>) => {
    setSponsors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast('info', 'Sponsor Record Updated', 'Organization details updated.');
  };

  const deleteSponsor = (id: string) => {
    const target = sponsors.find((s) => s.id === id);
    setSponsors((prev) => prev.filter((s) => s.id !== id));
    showToast('warning', 'Sponsor Removed', `${target?.name || 'Sponsor'} removed.`);
  };

  const addResearchGrant = (sponsorId: string, projectData: Omit<EcologicalResearchProject, 'id'>) => {
    const newProjectId = `proj-${Date.now().toString(36)}`;
    const newProject: EcologicalResearchProject = {
      ...projectData,
      id: newProjectId,
    };

    setSponsors((prev) =>
      prev.map((s) => {
        if (s.id === sponsorId) {
          const updatedProjects = [newProject, ...s.researchProjects];
          const newTotalCommitted = s.totalCommitted + projectData.grantAmount;
          const updatedDojoIds = Array.from(new Set([...s.sponsoredDojoIds, projectData.dojoId]));
          return {
            ...s,
            researchProjects: updatedProjects,
            totalCommitted: newTotalCommitted,
            sponsoredDojoIds: updatedDojoIds,
          };
        }
        return s;
      })
    );

    // Update Dojo research grant amount
    setDojos((prev) =>
      prev.map((d) => {
        if (d.id === projectData.dojoId) {
          return {
            ...d,
            researchGrantAmount: (d.researchGrantAmount || 0) + projectData.grantAmount,
          };
        }
        return d;
      })
    );

    showToast('success', 'Ecological Grant Logged', `$${projectData.grantAmount.toLocaleString()} allocated to ${projectData.title}.`);
  };

  const updateResearchProject = (sponsorId: string, projectId: string, updates: Partial<EcologicalResearchProject>) => {
    setSponsors((prev) =>
      prev.map((s) => {
        if (s.id === sponsorId) {
          const updatedProjects = s.researchProjects.map((p) =>
            p.id === projectId ? { ...p, ...updates } : p
          );
          return {
            ...s,
            researchProjects: updatedProjects,
          };
        }
        return s;
      })
    );
    showToast('info', 'Research Milestone Updated', 'Field project metrics updated.');
  };

  const getSponsorById = (id: string) => sponsors.find((s) => s.id === id);

  const resetToDefaults = () => {
    setDojos(INITIAL_DOJOS);
    setParticipants(INITIAL_PARTICIPANTS);
    setSponsors(INITIAL_SPONSORS);
    localStorage.removeItem(STORAGE_KEYS.DOJOS);
    localStorage.removeItem(STORAGE_KEYS.PARTICIPANTS);
    localStorage.removeItem(STORAGE_KEYS.SPONSORS);
    showToast('info', 'System Reset', 'Restored default Wilderness Dojos, participants, and sponsor grants.');
  };

  return (
    <DojoContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dojos,
        participants,
        sponsors,
        addDojo,
        updateDojo,
        deleteDojo,
        getDojoById,
        registerParticipant,
        updateParticipantStatus,
        updateParticipant,
        deleteParticipant,
        getParticipantById,
        getParticipantsByDojo,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        addResearchGrant,
        updateResearchProject,
        getSponsorById,
        selectedDojoForEnrollment,
        openEnrollmentModal,
        closeEnrollmentModal,
        resetToDefaults,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};

export const useDojo = () => {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error('useDojo must be used within a DojoProvider');
  }
  return context;
};
