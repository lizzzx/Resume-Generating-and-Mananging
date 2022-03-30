import * as Yup from "yup";
// import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { styled } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack } from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField
  // RHFUploadMultiFile,
} from "../../../components/hook-form";
import { PATH_EE } from "../../../paths";
import { capitalCase } from "change-case";

// ----------------------------------------------------------------------

const SECTOR_TYPE_OPTION = ["education", "project", "summary", "justification"];

// const LabelStyle = styled(Typography)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   color: theme.palette.text.secondary,
//   marginBottom: theme.spacing(1),
// }));

export default function DuplicatedSectorEditForm({
  isEdit,
  currentDuplicatedSector,
  requestID
}) {
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const NewSectorSchema = Yup.object().shape({
    duplicatedSectorName: Yup.string().required("Name is required"),
    duplicatedSectorType: Yup.string().required("Type is required")
    // images: Yup.array().min(1, 'Images is required'),
  });

  const defaultValues = useMemo(
    () => ({
      duplicatedSectorName: currentDuplicatedSector?.duplicatedSectorName || "",
      // images: [],
      duplicatedSectorType:
        currentDuplicatedSector?.duplicatedSectorTypeName || SECTOR_TYPE_OPTION[0]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDuplicatedSector]
  );

  const methods = useForm({
    resolver: yupResolver(NewSectorSchema),
    defaultValues
  });

  const {
    reset,
    // watch,
    // control,
    // setValue,
    // getValues,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (isEdit && currentDuplicatedSector) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentDuplicatedSector]);

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      // enqueueSnackbar('Create success!');
      navigate(PATH_EE.request.view(requestID));
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     setValue(
  //       'images',
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       )
  //     );
  //   },
  //   [setValue]
  // );

  // const handleRemoveAll = () => {
  //   setValue('images', []);
  // };

  // const handleRemove = (file) => {
  //   const filteredItems = values.images?.filter((_file) => _file !== file);
  //   setValue('images', filteredItems);
  // };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="duplicatedSectorName" label="Sector Name" />

              <RHFSelect name="duplicatedSectorType" label="Sector Type">
                {SECTOR_TYPE_OPTION.map(type => (
                  <option key={type} value={type}>
                    {capitalCase(type)}
                  </option>
                ))}
              </RHFSelect>

              {/*<div>*/}
              {/*  <LabelStyle>Images</LabelStyle>*/}
              {/*  <RHFUploadMultiFile*/}
              {/*    name="images"*/}
              {/*    showPreview*/}
              {/*    accept="image/*"*/}
              {/*    maxSize={3145728}*/}
              {/*    onDrop={handleDrop}*/}
              {/*    onRemove={handleRemove}*/}
              {/*    onRemoveAll={handleRemoveAll}*/}
              {/*  />*/}
              {/*</div>*/}
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? "Create Sector" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
