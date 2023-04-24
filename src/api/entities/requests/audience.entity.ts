export interface Audience {
  id?: number;

  championshipId: number;

  type: string;

  requester: {
    category: string;
    sailNumber: string;
  };

  participants: {
    category: string;
    sailNumber: string;
  }[];

  witnesses: {
    category: string;
    sailNumber: string;
  }[];

  incident: {
    raceDate: string;
    raceNumber: number;
    dateTime: string;
    infringedRules: string;
  };

  informed: {
    hail: {
      hailed: boolean;
      situation: string;
      wordsUsed: string;
    };
    flagDisplayed: {
      flagDisplayed: boolean;
      situation: string;
    };
    informedOtherWay: {
      informedOtherWay: boolean;
      situation: string;
    };
  };

  description: string;

  status: [
    {
      status: string;
      scheduleTime?: string;
      place?: string;
      resolution?: AudienceResolution;
      observation?: string;
      date: string;
    },
  ];
}

export interface AudienceResolution {
  isRetired?: boolean;

  timeLimit?: {
    timeLimit: string;
    presentedOnTime: boolean;
    presentationWindowExpanded: boolean;
  };

  participants?: {
    requesterRepresentedBy: string;
    protesteesRepresentedBy: string;
    witnesses: string;
    interpreters: string;
  };

  validity?: {
    interestedPartyObjected: {
      checked: boolean;
      observation: string;
    };
    theWrittenDeclarationDescribesTheIncident: {
      checked: boolean;
      observation: string;
    };
    hailedOutLoud: {
      checked: boolean;
      observation: string;
    };
    advicedAtFirstReasonableOpportunity: {
      checked: boolean;
      observation: string;
    };
    redFlagWasDisplayedAtFirstOpportunity: {
      checked: boolean;
      observation: string;
    };
    redFlagWasSeenByRaceCommitee: {
      checked: boolean;
      observation: string;
    };
    isValid: boolean;
  };

  provedFacts?: string;

  conclusionAndRulesThatApply?: string;

  resolution?: string;

  shortResolution?: string;

  juryParticipants: string;
}
