import { Panelist } from 'src/hiring/domain/Panelist';

export const PANELIST_SERVICE = 'PANELIST_SERVICE';

export interface IPanelistService {
  findById(id: string): Promise<Panelist>;
}
