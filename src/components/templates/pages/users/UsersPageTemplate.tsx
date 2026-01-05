import UsersHeader from "@/components/organisms/users/Header";
import UsersContent from "@/components/organisms/users/Content";

const UsersPageTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <UsersHeader />
      <UsersContent />
    </div>
  );
};

export default UsersPageTemplate;
