import { useEffect } from 'react';

import axios from 'axios';
import {
  Typography,
  Button,
  Stack,
  Grid,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  CardOverflow,
} from '@mui/joy';

import Wrapper from '../components/wrapper';

import { useNavigate, useLoaderData } from 'react-router-dom';
import { Controller, useForm, Form } from 'react-hook-form';

const EditStudent = () => {
  const navigate = useNavigate();
  const student = useLoaderData();
  //   console.log(student);
  const {
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      gender: '',
    },
  });

  useEffect(() => {
    if (student) {
      reset(student);
    }
  }, [student]);
  //   console.log(errors);
  return (
    <Wrapper>
      <Card>
        <CardOverflow sx={{ py: 2 }} variant="solid">
          <Typography level="h5" sx={{ color: '#fff', fontWeight: 700 }}>
            Edit Student
          </Typography>
        </CardOverflow>
        <CardContent sx={{ py: 2 }}>
          <Form
            control={control}
            method="put"
            action={`${axios.defaults.baseURL}/api/v1/students/${student._id}`}
            onSuccess={() => navigate('/students', { replace: true })}
            onError={async ({ response }) => {
              const res = await response.json();
              res.errors.forEach((e) => {
                setError(e.name, { type: e.type, message: e.message });
              });
            }}
          >
            <Grid spacing={3} container>
              <Grid sxm={6} lg={3} item>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.firstName && 'danger'}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your first name"
                        size="lg"
                      />
                      <FormHelperText>
                        {errors.firstName?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid sxm={6} lg={3} item>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.lastName && 'danger'}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your last name"
                        size="lg"
                      />
                      <FormHelperText>
                        {errors.lastName?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid sxm={6} lg={3} item>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.state && 'danger'}>
                      <FormLabel>State Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your state name"
                        size="lg"
                      />
                      <FormHelperText>{errors.state?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid sxm={6} lg={3} item>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.city && 'danger'}>
                      <FormLabel>City Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your city name"
                        size="lg"
                      />
                      <FormHelperText>{errors.city?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid sxm={6} lg={3} item>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.country && 'danger'}>
                      <FormLabel>Country Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your country name"
                        size="lg"
                      />
                      <FormHelperText>{errors.country?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid sxm={6} lg={3} item>
                <Controller
                  name="pincode"
                  control={control}
                  render={({ field }) => (
                    <FormControl color={errors.pincode && 'danger'}>
                      <FormLabel>Pincode Number</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter your pincode number"
                        size="lg"
                      />
                      <FormHelperText>{errors.pincode?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid sxm={6} lg={3} item>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormControl color="danger">
                      <FormLabel sx={{ mb: 2 }}>Choose your gender</FormLabel>
                      <RadioGroup {...field} orientation="horizontal">
                        <Radio value="female" label="Female" />
                        <Radio value="male" label="Male" />
                        <Radio value="other" label="Other" />
                      </RadioGroup>
                      <FormHelperText>{errors.gender?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
              <Button color="warning" type="submit" size="lg">
                Update Student
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                color="neutral"
                size="lg"
              >
                Cancel
              </Button>
            </Stack>
          </Form>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

EditStudent.getStudent = async ({ params }) => {
  const studentId = params.id;
  const response = await axios.get(`/api/v1/students/${studentId}`);
  return response.data.data;
};
export default EditStudent;
