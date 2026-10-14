interface CliInstallBannerProps {
  /** Number of sessions user has had - banner shows only if >= sessionThreshold */
  sessionCount?: number;
  /** Minimum sessions before showing banner (default: always show) */
  sessionThreshold?: number;
  /** If true, dismissal is permanent via localStorage (default: session only) */
  permanentDismissal?: boolean;
}

export function CliInstallBanner({
  sessionCount,
  sessionThreshold,
  permanentDismissal = false,
}: CliInstallBannerProps = {}) {
  return null;
}
