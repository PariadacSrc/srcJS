//Actions Creators
export const GET_ATHLETE_FORM = "GET_ATHLETE_FORM";
export const RESET_STORE_COMPONENT = "RESET_STORE_COMPONENT";

export function showAthleteForm(data) {
  return {
    type: GET_ATHLETE_FORM,
    content: true,
    data: data
  };
}

export function hideAthleteForm() {
  return {
    type: GET_ATHLETE_FORM,
    content: false,
    data: null
  };
}
