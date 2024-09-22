import { OrganizationProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <div className="dark:hidden">
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              card: {
                width: "100%",
                border: "1px solid #e5e5e5",
              },
            },
          }}
        />
      </div>
      <div className="dark:flex hidden">
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              card: {
                width: "100%",
                border: "1px solid #e5e5e5",
              },
            },
            baseTheme: dark,
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
