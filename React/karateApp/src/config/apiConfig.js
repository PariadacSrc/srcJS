export const deploymode = process.env.REACT_APP_DEPLOY_MODE;
const API_MAIN_DOMAIN = {
  production: "https://registration.calgarykaratecup.com/.api",
  sandbox: "http://34.222.153.169:8080/karate_tournament"
};

const API_MAIN_URL = `${API_MAIN_DOMAIN[deploymode]}/dist/php`;
export const API_IMG_URL = `${API_MAIN_DOMAIN[deploymode]}/dist/images`;

export const API_CALCULATE_COST = `${API_MAIN_URL}/calc_cost.php`;
export const API_COMFIRM_PAYMENT = `${API_MAIN_URL}/confirm_transaction.php`;
export const API_CREATE_USER = `${API_MAIN_URL}/create_user.php`;
export const API_CREATE_TEAM = `${API_MAIN_URL}/create_dojo.php`;
export const API_CREATE_PERSON = `${API_MAIN_URL}/create_person.php`;
export const API_DELETE_TEAM = `${API_MAIN_URL}/delete_dojo.php`;
export const API_DELETE_PERSON = `${API_MAIN_URL}/delete_person.php`;
export const API_DELETE_TOURNAMENT = `${API_MAIN_URL}/delete_tournament.php`;
export const API_GET_PERSON = `${API_MAIN_URL}/show_person.php`;
export const API_GET_PERSON_PAYMENT = `${API_MAIN_URL}/paypal_detail.php `;
export const API_GET_DOJO = `${API_MAIN_URL}/get_dojo.php`;
export const API_GET_TOURNAMENT = `${API_MAIN_URL}/show_tournament.php`;
export const API_GENERATE_COMBAT = `${API_MAIN_URL}/create_keys.php`;
export const API_GET_COMBATS = `${API_MAIN_URL}/get_keys.php`;
export const API_LIST_TEAM = `${API_MAIN_URL}/list_dojo.php`;
export const API_LIST_TEAM_ATHLETE = `${API_MAIN_URL}/list_person_dojo.php`;
export const API_LIST_TEAM_ATHLETE_ADMIN = `${API_MAIN_URL}/dashboard_admin.php`;
export const API_LIST_TOURNAMENT = `${API_MAIN_URL}/list_tournament.php`;
export const API_LIST_PAYMENTS = `${API_MAIN_URL}/global_payment_detail_filter.php`;
export const API_LOGIN_USER = `${API_MAIN_URL}/login.php`;
export const API_SIGN_UP_TOURNAMENT = `${API_MAIN_URL}/sign_up_tournament.php`;
export const API_SEND_MAIL = `${API_MAIN_URL}/sendmail.php`;
export const API_UPDATE_TEAM = `${API_MAIN_URL}/update_dojo.php`;
export const API_UPDATE_PERSON = `${API_MAIN_URL}/update_person.php`;
export const API_UPDATE_IMG = `${API_MAIN_URL}/uploadimg.php`;
export const API_RECOVERY_PASSWORD_REQUEST = `${API_MAIN_URL}/request_reset_password.php`;
export const API_RECOVERY_PASSWORD_CONFIRMATION = `${API_MAIN_URL}/reset_password.php`;
export const API_VALIDATE_PERSON = `${API_MAIN_URL}/validate_person.php`;
//export const API_ = `;
