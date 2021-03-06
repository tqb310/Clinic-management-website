import React, {memo, Fragment} from 'react';
import {Add, Search} from '@mui/icons-material';
import {
    Button,
    Typography,
    Box,
    InputBase,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import AddAppointmentForm from '../AddAppointmentForm';
// import NoResultDate from './_assets/no-date-result.png';
import Calendar from './_components/Calendar';
import TableContent from './_components/TableContent';
import {useDispatch} from 'react-redux';
import {
    setOpenForm,
    openAppointmentDetail,
} from '_redux/slice/appointmentSlice';
import LocationProvider from '_contexts/LocationContext';
import appointmentService from '_services/firebase/appointment.service';
import ConfirmRequest from '../ConfirmRequest';
import {appointmentModel, patientModel} from '_models';
import {formatDate} from '_helpers/handleDate';
import Toast from '_components/shared/Toast';
import AlertDialog from '_components/shared/AlertDialog';
import './index.scss';

function AppointmentTable({
    data = [],
    selectedAppointment = {},
    isOpenForm,
    dataByDate,
    isOpenAppointmentDetail,
    nextPatient,
    loading,
}) {
    const dispatch = useDispatch();
    const [openToast, setOpenToast] = React.useState({
        isOpen: false,
        msg: '',
    });
    const [openAlertDialog, setOpenAlertDialog] =
        React.useState(false);

    const handleCreateSubmit = async (values, actions) => {
        try {
            const payload = {
                patient: patientModel(values.patient),
                appointment: appointmentModel(
                    values.appointment,
                ),
            };
            payload.appointment.create_at = formatDate(
                new Date().toLocaleDateString(),
                '',
                'm/d/y',
                true,
            );
            await appointmentService.addAppointment(
                payload,
            );
            handleClose();
            setOpenToast({
                isOpen: true,
                msg: 'T???o l???ch h???n th??nh c??ng',
            });
        } catch (error) {
            throw error;
        }
    };

    const handleUpdateSubmit = async value => {
        const payload = {
            patient: patientModel(value.patient),
            appointment: appointmentModel(
                value.appointment,
            ),
        };
        //Overriding status property "status"
        payload.appointment.status =
            selectedAppointment.status;
        // console.log(payload);
        try {
            await appointmentService.update(
                selectedAppointment.id.toString(),
                selectedAppointment.patient_id.toString(),
                payload,
            );
            handleCloseAppointmentDetail();
        } catch (error) {
            throw error;
        }
    };

    const handleOpen = e => {
        dispatch(setOpenForm(true));
    };
    const handleClose = e => {
        dispatch(setOpenForm(false));
    };
    const handleCloseAppointmentDetail = e => {
        dispatch(openAppointmentDetail(false));
    };
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast({isOpen: false, msg: ''});
    };
    const handleCancelAppointment = async () => {
        try {
            await appointmentService.update(
                selectedAppointment.id,
                '',
                {
                    appointment: {
                        status: 0,
                    },
                },
            );
        } catch (err) {
            throw err;
        }
    };
    return (
        <CustomPaper className="content-container">
            <Toast
                open={openToast.isOpen}
                handleClose={handleCloseToast}
                vertical="bottom"
                horizontal="left"
            >
                {openToast.msg}
            </Toast>
            <AlertDialog
                open={openAlertDialog}
                handleClose={setOpenAlertDialog.bind(
                    null,
                    false,
                )}
                handleWhenOk={handleCancelAppointment}
                msg="B???n c?? th???c s??? mu???n h???y kh??ng?"
                actionLabel={{
                    ok: 'H???y',
                    refuse: 'Kh??ng',
                }}
                onSuccess={setOpenToast.bind(null, {
                    isOpen: true,
                    msg: 'H???y l???ch h???n th??nh c??ng',
                })}
            />
            <Box className="content-header">
                <Typography variant="h5">
                    L???ch h???n
                </Typography>
            </Box>
            <Calendar data={data} />
            <Box className="appointment__actions">
                <Box className="table-container__search">
                    <Search className="icon" />
                    <InputBase
                        className="input"
                        placeholder="T??n, s??? ??i???n tho???i ..."
                    />
                </Box>
                <Button
                    sx={{ml: 'auto'}}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    T???o
                </Button>
                <AddAppointmentForm
                    title="T???o l???ch h???n"
                    open={isOpenForm}
                    handleClose={handleClose}
                    handleSubmit={handleCreateSubmit}
                />
            </Box>
            <Box className="appointment-wrapper">
                <TableContent
                    tableData={dataByDate}
                    openToast={setOpenToast}
                    openAlertDialog={setOpenAlertDialog}
                    nextPatient={nextPatient}
                    selectedAppointment={
                        selectedAppointment
                    }
                    loading={loading}
                />
                <LocationProvider>
                    <ConfirmRequest
                        title="Chi ti???t l???ch h???n"
                        open={isOpenAppointmentDetail}
                        handleClose={
                            handleCloseAppointmentDetail
                        }
                        data={selectedAppointment}
                        handleSubmit={handleUpdateSubmit}
                        submitLabel="S???a"
                    />
                </LocationProvider>
            </Box>
        </CustomPaper>
    );
}

export default memo(AppointmentTable);
