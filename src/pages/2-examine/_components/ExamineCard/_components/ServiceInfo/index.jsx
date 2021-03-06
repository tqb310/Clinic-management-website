import React, {memo} from 'react';
import ServiceTable from 'pages/3-queue/_components/AddForm/_components/SelectedServiceTable';
import './index.scss';
// import PropTypes from 'prop-types'

function ServiceInfo({data, setFieldValue, errorMsg}) {
    return (
        <div className="ECServiceInfo">
            <ServiceTable
                selectedServiceId={data}
                setFieldValue={setFieldValue}
                errorMsg={errorMsg}
            />
        </div>
    );
}

ServiceInfo.propTypes = {};

export default memo(ServiceInfo);
