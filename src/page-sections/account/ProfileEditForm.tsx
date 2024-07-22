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
import { UserData } from "@supabaseutils/model/user/UserData";
import { mask } from "@lib/mask/lib/mask";
import { useRouter } from "next/navigation";

let INITIAL_VALUES: ProfileModel = {
  full_name: "",
  email: "",
  phone: "",
  avatar_url: "",
};

export default function ProfileEditForm({
  user,
  profile,
}: {
  user: UserData;
  profile: ProfileModel;
}) {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [dataValues, setData] = useState({
    ...INITIAL_VALUES,
    ...(profile[0] || {}),
    email: user.email,
  });

  const VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup.string().required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    // username: yup.string().required("required"),
    email: yup
      .string()
      .email(MESSAGES.FORM.VALIDADION.INVALID_EMAIL)
      .required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    phone: yup.string().required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    // birth_date: yup.date().required("invalid date")
    // documentNumber: yup.string().required("campo obrigatório"),
    // documentOwner: yup.string().required("informe o CPF do dono da loja"),
    // companyShortName: yup.string().required("nos diga qual o nome da sua loja"),
    // maketOperating: yup
    //   .string()
    //   .required("Escolha o tipo de negócio da sua loja"),
  });

  useEffect(() => {
    setData({ ...dataValues, ...(profile[0] || {}) });
  }, [profile]);

  async function updateProfile(values: any) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        full_name: values.full_name || "",
        username: user.email.split("@")[0],
        id: user?.id as string,
        updated_at: new Date().toISOString(),
        avatar_url: values.avatar_url,
        phone: values?.phone,
      });
      if (error) throw error;

      await supabase.auth.updateUser({
        data: {
          completed: true,
        },
      });

      dispatch({
        type: "NOTIFY",
        payload: {
          status: "success",
          description: "Perfil atualizado",
        },
      });
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
            <FlexBox alignItems="flex-end" mb="22px" justifyContent="center">
              <AvatarLoad
                size={64}
                uid={user?.id ?? null}
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
            </FlexBox>

            <Box mb="30px">
              <Grid container horizontal_spacing={6} vertical_spacing={4}>
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

                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="username"
                    label="Nome de usuário"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    errorText={touched.username && errors.username}
                  />
                </Grid> */}

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

                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    type="date"
                    name="birth_date"
                    label="Birth Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birth_date}
                    errorText={touched.birth_date && errors.birth_date}
                  />
                </Grid> */}
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
