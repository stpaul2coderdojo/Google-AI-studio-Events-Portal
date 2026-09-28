import React, { useState } from 'react';
import {
  Cpu,
  Sun,
  Radio,
  Camera,
  Activity,
  Layers,
  BatteryCharging,
  Wifi,
  Thermometer,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface ComponentPin {
  id: string;
  name: string;
  category: 'Compute' | 'Power' | 'Sensor' | 'Telemetry';
  icon: React.FC<{ className?: string }>;
  spec: string;
  status: 'optimal' | 'nominal' | 'standby';
  description: string;
  x: number; // percentage on schematic
  y: number; // percentage on schematic
  color: string;
}

const HARDWARE_COMPONENTS: ComponentPin[] = [
  {
    id: 'seeed_xiao',
    name: 'Seeed Studio XIAO ESP32-S3',
    category: 'Compute',
    icon: Cpu,
    spec: 'Dual-core 240MHz, 8MB PSRAM, Onboard Camera & Mesh Ant.',
    status: 'optimal',
    description:
      'Low-power MCU executing edge neural inference for real-time acoustic signal FFT and Sparrow Studio model triggers.',
    x: 48,
    y: 45,
    color: '#10b981'
  },
  {
    id: 'solar_pv',
    name: 'Monocrystalline Solar PV Panel & MPPT',
    category: 'Power',
    icon: Sun,
    spec: '6V 5W Weatherproof Panel with TP4056 MPPT LiPo Regulator',
    status: 'optimal',
    description:
      'Harvests ambient solar energy through dense riparian tree canopies to sustain autonomous multi-month driftwood river deployments.',
    x: 25,
    y: 20,
    color: '#f59e0b'
  },
  {
    id: 'hydrophone_sensor',
    name: 'Submersible Piezo Hydrophone Array',
    category: 'Sensor',
    icon: Activity,
    spec: '10Hz – 80kHz Submerged Transducer with Preamplifier',
    status: 'optimal',
    description:
      'Continuous underwater acoustic monitoring for Gharials, mugger crocodiles, and freshwater micro-macroinvertebrates.',
    x: 75,
    y: 75,
    color: '#06b6d4'
  },
  {
    id: 'mesh_lora',
    name: 'Meshmatics 4G LTE & LoRa Bridge',
    category: 'Telemetry',
    icon: Radio,
    spec: 'SX1262 868/915MHz LoRa + SIM7080G Cat-M/NB-IoT',
    status: 'nominal',
    description:
      'Transmits bioacoustic ISPA tokens and environmental telemetry over 15km line-of-sight back to the Agumbe Field Station.',
    x: 78,
    y: 28,
    color: '#8b5cf6'
  },
  {
    id: 'megadetector_camera',
    name: 'PyTorch Wildlife MegaDetector Trap',
    category: 'Sensor',
    icon: Camera,
    spec: '5MP Night Vision PIR-Triggered Lens (PyTorch Wildlife AI)',
    status: 'optimal',
    description:
      'Automated bounding-box detection for mammals, birds, and herpetofauna along muddy riverbanks.',
    x: 22,
    y: 65,
    color: '#ec4899'
  }
];

export const HardwareSchematicWidget: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ComponentPin>(HARDWARE_COMPONENTS[0]);

  return (
    <div className="bg-[#101713] rounded-3xl border border-[#2d3a30] shadow-2xl p-5 sm:p-7 text-[#e0e7e1] overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243329] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              Hardware Engineering Blueprint
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Microsoft Sparrow & Seeed Studio
            </span>
          </div>
          <h3 className="text-xl font-black text-[#e0e7e1] mt-1.5">
            Driftwood-Based River Observer Unit Schematic
          </h3>
          <p className="text-xs text-[#8c9e92] mt-0.5">
            Low-cost modular bioacoustic & camera telemetry node designed for autonomous deployment across Western Ghats river systems.
          </p>
        </div>

        {/* Live Diagnostics Pill Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17221b] border border-[#2d3a30] text-xs">
            <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
            <span>Battery: <strong>94% (4.12V)</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17221b] border border-[#2d3a30] text-xs">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>LoRa Mesh: <strong>-68 dBm</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17221b] border border-[#2d3a30] text-xs">
            <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ambient: <strong>26.4°C / 88% RH</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Schematic Canvas & Hotspots (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b100d] rounded-2xl border border-[#243329] p-5 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
          {/* Blueprint Grid Lines Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#2d3a30 1px, transparent 1px), linear-gradient(90deg, #2d3a30 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Schematic Diagram Background Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto p-4">
            {/* Visual Observer Node Representation */}
            <div className="relative w-full max-w-md aspect-16/10 rounded-2xl bg-linear-to-b from-[#18261e] via-[#121c15] to-[#0c130e] border-2 border-emerald-500/40 p-6 flex flex-col justify-between shadow-2xl">
              {/* Driftwood Chassis Outline */}
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider">
                  DRIFTWOOD CHASSIS • IP68 SEALED
                </span>
                <span className="text-[10px] font-mono text-[#8c9e92]">UNIT ID: ARC-AGUMBE-01</span>
              </div>

              {/* Pin Hotspots on the visual unit */}
              {HARDWARE_COMPONENTS.map((comp) => {
                const Icon = comp.icon;
                const isSelected = selectedComp.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComp(comp)}
                    className={`absolute p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg group ${
                      isSelected
                        ? 'scale-125 z-30 shadow-emerald-500/50 ring-4 ring-emerald-400/20'
                        : 'hover:scale-110 z-20'
                    }`}
                    style={{
                      left: `${comp.x}%`,
                      top: `${comp.y}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: isSelected ? comp.color : '#141e17',
                      borderColor: comp.color,
                      color: isSelected ? '#ffffff' : comp.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {/* Pulsing indicator */}
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: comp.color }}
                    />
                  </button>
                );
              })}

              <div className="text-center text-xs text-[#728478] font-mono pt-4 border-t border-[#232f27]">
                Click any interactive module pin to inspect component specifications
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-[#8c9e92] pt-3 border-t border-[#1e2a22]">
            <span>Enclosure: Buoyant Hardwood Shell with Eco-Resin Seal</span>
            <span className="font-mono text-emerald-400">Total Unit BOM Cost: ~$68.00 USD</span>
          </div>
        </div>

        {/* Selected Component Detail Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#141f18] rounded-2xl border border-[#2d3a30] p-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                style={{
                  backgroundColor: `${selectedComp.color}20`,
                  color: selectedComp.color,
                  borderColor: `${selectedComp.color}50`
                }}
              >
                {selectedComp.category} Module
              </span>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Field Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: `${selectedComp.color}20`,
                  color: selectedComp.color
                }}
              >
                <selectedComp.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-[#e0e7e1] leading-tight">
                  {selectedComp.name}
                </h4>
                <p className="text-xs text-[#8c9e92] font-mono mt-0.5">
                  Pin Allocation: Active on Bus SPI/I2C
                </p>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[#0e1611] border border-[#223026]">
              <div className="text-[11px] uppercase font-bold text-[#8c9e92] mb-1">
                Technical Specification
              </div>
              <div className="text-xs font-mono text-[#c2d1c6]">
                {selectedComp.spec}
              </div>
            </div>

            <p className="text-xs text-[#a1b3a6] mt-3.5 leading-relaxed">
              {selectedComp.description}
            </p>
          </div>

          {/* Quick Component Switcher */}
          <div className="mt-5 pt-4 border-t border-[#232f27]">
            <div className="text-[11px] uppercase font-bold text-[#728478] mb-2">
              All Subsystem Components
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HARDWARE_COMPONENTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedComp(item)}
                  className={`p-2 rounded-xl text-left text-xs transition-colors border cursor-pointer ${
                    selectedComp.id === item.id
                      ? 'bg-emerald-600/30 border-emerald-500/60 text-emerald-300 font-bold'
                      : 'bg-[#18231c] border-[#253328] text-[#8c9e92] hover:text-[#c2d1c6]'
                  }`}
                >
                  <div className="truncate">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
