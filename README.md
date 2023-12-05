# React Project Guide with Domain Separation Approach

This guide provides detailed instructions and documentation about our Next.js(Dashboard) application with React. This application follows a domain separation approach for better organization, scalability, and maintenance.

## Getting Started

You can use either Yarn or npm to install and run the project.

```bash
yarn install
yarn hookgen:dev
yarn dev
```

## Using npm

```bash
npm install OR npm install --legacy-peer-deps
npm run hookgen:dev
npm run dev
```

## Application Structure

### Domains (Sections Folder)

The business logic of the application is separated into different domains located within the "sections" folder. This means that some business logic, particularly for specific domains, is embedded within the page components themselves, rather than being completely decoupled. Each domain is described below:

#### Auth

The Auth domain handles login-related components, including One-Time Password (OTP) handling. Users can log in using either their email and password or by scanning an NFC card. They can also select their preferred language for authentication. All token management and authentication logic is handled by the JWTContext component, which provides a useAuth hook that can be included in any desired component.
This domain uses ReactHookForm(RHF) library for managing authentication flows.
Role-Based Access Control (RBAC) is implemented using the RoleBasedGuard component. This ensures that users are only able to access the sections of the dashboard that correspond to their role.

#### Customer

The Customer domain is a crucial part of the app that manages customer data. In this domain, we create functionality for interacting with customer data across various subdomains:

- Create new customer: A form for adding new customers to the system.
- View all customers: A table displaying all customer records in the system.
- Detail: A page for viewing detailed information about a specific customer.
- Profile: A page for managing a customer's profile information.

Validation is handled using the Yup package. This package provides a simple way to define rules for validating form data before it is submitted.
We have created a custom hook called useStepData which is used to retrieve data from the Redux store related to a customer creation form and bidirectional sync with url params.
The DataGrid component is used to display and filter and sort the list of the customers. This component allows users to sort and filter the list based on various attributes possible for that customer like name, email, etc... .

#### Staff

The Staff domain manages and maintains data related to nurses in the application. It comprises 5 subdomains, including:

- Create New Staff: This subdomain enables users to create new nurse staff records with accurate information. The input fields are validated using the Yup package, which ensures that only correct data is entered.
- View All Staffs: This subdomain provides a list of all nurse staff records available in the app. The DataGrid component is used to sort and filter the list to enhance user convenience.

- Evaluation: This subdomain allows users to provide feedback on nursing staff performance.
- Details: This subdomain provides detailed information about a specific nurse staff member. Users can view their name, contact details, job role, and other essential information in this section.

- Profile: This subdomain allows to view staff members personal information.

The useStepData hook retrieves necessary data from the store, making it easy to manage and update records.

#### Cycles

The Cycles domain is responsible for managing the creation of cycles and management of shifts and visits. This domain allows users to create a cycle by specifying the start and end time, and then create shifts for morning, evening, and night.
To manage shifts, navigate to the "Manage Shifts" tab. Here, user can see all the shifts for the selected cycle. User can view shifts in either calendar or list view, and pick preferred shift using the Arrangement tab.
When starting a shift, nurses can determine which type of transportation they used, and after completing their visit, they can determine the end of shift.
There is "Assign or Swap Shift" option and user can assign a shift to another nurse or swap shifts with another nurse if needed.
The last part is managing visits which users in the system can see any details about the visit and even start to do the visit if its in the availabe shift activated for them at the moment.

#### Vehicle

This domain handles the creation and management of vehicles in the application.

##### Features

- Creation of new vehicles: There is a form for create new vehicle and we used Yup package fo validate new vehicle information.
- Listing of all vehicles: To display the available vehicles, we utilize the Material-UI library's table component
- Planning of vehicles for each shift: This feature allows shift managers to assign a vehicle to each shift and monitor its movements throughout the day.
  In order to implement this functionality, the Vehicle domain utilizes various libraries such as Leaflet and Mapbox to provide interactive maps for displaying the location of each vehicle. Additionally, we use the axios library to handle HTTP requests to our backend API for retrieving and updating vehicle data.

#### Contract Type

