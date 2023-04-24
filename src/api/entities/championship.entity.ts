import { ChampionshipFeatures } from './championshipfeatures.entity';

export interface Championship {
  id: number;

  code: string;
  shortname: string;
  longname: string;

  icon_id?: number;
  banner_id?: number;

  competitorEntry_id?: number[];
  sailingclass_id?: number[];

  isActive: boolean;

  championshipFeatures: ChampionshipFeatures;
}
