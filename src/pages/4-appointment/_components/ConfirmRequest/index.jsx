import React, {useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    TextField,
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    Box,
} from '@mui/material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    Select,
    DatePickerField,
    TextArea,
} from '_components/shared/FormikField';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Close,
} from '@mui/icons-material';
import {gender, cardType} from '_constants/general';
import {useLocation} from '_contexts/LocationContext';
import {getInitialAppointmentDataFormat} from '_helpers/getInitialDataFormat';
import {hourSelect, minuteSelect} from '_constants/date';
import {LoadingButton} from '@mui/lab';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import handlePriceFormat from "_helpers/handlePriceFormat.js";
// import * as yup from 'yup';
// import appointmentSchema from '_validations/appointmentSchema';
import './index.scss';

function ConfirmRequest({
    title,
    open,
    handleClose,
    data,
    handleSubmit,
    submitLabel,
}) {
    const [switchEdit, setSwitchEdit] = useState(false);
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle
                sx={{
                    position: 'relative',
                    padding: '.8rem 1.5rem .8rem 1.5rem',
                    fontSize: '15px',
                    fontWeight: 600,
                }}
            >
                {title}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 3,
                        right: 15,
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <Formik
                enableReinitialize
                initialValues={{
                    ...getInitialAppointmentDataFormat(
                        data,
                    ),
                }}
                onSubmit={async (values, actions) => {
                    try {
                        actions.setSubmitting(true);
                        await handleSubmit(values);
                    } catch (error) {
                        throw error;
                    } finally {
                        actions.setSubmitting(false);
                    }
                }}
                // validationSchema={appointmentSchema.both}
            >
                {form => {
                    // console.log(form);
                    return (
                        <Form>
                            <DialogContent
                                dividers
                                // className="ConfirmRequest"
                                sx={{
                                    boxSizing: 'border-box',
                                    width: 600,
                                }}
                            >
                                <Grid
                                    container
                                    mt={2}
                                    columnSpacing={2}
                                >
                                    <Grid item xs={5}>
                                        <FastField
                                            name="patient.patient_name"
                                            id="patient.patient_name"
                                            component={
                                                Input
                                            }
                                            label="T??n b???nh nh??n"
                                            required
                                            icon={Person}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.phone"
                                            id="patient.phone"
                                            component={
                                                Input
                                            }
                                            label="S??? ??i???n tho???i"
                                            required
                                            icon={
                                                PhoneEnabled
                                            }
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="patient.identity_number"
                                            id="patient.identity_number"
                                            component={
                                                Input
                                            }
                                            label="CCCD"
                                            icon={
                                                BrandingWatermark
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FastField
                                            name="patient.occupation"
                                            id="patient.occupation"
                                            component={
                                                Input
                                            }
                                            label="Ngh??? nghi???p"
                                            icon={Work}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.dob"
                                            id="patient.dob"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ng??y sinh"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="patient.gender"
                                            id="patient.gender"
                                            component={
                                                Select
                                            }
                                            label="Gi???i t??nh"
                                            items={gender}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.height"
                                            id="patient.height"
                                            component={
                                                Input
                                            }
                                            label="Chi???u cao"
                                            icon="cm"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.weight"
                                            id="patient.weight"
                                            component={
                                                Input
                                            }
                                            label="C??n n???ng"
                                            icon="kg"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.type"
                                            id="appointment.type"
                                            component={
                                                Select
                                            }
                                            label="Lo???i"
                                            items={cardType}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.date"
                                            id="appointment.date"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ng??y h???n"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.hour"
                                            id="appointment.hour"
                                            component={
                                                Select
                                            }
                                            label="Gi???"
                                            items={
                                                hourSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.minute"
                                            id="appointment.minute"
                                            component={
                                                Select
                                            }
                                            label="Ph??t"
                                            items={
                                                minuteSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display:
                                                    'flex',
                                                justifyContent:
                                                    'space-between',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="#888"
                                                gutterBottom
                                                ml={1}
                                            >
                                                ?????a ch???
                                            </Typography>
                                            <FormControlLabel
                                                sx={{
                                                    mr: 0,
                                                    mb: 1,
                                                }}
                                                label="Ch???nh s???a"
                                                control={
                                                    <Switch
                                                        size="small"
                                                        checked={
                                                            switchEdit
                                                        }
                                                        onChange={e =>
                                                            setSwitchEdit(
                                                                e
                                                                    .target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                    {switchEdit ? (
                                        <>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.province"
                                                    id="patient.address.province"
                                                    component={
                                                        Select
                                                    }
                                                    label="T???nh/ th??nh ph???"
                                                    items={
                                                        provinces
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.district"
                                                    id="patient.address.district"
                                                    component={
                                                        Select
                                                    }
                                                    label="Huy???n/ qu???n"
                                                    items={
                                                        districts
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.ward"
                                                    id="patient.address.ward"
                                                    component={
                                                        Select
                                                    }
                                                    label="X??/ ph?????ng"
                                                    items={
                                                        wards
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <FastField
                                                    name="patient.address.details"
                                                    id="patient.address.details"
                                                    component={
                                                        TextArea
                                                    }
                                                    label="S??? nh??, t??n ???????ng ..."
                                                    rows={2}
                                                    icon={
                                                        Home
                                                    }
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item xs={12}>
                                            {' '}
                                            <TextField
                                                sx={{
                                                    mb: 2,
                                                }}
                                                fullWidth
                                                size="small"
                                                value={
                                                    (data.ward
                                                        ? data.ward +
                                                          ' - '
                                                        : '') +
                                                    data.district +
                                                    ' - ' +
                                                    data.province
                                                }
                                                multiline
                                                rows={3}
                                                inputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <FastField
                                            name="patient.note"
                                            id="patient.note"
                                            component={
                                                TextArea
                                            }
                                            label="Ghi ch??"
                                            rows={3}
                                            maxRow={3}
                                            icon={Edit}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="reset"
                                    variant="contained"
                                    color="secondary"
                                    sx={{mr: 2, width: 160}}
                                >
                                    T??I THI???T
                                </Button>
                                <LoadingButton
                                    loading={
                                        form.isSubmitting
                                    }
                                    type="submit"
                                    variant="outlined"
                                    sx={{mr: 1, width: 160}}
                                    // onClick={
                                    //     form.submitForm
                                    // }
                                >
                                    {submitLabel}
                                </LoadingButton>
                            </DialogActions>
                        </Form>
                    );
                }}
            </Formik>
            {/* <ToastContainer />s */}
        </Dialog>
    );
}

export default ConfirmRequest;
