// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  cycleManagement: icon('ic_cycle_management'),
  diagnosesManagement: icon('ic_diagnoses_management'),
  medicinesManagement: icon('ic_medication_management'),
  nurseManagement: icon('ic_nurse_management'),
  patientManagement: icon('ic_patient_management'),
  reportManagement: icon('ic_report_management'),
  sectionManagement: icon('ic_section_management'),
  groupManagement: icon('ic_group_management'),
  ticketManagement: icon('ic_ticket_management'),
  vehicleManagement: icon('ic_vehicle_management'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Tasks',
    items: [
      {
        title: 'Cycles',
        path: PATH_DASHBOARD.cycle.root,
        icon: ICONS.cycleManagement,
        children: [
          { title: 'Cycle 09 (3/14 - 3/25)', path: PATH_DASHBOARD.cycle.last },
          { title: 'Cycle 08 (2/21 - 3/12 )', path: PATH_DASHBOARD.cycle.oneBeforeLast, disabled: true },
          { title: 'View All', path: PATH_DASHBOARD.cycle.list },
          { title: 'New Cycle', path: PATH_DASHBOARD.cycle.new },
        ],
      },
      // default roles : All roles can see this entry.
      // roles: ['user'] Only users can see this item.
      // roles: ['admin'] Only admin can see this item.
      // roles: ['admin', 'manager'] Only admin/manager can see this item.
      // Reference from 'src/guards/RoleBasedGuard'.
      {
        title: 'Reports',
        // roles: ['admin'],
        path: PATH_DASHBOARD.report.root,
        icon: ICONS.reportManagement,
        info: (
          <Label color="info" startIcon={<Iconify icon="icon-park-outline:table-report" />}>
            NEW
          </Label>
        ),
        children: [
          { title: 'View All', path: PATH_DASHBOARD.report.list },
          {
            title: 'Groups',
            path: PATH_DASHBOARD.report.root,
            children: [
              { title: 'View All', path: PATH_DASHBOARD.report.group.list },
              { title: 'New Group', path: PATH_DASHBOARD.report.group.new },
            ],
          },
        ],
      },
    ],
  },
  {
    subheader: 'Users',
    items: [
      {
        title: 'Nurses',
        path: PATH_DASHBOARD.nurse.root,
        icon: ICONS.nurseManagement,
        children: [
          { title: 'View All Nurses', path: PATH_DASHBOARD.nurse.list },
          { title: 'Create New Nurse', path: PATH_DASHBOARD.nurse.new },
        ],
      },
      {
        title: 'Patients',
        path: PATH_DASHBOARD.patient.root,
        icon: ICONS.patientManagement,
        children: [
          { title: 'View All Patients', path: PATH_DASHBOARD.patient.list },
          { title: 'Create New Patient', path: PATH_DASHBOARD.patient.new },
        ],
      },

      {
        title: 'Sections',
        path: PATH_DASHBOARD.section.root,
        icon: ICONS.sectionManagement,
        children: [
          { title: 'View All Sections', path: PATH_DASHBOARD.section.list },
          { title: 'Create New Section', path: PATH_DASHBOARD.section.new },
        ],
      },
      {
        title: 'Groups',
        path: PATH_DASHBOARD.group.root,
        icon: ICONS.groupManagement,
        children: [
          { title: 'View All Groups', path: PATH_DASHBOARD.group.list },
          { title: 'Create New Group', path: PATH_DASHBOARD.group.new },
        ],
      },
    ],
  },
  {
    subheader: 'Medical',
    items: [
      {
        title: 'Diagnoses',
        path: PATH_DASHBOARD.diagnose.root,
        icon: ICONS.diagnosesManagement,
        children: [
          { title: 'View All Diagnoses', path: PATH_DASHBOARD.diagnose.list },
          { title: 'Create New Diagnose', path: PATH_DASHBOARD.diagnose.new },
        ],
      },
      {
        title: 'Medicine',
        path: PATH_DASHBOARD.medicine.root,
        icon: ICONS.medicinesManagement,
        children: [
          { title: 'View All Medication', path: PATH_DASHBOARD.medicine.list },
          { title: 'Create New Medication', path: PATH_DASHBOARD.medicine.new },
        ],
      },
    ],
  },

  {
    subheader: 'Facility',
    items: [
      {
        title: 'Vehicles',
        path: PATH_DASHBOARD.vehicle.root,
        icon: ICONS.vehicleManagement,
        children: [
          { title: 'View All Vehicles', path: PATH_DASHBOARD.vehicle.list },
          { title: 'Create New Vehicle', path: PATH_DASHBOARD.vehicle.new },
        ],
      },
    ],
  },
  {
    subheader: 'Support',
    items: [
      {
        title: 'Tickets',
        path: PATH_DASHBOARD.ticket.root,
        icon: ICONS.ticketManagement,
        info: <Label color="error">+32</Label>,
        children: [
          { title: 'View All Tickets', path: PATH_DASHBOARD.ticket.list },
          { title: 'Create New Ticket', path: PATH_DASHBOARD.ticket.new },
        ],
      },
    ],
  },
  // DEMO MENU STATES
  // {
  //   subheader: 'DEMO',
  //   items: [
  //     // USER
  //     {
  //       title: 'User',
  //       path: PATH_DASHBOARD.cycle.root,
  //       icon: ICONS.nurseManagement,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },
  //     {
  //       title: 'About HoiTek',
  //       path: 'https://www.hoitek.fi/',
  //       icon: ICONS.ticketManagement,
  //     },
  //   ],
  // },
];

export default navConfig;
