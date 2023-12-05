/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AbilityService } from './services/AbilityService';
import { AddressService } from './services/AddressService';
import { CityService } from './services/CityService';
import { CompanyService } from './services/CompanyService';
import { ContracttypeService } from './services/ContracttypeService';
import { DiagnoseService } from './services/DiagnoseService';
import { GeartypeService } from './services/GeartypeService';
import { LanguageskillService } from './services/LanguageskillService';
import { MedicineService } from './services/MedicineService';
import { NurseService } from './services/NurseService';
import { NursetypeService } from './services/NursetypeService';
import { PaymenttypeService } from './services/PaymenttypeService';
import { PermissionService } from './services/PermissionService';
import { PrescriptionService } from './services/PrescriptionService';
import { RoleService } from './services/RoleService';
import { SectionService } from './services/SectionService';
import { ShifttypeService } from './services/ShifttypeService';
import { StreetService } from './services/StreetService';
import { UserService } from './services/UserService';
import { VehicleService } from './services/VehicleService';
import { VehicletypeService } from './services/VehicletypeService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class MajaClient {

    public readonly ability: AbilityService;
    public readonly address: AddressService;
    public readonly city: CityService;
    public readonly company: CompanyService;
    public readonly contracttype: ContracttypeService;
    public readonly diagnose: DiagnoseService;
    public readonly geartype: GeartypeService;
    public readonly languageskill: LanguageskillService;
    public readonly medicine: MedicineService;
    public readonly nurse: NurseService;
    public readonly nursetype: NursetypeService;
    public readonly paymenttype: PaymenttypeService;
    public readonly permission: PermissionService;
    public readonly prescription: PrescriptionService;
    public readonly role: RoleService;
    public readonly section: SectionService;
    public readonly shifttype: ShifttypeService;
    public readonly street: StreetService;
    public readonly user: UserService;
    public readonly vehicle: VehicleService;
    public readonly vehicletype: VehicletypeService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://maja.hoitek.fi/api/v1',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.ability = new AbilityService(this.request);
        this.address = new AddressService(this.request);
        this.city = new CityService(this.request);
        this.company = new CompanyService(this.request);
        this.contracttype = new ContracttypeService(this.request);
        this.diagnose = new DiagnoseService(this.request);
        this.geartype = new GeartypeService(this.request);
        this.languageskill = new LanguageskillService(this.request);
        this.medicine = new MedicineService(this.request);
        this.nurse = new NurseService(this.request);
        this.nursetype = new NursetypeService(this.request);
        this.paymenttype = new PaymenttypeService(this.request);
        this.permission = new PermissionService(this.request);
        this.prescription = new PrescriptionService(this.request);
        this.role = new RoleService(this.request);
        this.section = new SectionService(this.request);
        this.shifttype = new ShifttypeService(this.request);
        this.street = new StreetService(this.request);
        this.user = new UserService(this.request);
        this.vehicle = new VehicleService(this.request);
        this.vehicletype = new VehicletypeService(this.request);
    }
}

