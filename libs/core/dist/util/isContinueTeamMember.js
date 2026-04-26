/**
 * Utility to check if a user is a Continue team member
 */
export function isContinueTeamMember(email) {
    if (!email)
        return false;
    return email.endsWith("@continue.dev");
}
