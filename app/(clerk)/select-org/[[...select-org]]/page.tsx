import { OrganizationList } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Organizations() {
  return (
    <div>
      <div className="dark:hidden">
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/organization/:id"
          afterCreateOrganizationUrl="/organization/:id"
        />
      </div>
      <div className="dark:block hidden">
        <OrganizationList
          appearance={{
            baseTheme: dark,
          }}
          hidePersonal
          afterSelectOrganizationUrl="/organization/:id"
          afterCreateOrganizationUrl="/organization/:id"
        />
      </div>
    </div>
  );
}