The Contract Type domain handles the creation and viewing of contract types in our database.
Only authorized users are able to create or view contract types. This domain does not handle any authentication-related components. All token management and authentication logic is handled by the JWTContext component, which provides a useAuth hook that can be included in any desired component.
The component renders a checkbox labeled "Sub Contractor" with a label control and a Checkbox control from Material-UI. If the checkbox is checked, the rest of the form will be displayed.
This component also conditionally renders a Collapse component from Material-UI which contains the rest of the form elements.
Inside the Collapse component, there's a Grid container with two columns. Each column contains a Textfield component (for company registration number) and an Autocomplete component (for selecting payment types, fetched from the backend).
After the Grid container, there's a Box component that displays a list of vehicles retrieved from the backend using an array map() method.
Finally, the component renders a Divider component below the form.
Overall, this component is used as part of a larger form to collect information related to nurse contracts. When the "Sub Contractor" checkbox is checked, this component expands to allow the user to enter additional details about the sub-contractor.

#### Reports

The Reports domain allows staff members to add reports about customers, which can include attachments. Users can view all reports in the View All Reports tab. Staff members can also add new groups to categorize the reports.

#### Diagnoses

The Diagnoses domain handles the management of diagnoses within the application. It allows users to add new diagnoses and view all existing diagnoses.
To add a new diagnosis, navigate to the "Add Diagnosis" tab. Here you will find a form with three inputs: name, code, and description.
All inputs are validated using the Yup package, ensuring that they meet the required criteria before submission.
To view all existing diagnoses, navigate to the "View Diagnoses" tab. Here you will find a list of all diagnoses currently stored in the system.

#### Medicine

In our medicine domain, users have the ability to create new medicines and add them to our database. Once added, these medicines are easily viewable in the 'View All Medicine' tab.

#### Services

In the Services domain, nurses are able to create a variety of services for their customers. These services can be viewed and managed through the "View all services" tab. Each service includes a Service name, Service type, and detailed Description.

To ensure accuracy and consistency in the information provided, the Services domain implements a robust validation system. This system verifies that all required fields are filled out correctly and that any additional information provided is relevant and appropriate.

#### Staff Premissions

The Staff Permission domain handles permission-related components, allowing staff members to create new permissions and view all existing permissions in the "View All Permissions" tab.
All permission management logic is handled by the PermissionContext component, which provides a usePermission hook that can be included in any desired component. This hook can be used to fetch data about existing permissions, add new permissions, or update existing permissions as needed.
The component uses MUI's DataGrid component to render rows of nurses' permissions in a paginated table format.
The data grid includes columns for the name of the permission, its expiration date, and an Actions column where users can edit or delete individual nurse permissions.
The component also handles sorting and filtering of nurse permissions on the server-side by passing the sort and filter parameters to the useNursesPermissionsQuery hook.
Additionally, the component uses state variables to manage user selection of nurse permissions through checkboxes. The selected nurse permissions are logged to the console when there are any.
Lastly, the component has a ConfirmDialog component to handle deletion of nurse permissions.
Overall, this component provides a convenient way for users to view and manage nurse permissions in a tabular format.

#### Tickets

The Ticket domain is responsible for managing tickets created by users and sending them to the support team. Tickets can be created by filling out a form that includes the following fields:

- Title: A brief title that summarizes the issue or question being addressed.
- Department: The department that the ticket should be routed to within the support team.
- Priority: A level of importance assigned to the ticket, ranging from high to low.
- Text: A description of the issue or question being addressed.
- File attachment: An optional field that allows users to attach files to their tickets if needed.
  All tickets created using this domain are visible in the View All Tickets tab, where they can be managed by the support team.

#### Service Grade

In the Service Grade domain of this React application, users have the ability to define and add new service grades by specifying a title, description, and selecting a color from a React color palette.
Once added, these service grades can be viewed in the "View All Services" section of the application.
Here, users can sort the service grades by various criteria if needed. Additionally, the ability to export this information is available.

#### Section

The Section Domain of our application is responsible for managing sections. The domain consists of two tabs: "Create New Section" and "View All Sections".
To create a new section, users can utilize the form provided by this domain. This form includes three components: "Title", "Select Parent", and "Color". The "Title" allows users to input the name of their new section. The "Select Parent" enables users to select a parent section from a tree autocomplete list. Finally, the "Color" lets users choose a color for their new section from a color palette.

We have integrated the Formik library into this domain to manage form state and validate user input. Additionally, we have used the MUI Dialog library to handle the creation and display of the form dialog.
As with the Login Domain, JWTContext is utilized in the Section Domain for token management and authentication logic. The useAuth hook provided by JWTContext can be included in any desired component within this domain.

#### Dispatcher Profile

