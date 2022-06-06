import React, {useState, memo} from 'react';
import {FastField} from 'formik';
import {
    TextArea,
    Input,
    DatePickerField,
    Select,
} from '_components/shared/FormikField';
import {
    FormControlLabel,
    Switch,
    Button,
} from '@mui/material';
import {hourSelect, minuteSelect} from '_constants/date';
import './index.scss';

function ExaminingForm() {
    const [isSetAppointment, setAppointment] =
        useState(false);
    return (
        <div className="ExaminingForm">
            <div className="ExaminingForm__symptom col-1-4">
                <FastField
                    name="heart_rate"
                    id="heart_rate"
                    component={Input}
                    type="number"
                    label="Nhịp tim"
                    required
                />
            </div>
            <div className="ExaminingForm__symptom col-4-7">
                <FastField
                    name="blood_pressure"
                    id="blood_pressure"
                    component={Input}
                    type="number"
                    label="Huyết áp"
                    required
                />
            </div>
            <div className="ExaminingForm__symptom col-7-10">
                <FastField
                    name="temperature"
                    id="temperature"
                    component={Input}
                    type="number"
                    label="Nhiệt độ"
                    required
                />
            </div>
            <div className="ExaminingForm__symptom col-10-13">
                <FastField
                    name="breathing_rate"
                    id="breathing_rate"
                    component={Input}
                    type="number"
                    label="Nhịp thở"
                    required
                />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
                <FastField
                    name="symptom"
                    id="symptom"
                    component={TextArea}
                    label="Triệu chứng"
                    rows="2"
                    required
                />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
                <FastField
                    name="diagnosis"
                    id="diagnosis"
                    component={TextArea}
                    label="Chẩn đoán"
                    rows="2"
                    required
                />
            </div>
            <div className="col-1-4">
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={isSetAppointment}
                            onChange={e =>
                                setAppointment(
                                    e.target.checked,
                                )
                            }
                        />
                    }
                    label="Tái khám"
                    sx={{
                        '.MuiTypography-root': {
                            fontSize: 14.4,
                        },
                        marginTop: '.7rem',
                    }}
                />
            </div>
            {isSetAppointment && (
                <>
                    <div className="col-4-7">
                        <FastField
                            name="follow_up_date"
                            id="follow_up_date"
                            label="Ngày tái khám"
                            component={DatePickerField}
                            minDate={new Date()}
                            required
                        />
                    </div>
                    <div className="col-7-10">
                        <FastField
                            name="follow_up_time.hour"
                            id="follow_up_time.hour"
                            component={Select}
                            label="Giờ"
                            items={hourSelect}
                            required
                        />
                    </div>
                    <div className="col-10-13">
                        <FastField
                            name="follow_up_time.minute"
                            id="follow_up_time.minute"
                            component={Select}
                            label="Phút"
                            items={minuteSelect}
                            required
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(ExaminingForm);
