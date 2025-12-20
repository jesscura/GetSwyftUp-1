type IconProps = { className?: string };

function BaseIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      aria-hidden
      className={className || "h-4 w-4"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const DashboardIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M4 13h6V4H4z" />
    <path d="M14 20h6V10h-6z" />
    <path d="M4 20h6v-4H4z" />
    <path d="M14 4v4h6V4z" />
  </BaseIcon>
);

export const UsersIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
    <path d="M17 13a3 3 0 1 0-2.83-4" />
    <path d="M3 20a5 5 0 0 1 8.9-3.1" />
    <path d="M13 18a5 5 0 0 1 8 4" />
  </BaseIcon>
);

export const InvoicesIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M7 4h10a2 2 0 0 1 2 2v13l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z" />
    <path d="M9 9h6" />
    <path d="M9 13h5" />
  </BaseIcon>
);

export const WalletIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <rect x="3" y="6" width="18" height="14" rx="3" />
    <path d="M21 12h-5a2 2 0 1 0 0 4h5" />
    <circle cx="16" cy="14" r="1" />
  </BaseIcon>
);

export const CardIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 16h2" />
    <path d="M13 16h4" />
  </BaseIcon>
);

export const SettingsIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </BaseIcon>
);

export const AuditIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M5 5a2 2 0 0 1 2-2h8l4 4v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
    <path d="M15 3v4h4" />
    <path d="M9 12h6" />
    <path d="M9 16h3" />
  </BaseIcon>
);

export const SupportIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M7 10a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0Z" />
    <path d="M3 10h4v4H3z" />
    <path d="M17 10h4v4h-4z" />
    <path d="M9 21h6" />
  </BaseIcon>
);
