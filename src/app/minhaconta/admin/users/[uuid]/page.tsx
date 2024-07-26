import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import FormUpdateWrapper from "@sections/forms/FormUpdateWrapper";
import FormWrapper from "@sections/forms/FormWrapper";

const ProfileUserPage = () => {
  return (
    <>
      <FormUpdateWrapper
        api_uri={API_ROUTES.ADMIN.USERS}
        app_uri={APP_ROUTES.ADMIN.USERS}
      />
    </>
  );
};

export default ProfileUserPage;
