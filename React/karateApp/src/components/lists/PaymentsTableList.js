import React, { lazy, Suspense, useState } from "react";

export const PaymentsTableList = props => {
  const { filterpayments } = props;
  const [modalSpace, setModal] = useState(null);
  const showModal = (target, payment) => {
    if (payment.status_payment) {
      const LazyModal = lazy(() => {
        return import("../layouts/modals/PaymentDetailsModal");
      });

      const lazyProps = { payment: payment, target: target };

      setModal(
        <Suspense fallback={<div></div>}>
          <LazyModal {...lazyProps}></LazyModal>
        </Suspense>
      );
    } else {
      setModal(null);
    }
  };

  const listRender = filterpayments => {
    try {
      return filterpayments.map(payment => {
        const modalCall = React.createRef();
        return (
          <tr
            key={`payment-${payment.id}`}
            ref={modalCall}
            data-userid={payment.id}
          >
            <td>
              <div>
                <p>{payment.payment_date}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{payment.payment_id}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{payment.amount}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{payment.user_id}</p>
              </div>
            </td>
          </tr>
        );
      });
    } catch (error) {
      return null;
    }
  };

  if (filterpayments) {
    return filterpayments.length > 0 && filterpayments[0] ? (
      <div className="krt-table-list krt-team-list">
        {modalSpace}
        <table className="striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmation ID</th>
              <th>Amount</th>
              <th>Pay By</th>
            </tr>
          </thead>

          <tbody>{listRender(filterpayments)}</tbody>
        </table>
      </div>
    ) : (
      <div className="krt-standar-msg">
        <div>
          <p>No records found for this search...</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PaymentsTableList;
