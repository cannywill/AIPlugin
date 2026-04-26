export function isOutOfStarterCredits(usingModelsAddOnApiKey, creditStatus) {
    return (usingModelsAddOnApiKey &&
        !creditStatus.hasCredits &&
        !creditStatus.hasPurchasedCredits);
}
