import React from 'react';
import { DojoProvider, useDojo } from './context/DojoContext';
import { Header } from './components/Header';
import { Toast } from './components/common/Toast';
import { PublicPortal } from './components/public/PublicPortal';
import { DojoManager } from './components/dojos/DojoManager';
import { ParticipantCRM } from './components/participants/ParticipantCRM';
import { SponsorCRM } from './components/sponsors/SponsorCRM';
import { ImpactAnalytics } from './components/analytics/ImpactAnalytics';
import { EnrollmentModal } from './components/public/EnrollmentModal';
import { EnrollmentConfirmation } from './components/public/EnrollmentConfirmation';
import { DojoDetailDrawer } from './components/dojos/DojoDetailDrawer';
import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    selectedDojoForEnrollment,
    closeEnrollmentModal,
    registeredParticipant,
    clearRegisteredParticipant,
    selectedDojoForDrawer,
    setSelectedDojoForDrawer,
    openEnrollmentModal,
  } = useDojo();

  return (
    <div className="min-h-screen bg-[#0d120f] flex flex-col text-[#e0e7e1] antialiased selection:bg-emerald-900 selection:text-emerald-200 font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'public_portal' && (
            <motion.div
              key="public_portal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <PublicPortal />
            </motion.div>
          )}

          {activeTab === 'dojo_manager' && (
            <motion.div
              key="dojo_manager"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DojoManager />
            </motion.div>
          )}

          {activeTab === 'participants_crm' && (
            <motion.div
              key="participants_crm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ParticipantCRM />
            </motion.div>
          )}

          {activeTab === 'sponsors_crm' && (
            <motion.div
              key="sponsors_crm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SponsorCRM />
            </motion.div>
          )}

          {activeTab === 'impact_analytics' && (
            <motion.div
              key="impact_analytics"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ImpactAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#090d0a] text-[#8c9e92] text-xs py-8 border-t border-[#232f27] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-[#e0e7e1]">Wilderness Dojo</span>
            <span>• Ecological Field Research & Leadership CRM</span>
          </div>
          <p className="text-[#728478] text-[11px]">
            Integrated Field Medic Intake, Verified Health Insurance Protocols, and Sponsoring Benefactor Telemetry.
          </p>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      {selectedDojoForEnrollment && (
        <EnrollmentModal
          dojo={selectedDojoForEnrollment}
          onClose={closeEnrollmentModal}
        />
      )}

      {registeredParticipant && (
        <EnrollmentConfirmation
          participant={registeredParticipant}
          onClose={clearRegisteredParticipant}
        />
      )}

      {selectedDojoForDrawer && (
        <DojoDetailDrawer
          dojo={selectedDojoForDrawer}
          onClose={() => setSelectedDojoForDrawer(null)}
          onEnroll={(d) => {
            setSelectedDojoForDrawer(null);
            openEnrollmentModal(d);
          }}
        />
      )}

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <DojoProvider>
      <MainContent />
    </DojoProvider>
  );
}
