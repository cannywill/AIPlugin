export interface MdmKeys {
    licenseKey: string;
}
interface LicenseKeyUnsignedData {
    apiUrl: string;
}
export interface LicenseKey {
    signature: string;
    data: string;
    unsignedData: LicenseKeyUnsignedData;
}
export interface LicenseKeyData {
    customerId: string;
    createdAt: string;
    expiresAt: string;
}
export declare function validateLicenseKey(licenseKey: string): {
    isValid: boolean;
    licenseKeyData?: LicenseKey;
};
/**
 * Read and validate MDM keys from the operating system's configuration files or registry.
 */
export declare function getLicenseKeyData(): LicenseKey | undefined;
/**
 * Store the license key in the appropriate OS-specific location.
 * For now, we'll use a default API URL since it's not provided in the command.
 */
export declare function setMdmLicenseKey(licenseKey: string): boolean;
export {};
//# sourceMappingURL=mdm.d.ts.map