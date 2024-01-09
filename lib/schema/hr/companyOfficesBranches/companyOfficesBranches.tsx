import { z } from 'zod';

export const companyOfficesBranchesSchema = z.object({
  branchId: z.string(),
  companyId: z.string(),
  branchName: z.string(),
  branchCity: z.string(),
  branchCountry: z.string(),
  branchState: z.string(),
  branchAddress: z.string(),
});

export type IcompanyOfficesBranchesSchema = z.infer<
  typeof companyOfficesBranchesSchema
>;
