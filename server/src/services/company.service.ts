import Company from '../model/company.model';
import { CompanyInterface } from '../ts/interfaces/company.interfaces';

async function create(payload: CompanyInterface) {
  try {
    // if (payload._id) {
    //   return await Company.findOneAndUpdate(
    //     { _id: payload._id },
    //     { ...payload },
    //     {
    //       new: true,
    //     }
    //   );
    // } else {
    //   return new Company({ ...payload }).save();
    // }

    return 'success';
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create };
