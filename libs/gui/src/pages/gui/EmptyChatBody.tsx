import { ConversationStarterCards } from "../../components/ConversationStarters";

export interface EmptyChatBodyProps {
  showOnboardingCard?: boolean;
}

export function EmptyChatBody({ showOnboardingCard }: EmptyChatBodyProps) {
  return (
    <div className="mx-2 mt-2">
      <ConversationStarterCards />
    </div>
  );
}
