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

import { useNavigate } from 'react-router-dom';
import { Controller, useForm, Form } from 'react-hook-form';

const CreateStudent = () => {
  const navigate = useNavigate();
  const {
    control,
    setError,
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
  console.log(errors);
  return (
    <Wrapper>
      <Card>
        <CardOverflow sx={{ py: 2 }} variant="solid">
          <Typography level="h5" sx={{ color: '#fff', fontWeight: 700 }}>
            Create new Student
          </Typography>
        </CardOverflow>
        <CardContent sx={{ py: 2 }}>
          <Form
            control={control}
            method="post"
            action={`${axios.defaults.baseURL}/api/v1/students`}
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
              <Button type="submit" size="lg">
                Create
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

export default CreateStudent;