In the Dispatcher Profile Domain, we have provided a comprehensive set of features that allow dispatchers to view and manage their personal and contract information. This domain is designed to give dispatchers complete control over their profile, with access to critical information like teams, sections, and other relevant data.
Another key feature of this domain is the ability to upload attachments as needed.
Finally, we have also included a "Change Password" tab, which allows dispatchers to update their login credentials securely. This ensures that dispatchers can maintain the security of their account at all times, without having to rely on external support.

### Pages

The pages folder in the app serves as our router in Next.js. Here's a brief description of some special pages:

- `dashboard/nurse/list`: Nurse list page
- `dashboard/nurse/new`: Create and edit nurse
- `dashboard/index.tsx`: Redirects to nurse list
- `dashboard/cycle/list`: Cycles list page
- `dashboard/cycle/new`: Create new cycle
- `dashboard/patient/list`: Patients list page
- `dashboard/patient/new`: Create and edit patient
- `dashboard/report/group/list`: Reports list page
- `dashboard/report/group/new`: Create and edit report

### Material UI React Customization

These customizations can be found in the **_Theme_** folder. The **_override_** folder overrides any default MUI components to fit our desired styles.

```typescript
export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  };
}
```

### Routes Module

Our routes are managed in the 'Routes' folder, where we maintain a 'PATH_APP' object that stores all our paths. This setup enables us to make global route changes across all components without hardcoding hrefs. The process of joining paths with slashes is handled by a special join function.

### scripts Folder

This folder contains a single Node.js script that builds TypeScript files necessary for all processes to generate API requests and React Query hooks with all required features.

### \_clients Folder

This folder contains individual clients for calling GraphQL microservices, with each client requiring an authorization token for making authorized requests.

### \_requests Folder

This folder contains all microservice directories that request data from external APIs. All requests are generated using scripts located within the 'scripts' folder. Please read the code in the 'scripts' folder to better understand the flow.

### \api-hooks Folder

This folder contains all React Query hooks generated based on API declarations in the '\_requests' folder. The code in the 'scripts' folder is responsible for generating these hooks.

### Guards Folder

This folder houses Higher Order Components (HOC) for specific business policies.

### Configs Folder

This folder contains all the configurations necessary for the Codegen tool to comprehend our schema endpoints and generate hooks for us.

### Implementing a New Domain

Adding a new domain to this application is straightforward:

1. Create a new folder inside sections and add all the business logic there.
2. Add page(s) corresponding to the new domain.
3. Add a slice in src/redux/slices using Redux Toolkit.
4. specify all fetch requests inside the \_requests folder, and track the related react-query along side with the type genereted.
5. Add domain-specific types in the @types folder under the domain folder.
6. Add any Redux-related types inside @types/redux.
7. Generate the fetch request hooks automatically using the command:
   ```bash
   npm run hookgen:dev
   #or
   yarn hookgen:dev
   ```
8. use any type needed from the server generated type to implement your business logic
9. Use the generated hooks. For example:
   ```typescript
   const { data: nursesResult, isLoading } = useNursesQuery({
     filters: nurseFilters,
     sorts: nurseSorts,
     limit: pageSize,
     page: page + 1,
   });
   ```
   this code is peresnt in NurseDataGrid.tsx component. read the hole code to get a full underestanding of creating a new functional domain with external apis generated by our magic scripts

### Real-time Data and Sockets

The application utilizes a monitoring slice and context for real-time data management. The main concept is that we have socket listeners that dispatch monitoring data - such as live staff positions on a map and live vehicle tracking - to Redux.

### Important Packages Used in this App

Here are some notable packages used in this application:

- [react-query](https://tanstack.com/query/latest): server state managements. auto generated by our scripts
- [@iconify/react](https://iconify.design/docs/icon-components/react/): For the icons used in the app.
- [i18next](https://www.i18next.com/): For implementing multi-language support.
- [react-hot-toast](https://react-hot-toast.com/): For notifications.
- [react-slick](https://www.npmjs.com/package/react-slick): For the slider component.
- [@mui/material](https://mui.com/): For base components and theming.
- [Redux](https://redux.js.org/) with ReduxtToolKit

### Important Local Components Used in this App

- The 'src/components/dialog' folder contains custom global dialogs required for this project, such as an advanced confirmation dialog that prompts the user to confirm their action by typing a specific phrase before proceeding

### Conclusion

This guide offers a detailed overview of our domain-separation approach in a React project built with Next.js. It is crucial to comprehend the application's structure, setup, and flow for efficient development and maintenance.
