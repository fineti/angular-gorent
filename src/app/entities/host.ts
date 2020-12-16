import {User} from './user';
import {Apartment} from './apartment';
import {HostService} from '../services/host.service';

export class Host extends User {
  enableNotifications: boolean;
  apartments: Apartment[];

  constructor() {
    super();
  }

}
