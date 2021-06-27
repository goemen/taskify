import { ONBOARDING } from "../constants"

export const shouldOnBoardUser = () => {
    const onboarded = !localStorage.getItem(ONBOARDING);

    if (!onboarded) {
        localStorage.setItem(ONBOARDING, 'yes');
    }

    return onboarded;
}