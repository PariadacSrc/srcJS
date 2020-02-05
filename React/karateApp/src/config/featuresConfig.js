export const FeaturesRelation = {
  AddAthlete: 1,
  AthletesList: 2,
  TournamentList: 12,
  SigUpTournament: 16,
  CombatList: 18
};

export const linksRelation = {
  1: {
    type: "component",
    tag: "fas fa-user-plus",
    inttext: "Add athlete",
    route: "/new-athlete",
    component: () => {
      return import("../components/layouts/buttons/AddAthlete");
    }
  },
  2: {
    type: "link",
    tag: "Team Members List",
    route: "/list-athlete",
    component: () => {
      return import("../components/routes/login/Athletes");
    }
  },
  12: {
    type: "link",
    tag: "Tournaments",
    route: "/tournaments",
    component: () => {
      return import("../components/routes/login/Tournaments");
    }
  }
};

export const FeatureBondComponent = {
  AthleteContextCreate: 1,
  AthletesList: 2,
  AthleteContextEdit: 3,
  AthleteContextDelete: 4,
  AthleteContextDetails: 5,
  DojoContextCreate: 6,
  DojosList: 7,
  DojoContextEdit: 8,
  DojoContextDelete: 9,
  DojoContextDetails: 10,
  TournamentContextCreate: 11,
  TournamentsList: 12,
  TournamentContextEdit: 13,
  TournamentContextDelete: 14,
  TournamentContextDetails: 15,
  TournamentContexSignUp: 16,
  CombatContextCreate: 17,
  CombatsList: 18,
  CombatContextEdit: 19,
  CombatContextDelete: 20,
  CombatContextDetails: 21
};
