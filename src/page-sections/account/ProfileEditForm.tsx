"use client";
import * as yup from "yup";
import { Formik } from "formik";

import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import { createClient } from "@supabaseutils/utils/client";
import { useEffect, useState } from "react";
import AvatarLoad from "@sections/account/avatarLoad";
import { useAppContext } from "@context/app-context";
import MESSAGES from "@data/messages";
import { ProfileModel } from "@supabaseutils/model/Profile.model";
import { mask } from "@lib/mask/lib/mask";
import { useRouter } from "next/navigation";
import { fetchGet } from "@hook/useFetch2";
import { API_ROUTES } from "@routes/app.routes";
import useNotify from "@hook/useNotify";
import useHandleError from "@hook/useHandleError";

let INITIAL_VALUES: ProfileModel = {
  full_name: "",
  email: "",
  phone: "",
  avatar_url: "",
};

export default function ProfileEditForm() {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const notify = useNotify();

  const URI = API_ROUTES.USER.GET_MY_PROFILE;
  const [profile, handleData] = useState<any>();
  const [dataValues, setData] = useState(INITIAL_VALUES);

  const VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup.string().required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    email: yup
      .string()
      .email(MESSAGES.FORM.VALIDADION.INVALID_EMAIL)
      .required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    phone: yup.string().required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
  });

  useEffect(() => {
    fetchGet(URI, {
      notify: true,
      headers: {},
      handleData,
      handleError: useHandleError(notify),
    });
  }, []);

  useEffect(() => {
    setData(profile || INITIAL_VALUES);
  }, [profile]);

  async function updateProfile(values: any) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        full_name: values.full_name || "",
        username: profile?.email?.split("@")[0],
        id: profile?.id as string,
        updated_at: new Date().toISOString(),
        avatar_url: values.avatar_url,
        phone: values?.phone,
      });
      if (error) throw error;

      await supabase.auth.updateUser({
        data: {
          completed: true,
          first_name: values.full_name.split(" ")[0],
        },
      });

      dispatch({
        type: "NOTIFY",
        payload: {
          status: "success",
          description: "Perfil atualizado",
        },
      });
      router.refresh();
      router.push("/profile-completed");
    } catch (error) {
      dispatch({
        type: "NOTIFY",
        payload: {
          status: "error",
          description: "Não conseguimos completar a sua solicitação!",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    updateProfile(values);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
        initialValues={dataValues}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          isValid,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mb="30px">
              <Grid container horizontal_spacing={6} vertical_spacing={6}>
                <Grid item xs={12}>
                  <Box my="auto" mb="22px" maxWidth="135px">
                    <AvatarLoad
                      size={64}
                      uid={profile?.id ?? null}
                      url={avatarUrl || values?.avatar_url}
                      onUpload={(url) => {
                        setAvatarUrl(url);
                        updateProfile({
                          full_name: values.full_name,
                          username: values.username,
                          avatar_url: url,
                        });
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="full_name"
                    label="Nome Completo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.full_name}
                    errorText={touched.full_name && errors.full_name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    fullwidth
                    name="email"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    errorText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    label="Telefone"
                    name="phone"
                    onBlur={handleBlur}
                    value={values.phone}
                    onChange={(e) => {
                      setFieldValue(
                        "phone",
                        mask(e.target.value, [
                          "(99) 9999-9999",
                          "(99) 9 9999-9999",
                        ])
                      );
                    }}
                    errorText={touched.phone && errors.phone}
                  />
                </Grid>
              </Grid>
            </Box>

            <FlexBox alignItems="flex-end" mb="22px" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                {loading ? "Enviando ..." : "Salvar"}
              </Button>
            </FlexBox>
          </form>
        )}
      </Formik>
    </>
  );
}
