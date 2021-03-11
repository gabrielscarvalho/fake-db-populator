import { iValueGenerator } from '../../interfaces';
import { NamedMap } from '../utils/map';


export class AutoIncrement {
  private ids: NamedMap<number>;

  public constructor() {
    this.ids = new NamedMap<number>();
  }

  public valueGen(uniqueName: string, incrementBy: number = 1): () => number {

      const optCurrent = this.ids.get(uniqueName);
      let currentId: number = optCurrent.isPresent() ? optCurrent.get() : 0;

      return () => {
        currentId = currentId + incrementBy;

        this.ids.add(uniqueName, currentId);
        return currentId;
      }
    };
  }
}
