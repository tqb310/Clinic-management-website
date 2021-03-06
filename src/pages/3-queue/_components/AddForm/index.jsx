import React, {
    memo,
    useState,
    useEffect,
    useCallback,
} from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    IconButton,
    TextField,
    FormControlLabel,
    Switch,
    Stack,
} from '@mui/material';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Add,
} from '@mui/icons-material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    DatePickerField,
    Select,
    TextArea,
} from '_components/shared/FormikField';
import {gender, cardType} from '_constants/general';
import {initialValue} from './_constants';
import {
    ServiceDialog,
    SelectedServiceTable,
} from './_components';
import {useLocation} from '_contexts/LocationContext';
import {useSelector, useDispatch} from 'react-redux';
import {
    setPatientHint,
    setSelectedPatient,
} from '_redux/slice/queueSlice';
import Popup from '_components/shared/Popup';
import ListItem from '_components/shared/ListItem';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {getInitialPatientDataFormat} from '_helpers/getInitialDataFormat';
import queueSchema from '_validations/queueSchema';
import {Prompt} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Toast from '_components/shared/Toast';
import './index.scss';

function AddForm({handleSubmit}) {
    //Initial value for form
    const [initialValueState, setInitialValue] =
        useState(initialValue);
    // Switch to address editor mode
    const [switchEdit, setSwitchEdit] = useState(false);
    //Service modal
    const [open, setOpen] = useState(false);
    const [openToast, setOpenToast] = useState(false);

    //Open hint list
    const isOpenHint = useSelector(
        state => state.queues.isOpenHint,
    );

    //Get all patients in hint list
    const filteredPatient = useSelector(
        state => state.queues.patientHint,
    );

    //Select a patient from hint list (state)
    const selectedPatient = useSelector(
        state => state.queues.selected,
    );

    const dispatch = useDispatch();

    //Location data
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    // Close service modal
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseToast = useCallback(
        (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpenToast(false);
        },
        [],
    );
    // Open service modal
    const handleOpen = () => {
        setOpen(true);
    };

    // Close hint list
    const closeMenu = () => {
        dispatch(setPatientHint(''));
    };

    //Select a patient from hint list (dispatch)
    const handleSelect = item => e => {
        dispatch(setSelectedPatient(item));
    };

    //Reset form
    const handleReset = e => {
        if (selectedPatient)
            dispatch(setSelectedPatient(null));
        setInitialValue(pre => ({...pre, initialValue}));
        setSwitchEdit(false);
    };
    //Submit Form
    const handleSubmitFormik = async (values, actions) => {
        try {
            actions.setSubmitting(true);
            const isExistedPatient =
                selectedPatient && selectedPatient.id;
            await handleSubmit(
                values,
                actions,
                isExistedPatient,
            );
            handleReset();
            setOpenToast(_ => true);
        } catch (error) {
            throw error;
        } finally {
            actions.setSubmitting(false);
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            setInitialValue({
                ...initialValueState,
                ...getInitialPatientDataFormat(
                    selectedPatient,
                ),
            });
        } else setInitialValue(initialValue);
    }, [selectedPatient]);

    return (
        <Box className="add-form">
            <Typography variant="h5">
                T???o phi???u kh??m
            </Typography>
            <Formik
                enableReinitialize
                initialValues={initialValueState}
                onSubmit={handleSubmitFormik}
                validationSchema={queueSchema}
            >
                {form => {
                    return (
                        <Form>
                            <Prompt
                                when={
                                    form.dirty ||
                                    Boolean(selectedPatient)
                                }
                                message="B???n c?? th???c s??? mu???n r???i kh???i trang n??y?"
                            />
                            <Grid
                                container
                                mt={2}
                                columnSpacing={2}
                                className="add-form__form-content"
                            >
                                <Grid item xs={12} md={5}>
                                    <FastField
                                        name="patient.patient_name"
                                        id="patient.patient_name"
                                        component={Input}
                                        label="T??n b???nh nh??n"
                                        icon={Person}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{
                                        position:
                                            'relative',
                                    }}
                                >
                                    <FastField
                                        name="patient.phone"
                                        id="patient.phone"
                                        component={Input}
                                        label="S??? ??i???n tho???i"
                                        icon={PhoneEnabled}
                                        autoComplete="off"
                                        setPatientHint={
                                            setPatientHint
                                        }
                                    />
                                    <Popup
                                        isOpen={isOpenHint}
                                        onClose={closeMenu}
                                    >
                                        {filteredPatient.map(
                                            (
                                                item,
                                                index,
                                            ) => (
                                                <ListItem
                                                    key={
                                                        index
                                                    }
                                                    avatar={
                                                        item.gender
                                                            ? MalePatient
                                                            : FemalePatient
                                                    }
                                                    title={
                                                        item.last_name +
                                                        ' ' +
                                                        item.first_name
                                                    }
                                                    subtitle={
                                                        item.phone
                                                    }
                                                    onClick={handleSelect(
                                                        item,
                                                    )}
                                                />
                                            ),
                                        )}
                                    </Popup>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FastField
                                        name="patient.identity_number"
                                        id="patient.identity_number"
                                        component={Input}
                                        label="CCCD"
                                        icon={
                                            BrandingWatermark
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <FastField
                                        name="patient.occupation"
                                        id="patient.occupation"
                                        component={Input}
                                        label="Ngh??? nghi???p"
                                        icon={Work}
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <FastField
                                        name="patient.dob"
                                        id="patient.dob"
                                        component={
                                            DatePickerField
                                        }
                                        label="Ng??y sinh"
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <FastField
                                        name="patient.gender"
                                        id="patient.gender"
                                        component={Select}
                                        label="Gi???i t??nh"
                                        items={gender}
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <FastField
                                        name="patient.height"
                                        id="patient.height"
                                        component={Input}
                                        label="Chi???u cao"
                                        icon="cm"
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <FastField
                                        name="patient.weight"
                                        id="patient.weight"
                                        component={Input}
                                        label="C??n n???ng"
                                        icon="kg"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FastField
                                        name="invoice.type"
                                        id="invoice.type"
                                        component={Select}
                                        label="Lo???i"
                                        items={cardType}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
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
                                        {selectedPatient && (
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
                                        )}
                                    </Box>
                                </Grid>
                                {!selectedPatient ||
                                switchEdit ? (
                                    <>
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
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
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
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
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
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
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField
                                                name="patient.address.details"
                                                id="patient.address.details"
                                                component={
                                                    TextArea
                                                }
                                                label="S??? nh??, t??n ???????ng ..."
                                                rows={2}
                                                icon={Home}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12}>
                                        {' '}
                                        <TextField
                                            sx={{mb: 2}}
                                            fullWidth
                                            size="small"
                                            value={
                                                (selectedPatient.ward
                                                    ? selectedPatient.ward +
                                                      ' - '
                                                    : '') +
                                                selectedPatient.district +
                                                ' - ' +
                                                selectedPatient.province
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
                                        name="note"
                                        id="note"
                                        component={TextArea}
                                        label="Ghi ch??"
                                        rows={3}
                                        maxRow={3}
                                        icon={Edit}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography
                                        variant="subtitle2"
                                        color="#888"
                                        gutterBottom
                                        ml={1}
                                    >
                                        D???ch v???
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        onClick={handleOpen}
                                    >
                                        <Add color="primary" />
                                    </IconButton>
                                    <ServiceDialog
                                        open={open}
                                        selectedServiceId={
                                            form.values
                                                ?.invoice
                                                ?.services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                        onClose={
                                            handleClose
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectedServiceTable
                                        selectedServiceId={
                                            form.values
                                                ?.invoice
                                                ?.services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                        errorMsg={
                                            form.errors
                                                ?.invoice
                                                ?.services
                                        }
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                        zIndex: 10,
                                        backgroundColor:
                                            '#fff',
                                    }}
                                >
                                    <Stack
                                        direction={{
                                            xs: 'column',
                                            md: 'row',
                                        }}
                                        gap={2}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={
                                                !form.dirty &&
                                                !selectedPatient
                                            }
                                            variant="outlined"
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            ????a v??o h??ng ?????i
                                            {form.isSubmitting && (
                                                <FontAwesomeIcon
                                                    icon="spinner"
                                                    spin
                                                    style={{
                                                        marginLeft:
                                                            '10px',
                                                    }}
                                                />
                                            )}
                                        </Button>

                                        <Button
                                            onClick={
                                                handleReset
                                            }
                                            type="reset"
                                            variant="contained"
                                            disabled={
                                                !form.dirty &&
                                                !selectedPatient
                                            }
                                            color="error"
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            H???y
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
            <Toast
                open={openToast}
                handleClose={handleCloseToast}
                vertical="bottom"
                horizontal="left"
            >
                ???? TH??M V??O H??NG ?????I
            </Toast>
        </Box>
    );
}

export default memo(AddForm);
