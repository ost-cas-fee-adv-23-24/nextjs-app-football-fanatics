import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';

import DialogLoginWrapper from '@/components/dialog-login-wrapper/DialogLoginWrapper';

export default function Page() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="global-width mx-auto w-full px-8 py-8 md:px-0">
        <WelcomeTexts
          title="Welcome to Mumble"
          description="Log in to have a full experience!"
        />
        <div className="my-4">
          <DialogLoginWrapper />
        </div>
      </div>
    </div>
  );
}
