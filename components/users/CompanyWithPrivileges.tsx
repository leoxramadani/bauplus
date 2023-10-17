import { useQuery } from '@apollo/client';
import { Key, useEffect, useState } from 'react';
import { GET_ALL_PRIVILEGES_SMALL_QUERY } from '@/lib/queries/privileges';
import { GET_ALL_ROLES_PRIVILEGES } from '@/lib/queries/rolesPrivileges';
import Modal from '../Modal';
import useTranslation from '@/lib/hooks/useTranslation';
import { GET_ALL_ROLES } from '@/lib/queries/roles';

export interface CompanyWithRoleAndPrivileges {
  companyId: number;
  roleId: string;
  extraPrivileges: {
    id: number;
    grant: boolean;
  }[];
}

export interface Roles {
  roleId: string;
  roleName: string;
}

export interface Privileges {
  [role: string]: number[];
}

const CompanyPrivileges = ({
  company,
  companiesWithPrivileges,
  setCompaniesWithPrivileges,
  isCheckedInit,
  roleInit,
  privilegesInit,
}: any) => {
  const [isChecked, setIsChecked] = useState(isCheckedInit);
  const { data: privilegesData } = useQuery(
    GET_ALL_PRIVILEGES_SMALL_QUERY
  );
  const { data: rolesData } = useQuery(GET_ALL_ROLES);
  const { data: rolePrivileges } = useQuery(GET_ALL_ROLES_PRIVILEGES);

  const [roles, setRoles] = useState<Roles[]>([]);
  const { t } = useTranslation();
  const [role, setRole] = useState(roleInit ?? {});

  const [defaultPrivileges, setDefaultPrivileges] =
    useState<Privileges>();
  const [privileges, setPrivileges] = useState<any>(
    privilegesInit
      ? privilegesInit.map((p: any) => p.privilege_ID)
      : []
  );

  // 1. Set roles
  useEffect(() => {
    if (rolesData) {
      setRoles(
        rolesData.allRoles.map((role: any) => ({
          roleId: role.id,
          roleName: role.name,
        }))
      );
    }
  }, [rolesData]);

  // 2. Set initial role to "Viewer"
  useEffect(() => {
    if (!roleInit && rolesData) {
      setRole(
        rolesData.allRoles.find((role: any) => role.name === 'Viewer')
      );
    }
  }, [rolesData]);

  // 3. Set default privileges for each role
  useEffect(() => {
    if (rolePrivileges) {
      const updatedDefaults: Privileges = {};

      rolePrivileges.allRoles_Privileges.forEach((obj: any) => {
        const { privilege_ID, roles } = obj;
        if (updatedDefaults[roles.name]) {
          updatedDefaults[roles.name].push(privilege_ID);
        } else {
          updatedDefaults[roles.name] = [privilege_ID];
        }
        setDefaultPrivileges(updatedDefaults);
      });
    }
  }, [rolePrivileges]);

  // 4. Set privileges to defaults of chosen role.
  useEffect(() => {
    if (defaultPrivileges && role)
      setPrivileges(defaultPrivileges[role.name]);
  }, [role]);

  // 5. Set the current privileges to defaultPrivileges initially if no data is provided for initial privileges.
  // State 'privileges' is for the switches on the modal, initially the defaults will be switched on, as set in this effect.
  useEffect(() => {
    if (!privilegesInit && defaultPrivileges && role)
      setPrivileges(defaultPrivileges[role.name]);
  }, [defaultPrivileges]);

  // 6. Set companiesWithPrivileges (state from the main page component) to selected companies.
  useEffect(() => {
    const updatedCompaniesWithPrivileges = companiesWithPrivileges;
    if (isChecked) {
      if (
        !companiesWithPrivileges.some(
          (c: any) => c.companyId === company.company_ID
        )
      ) {
        updatedCompaniesWithPrivileges.push({
          companyId: company.company_ID,
          roleId: role.id,
          extraPrivileges: [],
        });
        setCompaniesWithPrivileges(updatedCompaniesWithPrivileges);
      }
    } else {
      setCompaniesWithPrivileges(
        updatedCompaniesWithPrivileges.filter(
          (c: any) => c.companyId !== company.company_ID
        )
      );
    }
  }, [isChecked]);

  // Effect for updating the company's role and extra privileges whenever there are changes.
  // If any are available they will be updated in the main components state.
  useEffect(() => {
    if (defaultPrivileges && privileges) {
      const updatedCompanyExtraPrivileges: CompanyWithRoleAndPrivileges[] =
        companiesWithPrivileges;

      // Check if there are any current privileges that are not
      // included in the defaults for the chosen role, meaning they are extra privileges.
      let extras = privileges.filter(
        (p: any) => !defaultPrivileges[role.name].includes(p)
      );

      // Check also if there are any current privileges that are excluded from the defaults,
      // meaning they were unchecked from the default list.
      let excluded = defaultPrivileges[role.name]?.filter(
        (dp: any) => !privileges.some((p: any) => p === dp)
      );

      // Combine the two previous arrays and assign the property 'grant' as appropriate.
      const extraPrivileges = extras
        .map((p: any) => ({ id: p, grant: true }))
        .concat(excluded?.map((p: any) => ({ id: p, grant: false })));

      if (
        updatedCompanyExtraPrivileges.some(
          (c) => c.companyId === company.company_ID
        )
      ) {
        updatedCompanyExtraPrivileges.find(
          (c) => c.companyId === company.company_ID
        )!.extraPrivileges = extraPrivileges;

        updatedCompanyExtraPrivileges.find(
          (c) => c.companyId === company.company_ID
        )!.roleId = role.id;
        setCompaniesWithPrivileges(updatedCompanyExtraPrivileges);
      }
    }
  }, [defaultPrivileges, privileges, role]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <label
            className="relative inline-flex items-center cursor-pointer"
            htmlFor={company.company_Name}
          >
            <input
              type="checkbox"
              id={company.company_Name}
              className="sr-only peer"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              name="required"
            />
            <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-offset-4 peer-focus:ring-blue-800 rounded-full peer bg-slate-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="mx-2">{company.company_Name}</span>
          </label>
        </div>
        {isChecked && (
          <Modal
            value={t('Edit privileges')}
            className="underline text-blue-600 underline-offset-4 cursor-pointer"
          >
            <h1 className="title">{company.company_Name}</h1>
            <div className="flex gap-8 justify-start">
              <div className="relative h-full w-1/3 flex flex-col gap-4">
                <h2 className="font-semibold">Role</h2>
                <div
                  key={company.company_Id}
                  className="flex flex-col h-full justify-start gap-2"
                >
                  {roles &&
                    roles.map((r: any) => {
                      return (
                        <label
                          key={r.roleName}
                          htmlFor={r.roleName}
                          className="flex flex-row gap-4 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`roles-${company.company_Id}`}
                            id={r.roleName}
                            value={r.roleName}
                            checked={role.name === r.roleName}
                            onChange={(event) =>
                              setRole({
                                id: r.roleId,
                                name: event.target.value,
                              })
                            }
                          />
                          {r.roleName}
                        </label>
                      );
                    })}
                </div>
              </div>
              <div className="h-full w-2/3 flex flex-col gap-4 border-l pl-6">
                <h2 className="font-semibold">Privileges</h2>
                <div className="flex flex-col gap-2 h-full overflow-scroll scrollbar ">
                  {defaultPrivileges &&
                    privileges &&
                    privilegesData?.allPrivileges.map(
                      (privilege: any) => (
                        <div
                          className="flex justify-start items-center gap-4  "
                          key={privilege.privilege_ID}
                        >
                          <label
                            className="relative flex cursor-pointer"
                            htmlFor={privilege.long_Description}
                          >
                            <div className="inline-flex">
                              <input
                                type="checkbox"
                                id={privilege.long_Description}
                                className="sr-only peer"
                                onChange={() => {
                                  setPrivileges(
                                    privileges.some(
                                      (p: any) =>
                                        p === privilege.privilege_ID
                                    )
                                      ? privileges.filter(
                                          (p: any) =>
                                            p !==
                                            privilege.privilege_ID
                                        )
                                      : [
                                          ...privileges,
                                          privilege.privilege_ID,
                                        ]
                                  );
                                }}
                                checked={privileges.some(
                                  (p: any) =>
                                    p === privilege.privilege_ID
                                )}
                                name="required"
                              />
                              <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-offset-4 peer-focus:ring-blue-800 rounded-full peer bg-slate-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                            <span className="mx-2">
                              {privilege.long_Description}
                            </span>
                          </label>
                        </div>
                      )
                    )}
                  {!privileges && <div>Loading...</div>}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CompanyPrivileges;
